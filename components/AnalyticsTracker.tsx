import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js',
            targetId: string,
            config?: Record<string, any>
        ) => void;
    }
}

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', 'G-DHRGFJQLK6', {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
};

export default AnalyticsTracker;
