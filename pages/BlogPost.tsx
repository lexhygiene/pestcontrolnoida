
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialPosts } from '../data/posts';
import { BlogPost } from '../types';
import SidebarForm from '../components/SidebarForm';
import { updateMeta, generateJsonLd } from '../services/seo';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('/api/posts');
        let foundPost = null;
        if (response.ok) {
          const allPosts = await response.json();
          foundPost = allPosts.find((p: BlogPost) => p.slug === slug);
        } else {
          // Fallback to initialPosts if API fails
          foundPost = initialPosts.find((p: BlogPost) => p.slug === slug);
        }

        if (foundPost) {
          setPost(foundPost);
          updateMeta(
            foundPost.seoTitle || foundPost.title,
            foundPost.seoDescription || foundPost.excerpt
          );

          // JSON-LD Article Schema
          generateJsonLd({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": foundPost.title,
            "image": foundPost.imageUrl,
            "description": foundPost.excerpt,
            "provider": {
              "@type": "Organization",
              "name": "Pest Control Noida",
              "url": "https://pestcontrolnoida.in"
            }
          });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        // Fallback catch
        const fallbackPost = initialPosts.find((p: BlogPost) => p.slug === slug);
        if (fallbackPost) setPost(fallbackPost);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eco-beige">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-eco-gold/20 rounded mb-4"></div>
          <div className="h-8 w-48 bg-eco-green/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-eco-beige">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Service Not Found</h2>
          <Link to="/blog" className="text-eco-green underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  const relatedPosts = initialPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="bg-eco-beige min-h-screen py-12">
      <div className="container mx-auto px-4">

        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link to="/blog" className="inline-flex items-center text-eco-green hover:text-eco-gold transition-colors font-semibold">
            <ArrowLeft size={18} className="mr-2" /> Back to Services
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Article Content */}
          <article className="lg:w-2/3 bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-100">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-eco-beige text-eco-green px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">{post.category}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-eco-green mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2">
                  <User size={16} /> <span>Certified Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> <span>{post.tags && post.tags.length > 0 ? post.tags.join(', ') : 'Available 24/7'}</span>
                </div>
              </div>
            </header>

            <div className="mb-8">
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-lg shadow-md" />
            </div>

            <div
              className="prose prose-lg prose-headings:font-serif prose-headings:text-eco-green prose-p:text-gray-700 prose-a:text-eco-gold prose-a:no-underline hover:prose-a:underline max-w-none"
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const link = target.closest('a');
                if (link) {
                  const href = link.getAttribute('href');
                  if (href && href.startsWith('#')) {
                    e.preventDefault();
                    // Clean up ID
                    let id = href.replace('#', '');
                    if (id.startsWith('"') && id.endsWith('"')) id = id.slice(1, -1);

                    // Try finding element by exact ID
                    let element = document.getElementById(id);

                    // Fallback 1: Try removing 'h-' prefix (common in some TOC generators)
                    if (!element && id.startsWith('h-')) {
                      element = document.getElementById(id.substring(2));
                    }

                    // Fallback 2: Try adding 'h-' prefix
                    if (!element && !id.startsWith('h-')) {
                      element = document.getElementById(`h-${id}`);
                    }

                    if (element) {
                      const headerOffset = 100; // Offset for fixed header if any
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                      });
                      window.history.pushState(null, '', href);
                    }
                  }
                }
              }}
            >
              {/* Process content to ensure headers have IDs for anchor links */}
              <div dangerouslySetInnerHTML={{
                __html: (() => {
                  if (!post?.content) return '';

                  // Simple regex-based ID injection for headers that lack them
                  // This ensures TOC links work even if content was pasted without IDs
                  return post.content.replace(
                    /<(h[1-6])([^>]*)>(.*?)<\/\1>/gi,
                    (match, tag, attrs, text) => {
                      // If ID already exists, leave it alone
                      if (attrs.includes('id=')) return match;

                      // Create slug from text: "Key Takeaways" -> "key-takeaways"
                      const slug = text.replace(/<[^>]*>/g, '') // remove inner tags like <strong>
                        .toLowerCase()
                        .trim()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');

                      return `<${tag} id="${slug}"${attrs}>${text}</${tag}>`;
                    }
                  );
                })()
              }} />
            </div>

            {/* Share / Tags Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h4 className="font-bold text-eco-green mb-4">Share this service</h4>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition-colors"
                >
                  Facebook
                </button>
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(post.title);
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
                  }}
                  className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 text-sm transition-colors"
                >
                  Twitter
                </button>
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(post.title);
                    window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, '_blank');
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm transition-colors"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <SidebarForm />

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-serif font-bold text-eco-green mb-4 border-b pb-2">Related Services</h3>
                <div className="space-y-6">
                  {relatedPosts.map(rp => (
                    <div key={rp.id}>
                      <Link to={`/blog/${rp.slug}`} className="group block">
                        <div className="overflow-hidden rounded mb-2 h-32">
                          <img src={rp.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={rp.title} />
                        </div>
                        <h4 className="font-bold text-eco-green group-hover:text-eco-gold transition-colors leading-tight mb-1">{rp.title}</h4>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;