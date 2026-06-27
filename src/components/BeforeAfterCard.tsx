import React, { useRef, useState, useCallback, useEffect } from 'react';

export interface BeforeAfterCardProps {
  title: string;
  beforeImageSrc: string;
  afterImageSrc: string;
  editPrompt: string;
  tags: string[];
  aspectRatio?: string;
}

const BeforeAfterCard: React.FC<BeforeAfterCardProps> = ({
  title,
  beforeImageSrc,
  afterImageSrc,
  editPrompt,
  tags,
  aspectRatio = '4/3',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const getPercentage = useCallback(
    (clientX: number): number => {
      const container = containerRef.current;
      if (!container) return 50;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      return Math.max(0, Math.min(100, (x / rect.width) * 100));
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setSliderPos(getPercentage(e.clientX));
    },
    [getPercentage]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setSliderPos(getPercentage(e.clientX));
    },
    [isDragging, getPercentage]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch support
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      const touch = e.touches[0];
      setSliderPos(getPercentage(touch.clientX));
    },
    [getPercentage]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setSliderPos(getPercentage(touch.clientX));
    },
    [isDragging, getPercentage]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSliderPos((prev) => Math.max(0, prev - 2));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSliderPos((prev) => Math.min(100, prev + 2));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setSliderPos(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setSliderPos(100);
      }
    },
    []
  );

  // Click to jump
  const handleContainerClick = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) return;
      setSliderPos(getPercentage(e.clientX));
    },
    [isDragging, getPercentage]
  );

  // Prevent drag on images
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const imgs = container.querySelectorAll('img');
    imgs.forEach((img) => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });
  }, []);

  return (
    <div className="w-full">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className="font-display text-2xl md:text-3xl italic font-light"
          style={{ color: 'var(--ink)' }}
        >
          {title}
        </h3>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: 'rgba(84, 78, 66, 0.25)',
                color: 'var(--ink)',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Before/After Slider */}
      <div
        ref={containerRef}
        className="relative w-full cursor-crosshair select-none overflow-hidden rounded-sm group"
        style={{ aspectRatio }}
        onClick={handleContainerClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label={`Before and after comparison for ${title}. Use arrow keys to move the slider.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPos)}
      >
        {/* After image (full width, always visible) */}
        <img
          src={afterImageSrc}
          alt={`${title} - after editing`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          loading="lazy"
        />

        {/* Before image (clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={beforeImageSrc}
            alt={`${title} - before editing`}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ width: `${100 / (sliderPos / 100 || 0.01)}%` }}
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: `${sliderPos}%`,
            transform: 'translateX(-50%)',
            width: '2px',
            backgroundColor: 'var(--bg-cream)',
            boxShadow: '0 0 8px rgba(84, 78, 66, 0.4)',
            zIndex: 10,
          }}
        >
          {/* Handle Circle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-transform duration-150"
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--bg-cream)',
              border: '2px solid var(--ink)',
              transform: `translate(-50%, -50%) scale(${isDragging ? 1.15 : 1})`,
            }}
          >
            {/* Arrows inside handle */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 4L14 8L10 12"
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 4L2 8L6 12"
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div
          className="absolute top-4 left-4 px-3 py-1 font-body text-xs uppercase tracking-widest rounded-sm transition-opacity duration-300"
          style={{
            backgroundColor: 'rgba(241, 237, 225, 0.9)',
            color: 'var(--ink)',
            opacity: sliderPos > 15 ? 1 : 0,
          }}
        >
          Before
        </div>
        <div
          className="absolute top-4 right-4 px-3 py-1 font-body text-xs uppercase tracking-widest rounded-sm transition-opacity duration-300"
          style={{
            backgroundColor: 'rgba(241, 237, 225, 0.9)',
            color: 'var(--ink)',
            opacity: sliderPos < 85 ? 1 : 0,
          }}
        >
          After
        </div>
      </div>

      {/* Edit Prompt / Process Notes */}
      <div
        className="mt-4 p-5 rounded-sm"
        style={{
          backgroundColor: 'var(--fan-tan)',
          border: '1px solid rgba(84, 78, 66, 0.12)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--blossom-pink)' }}
          />
          <span
            className="font-body text-xs uppercase tracking-widest"
            style={{ color: 'var(--ink)', opacity: 0.6 }}
          >
            Edit Prompt
          </span>
        </div>
        <p
          className="font-display text-base md:text-lg italic leading-relaxed"
          style={{ color: 'var(--ink)' }}
        >
          {editPrompt}
        </p>
      </div>
    </div>
  );
};

export default BeforeAfterCard;
