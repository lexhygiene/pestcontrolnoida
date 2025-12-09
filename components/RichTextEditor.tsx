import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Code, Eye } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    label = "Content",
    placeholder = "Write something awesome..."
}) => {
    const [mode, setMode] = useState<'visual' | 'html'>('visual');

    // Custom Toolbar Configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <label className="block text-sm font-bold text-gray-700">{label}</label>
                <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-semibold">
                    <button
                        type="button"
                        onClick={() => setMode('visual')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded ${mode === 'visual' ? 'bg-white text-eco-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Eye size={14} /> Visual
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('html')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded ${mode === 'html' ? 'bg-white text-eco-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Code size={14} /> HTML Source
                    </button>
                </div>
            </div>

            <div className={`border rounded-lg overflow-hidden bg-white ${mode === 'visual' ? 'ring-1 ring-gray-200' : ''}`}>
                {mode === 'visual' ? (
                    <div className="quill-wrapper">
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={onChange}
                            modules={modules}
                            formats={formats}
                            placeholder={placeholder}
                            className="h-96 mb-12" // Add margin bottom for the toolbar
                        />
                    </div>
                ) : (
                    <textarea
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 focus:outline-none focus:ring-2 focus:ring-eco-green resize-y"
                        placeholder="<div>Write HTML here...</div>"
                    />
                )}
            </div>

            {mode === 'html' && (
                <p className="text-xs text-gray-500 italic">
                    Power User Tip: You are editing the raw HTML source. Be careful with validation!
                </p>
            )}
        </div>
    );
};

export default RichTextEditor;
