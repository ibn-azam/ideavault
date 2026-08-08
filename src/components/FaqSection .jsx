'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

const categories = ['General', 'Ideas & ownership', 'Community', 'Account'];

const faqs = [
  {
    id: '1',
    category: 'General',
    question: 'What is IdeaVault?',
    answer:
      'IdeaVault is a place to share startup and product ideas, get feedback from other builders, and discover concepts worth exploring or launching.',
  },
  {
    id: '2',
    category: 'General',
    question: 'Is it free to share an idea?',
    answer:
      'Yes. Posting an idea is free, always.However,you have to login to your account first. We want to lower the barrier for anyone with a promising concept to get it in front of people.',
  },
  {
    id: '3',
    category: 'Ideas & ownership',
    question: 'Can I protect my idea before sharing it publicly?',
    answer:
      "Only share what you're comfortable making public. IdeaVault is built for open feedback, so hold back sensitive proprietary details, trade secrets, or anything you intend to patent first.",
  },
  {
    id: '4',
    category: 'Ideas & ownership',
    question: 'Who owns an idea once its posted?',
    answer:
      'You do. Posting on IdeaVault doesnt transfer ownership or IP rights to us or to anyone who views it. Its your idea, shared publicly at your own discretion.',
  },
  {
    id: '5',
    category: 'Community',
    question: 'How does feedback and voting work?',
    answer:
      'Members comment on and upvote ideas they find compelling. Ideas with strong engagement rise into the Trending section for extra visibility.',
  },
  {
    id: '6',
    category: 'Community',
    question: 'Can I collaborate with someone on their idea?',
    answer:
      'Yes. If an idea resonates with you, reach out through the posters profile to discuss collaborating, giving feedback, or partnering up.',
  },
  {
    id: '7',
    category: 'Account',
    question: 'Do I need an account to browse ideas?',
    answer:
      "Yes. Browsing and reading is open to everyone.But, You'll only need an account to post, comment, or vote.",
  },
  {
    id: '8',
    category: 'Account',
    question: 'How do I delete my account or an idea?',
    answer:
      'Head to your profile settings to remove individual ideas, or delete your account entirely. Deleted ideas are removed from Trending and search immediately.',
  },
];

const FaqSection = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openId, setOpenId] = useState(null);

  const filtered = faqs.filter((f) => f.category === activeCategory);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setOpenId(null);
  };

  return (
    <div className="container mx-auto my-20 px-4">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4F46E5]/10">
          <Sparkles className="text-[#4F46E5]" size={20} />
        </div>
        <h2 className="text-5xl font-bold text-title mb-2">
          Questions, answered
        </h2>
        <p className="text-title/60 max-w-md mx-auto">
          Sorted by what you&apos;re actually asking about
        </p>
      </motion.div>

      {/* Category tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex flex-wrap justify-center gap-1 rounded-full border border/10 bg-[#101828]/[0.02] p-1 ">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors text-title"
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="faq-tab-bg"
                  className="absolute inset-0 rounded-full bg-[#4F46E5]"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${
                  activeCategory === cat ? 'text-white' : 'text-title/60'
                }`}
              >
                {cat}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Question list */}
      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {filtered.map(({ id, question, answer }) => {
              const isOpen = openId === id;
              return (
                <div
                  key={id}
                  className={`rounded-2xl border transition-colors ${
                    isOpen
                      ? 'border-/30 bg-[#4F46E5]/[0.03]'
                      : 'border-/10'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-medium text-title">
                      {question}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10">
                      <Plus
                        size={14}
                        className={`text-[#4F46E5] transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-title/60">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FaqSection;