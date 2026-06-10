"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do you post to my accounts for me?",
    a: "No — and that's on purpose. Wildgrow is your strategist and writers' room: it hands you the ideas, full scripts, and the plan. You stay in control of posting, so your account stays safe and authentically yours. One-tap scheduling is on the roadmap.",
  },
  {
    q: "How does the AI know what will go viral?",
    a: "It's built around the mechanics of short-form — hook patterns, the first-3-seconds retention cliff, format-market fit, and the view→install funnel. It studies what's already working in your niche, then engineers ideas around your app's real value. No one can guarantee a hit, but you stop guessing.",
  },
  {
    q: "Do you actually access TikTok & Instagram?",
    a: "Straight answer: the strategy, ideas, and scripts work today with zero connection. The Niche & Competitor Radar ships with realistic sample data and a pluggable connector — bring an approved data provider and it lights up with live signals. We never ask for your password and never scrape against platform rules.",
  },
  {
    q: "Is this only for apps?",
    a: "It's tuned for app and product founders — the whole funnel from a thumb-stopping view to a profile tap to an install. The engine works for any niche, but the playbooks, examples, and AI prompts are sharpened for people shipping software.",
  },
  {
    q: "Do I need an ad budget?",
    a: "Zero. Wildgrow is 100% organic. No ad spend, no agencies — just consistent, well-engineered content that compounds. That's the entire point.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly billing, cancel in two clicks, no calls. Every script and plan you've generated stays yours to keep.",
  },
];

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-ink-900">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-medium text-paper md:text-lg">
                {item.q}
              </span>
              <Plus
                size={20}
                className={cn(
                  "shrink-0 text-paper-dim transition-transform duration-300",
                  isOpen && "rotate-45 text-ember",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-6 pr-12 text-sm leading-relaxed text-paper-dim md:px-6">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
