import React, { useEffect, useRef } from 'react';
import { MtFuji, PaperFan } from '../components/SvgMotifs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  'Photo Retouching',
  'Color Grading',
  'Composite Editing',
  'Restoration',
  'Skin Retouching',
  'Background Removal',
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const decor1Ref = useRef<HTMLDivElement>(null);
  const decor2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom-=15%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Text reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top bottom-=10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Decorative parallax
      if (decor1Ref.current) {
        gsap.to(decor1Ref.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      if (decor2Ref.current) {
        gsap.to(decor2Ref.current, {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-cream)' }}
    >
      {/* Decorative elements */}
      <div
        ref={decor1Ref}
        className="absolute top-20 -left-8 w-32 md:w-48 pointer-events-none"
        style={{ opacity: 0.1 }}
      >
        <MtFuji className="w-full h-auto" />
      </div>
      <div
        ref={decor2Ref}
        className="absolute bottom-20 right-8 w-24 md:w-36 pointer-events-none"
        style={{ opacity: 0.1 }}
      >
        <PaperFan className="w-full h-auto" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Portrait Image */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4" ref={imageRef}>
            <div className="relative">
              <div
                className="aspect-[3/4] overflow-hidden rounded-sm"
                style={{ backgroundColor: 'var(--fan-tan)' }}
              >
                <img
                  src="/images/portrait.jpg"
                  alt="Emily Lee - Photo Editor and Visual Artist"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Subtle corner accent */}
              <div
                className="absolute -bottom-3 -right-3 w-16 h-16 -z-10 rounded-sm"
                style={{ backgroundColor: 'var(--blossom-pink)', opacity: 0.3 }}
              />
            </div>
          </div>

          {/* Bio Content */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6" ref={textRef}>
            <p
              className="font-body text-xs uppercase mb-4"
              style={{
                color: 'var(--ink)',
                letterSpacing: '0.12em',
                opacity: 0.5,
              }}
            >
              About Me
            </p>
            <h2
              className="font-display italic text-3xl md:text-4xl lg:text-5xl font-light mb-8"
              style={{
                color: 'var(--ink)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Crafting visual stories
              <br />
              with quiet precision
            </h2>

            <div className="space-y-4 mb-10 max-w-lg">
              <p
                className="font-display text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--ink)', letterSpacing: '0.01em', lineHeight: 1.7 }}
              >
                I'm Emily, a photo editor and visual artist based in the Pacific Northwest.
                My work lives at the intersection of technical precision and soft, emotional
                storytelling. I believe every image has a soul worth revealing.
              </p>
              <p
                className="font-display text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--ink)', letterSpacing: '0.01em', lineHeight: 1.7 }}
              >
                With over 5 years of experience in portrait retouching, color grading, and
                digital restoration, I approach each project as a collaboration—listening to
                what the image wants to become, then bringing it forward with care.
              </p>
              <p
                className="font-display text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--ink)', letterSpacing: '0.01em', lineHeight: 1.7 }}
              >
                When I'm not editing, you'll find me wandering botanical gardens with a
                film camera, collecting vintage photography books, or practicing origami.
              </p>
            </div>

            {/* Specialty Tags */}
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="font-body text-xs px-4 py-2 rounded-full border transition-all duration-300 hover:opacity-80"
                  style={{
                    borderColor: 'rgba(84, 78, 66, 0.25)',
                    color: 'var(--ink)',
                    letterSpacing: '0.04em',
                    backgroundColor: 'transparent',
                  }}
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
