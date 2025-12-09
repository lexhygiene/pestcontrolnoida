import React, { useState, useEffect } from 'react';
import { initialPosts } from '../data/posts';
import { BlogPost, CATEGORIES } from '../types';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash, Save, LayoutDashboard, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import RichTextEditor from '../components/RichTextEditor';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'editor' | 'system'>('list');

  // Load from Server on Mount
  useEffect(() => {
    fetch('/api/posts')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const sorted = [...data].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            // Handle invalid dates
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;
            return dateB.getTime() - dateA.getTime();
          });
          setPosts(sorted);
        } else {
          console.error("Received non-array data:", data);
          alert("Error: Server returned invalid data format. Please check console.");
        }
      })
      .catch(err => {
        console.error('Failed to load posts', err);
        alert(`Connection Error: ${err.message}. Ensure the server is running.`);
      });
  }, []);

  // Helper to save to server
  const saveToServer = async (updatedPosts: BlogPost[]) => {
    // Basic Auth Header
    const API_KEY = import.meta.env.VITE_ADMIN_API_KEY || 'aAFFknckan^%#653873dlhuADFSDF#@$@$sdfdsf';

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify(updatedPosts)
      });

      if (response.status === 401) {
        alert("Security Error: Invalid API Key. Please check your configuration.");
        throw new Error("Unauthorized");
      }

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Status: ${response.status}`;
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.error) errorMessage = errorJson.error;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Error saving to server:', error);
      alert(`Save Error:\n${error.message}\n\nPlease check your network connection or contact support.`);
    }
  };

  // Editor State
  const [editorForm, setEditorForm] = useState<BlogPost>({
    id: '',
    title: '',
    slug: '',
    category: 'Termite Control',
    excerpt: '',
    content: '',
    author: 'Pest Control Noida Expert',
    date: new Date().toISOString().split('T')[0],
    imageUrl: 'https://placehold.co/800x600',
    seoTitle: '',
    seoDescription: '',
    tags: []
  });

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/editor/login');
  };

  const handleEdit = (post: BlogPost) => {
    setEditorForm(post);
    setEditingId(post.id);
    setActiveTab('editor');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const newPosts = posts.filter(p => p.id !== id);
      setPosts(newPosts);
      await saveToServer(newPosts);
    }
  };

  const handleNew = () => {
    setEditorForm({
      id: Date.now().toString(),
      title: '',
      slug: '',
      category: 'Termite Control',
      excerpt: '',
      content: '',
      author: 'Pest Control Noida Expert',
      date: new Date().toISOString().split('T')[0],
      imageUrl: 'https://placehold.co/800x600',
      seoTitle: '',
      seoDescription: '',
      tags: []
    });
    setEditingId(null);
    setActiveTab('editor');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let newPosts = [];
    if (editingId) {
      newPosts = posts.map(p => p.id === editingId ? editorForm : p);
    } else {
      newPosts = [editorForm, ...posts];
    }

    setPosts(newPosts);
    await saveToServer(newPosts);

    alert('Service saved successfully!');
    setActiveTab('list');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditorForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = () => {
    const url = prompt("Enter Image URL (In a real app, this would open a file picker):", editorForm.imageUrl);
    if (url) {
      setEditorForm(prev => ({ ...prev, imageUrl: url }));
    }
  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Admin Header */}
      <header className="bg-eco-green text-white p-4 shadow flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <LayoutDashboard size={20} /> Pest Control Noida Admin
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm opacity-80">Welcome, Editor</span>
          <button onClick={handleLogout} className="flex items-center gap-1 text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Nav */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`w-full text-left p-2 rounded flex items-center gap-2 ${activeTab === 'list' ? 'bg-eco-beige text-eco-green font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <FileText size={18} /> All Services
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`w-full text-left p-2 rounded flex items-center gap-2 ${activeTab === 'system' ? 'bg-eco-beige text-eco-green font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <LayoutDashboard size={18} /> System Files
            </button>
            <div className="pt-4 mt-4 border-t border-gray-100">
              <a href="/" target="_blank" className="text-sm text-blue-600 hover:underline px-2 flex items-center gap-1">
                <ExternalLink size={14} /> View Live Site
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">

          {/* POST LIST TAB */}
          {activeTab === 'list' && (
            <div className="bg-white rounded shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-gray-800">Services Management</h2>
                <button onClick={handleNew} className="bg-eco-gold text-white px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-eco-gold/90">
                  <Plus size={18} /> New Service
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-3 text-sm font-bold text-gray-600">Title</th>
                      <th className="p-3 text-sm font-bold text-gray-600">Category</th>
                      <th className="p-3 text-sm font-bold text-gray-600">Last Updated</th>
                      <th className="p-3 text-sm font-bold text-gray-600 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => (
                      <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3 font-medium text-gray-800">{post.title}</td>
                        <td className="p-3 text-gray-600"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{post.category}</span></td>
                        <td className="p-3 text-gray-600 text-sm">{post.date}</td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800"><Trash size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EDITOR TAB */}
          {activeTab === 'editor' && (
            <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-serif font-bold text-gray-800">{editingId ? 'Edit Service' : 'Create New Service'}</h2>
                <button onClick={() => setActiveTab('list')} className="text-gray-500 hover:text-gray-800">Cancel</button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Service Title</label>
                    <input type="text" name="title" required value={editorForm.title} onChange={handleFormChange} className="w-full border p-2 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Slug (URL)</label>
                    <input type="text" name="slug" required value={editorForm.slug} onChange={handleFormChange} className="w-full border p-2 rounded" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <select name="category" value={editorForm.category} onChange={handleFormChange} className="w-full border p-2 rounded">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Provider/Author</label>
                    <input type="text" name="author" value={editorForm.author} onChange={handleFormChange} className="w-full border p-2 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
                    <input type="date" name="date" value={editorForm.date} onChange={handleFormChange} className="w-full border p-2 rounded" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Featured Image</label>
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input type="text" name="imageUrl" value={editorForm.imageUrl} onChange={handleFormChange} className="w-full border p-2 rounded" placeholder="Image URL" />
                    </div>
                    <button type="button" onClick={handleImageUpload} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-2">
                      <ImageIcon size={18} /> Upload
                    </button>
                  </div>
                  {editorForm.imageUrl && (
                    <div className="mt-2 relative w-full h-48 bg-gray-100 rounded overflow-hidden border">
                      <img src={editorForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Short Description (Excerpt)</label>
                  <textarea name="excerpt" rows={3} value={editorForm.excerpt} onChange={handleFormChange} className="w-full border p-2 rounded"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tags (Comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={editorForm.tags ? editorForm.tags.join(', ') : ''}
                    onChange={(e) => setEditorForm({ ...editorForm, tags: e.target.value.split(',').map(t => t.trim()) })}
                    className="w-full border p-2 rounded"
                    placeholder="e.g. 24/7 Service, Warranty, Best Seller"
                  />
                </div>


                <div className="mb-8">
                  <RichTextEditor
                    value={editorForm.content}
                    onChange={(val) => setEditorForm(prev => ({ ...prev, content: val }))}
                    label="Post Content"
                    placeholder="Start writing your amazing blog post here..."
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <h3 className="font-bold text-gray-700 mb-3">SEO Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meta Title</label>
                      <input type="text" name="seoTitle" value={editorForm.seoTitle || ''} onChange={handleFormChange} className="w-full border p-2 rounded text-sm" placeholder="Leave blank to use Service Title" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Meta Description</label>
                      <input type="text" name="seoDescription" value={editorForm.seoDescription || ''} onChange={handleFormChange} className="w-full border p-2 rounded text-sm" placeholder="Leave blank to use Excerpt" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" className="bg-eco-green text-white px-6 py-3 rounded font-bold hover:bg-[#152b1e] flex items-center gap-2">
                    <Save size={18} /> Save Service
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SYSTEM TAB */}
          {activeTab === 'system' && (
            <div className="bg-white rounded shadow p-6">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">System Generators</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">robots.txt</h3>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto">
                    {`User-agent: *
Allow: /
Disallow: /editor/
Disallow: /admin/

Sitemap: https://pestcontrolnoida.in/sitemap.xml`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">sitemap.xml (Preview)</h3>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-auto h-40">
                    {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://pestcontrolnoida.in/</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>https://pestcontrolnoida.in/blog</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
   </url>
   ${posts.map(p => `
   <url>
      <loc>https://pestcontrolnoida.in/blog/${p.slug}</loc>
      <lastmod>${p.date}</lastmod>
      <changefreq>monthly</changefreq>
   </url>`).join('')}
</urlset>`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;