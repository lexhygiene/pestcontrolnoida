import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { initialPosts } from '../data/posts';
import { BlogPost, CATEGORIES } from '../types';
import BlogCard from '../components/BlogCard';
import SidebarForm from '../components/SidebarForm';
import { updateMeta } from '../services/seo';
import { Search } from 'lucide-react';

const BlogList: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      let filtered = initialPosts;
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          filtered = await response.json();
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }

      // Filter by Category
      if (category) {
        const categoryName = category.replace(/-/g, ' ');
        const formattedCategory = categoryName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        filtered = filtered.filter((p: BlogPost) => p.category.toLowerCase() === categoryName.toLowerCase());
        updateMeta(`${formattedCategory} Services | Pest Control Noida`, `Professional ${formattedCategory} services in Noida & Delhi NCR.`);
      } else {
        updateMeta("Our Services | Pest Control Noida", "Browse our complete range of pest control services.");
      }

      // Filter by Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter((p: BlogPost) =>
          p.title.toLowerCase().includes(term) ||
          p.excerpt.toLowerCase().includes(term)
        );
      }

      // Sort by Date (Newest First)
      filtered.sort((a: BlogPost, b: BlogPost) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        // Handle invalid dates by treating them as older
        const validDateA = isNaN(dateA) ? 0 : dateA;
        const validDateB = isNaN(dateB) ? 0 : dateB;
        return validDateB - validDateA;
      });

      setPosts(filtered);
      setVisibleCount(6); // Reset pagination on filter change
    };

    fetchPosts();
  }, [category, searchTerm]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="bg-eco-beige min-h-screen py-12">
      <div className="container mx-auto px-4">

        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-eco-green mb-4 capitalize">
            {category ? `${category.replace(/-/g, ' ')} Services` : 'Our Services'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional and effective pest control solutions for your home and business.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-200 pb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/blog"
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${!category ? 'bg-eco-green text-eco-beige' : 'bg-white text-eco-green hover:bg-eco-green/10'}`}
            >
              All
            </Link>
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${category?.toLowerCase() === cat.toLowerCase() ? 'bg-eco-green text-eco-beige' : 'bg-white text-eco-green hover:bg-eco-green/10'}`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:border-eco-gold outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {posts.length > 0 ? (
              <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {posts.slice(0, visibleCount).map((post) => (
                  <div key={post.id} className="break-inside-avoid">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No services found matching your criteria.</p>
              </div>
            )}

            {visibleCount < posts.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-white border-2 border-eco-green text-eco-green font-bold rounded hover:bg-eco-green hover:text-white transition-colors"
                >
                  Load More Services
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <SidebarForm />

            {/* Recent Posts Mini-List */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-serif font-bold text-eco-green mb-4">Popular Services</h3>
              <div className="space-y-4">
                {initialPosts.slice(0, 5).map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
                    <h4 className="font-bold text-gray-800 group-hover:text-eco-gold transition-colors text-sm mb-1">{post.title}</h4>
                    <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogList;