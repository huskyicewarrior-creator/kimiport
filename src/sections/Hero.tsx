import React, { useEffect, useRef } from 'react';
import { CherryBlossomBranch } from '../components/SvgMotifs';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Split title into characters
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = '';
      const words = text.split(' ');
      words.forEach((word, wi) => {
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';
        word.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.style.display = 'inline-block';
          charSpan.style.willChange = 'transform';
          charSpan.style.opacity = '0';
          charSpan.style.transform = 'translateY(120%) rotate(5deg)';
          wordSpan.appendChild(charSpan);
        });
        titleRef.current!.appendChild(wordSpan);
        if (wi < words.length - 1) {
          const space = document.createTextNode('\u00A0');
          titleRef.current!.appendChild(space);
        }
      });

      const chars = titleRef.current.querySelectorAll('span span');
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.04,
      });
    }

    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=1'
      );
    }

    if (bodyRef.current) {
      gsap.set(bodyRef.current, { opacity: 0, y: 20 });
      tl.to(
        bodyRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.7'
      );
    }

    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );
    }

    if (decorRef.current) {
      gsap.set(decorRef.current, { opacity: 0, scale: 0.9 });
      tl.to(
        decorRef.current,
        {
          opacity: 0.4,
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        },
        '-=1'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-cream)' }}
    >
      {/* Decorative cherry blossom branch */}
      <div
        ref={decorRef}
        className="absolute top-0 right-0 w-48 md:w-72 lg:w-80 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <CherryBlossomBranch className="w-full h-auto" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 pt-32 pb-20 w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="font-body text-xs md:text-sm uppercase mb-6"
              style={{
                color: 'var(--ink)',
                letterSpacing: '0.12em',
                opacity: 0,
              }}
            >
              Photo Editor &amp; Visual Artist
            </p>

            {/* Main Title */}
            <h1
              ref={titleRef}
              className="font-display italic font-light mb-8"
              style={{
                color: 'var(--ink)',
                fontSize: 'clamp(48px, 6vw, 72px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Editing that tells your story
            </h1>

            {/* Body Text */}
            <p
              ref={bodyRef}
              className="font-display text-lg md:text-xl leading-relaxed mb-10 max-w-lg"
              style={{
                color: 'var(--ink)',
                opacity: 0,
                letterSpacing: '0.01em',
                lineHeight: 1.6,
              }}
            >
              Soft, refined photo edits and original artwork—turning everyday
              memories into gallery-worthy pieces.
            </p>

            {/* CTA Button */}
            <a
              ref={ctaRef}
              href="#work"
              onClick={scrollToWork}
              className="inline-block font-body text-sm transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: 'var(--flag-red)',
                color: 'var(--bg-cream)',
                padding: '16px 32px',
                letterSpacing: '0.04em',
                opacity: 0,
              }}
            >
              View Projects
            </a>
          </div>
        </div>
      </div>

      {/* Bottom subtle decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'rgba(84, 78, 66, 0.1)' }}
      />
    </section>
  );
};

export default Hero;
