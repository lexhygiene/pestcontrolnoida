import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface Props {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<Props> = ({ post, featured = false }) => {
  return (
    <div className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 ${featured ? 'md:col-span-2 md:flex md:items-center' : ''}`}>
      <div className={`overflow-hidden ${featured ? 'md:w-1/2 h-64 md:h-full' : ''}`}>
        <Link to={`/blog/${post.slug}`}>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
      </div>
      <div className={`p-6 ${featured ? 'md:w-1/2 md:p-10' : ''}`}>
        <span className="inline-block px-3 py-1 bg-eco-beige text-eco-green text-xs font-bold uppercase tracking-wider rounded mb-3">
          {post.category}
        </span>
        <h3 className={`font-serif font-bold text-eco-green mb-3 group-hover:text-eco-gold transition-colors ${featured ? 'text-3xl' : 'text-xl'}`}>
          <Link to={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex gap-2 flex-wrap">
            {post.tags && post.tags.length > 0 ? (
              post.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs font-semibold text-eco-green bg-green-50 px-2 py-1 rounded">
                  {tag}
                </span>
              ))
            ) : (
              <span className="font-semibold text-eco-green">Available 24/7</span>
            )}
          </div>
          <Link to={`/blog/${post.slug}`} className="font-semibold text-eco-gold hover:text-eco-green transition-colors">
            View Service &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;