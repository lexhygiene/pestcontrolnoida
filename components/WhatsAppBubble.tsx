import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppBubble: React.FC = () => {
    const phoneNumber = '918882333782';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[1000] bg-[#556B2F] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={32} fill="white" className="text-white" />
            <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1 rounded shadow-md text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppBubble;
