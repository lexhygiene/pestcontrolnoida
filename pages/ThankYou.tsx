import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ThankYouPage: React.FC = () => {
    const [verifying, setVerifying] = React.useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Small delay to ensure scripts are loaded
        const timer = setTimeout(() => {
            if (typeof window.gtag !== 'undefined') {
                console.log('Conversion Event Triggered: AW-17787304856/Kp1SCIWC3M0BEJj30qFC');
                window.gtag('event', 'conversion', {
                    'send_to': 'AW-17787304856/Kp1SCIWC3M0BEJj30qFC'
                });
            } else {
                console.error('Google Ads Tag (gtag) not found!');
            }
            setVerifying(false);
        }, 500); // 500ms buffer

        return () => clearTimeout(timer);
    }, []);

    if (verifying) {
        return (
            <div className="min-h-screen bg-eco-beige flex items-center justify-center">
                <div className="text-center animate-pulse">
                    <div className="w-12 h-12 border-4 border-eco-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-eco-green font-semibold">Processing submission...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-eco-beige flex items-center justify-center px-4 py-20 animate-fade-in">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-lg w-full text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle size={64} className="text-eco-green" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-eco-green mb-4">Thank You!</h1>
                <p className="text-xl text-gray-700 mb-8">
                    Your inquiry has been received. Our team will contact you shortly to schedule your free inspection.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-eco-green text-white font-bold py-3 px-8 rounded hover:bg-eco-green/90 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ThankYouPage;
