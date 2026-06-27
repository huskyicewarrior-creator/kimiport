import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceTier {
  name: string;
  description: string;
  price: string;
  features: string[];
}

const services: ServiceTier[] = [
  {
    name: 'Single Edit',
    description:
      'One high-resolution image. Perfect for profile pictures or treasured memories.',
    price: '$25',
    features: ['1 high-res image', 'Skin retouching', 'Color correction', '2 revisions'],
  },
  {
    name: 'Batch Collection',
    description:
      'Up to 10 images. Unified color grading and subtle retouching for a cohesive set.',
    price: '$150',
    features: [
      'Up to 10 images',
      'Unified color grade',
      'Batch retouching',
      '3 revisions',
      'Priority turnaround',
    ],
  },
  {
    name: 'Custom Art',
    description:
      'Hand-painted digital overlays, mixed media, or restoration. Each piece is unique.',
    price: 'Custom',
    features: [
      'Digital painting',
      'Photo restoration',
      'Mixed media art',
      'Unlimited revisions',
      'Full resolution + print file',
    ],
  },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=5%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-cream)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {/* Section Header */}
          <div className="col-span-12 md:col-span-4" ref={headerRef}>
            <p
              className="font-body text-xs uppercase mb-4"
              style={{
                color: 'var(--ink)',
                letterSpacing: '0.12em',
                opacity: 0.5,
              }}
            >
              Services
            </p>
            <h2
              className="font-display italic text-3xl md:text-4xl lg:text-5xl font-light mb-6"
              style={{
                color: 'var(--ink)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              Simple,
              <br />
              honest pricing
            </h2>
            <p
              className="font-display text-base leading-relaxed"
              style={{
                color: 'var(--ink)',
                opacity: 0.6,
                letterSpacing: '0.01em',
                lineHeight: 1.6,
              }}
            >
              Every project begins with a conversation. These packages are starting
              points—we'll tailor the scope to your needs.
            </p>
          </div>

          {/* Service Cards */}
          <div className="col-span-12 md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, index) => (
                <div
                  key={service.name}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="group flex flex-col p-6 rounded-sm transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'var(--fan-tan)',
                    border: '1px solid rgba(84, 78, 66, 0.2)',
                  }}
                >
                  <div className="mb-4">
                    <h3
                      className="font-display text-xl italic font-normal mb-2"
                      style={{ color: 'var(--ink)' }}
                    >
                      {service.name}
                    </h3>
                    <p
                      className="font-body text-xs leading-relaxed"
                      style={{
                        color: 'var(--ink)',
                        opacity: 0.6,
                        lineHeight: 1.5,
                      }}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div className="mb-5">
                    <span
                      className="font-display text-3xl italic font-light"
                      style={{ color: 'var(--ink)' }}
                    >
                      {service.price}
                    </span>
                  </div>

                  <ul className="flex-1 space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="font-body text-xs flex items-center gap-2"
                        style={{ color: 'var(--ink)', opacity: 0.7 }}
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'var(--blossom-pink)' }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    onClick={scrollToContact}
                    className="inline-block font-body text-sm transition-all duration-300 group-hover:opacity-80"
                    style={{
                      color: 'var(--flag-red)',
                      letterSpacing: '0.04em',
                      textDecoration: 'underline',
                      textUnderlineOffset: '4px',
                      textDecorationThickness: '1px',
                      textDecorationColor: 'var(--flag-red)',
                    }}
                  >
                    Request
                  </a>
                </div>
              ))}
            </div>
          </div>
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

export default Services;
