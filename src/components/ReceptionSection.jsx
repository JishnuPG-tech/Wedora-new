import React, { useRef } from 'react';
import { motion as Motion, useInView } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { weddingData } from '../config/weddingData';

export default function ReceptionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="scroll-section flex items-center justify-center bg-transparent px-6 py-8">
      <div className="w-full max-w-sm mx-auto">

        {/* Heading */}
        <Motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="font-inter text-[10px] uppercase tracking-[0.4em] text-[#B8913A] mb-2 opacity-80">
            Following the Ceremony
          </p>
          <h2 className="font-cormorant italic text-3xl font-medium text-[var(--text-dark)] drop-shadow-sm">
            Reception
          </h2>
          <div className="flex items-center gap-3 justify-center mt-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#B8913A]/40" />
            <svg viewBox="0 0 40 20" fill="none" className="w-7 h-4 opacity-50">
              <path d="M20 2 C25 2 35 8 35 10 C35 12 25 18 20 18 C15 18 5 12 5 10 C5 8 15 2 20 2Z" fill="#B8913A" fillOpacity="0.3"/>
              <path d="M20 2 L20 18" stroke="#B8913A" strokeWidth="0.5" strokeOpacity="0.5"/>
            </svg>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#B8913A]/40" />
          </div>
        </Motion.div>

        {/* Reception Card */}
        <div className="glass-card floral-border rounded-[20px] overflow-hidden">

          {/* Map Embed */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-full relative overflow-hidden"
            style={{ height: 150 }}
          >
            <iframe
              title="Reception Venue Map"
              src={weddingData.reception.links.googleMapsEmbed}
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#B8913A] opacity-10 pointer-events-none" />
          </Motion.div>

          <div className="px-6 py-5">
            {/* Time badge */}
            <Motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-inter uppercase tracking-[0.2em] text-[#4A6A4A] bg-[#e6f0e6] border border-[rgba(107,142,107,0.2)]">
                🕐 {weddingData.reception.timeText}
              </span>
            </Motion.div>

            {/* Venue name & address */}
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-center mb-5"
            >
              <h3 className="font-cormorant font-semibold text-xl text-[var(--text-dark)] mb-1">
                {weddingData.reception.name}
              </h3>
              <p className="font-inter text-sm text-[var(--text-muted)] leading-relaxed">
                {weddingData.reception.addressEn[0]}<br />
                {weddingData.reception.addressEn[1]}
              </p>
            </Motion.div>

            {/* Get Directions Button */}
            <Motion.a
              href={weddingData.reception.links.googleMapsDirect}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32, duration: 0.55 }}
              className="btn-primary flex items-center gap-2 justify-center w-full"
              style={{ textDecoration: 'none' }}
            >
              <MapPin size={16} strokeWidth={2} />
              <span>Get Directions</span>
            </Motion.a>
          </div>
        </div>

        {/* Connecting note */}
        <Motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-5 font-cormorant italic text-sm text-[var(--text-muted)] opacity-80"
        >
          All guests are warmly invited to the reception
        </Motion.p>

      </div>
    </section>
  );
}

