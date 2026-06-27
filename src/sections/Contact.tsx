import React, { useEffect, useRef, useState } from 'react';
import { CraneOrigami } from '../components/SvgMotifs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: leftRef.current,
              start: 'top bottom-=10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rightRef.current,
              start: 'top bottom-=10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (decorRef.current) {
        gsap.to(decorRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-cream)' }}
    >
      {/* Decorative crane */}
      <div
        ref={decorRef}
        className="absolute top-16 right-12 w-20 md:w-28 pointer-events-none"
        style={{ opacity: 0.1 }}
      >
        <CraneOrigami className="w-full h-auto" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-12 md:gap-16">
          {/* Left: Info */}
          <div className="col-span-12 md:col-span-5" ref={leftRef}>
            <p
              className="font-body text-xs uppercase mb-4"
              style={{
                color: 'var(--ink)',
                letterSpacing: '0.12em',
                opacity: 0.5,
              }}
            >
              Get in Touch
            </p>
            <h2
              className="font-display italic text-3xl md:text-4xl lg:text-5xl font-light mb-8"
              style={{
                color: 'var(--ink)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Let's create
              <br />
              something together
            </h2>

            <p
              className="font-display text-base md:text-lg leading-relaxed mb-10 max-w-sm"
              style={{
                color: 'var(--ink)',
                opacity: 0.6,
                letterSpacing: '0.01em',
                lineHeight: 1.6,
              }}
            >
              Have a project in mind? I'd love to hear about it. Send me a
              message and I'll get back to you within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="space-y-5 mb-10">
              <div>
                <p
                  className="font-body text-xs uppercase mb-1"
                  style={{
                    color: 'var(--ink)',
                    letterSpacing: '0.12em',
                    opacity: 0.4,
                  }}
                >
                  Email
                </p>
                <a
                  href="mailto:hello@emilylee.studio"
                  className="font-display text-lg italic transition-opacity duration-300 hover:opacity-70"
                  style={{ color: 'var(--ink)' }}
                >
                  hello@emilylee.studio
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p
                className="font-body text-xs uppercase mb-3"
                style={{
                  color: 'var(--ink)',
                  letterSpacing: '0.12em',
                  opacity: 0.4,
                }}
              >
                Follow
              </p>
              <div className="flex gap-5">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 hover:opacity-60"
                  aria-label="Instagram"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="var(--ink)" stroke="none" />
                  </svg>
                </a>
                {/* Reddit */}
                <a
                  href="https://reddit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 hover:opacity-60"
                  aria-label="Reddit"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M7 13c0 2.8 2.2 5 5 5s5-2.2 5-5" />
                    <circle cx="9" cy="10" r="1" fill="var(--ink)" stroke="none" />
                    <circle cx="15" cy="10" r="1" fill="var(--ink)" stroke="none" />
                    <path d="M16 6l1.5-3M8 6L6.5 3" />
                  </svg>
                </a>
                {/* Ko-fi */}
                <a
                  href="https://ko-fi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 hover:opacity-60"
                  aria-label="Ko-fi"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 11h14v6a3 3 0 01-3 3H8a3 3 0 01-3-3v-6z" />
                    <path d="M8 11V7a4 4 0 018 0v4" />
                    <path d="M12 11h.01" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Support / Tip Jar */}
            <div className="mt-10">
              <a
                href="https://ko-fi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm px-6 py-3 transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundColor: 'var(--flag-red)',
                  color: 'var(--bg-cream)',
                  letterSpacing: '0.04em',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                Support / Tip Jar
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="col-span-12 md:col-span-6 md:col-start-7" ref={rightRef}>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-body text-xs uppercase mb-3"
                  style={{
                    color: 'var(--ink)',
                    letterSpacing: '0.12em',
                    opacity: 0.5,
                  }}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent font-display text-lg pb-3 outline-none transition-all duration-300 focus:opacity-100"
                  style={{
                    color: 'var(--ink)',
                    borderBottom: '1px solid rgba(84, 78, 66, 0.25)',
                    borderRadius: 0,
                  }}
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-body text-xs uppercase mb-3"
                  style={{
                    color: 'var(--ink)',
                    letterSpacing: '0.12em',
                    opacity: 0.5,
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent font-display text-lg pb-3 outline-none transition-all duration-300 focus:opacity-100"
                  style={{
                    color: 'var(--ink)',
                    borderBottom: '1px solid rgba(84, 78, 66, 0.25)',
                    borderRadius: 0,
                  }}
                  placeholder="your@email.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-body text-xs uppercase mb-3"
                  style={{
                    color: 'var(--ink)',
                    letterSpacing: '0.12em',
                    opacity: 0.5,
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent font-display text-lg pb-3 outline-none resize-none transition-all duration-300 focus:opacity-100"
                  style={{
                    color: 'var(--ink)',
                    borderBottom: '1px solid rgba(84, 78, 66, 0.25)',
                    borderRadius: 0,
                  }}
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="font-body text-sm px-8 py-4 transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--ink)',
                    color: 'var(--bg-cream)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
