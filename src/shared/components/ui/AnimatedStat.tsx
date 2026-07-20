'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

interface AnimatedStatProps {
  value: string; // e.g. "75K", "92.5%", "30+", "24/7"
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({ value }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  // Extract number and text parts
  // Matches optional prefix, the number (including decimals), and optional suffix
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);

  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      // Delay slightly for effect
      const timeout = setTimeout(() => {
        setHasStarted(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasStarted]);

  // If we can't parse a number out of it, just return the string
  if (!match) {
    return <span ref={ref}>{value}</span>;
  }

  const [, prefix, numStr, suffix] = match;
  const numValue = parseFloat(numStr);

  // Determine decimal places for formatting
  const decimalPlaces = numStr.includes('.') ? numStr.split('.')[1].length : 0;

  return (
    <StatCounter
      prefix={prefix}
      numValue={numValue}
      suffix={suffix}
      decimalPlaces={decimalPlaces}
      hasStarted={hasStarted}
      parentRef={ref}
    />
  );
};

const StatCounter = ({
  prefix,
  numValue,
  suffix,
  decimalPlaces,
  hasStarted,
  parentRef,
}: {
  prefix: string;
  numValue: number;
  suffix: string;
  decimalPlaces: number;
  hasStarted: boolean;
  parentRef: React.RefObject<HTMLSpanElement | null>;
}) => {
  const springValue = useSpring(0, {
    damping: 40,
    stiffness: 100,
    mass: 1,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (hasStarted) {
      springValue.set(numValue);
    }
  }, [hasStarted, numValue, springValue]);

  const displayValue = useTransform(springValue, (current) => {
    return current.toFixed(decimalPlaces);
  });

  return (
    <span ref={parentRef}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};
