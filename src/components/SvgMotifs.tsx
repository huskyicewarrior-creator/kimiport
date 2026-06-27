import React from 'react';

export const CherryBlossomBranch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g stroke="#544E42" strokeWidth="1" fill="none">
      {/* Main branch */}
      <path d="M100 300 Q 105 250 100 200 Q 95 150 100 100 Q 105 50 100 0" />
      {/* Sub-branches */}
      <path d="M100 250 Q 130 230 150 220" />
      <path d="M100 200 Q 70 180 50 170" />
      <path d="M100 150 Q 130 130 145 120" />
      <path d="M100 100 Q 75 85 60 75" />
      <path d="M100 60 Q 125 45 135 35" />
      {/* Blossoms - 5-petal flowers */}
      <g>
        <ellipse cx="150" cy="220" rx="6" ry="4" transform="rotate(0 150 220)" />
        <ellipse cx="150" cy="220" rx="6" ry="4" transform="rotate(72 150 220)" />
        <ellipse cx="150" cy="220" rx="6" ry="4" transform="rotate(144 150 220)" />
        <ellipse cx="150" cy="220" rx="6" ry="4" transform="rotate(216 150 220)" />
        <ellipse cx="150" cy="220" rx="6" ry="4" transform="rotate(288 150 220)" />
        <circle cx="150" cy="220" r="1.5" fill="#544E42" />
      </g>
      <g>
        <ellipse cx="50" cy="170" rx="5" ry="3.5" transform="rotate(15 50 170)" />
        <ellipse cx="50" cy="170" rx="5" ry="3.5" transform="rotate(87 50 170)" />
        <ellipse cx="50" cy="170" rx="5" ry="3.5" transform="rotate(159 50 170)" />
        <ellipse cx="50" cy="170" rx="5" ry="3.5" transform="rotate(231 50 170)" />
        <ellipse cx="50" cy="170" rx="5" ry="3.5" transform="rotate(303 50 170)" />
        <circle cx="50" cy="170" r="1.2" fill="#544E42" />
      </g>
      <g>
        <ellipse cx="145" cy="120" rx="5.5" ry="3.8" transform="rotate(30 145 120)" />
        <ellipse cx="145" cy="120" rx="5.5" ry="3.8" transform="rotate(102 145 120)" />
        <ellipse cx="145" cy="120" rx="5.5" ry="3.8" transform="rotate(174 145 120)" />
        <ellipse cx="145" cy="120" rx="5.5" ry="3.8" transform="rotate(246 145 120)" />
        <ellipse cx="145" cy="120" rx="5.5" ry="3.8" transform="rotate(318 145 120)" />
        <circle cx="145" cy="120" r="1.3" fill="#544E42" />
      </g>
      <g>
        <ellipse cx="60" cy="75" rx="4.5" ry="3" transform="rotate(45 60 75)" />
        <ellipse cx="60" cy="75" rx="4.5" ry="3" transform="rotate(117 60 75)" />
        <ellipse cx="60" cy="75" rx="4.5" ry="3" transform="rotate(189 60 75)" />
        <ellipse cx="60" cy="75" rx="4.5" ry="3" transform="rotate(261 60 75)" />
        <ellipse cx="60" cy="75" rx="4.5" ry="3" transform="rotate(333 60 75)" />
        <circle cx="60" cy="75" r="1" fill="#544E42" />
      </g>
      <g>
        <ellipse cx="135" cy="35" rx="4" ry="2.8" transform="rotate(10 135 35)" />
        <ellipse cx="135" cy="35" rx="4" ry="2.8" transform="rotate(82 135 35)" />
        <ellipse cx="135" cy="35" rx="4" ry="2.8" transform="rotate(154 135 35)" />
        <ellipse cx="135" cy="35" rx="4" ry="2.8" transform="rotate(226 135 35)" />
        <ellipse cx="135" cy="35" rx="4" ry="2.8" transform="rotate(298 135 35)" />
        <circle cx="135" cy="35" r="1" fill="#544E42" />
      </g>
      {/* Small buds */}
      <circle cx="155" cy="215" r="2" fill="#544E42" />
      <circle cx="45" cy="175" r="1.8" fill="#544E42" />
      <circle cx="140" cy="115" r="2" fill="#544E42" />
      <circle cx="55" cy="80" r="1.5" fill="#544E42" />
    </g>
  </svg>
);

export const MtFuji: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g stroke="#544E42" strokeWidth="1" fill="none">
      {/* Mountain base */}
      <path d="M10 130 Q 50 80 100 20 Q 150 80 190 130" />
      {/* Snow cap */}
      <path d="M65 65 Q 82 42 100 20 Q 118 42 135 65" strokeDasharray="2 1" />
      {/* Snow line detail */}
      <path d="M75 55 Q 87 38 100 20" strokeDasharray="1.5 2" />
      <path d="M125 55 Q 113 38 100 20" strokeDasharray="1.5 2" />
      {/* Small cloud */}
      <path d="M130 35 Q 140 25 150 35 Q 160 25 170 35" strokeWidth="0.8" />
      {/* Ground line */}
      <line x1="0" y1="130" x2="200" y2="130" strokeWidth="0.5" />
    </g>
  </svg>
);

export const PaperFan: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 140 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g stroke="#544E42" strokeWidth="1" fill="none">
      {/* Fan arc - top */}
      <path d="M20 60 Q 70 10 120 60" />
      {/* Fan ribs */}
      <line x1="70" y1="60" x2="20" y2="60" />
      <line x1="70" y1="60" x2="32" y2="30" />
      <line x1="70" y1="60" x2="52" y2="18" />
      <line x1="70" y1="60" x2="70" y2="14" />
      <line x1="70" y1="60" x2="88" y2="18" />
      <line x1="70" y1="60" x2="108" y2="30" />
      <line x1="70" y1="60" x2="120" y2="60" />
      {/* Fan bottom fold lines */}
      <path d="M20 60 Q 15 75 35 85" />
      <path d="M120 60 Q 125 75 105 85" />
      <line x1="35" y1="85" x2="105" y2="85" />
      {/* Center pivot */}
      <circle cx="70" cy="60" r="2.5" />
      {/* Decorative detail on fan */}
      <circle cx="70" cy="38" r="6" strokeWidth="0.6" />
      <path d="M65 38 Q 70 32 75 38" strokeWidth="0.6" />
    </g>
  </svg>
);

export const CraneOrigami: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 120 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <g stroke="#544E42" strokeWidth="1" fill="none">
      {/* Body */}
      <path d="M60 35 L 75 60 L 60 55 L 45 60 Z" />
      {/* Head and neck */}
      <path d="M60 35 L 50 20 L 55 18" />
      <circle cx="54" cy="17" r="1.5" fill="#544E42" />
      {/* Left wing */}
      <path d="M60 35 L 25 30 L 45 60" />
      <path d="M25 30 L 35 50 L 45 60" strokeWidth="0.6" />
      {/* Right wing */}
      <path d="M60 35 L 95 30 L 75 60" />
      <path d="M95 30 L 85 50 L 75 60" strokeWidth="0.6" />
      {/* Tail */}
      <path d="M60 55 L 50 80 L 60 70 L 70 80 Z" />
      {/* Fold lines */}
      <line x1="60" y1="35" x2="60" y2="70" strokeWidth="0.5" />
    </g>
  </svg>
);
