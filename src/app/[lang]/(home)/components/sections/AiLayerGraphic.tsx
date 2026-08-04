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
        <svg
          className="h-full w-full max-w-[200px]"
          viewBox="0 0 200 200"
          fill="none"
        >
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

          {/* Grid axis lines */}
          <line
            x1="20"
            y1="100"
            x2="180"
            y2="100"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
          <line
            x1="100"
            y1="20"
            x2="100"
            y2="180"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.15"
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
        <svg
          className="h-full w-full max-w-[200px]"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Grid backdrop */}
          <line
            x1="30"
            y1="170"
            x2="170"
            y2="170"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.2"
          />
          <line
            x1="30"
            y1="30"
            x2="30"
            y2="170"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.2"
          />

          {/* Reference/historical trajectory */}
          <path
            d="M 50 145 L 80 115 L 110 125 L 160 70"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.2"
          />

          {/* Current performance graph with animation */}
          <motion.path
            d="M 50 135 L 90 85 L 120 105 L 160 45"
            stroke="var(--color-primary-light)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />

          {/* Interactive nodes */}
          <circle cx="50" cy="135" r="3.5" fill="var(--color-primary)" />
          <circle cx="90" cy="85" r="3.5" fill="var(--color-primary)" />
          <circle cx="120" cy="105" r="3.5" fill="var(--color-primary)" />

          <motion.circle
            cx="160"
            cy="45"
            r="5.5"
            fill="var(--color-primary-light)"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="160"
            cy="45"
            r="11"
            stroke="var(--color-primary-light)"
            strokeWidth="1"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      );

    case '3':
      return (
        <svg
          className="h-full w-full max-w-[200px]"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Connections lines */}
          <g
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            strokeOpacity="0.35"
          >
            <path d="M 100 55 L 100 85" />
            <path d="M 100 85 L 100 115" />
            <path d="M 75 42.5 L 75 72.5" />
            <path d="M 75 72.5 L 75 102.5" />
            <path d="M 125 42.5 L 125 72.5" />
            <path d="M 125 72.5 L 125 102.5" />
          </g>

          {/* Layer 1 (Bottom) */}
          <g transform="translate(0, 40)">
            <polygon
              points="100,50 150,75 100,100 50,75"
              stroke="var(--color-primary)"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />
            <circle
              cx="100"
              cy="75"
              r="2"
              fill="var(--color-primary)"
              opacity="0.4"
            />
            <circle
              cx="75"
              cy="62.5"
              r="1.5"
              fill="var(--color-primary)"
              opacity="0.4"
            />
            <circle
              cx="125"
              cy="62.5"
              r="1.5"
              fill="var(--color-primary)"
              opacity="0.4"
            />
            <circle
              cx="75"
              cy="87.5"
              r="1.5"
              fill="var(--color-primary)"
              opacity="0.4"
            />
            <circle
              cx="125"
              cy="87.5"
              r="1.5"
              fill="var(--color-primary)"
              opacity="0.4"
            />
          </g>

          {/* Layer 2 (Middle) */}
          <g transform="translate(0, 10)">
            <polygon
              points="100,50 150,75 100,100 50,75"
              stroke="var(--color-primary)"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <circle cx="100" cy="75" r="3" fill="var(--color-primary)" />
            <circle
              cx="75"
              cy="62.5"
              r="2"
              fill="var(--color-primary)"
              opacity="0.6"
            />
            <circle
              cx="125"
              cy="62.5"
              r="2"
              fill="var(--color-primary)"
              opacity="0.6"
            />
            <circle
              cx="75"
              cy="87.5"
              r="2"
              fill="var(--color-primary)"
              opacity="0.6"
            />
            <circle
              cx="125"
              cy="87.5"
              r="2"
              fill="var(--color-primary)"
              opacity="0.6"
            />
          </g>

          {/* Layer 3 (Top) */}
          <g transform="translate(0, -20)">
            <polygon
              points="100,50 150,75 100,100 50,75"
              stroke="var(--color-primary-light)"
              strokeWidth="1.2"
              strokeOpacity="0.8"
            />
            <motion.circle
              cx="100"
              cy="75"
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
              cx="75"
              cy="62.5"
              r="2.5"
              fill="var(--color-primary-light)"
            />
            <circle
              cx="125"
              cy="62.5"
              r="2.5"
              fill="var(--color-primary-light)"
            />
            <circle
              cx="75"
              cy="87.5"
              r="2.5"
              fill="var(--color-primary-light)"
            />
            <circle
              cx="125"
              cy="87.5"
              r="2.5"
              fill="var(--color-primary-light)"
            />
          </g>
        </svg>
      );

    case '4':
      return (
        <svg
          className="h-full w-full max-w-[200px]"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Target grid border */}
          <rect
            x="40"
            y="40"
            width="120"
            height="120"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />

          {/* Reticle lines */}
          <line
            x1="100"
            y1="25"
            x2="100"
            y2="175"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.25"
            strokeDasharray="3 3"
          />
          <line
            x1="25"
            y1="100"
            x2="175"
            y2="100"
            stroke="var(--color-primary)"
            strokeWidth="0.8"
            strokeOpacity="0.25"
            strokeDasharray="3 3"
          />

          {/* Animated concentric circles */}
          <motion.circle
            cx="100"
            cy="100"
            r="42"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity="0.3"
            animate={{ scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="100"
            cy="100"
            r="22"
            stroke="var(--color-primary-light)"
            strokeWidth="1"
            strokeOpacity="0.6"
            animate={{ scale: [1.04, 0.96, 1.04] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Success target locking on the edge */}
          <motion.circle
            cx="124"
            cy="76"
            r="5"
            fill="var(--color-status-success)"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle
            cx="124"
            cy="76"
            r="11"
            stroke="var(--color-status-success)"
            strokeWidth="0.8"
            strokeOpacity="0.5"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Grid lines centering on success target */}
          <line
            x1="124"
            y1="55"
            x2="124"
            y2="97"
            stroke="var(--color-status-success)"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <line
            x1="103"
            y1="76"
            x2="145"
            y2="76"
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
