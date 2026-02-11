"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface BookCardProps {
  id: string;
  title: string;
  bookNumber: number;
  coverUrl: string;
  published: boolean;
}

export function BookCard({ id, title, bookNumber, coverUrl, published }: BookCardProps) {
  return (
    <Link href={`/series/kingdom-of-valdrath/${bookNumber}`}>
      <motion.div
        whileHover={{ scale: 1.03, rotateY: 5, rotateX: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ perspective: 800 }}
        className="glass-card group relative overflow-hidden p-3"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={coverUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Glow overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Book number badge */}
          <div className="absolute left-2 top-2 rounded-md bg-stone-950/80 px-2 py-1 text-xs font-bold text-gold-400 backdrop-blur-sm">
            Book {bookNumber}
          </div>

          {/* Published badge */}
          {published && (
            <div className="absolute right-2 top-2 rounded-md bg-gold-500/20 px-2 py-1 text-xs font-semibold text-gold-400 backdrop-blur-sm">
              Available
            </div>
          )}
        </div>

        <div className="mt-3 px-1 pb-1">
          <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold text-stone-200 transition-colors group-hover:text-gold-400">
            {title}
          </h3>
        </div>
      </motion.div>
    </Link>
  );
}
