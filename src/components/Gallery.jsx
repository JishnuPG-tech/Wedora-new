import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion as Motion, AnimatePresence, useInView } from 'framer-motion';
import photo1 from '../assets/gallery/photo1.jpg';
import photo2 from '../assets/gallery/photo2.jpg';
import photo3 from '../assets/gallery/photo3.jpg';
import photo4 from '../assets/gallery/photo4.jpg';
import photo5 from '../assets/gallery/photo5.jpg';
import photo6 from '../assets/gallery/photo6.jpg';

const GALLERY_PHOTOS = [
  { src: photo1, alt: 'Together', span: 'tall' },
  { src: photo2, alt: 'Garden walk', span: 'wide' },
  { src: photo3, alt: 'Laughing', span: 'tall' },
  { src: photo4, alt: 'Sunset', span: 'wide' },
  { src: photo5, alt: 'Flowers', span: 'square' },
  { src: photo6, alt: 'Temple', span: 'tall' },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ photos, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  // Touch swipe state
  const touchStartX = useRef(null);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  };

  return (
    <Motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <span className="font-inter text-[11px] tracking-[0.3em] text-white/50 uppercase">
          {index + 1} / {photos.length}
        </span>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      {/* Image container */}
      <div
        className="relative z-10 w-full max-w-lg px-4 overflow-hidden"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (dx < -40) next();
          else if (dx > 40) prev();
          touchStartX.current = null;
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <Motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full"
          >
            <img
              src={photos[index].src}
              alt={photos[index].alt}
              className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              draggable={false}
            />
            {/* Caption */}
            {photos[index].alt && (
              <p className="mt-3 text-center font-cormorant italic text-sm text-white/50">
                {photos[index].alt}
              </p>
            )}
          </Motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Previous"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Next"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === index ? 20 : 6,
              height: 6,
              background: i === index ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
            }}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </Motion.div>
  );
}

// ─── Gallery Item ─────────────────────────────────────────────────────────────
function GalleryItem({ photo, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [loaded, setLoaded] = useState(false);

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-2xl cursor-pointer group"
      style={{
        // Span control for masonry feel
        gridRowEnd: photo.span === 'tall' ? 'span 2' : photo.span === 'wide' ? 'span 1' : 'span 1',
      }}
      onClick={() => onClick(index)}
    >
      {/* Shimmer loader */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--pearl-dark)] to-[var(--gold-pale)]/20 animate-pulse rounded-2xl" />
      )}

      <img
        src={photo.src}
        alt={photo.alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ minHeight: photo.span === 'tall' ? '280px' : '160px', maxHeight: photo.span === 'tall' ? '380px' : '200px' }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl flex items-end p-3">
        <p className="font-cormorant italic text-xs text-white/80">{photo.alt}</p>
      </div>

      {/* Gold border on hover */}
      <div className="absolute inset-0 rounded-2xl border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/30 transition-all duration-400" />
    </Motion.div>
  );
}

// ─── Main Gallery Section ─────────────────────────────────────────────────────
export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });
  const photos = GALLERY_PHOTOS;

  if (!photos.length) return null;

  return (
    <section className="scroll-section flex flex-col items-center justify-start bg-transparent px-5 py-12 overflow-hidden">
      {/* Section heading */}
      <Motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 w-full"
      >
        <p className="font-inter text-[10px] uppercase tracking-[0.4em] text-[var(--gold)] mb-3 opacity-80">
          Our Story
        </p>
        <h2 className="font-playfair italic text-3xl font-medium text-[var(--text-dark)] drop-shadow-sm">
          Moments Together
        </h2>

        {/* Olive divider (Christian parity) */}
        <div className="flex items-center gap-3 justify-center mt-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--gold)]/40" />
          <svg viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-4 opacity-50">
            <path d="M20 2 C25 2 35 8 35 10 C35 12 25 18 20 18 C15 18 5 12 5 10 C5 8 15 2 20 2Z" fill="var(--gold)" fillOpacity="0.3"/>
            <path d="M20 2 L20 18" stroke="var(--gold)" strokeWidth="0.5" strokeOpacity="0.5"/>
          </svg>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--gold)]/40" />
        </div>
      </Motion.div>

      {/* Masonry Grid */}
      <div
        className="w-full max-w-sm mx-auto grid gap-2.5"
        style={{ gridTemplateColumns: '1fr 1fr', gridAutoRows: 'auto' }}
      >
        {photos.map((photo, i) => (
          <GalleryItem
            key={i}
            photo={photo}
            index={i}
            onClick={(idx) => setLightboxIndex(idx)}
          />
        ))}
      </div>

      {/* Tap hint */}
      <Motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-5 font-inter text-[9.5px] uppercase tracking-[0.3em] text-[var(--text-muted)] opacity-60"
      >
        Tap any photo to view
      </Motion.p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
