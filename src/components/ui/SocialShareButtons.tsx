"use client";

import { useCallback } from "react";

interface SocialShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShareButtons({ title, url, description }: SocialShareButtonsProps) {
  const shareText = description
    ? `${title} — ${description}`
    : `Check out "${title}" from The Kingdom of Valdrath series!`;

  const shareOnTwitter = useCallback(() => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, "_blank", "noopener,noreferrer,width=550,height=420");
  }, [shareText, url]);

  const shareOnFacebook = useCallback(() => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, "_blank", "noopener,noreferrer,width=550,height=420");
  }, [shareText, url]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
        Share
      </span>

      {/* X / Twitter */}
      <button
        onClick={shareOnTwitter}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-900/50 text-stone-400 transition-all hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-400"
        title="Share on X"
        aria-label="Share on X (Twitter)"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={shareOnFacebook}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 bg-stone-900/50 text-stone-400 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
    </div>
  );
}
