'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Lightbulb, Users, Rocket, TrendingUp } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const stats = [
  {
    id: 1,
    icon: Lightbulb,
    value: 500,
    suffix: '+',
    label: 'Ideas shared',
  },
  {
    id: 2,
    icon: Users,
    value: 1200,
    suffix: '+',
    label: 'Builders',
  },
  {
    id: 3,
    icon: Rocket,
    value: 85,
    suffix: '+',
    label: 'Launched startups',
  },
  {
    id: 4,
    icon: TrendingUp,
    value: 98,
    suffix: '%',
    label: 'Positive feedback',
  },
];

const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k';
  }
  return num.toString();
};

const Counter = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 2000,
    bounce: 0,
  });
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span ref={ref}>
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const StatsSection = () => {
  return (
    <div className="bg-[#101828]/[0.02] py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-title mb-2">
            Trusted by builders everywhere
          </h2>
          <p className="text-title/60">
            Join a growing community turning ideas into reality
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map(({ id, icon: Icon, value, suffix, label }) => (
            <motion.div
              key={id}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col items-center text-center rounded-2xl border border/10 bg-white/5 px-4 py-8 backdrop-blur-sm"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#4F46E5]/20 ">
                <Icon className="text-[#4F46E5]" size={22} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-title">
                <Counter value={value} suffix={suffix} />
              </div>
              <div className="mt-1 text-sm text-title/60">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;