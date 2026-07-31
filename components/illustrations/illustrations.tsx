import React from "react";

/**
 * Custom SVG Food & Abstract Vector Artwork Component
 * High-performance, lightweight inline SVG graphics combined with geometric line art.
 */

export const FoodIllustrations = {
  // Gourmet Food Bowl with Abstract Accents
  FoodBowl: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Background Abstract Geometric Accent */}
      <circle cx="140" cy="140" r="110" fill="#00bb95" fillOpacity="0.08" />
      <path
        d="M30 140C30 79.2487 79.2487 30 140 30C200.751 30 250 79.2487 250 140"
        stroke="#00bb95"
        strokeWidth="2"
        strokeDasharray="6 6"
        strokeOpacity="0.3"
      />

      {/* Steam Accent Lines */}
      <path
        d="M100 80C100 65 110 60 110 45"
        stroke="#00bb95"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M140 75C140 60 150 55 150 40"
        stroke="#00bb95"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M180 80C180 65 190 60 190 45"
        stroke="#00bb95"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Main Bowl Outer Shell */}
      <path
        d="M50 140C50 189.706 90.2944 230 140 230C189.706 230 230 189.706 230 140H50Z"
        fill="#ffffff"
      />
      <path
        d="M50 140C50 189.706 90.2944 230 140 230C189.706 230 230 189.706 230 140H50Z"
        stroke="#171717"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Bowl Rim */}
      <ellipse
        cx="140"
        cy="140"
        rx="90"
        ry="20"
        fill="#f5f5f5"
        stroke="#171717"
        strokeWidth="4"
      />

      {/* Food Layer / Garnish Artwork */}
      <circle cx="110" cy="135" r="16" fill="#00bb95" />
      <circle cx="145" cy="130" r="18" fill="#f98500" />
      <circle cx="175" cy="138" r="14" fill="#00bb95" fillOpacity="0.7" />

      {/* Cutlery / Chopsticks Line Art */}
      <path
        d="M70 100L170 180"
        stroke="#171717"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M85 90L185 170"
        stroke="#171717"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),

  // Burger & Sides Abstract Graphic
  Burger: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="260"
      height="260"
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Background Decorative Rings */}
      <circle cx="130" cy="130" r="100" fill="#f5f5f5" />
      <circle cx="130" cy="130" r="115" stroke="#00bb95" strokeWidth="1.5" strokeDasharray="8 8" />

      {/* Top Bun */}
      <path
        d="M60 120C60 80 90 60 130 60C170 60 200 80 200 120H60Z"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Sesame Seeds */}
      <circle cx="100" cy="85" r="3" fill="#00bb95" />
      <circle cx="130" cy="78" r="3" fill="#00bb95" />
      <circle cx="160" cy="88" r="3" fill="#00bb95" />

      {/* Lettuce Layer */}
      <path
        d="M55 125C65 120 75 130 85 125C95 120 105 130 115 125C125 120 135 130 145 125C155 120 165 130 175 125C185 120 195 130 205 125"
        stroke="#00bb95"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Meat Patty */}
      <rect x="55" y="135" width="150" height="20" rx="10" fill="#171717" />

      {/* Cheese Melt Layer */}
      <path d="M65 155L195 155L180 170L150 155L120 175L90 155Z" fill="#f98500" />

      {/* Bottom Bun */}
      <rect
        x="60"
        y="170"
        width="140"
        height="25"
        rx="12.5"
        fill="#ffffff"
        stroke="#171717"
        strokeWidth="4"
      />
    </svg>
  ),

  // QR Code Scanning Abstract Vector Graphic
  ScanQR: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="260"
      height="260"
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="40" y="40" width="180" height="180" rx="24" fill="#ffffff" />

      {/* Target Scanning Corners */}
      <path d="M40 70V40H70" stroke="#00bb95" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M190 40H220V70" stroke="#00bb95" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M220 190V220H190" stroke="#00bb95" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 220H40V190" stroke="#00bb95" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Center QR Blocks */}
      <rect x="70" y="70" width="40" height="40" rx="6" fill="#171717" />
      <rect x="150" y="70" width="40" height="40" rx="6" fill="#171717" />
      <rect x="70" y="150" width="40" height="40" rx="6" fill="#171717" />

      <rect x="82" y="82" width="16" height="16" fill="#00bb95" />
      <rect x="162" y="82" width="16" height="16" fill="#00bb95" />
      <rect x="82" y="162" width="16" height="16" fill="#00bb95" />

      <rect x="135" y="135" width="25" height="25" rx="4" fill="#171717" />
      <rect x="165" y="165" width="25" height="25" rx="4" fill="#00bb95" />

      {/* Laser Scan Line */}
      <line x1="30" y1="130" x2="230" y2="130" stroke="#00bb95" strokeWidth="3" strokeDasharray="4 4" />
    </svg>
  ),

  // Modern Restaurant Storefront Vector Illustration
  Storefront: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="340"
      height="340"
      viewBox="0 0 340 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Soft Ambient Backdrop Circle */}
      <circle cx="170" cy="170" r="140" fill="#e6f8f4" fillOpacity="0.6" />
      <circle cx="170" cy="170" r="155" stroke="#00bb95" strokeWidth="1.5" strokeDasharray="6 6" strokeOpacity="0.4" />

      {/* Main Building Base Frame */}
      <rect x="60" y="110" width="220" height="180" rx="16" fill="#ffffff" stroke="#171717" strokeWidth="4" />

      {/* Restaurant Roof Awning Canopy */}
      <path d="M50 110 H290 L280 80 H60 Z" fill="#00bb95" stroke="#171717" strokeWidth="4" strokeLinejoin="round" />
      <path d="M50 110 Q65 130 80 110 Q95 130 110 110 Q125 130 140 110 Q155 130 170 110 Q185 130 200 110 Q215 130 230 110 Q245 130 260 110 Q275 130 290 110" fill="#00a886" stroke="#171717" strokeWidth="3" />

      {/* Entrance Door */}
      <rect x="140" y="180" width="60" height="110" rx="4" fill="#f5f5f5" stroke="#171717" strokeWidth="3" />
      <circle cx="188" cy="235" r="4" fill="#00bb95" />
      <line x1="140" y1="180" x2="200" y2="180" stroke="#00bb95" strokeWidth="4" />

      {/* Dining Window & Table Scene */}
      <rect x="80" y="140" width="45" height="60" rx="6" fill="#e6f8f4" stroke="#171717" strokeWidth="3" />
      <path d="M85 180H120" stroke="#171717" strokeWidth="3" />
      <circle cx="102" cy="165" r="8" fill="#f98500" />

      {/* OPEN Sign */}
      <rect x="220" y="140" width="40" height="25" rx="4" fill="#00bb95" />
      <text x="226" y="157" fill="#ffffff" fontSize="10" fontWeight="800" fontFamily="sans-serif">OPEN</text>

      {/* Outdoor Table QR Stand */}
      <rect x="225" y="220" width="30" height="40" rx="4" fill="#ffffff" stroke="#171717" strokeWidth="3" />
      <rect x="233" y="228" width="14" height="14" rx="2" fill="#00bb95" />
      <line x1="240" y1="260" x2="240" y2="290" stroke="#171717" strokeWidth="4" />
      <line x1="230" y1="290" x2="250" y2="290" stroke="#171717" strokeWidth="4" strokeLinecap="round" />

      {/* Decorative Potted Plant */}
      <path d="M70 270L80 290H60L70 270Z" fill="#f98500" />
      <circle cx="70" cy="260" r="10" fill="#00bb95" />
      <circle cx="62" cy="264" r="8" fill="#00a886" />
    </svg>
  ),

  // Unique Geometric Background 1: Storefront Section (Radial Orbits, Sunburst Rays & Floating Pods)
  StorefrontGeometricBg: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="950" cy="250" r="240" stroke="#00bb95" strokeWidth="2.5" strokeOpacity="0.25" strokeDasharray="10 10" />
      <circle cx="950" cy="250" r="160" fill="#00bb95" fillOpacity="0.06" stroke="#00bb95" strokeWidth="2" strokeOpacity="0.2" />
      <circle cx="950" cy="250" r="80" stroke="#00bb95" strokeWidth="3" strokeOpacity="0.3" strokeDasharray="6 6" />
      
      {/* Sunburst Radial Ray Lines */}
      <path d="M950 10L950 0M950 490L950 500M710 250L680 250M1190 250L1220 250" stroke="#00bb95" strokeWidth="4" strokeOpacity="0.3" strokeLinecap="round" />
      <path d="M780 80L760 60M1120 420L1140 440M780 420L760 440M1120 80L1140 60" stroke="#00bb95" strokeWidth="3" strokeOpacity="0.25" strokeLinecap="round" />

      {/* Floating Geometric Pods & Curved Accent Waves */}
      <rect x="120" y="60" width="50" height="50" rx="14" transform="rotate(25 120 60)" fill="#00bb95" fillOpacity="0.12" stroke="#00bb95" strokeWidth="2" strokeOpacity="0.2" />
      <rect x="250" y="360" width="36" height="36" rx="10" transform="rotate(-15 250 360)" fill="#f98500" fillOpacity="0.15" stroke="#f98500" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M50 400 C 150 300, 250 480, 400 380 S 550 300, 700 400" stroke="#00bb95" strokeWidth="3.5" strokeOpacity="0.2" strokeDasharray="8 8" />
    </svg>
  ),

  // Unique Geometric Background 2: Diner Section (Diagonal Waves, Staggered Dot Matrices & Spirals)
  DinerGeometricBg: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Staggered Dot Matrix */}
      <g fill="#00bb95" fillOpacity="0.2">
        <circle cx="80" cy="80" r="4" />
        <circle cx="120" cy="80" r="4" />
        <circle cx="160" cy="80" r="4" />
        <circle cx="80" cy="120" r="4" />
        <circle cx="120" cy="120" r="4" />
        <circle cx="160" cy="120" r="4" />
        <circle cx="80" cy="160" r="4" />
        <circle cx="120" cy="160" r="4" />
        <circle cx="160" cy="160" r="4" />
      </g>

      {/* Dynamic Flow Waves */}
      <path d="M-50 80 Q 300 450 600 180 T 1250 320" stroke="#00bb95" strokeWidth="4.5" strokeOpacity="0.22" strokeLinecap="round" />
      <path d="M-50 130 Q 300 500 600 230 T 1250 370" stroke="#00bb95" strokeWidth="2.5" strokeOpacity="0.15" strokeDasharray="12 12" />

      {/* Geometric Diamonds & Rings */}
      <polygon points="1050,60 1090,110 1050,160 1010,110" fill="#00bb95" fillOpacity="0.12" stroke="#00bb95" strokeWidth="2" strokeOpacity="0.25" />
      <circle cx="220" cy="380" r="55" stroke="#f98500" strokeWidth="3" strokeOpacity="0.25" strokeDasharray="6 6" />
      <circle cx="220" cy="380" r="25" fill="#f98500" fillOpacity="0.08" />
    </svg>
  ),

  // Unique Geometric Background 3: Footer Section (Concentric Orbits, Radial Starbursts & Geometric Wave Lines)
  FooterGeometricBg: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Radial Orbits */}
      <circle cx="100" cy="200" r="180" stroke="#00bb95" strokeWidth="2" strokeOpacity="0.15" strokeDasharray="8 8" />
      <circle cx="100" cy="200" r="100" stroke="#00bb95" strokeWidth="3" strokeOpacity="0.2" />

      {/* Floating Pods & Diamonds */}
      <rect x="500" y="40" width="36" height="36" rx="10" transform="rotate(45 500 40)" fill="#00bb95" fillOpacity="0.12" stroke="#00bb95" strokeWidth="2" opacity="0.4" />
      <rect x="750" y="280" width="45" height="45" rx="14" transform="rotate(-20 750 280)" fill="#f98500" fillOpacity="0.1" stroke="#f98500" strokeWidth="2" opacity="0.3" />

      {/* Bottom Wave Lines & Dot Matrix */}
      <path d="M 200 350 Q 600 100 1150 250" stroke="#00bb95" strokeWidth="3.5" strokeOpacity="0.18" strokeLinecap="round" />
      <path d="M 250 380 Q 650 130 1200 280" stroke="#00bb95" strokeWidth="2" strokeOpacity="0.12" strokeDasharray="10 10" />

      {/* Right Corner Accent Ring */}
      <circle cx="1100" cy="80" r="120" stroke="#00bb95" strokeWidth="2" strokeOpacity="0.15" strokeDasharray="6 6" />
    </svg>
  ),

  // Abstract Geometric Food & Restaurant Curve Background
  HeroAbstractCurves: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M-100 200C150 100 350 350 600 250C850 150 1050 300 1300 200"
        stroke="#00bb95"
        strokeWidth="3"
        strokeOpacity="0.12"
        strokeDasharray="12 12"
      />
      <path
        d="M-50 350C200 450 450 200 700 350C950 500 1150 250 1350 400"
        stroke="#00bb95"
        strokeWidth="2"
        strokeOpacity="0.08"
      />
      <circle cx="150" cy="120" r="8" fill="#00bb95" fillOpacity="0.2" />
      <circle cx="950" cy="420" r="12" fill="#f98500" fillOpacity="0.2" />
      <path
        d="M800 80C850 60 900 100 950 70"
        stroke="#00bb95"
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.2"
      />
    </svg>
  ),
};
