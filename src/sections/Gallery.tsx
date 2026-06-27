import React, { useEffect, useRef } from 'react';
import BeforeAfterCard from '../components/BeforeAfterCard';
import type { BeforeAfterCardProps } from '../components/BeforeAfterCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects: BeforeAfterCardProps[] = [
  {
    title: 'Portrait Warm Glow',
    beforeImageSrc: '/images/before-1.jpg',
    afterImageSrc: '/images/after-1.jpg',
    editPrompt:
      'Cinematic warm grade, skin retouch with natural texture preservation, soft background blur enhancement, golden hour light simulation, gentle vignette.',
    tags: ['Portrait', 'Retouching', 'Color Grade'],
    aspectRatio: '3/4',
  },
  {
    title: 'Product Line Elegance',
    beforeImageSrc: '/images/before-2.jpg',
    afterImageSrc: '/images/after-2.jpg',
    editPrompt:
      'Clean product styling, background replacement with marble texture, shadow consistency, warm neutral color palette, dust removal, sharpness enhancement.',
    tags: ['Product', 'Styling', 'Cleanup'],
    aspectRatio: '4/3',
  },
  {
    title: 'Landscape Reimagined',
    beforeImageSrc: '/images/before-3.jpg',
    afterImageSrc: '/images/after-3.jpg',
    editPrompt:
      'Teal and orange cinematic grade, sky replacement with dramatic sunset, enhanced mountain clarity, water reflection sharpening, atmospheric haze removal.',
    tags: ['Landscape', 'Sky Replace', 'Cinematic'],
    aspectRatio: '16/9',
  },
  {
    title: 'Family Memory Restoration',
    beforeImageSrc: '/images/before-4.jpg',
    afterImageSrc: '/images/after-4.jpg',
    editPrompt:
      'Vintage photo restoration, scratch and damage repair, color revival from faded tones, paper texture cleanup, contrast balance while preserving period character.',
    tags: ['Restoration', 'Color Revival', 'Repair'],
    aspectRatio: '4/3',
  },
];

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top bottom-=10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Card animations
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-cream)' }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <p
            className="font-body text-xs uppercase mb-4"
            style={{
              color: 'var(--ink)',
              letterSpacing: '0.12em',
              opacity: 0.5,
            }}
          >
            Selected Work
          </p>
          <h2
            className="font-display italic text-3xl md:text-4xl lg:text-5xl font-light"
            style={{
              color: 'var(--ink)',
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
            }}
          >
            Before &amp; After
          </h2>
          <p
            className="font-display text-base md:text-lg mt-4 max-w-md"
            style={{
              color: 'var(--ink)',
              opacity: 0.6,
              letterSpacing: '0.01em',
              lineHeight: 1.6,
            }}
          >
            Drag the slider to reveal the transformation. Each edit is crafted
            with attention to detail and respect for the original moment.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <BeforeAfterCard {...project} />
            </div>
          ))}
        </div>
      </div>

      {/* Section divider */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px"
        style={{ backgroundColor: 'var(--blossom-pink)', opacity: 0.5 }}
      />
    </section>
  );
};

export default Gallery;
