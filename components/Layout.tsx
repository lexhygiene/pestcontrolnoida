import React from 'react';
import Header from './Header';
import Footer from './Footer';

import WhatsAppBubble from './WhatsAppBubble';
import EnquirySidebar from './EnquirySidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-eco-green bg-eco-beige">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppBubble />
      <EnquirySidebar />
    </div>
  );
};

export default Layout;