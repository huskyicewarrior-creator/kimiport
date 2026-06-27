import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        height: '80px',
        backgroundColor: scrolled ? 'rgba(241, 237, 225, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(84, 78, 66, 0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-full flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl md:text-3xl italic font-light"
          style={{ color: 'var(--ink)', letterSpacing: '-0.02em' }}
        >
          Emily Lee
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="group relative font-body text-sm"
              style={{
                color: 'var(--ink)',
                letterSpacing: '0.04em',
              }}
            >
              {link.label}
              <span
                className="absolute left-0 -bottom-1 h-px bg-current transition-transform duration-300 origin-left"
                style={{
                  width: '100%',
                  transform: 'scaleX(0)',
                  backgroundColor: 'var(--flag-red)',
                }}
                ref={(el) => {
                  if (!el) return;
                  const parent = el.parentElement;
                  if (!parent) return;
                  parent.addEventListener('mouseenter', () => {
                    el.style.transform = 'scaleX(1)';
                  });
                  parent.addEventListener('mouseleave', () => {
                    el.style.transform = 'scaleX(0)';
                  });
                }}
              />
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: 'var(--ink)',
              transform: mobileOpen ? 'rotate(45deg) translateY(4px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: 'var(--ink)',
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: 'var(--ink)',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: mobileOpen ? '300px' : '0',
          backgroundColor: 'rgba(241, 237, 225, 0.98)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="font-body text-base"
              style={{ color: 'var(--ink)', letterSpacing: '0.04em' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
