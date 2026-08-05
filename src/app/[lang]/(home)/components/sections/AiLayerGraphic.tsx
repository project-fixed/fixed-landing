'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AiLayerGraphicProps {
  level: string;
}

export const AiLayerGraphic: React.FC<AiLayerGraphicProps> = ({ level }) => {
  switch (level) {
    case '1':
      return (
        <svg className="h-full w-full" viewBox="0 0 200 200" fill="none">
          {/* Tech Center Crosshair */}
          <line
            x1="94"
            y1="100"
            x2="106"
            y2="100"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
          <line
            x1="100"
            y1="94"
            x2="100"
            y2="106"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />

          {/* Concentric Technical Rings */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="var(--color-primary)"
            strokeWidth="0.6"
            strokeOpacity="0.1"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="var(--color-primary)"
            strokeWidth="0.6"
            strokeOpacity="0.15"
          />

          {/* Outer rotating dashed circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="var(--color-primary-light)"
            strokeWidth="1"
            strokeDasharray="4 4"
            strokeOpacity="0.25"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          {/* Rotating orbits */}
          <motion.ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="24"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity="0.4"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.ellipse
            cx="100"
            cy="100"
            rx="24"
            ry="80"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity="0.4"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />

          {/* Core Sphere contour */}
          <circle
            cx="100"
            cy="100"
            r="45"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity="0.2"
          />

          {/* Floating/blinking data nodes */}
          <motion.circle
            cx="65"
            cy="75"
            r="4"
            fill="var(--color-primary-light)"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.circle
            cx="135"
            cy="125"
            r="3"
            fill="var(--color-primary-light)"
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.8 }}
          />
          <motion.circle
            cx="100"
            cy="45"
            r="4"
            fill="var(--color-primary-light)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.9, repeat: Infinity, delay: 1.2 }}
          />
          <motion.circle
            cx="100"
            cy="155"
            r="3"
            fill="var(--color-primary)"
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
      );

    case '2':
      return (
        <svg className="h-full w-full" viewBox="0 0 200 200" fill="none">
          {/* Reference/historical trajectory using clean straight lines */}
          <path
            d="M 0 160 L 40 135 L 80 145 L 120 100 L 160 115 L 200 65"
            stroke="var(--color-primary)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity="0.2"
          />

          {/* Active performance graph line (reduced opacity so it is subtle and doesn't overpower) */}
          <motion.path
            d="M 0 150 L 40 120 L 80 130 L 120 85 L 160 100 L 200 45"
            stroke="var(--color-primary-light)"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          {/* Interactive nodes aligned to active path vertices */}
          <circle
            cx="40"
            cy="120"
            r="3"
            fill="var(--color-primary)"
            opacity="0.5"
          />
          <circle
            cx="80"
            cy="130"
            r="3"
            fill="var(--color-primary)"
            opacity="0.5"
          />
          <circle cx="120" cy="85" r="3.5" fill="var(--color-primary)" />
          <circle
            cx="200"
            cy="45"
            r="3"
            fill="var(--color-primary)"
            opacity="0.5"
          />

          {/* Dynamic locked node */}
          <motion.circle
            cx="160"
            cy="100"
            r="4.5"
            fill="var(--color-primary-light)"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="160"
            cy="100"
            r="9"
            stroke="var(--color-primary-light)"
            strokeWidth="0.8"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      );

    case '3':
      return (
        <svg className="h-full w-full" viewBox="0 0 200 200" fill="none">
          {/* Infinite Perspective Lines */}
          <g
            stroke="var(--color-primary)"
            strokeWidth="0.5"
            strokeOpacity="0.12"
          >
            <line x1="0" y1="0" x2="100" y2="100" />
            <line x1="200" y1="0" x2="100" y2="100" />
            <line x1="0" y1="200" x2="100" y2="100" />
            <line x1="200" y1="200" x2="100" y2="100" />
          </g>

          {/* Connections vertical lines - adjusted coordinates for centered translations */}
          <g
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            strokeOpacity="0.4"
          >
            <path d="M 100 65 L 100 100" />
            <path d="M 100 100 L 100 135" />
            <path d="M 65 47.5 L 65 82.5" />
            <path d="M 65 82.5 L 65 117.5" />
            <path d="M 135 47.5 L 135 82.5" />
            <path d="M 135 82.5 L 135 117.5" />
          </g>

          {/* Layer 1 (Bottom) - Translated to y=70 for centering */}
          <g transform="translate(0, 70)">
            <polygon
              points="100,30 170,65 100,100 30,65"
              stroke="var(--color-primary)"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />
            <circle
              cx="100"
              cy="65"
              r="2"
              fill="var(--color-primary)"
              opacity="0.4"
            />
            <circle
              cx="65"
              cy="47.5"
              r="1.5"
              fill="var(--color-primary)"
              opacity="0.4"
            />
            <circle
              cx="135"
              cy="47.5"
              r="1.5"
              fill="var(--color-primary)"
              opacity="0.4"
            />
            <circle
              cx="65"
              cy="82.5"
              r="1.5"
              fill="var(--color-primary)"
              opacity="0.4"
            />
            <circle
              cx="135"
              cy="82.5"
              r="1.5"
              fill="var(--color-primary)"
              opacity="0.4"
            />
          </g>

          {/* Layer 2 (Middle) - Translated to y=35 for centering */}
          <g transform="translate(0, 35)">
            <polygon
              points="100,30 170,65 100,100 30,65"
              stroke="var(--color-primary)"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <circle cx="100" cy="65" r="3" fill="var(--color-primary)" />
            <circle
              cx="65"
              cy="47.5"
              r="2"
              fill="var(--color-primary)"
              opacity="0.6"
            />
            <circle
              cx="135"
              cy="47.5"
              r="2"
              fill="var(--color-primary)"
              opacity="0.6"
            />
            <circle
              cx="65"
              cy="82.5"
              r="2"
              fill="var(--color-primary)"
              opacity="0.6"
            />
            <circle
              cx="135"
              cy="82.5"
              r="2"
              fill="var(--color-primary)"
              opacity="0.6"
            />
          </g>

          {/* Layer 3 (Top) - Translated to y=0 for centering */}
          <g transform="translate(0, 0)">
            <polygon
              points="100,30 170,65 100,100 30,65"
              stroke="var(--color-primary-light)"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
            <motion.circle
              cx="100"
              cy="65"
              r="4.5"
              fill="var(--color-primary-light)"
              animate={{
                fill: [
                  'var(--color-primary-light)',
                  'var(--color-primary)',
                  'var(--color-primary-light)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <circle
              cx="65"
              cy="47.5"
              r="2.5"
              fill="var(--color-primary-light)"
            />
            <circle
              cx="135"
              cy="47.5"
              r="2.5"
              fill="var(--color-primary-light)"
            />
            <circle
              cx="65"
              cy="82.5"
              r="2.5"
              fill="var(--color-primary-light)"
            />
            <circle
              cx="135"
              cy="82.5"
              r="2.5"
              fill="var(--color-primary-light)"
            />
          </g>
        </svg>
      );

    case '4':
      return (
        <svg className="h-full w-full" viewBox="0 0 200 200" fill="none">
          {/* Corner tick marks replacing solid bounding box */}
          <path
            d="M 20 35 L 20 20 L 35 20"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
          <path
            d="M 180 35 L 180 20 L 165 20"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
          <path
            d="M 20 165 L 20 180 L 35 180"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
          <path
            d="M 180 165 L 180 180 L 165 180"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* Tech Center Crosshair */}
          <line
            x1="94"
            y1="100"
            x2="106"
            y2="100"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
          <line
            x1="100"
            y1="94"
            x2="100"
            y2="106"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />

          {/* Radar Outer Axis Ticks */}
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="35"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
          <line
            x1="100"
            y1="165"
            x2="100"
            y2="180"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
          <line
            x1="20"
            y1="100"
            x2="35"
            y2="100"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
          <line
            x1="165"
            y1="100"
            x2="180"
            y2="100"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />

          {/* Animated concentric circles - larger radar radius */}
          <motion.circle
            cx="100"
            cy="100"
            r="85"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.12"
            strokeDasharray="4 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="55"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity="0.25"
            animate={{ scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="30"
            stroke="var(--color-primary-light)"
            strokeWidth="1"
            strokeOpacity="0.5"
            animate={{ scale: [1.04, 0.96, 1.04] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Success target locking on the edge */}
          <motion.circle
            cx="140"
            cy="60"
            r="5.5"
            fill="var(--color-status-success)"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle
            cx="140"
            cy="60"
            r="12"
            stroke="var(--color-status-success)"
            strokeWidth="0.8"
            strokeOpacity="0.5"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Grid lines centering on success target */}
          <line
            x1="140"
            y1="35"
            x2="140"
            y2="85"
            stroke="var(--color-status-success)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <line
            x1="115"
            y1="60"
            x2="165"
            y2="60"
            stroke="var(--color-status-success)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
        </svg>
      );

    default:
      return null;
  }
};
