import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Reveal from "./Reveal";
import { weddingData } from "../config/weddingData";

function Gallery() {
  const [active, setActive] = useState(null);

  const next = () => setActive((index) => index == null ? null : (index + 1) % weddingData.gallery.length);
  const prev = () => setActive((index) => index == null ? null : (index - 1 + weddingData.gallery.length) % weddingData.gallery.length);

  useEffect(() => {
    if (active == null) return;
    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active]);

  return (
    <section className="gallery-section section-shell paper-surface" id="gallery">
      <div className="section-inner">
        <Reveal>
          <div className="gallery-heading">
            <div>
              <span className="eyebrow">Moments together</span>
              <h2 className="section-title">Keep this feeling<br /><i>close.</i></h2>
            </div>
            <p>Every celebration has little moments that deserve to stay. Tap a photograph to enter the memory.</p>
          </div>
        </Reveal>

        <div className="gallery-grid">
          {weddingData.gallery.map((photo, index) => (
            <Reveal key={photo.src} delay={index * .04} className={"gallery-item-wrap " + photo.span}>
              <button className="gallery-item" onClick={() => setActive(index)} aria-label={"Open " + photo.label}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span className="gallery-caption">{photo.label}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active != null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close gallery"><X size={22} /></button>
            <button className="lightbox-arrow left" onClick={(event) => { event.stopPropagation(); prev(); }} aria-label="Previous photo"><ArrowLeft size={22} /></button>
            <motion.figure
              className="lightbox-figure"
              initial={{ scale: .94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={weddingData.gallery[active].src} alt={weddingData.gallery[active].alt} />
              <figcaption>{weddingData.gallery[active].label} · {active + 1} / {weddingData.gallery.length}</figcaption>
            </motion.figure>
            <button className="lightbox-arrow right" onClick={(event) => { event.stopPropagation(); next(); }} aria-label="Next photo"><ArrowRight size={22} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
