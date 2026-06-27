import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      className="py-10 md:py-12"
      style={{
        backgroundColor: 'var(--bg-cream)',
        borderTop: '1px solid rgba(84, 78, 66, 0.08)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center">
        <p
          className="font-display text-2xl italic font-light mb-3"
          style={{
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
          }}
        >
          Emily Lee
        </p>
        <p
          className="font-body text-xs"
          style={{
            color: 'var(--ink)',
            opacity: 0.4,
            letterSpacing: '0.04em',
          }}
        >
          &copy; {new Date().getFullYear()} Emily Lee. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
