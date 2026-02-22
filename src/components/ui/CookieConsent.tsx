"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-800/50 bg-stone-900/95 backdrop-blur-xl px-6 py-4"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-stone-400">
              We use <span className="text-stone-300 font-medium">essential cookies only</span> for authentication and site functionality. No tracking or third-party cookies.
            </p>
            <button
              onClick={accept}
              className="btn-primary shrink-0 rounded-lg px-6 py-2 text-sm"
            >
              OK, Got It
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
