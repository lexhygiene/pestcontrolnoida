import React, { useState } from 'react';
import { X } from 'lucide-react';
import SidebarForm from './SidebarForm';

const EnquirySidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Fixed Side Button (Vertical) - Visible on ALL screens */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-1/2 right-0 z-[100] transform -translate-y-1/2 translate-x-[42%] rotate-[-90deg] origin-center bg-eco-green hover:bg-[#152b1e] text-eco-beige font-bold py-3 px-6 md:px-8 rounded-b-lg shadow-xl hover:shadow-2xl transition-all duration-300 border-x-2 border-b-2 border-white/20 tracking-wider text-sm md:text-lg uppercase whitespace-nowrap"
                style={{ borderRadius: '0 0 12px 12px' }}
            >
                Enquire Now
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[2000] backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-out Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white z-[2010] shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-4 flex justify-end">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="px-6 pb-8">
                    {/* Reuse existing component but wrap it to strip its own sticky/border container styles if possible, 
               or just render it. It has padding and border. Let's render it directly. */}
                    <div className="[&>div]:shadow-none [&>div]:border-none [&>div]:bg-transparent [&>div]:p-0">
                        <SidebarForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnquirySidebar;
