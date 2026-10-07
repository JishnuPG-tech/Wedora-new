import React, { useRef } from 'react';
import { motion as Motion, useInView } from 'framer-motion';
import { weddingData } from '../config/weddingData';

const FamilyCard = ({ side, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const data = weddingData.family[side];
  const isGroom = side === 'groom';

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      className="glass-card rounded-2xl px-6 py-6 relative overflow-hidden"
    >
      {/* Side accent bar */}
      <div
        className={`absolute top-0 bottom-0 w-[3px] ${isGroom ? 'left-0' : 'right-0'} bg-gradient-to-b from-transparent via-[#B8913A]/40 to-transparent`}
      />

      <div className="text-center">
        {/* Role label */}
        <p className="font-inter text-[9px] uppercase tracking-[0.35em] text-[#B8913A] mb-2 opacity-80">
          {isGroom ? "Groom's Family" : "Bride's Family"}
        </p>

        {/* Name */}
        <p className="font-cormorant italic font-semibold text-xl text-[var(--text-dark)] mb-3">
          {data.name}
        </p>

        {/* Divider dot */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#B8913A]/20" />
          <span className="text-[#B8913A] text-[10px] opacity-60">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#B8913A]/20" />
        </div>

        {/* Relation line */}
        <p className="font-inter text-[9.5px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2 opacity-70">
          {data.relation}
        </p>

        {/* Father */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="font-inter text-[10px] text-[#6B8E6B] opacity-60">S/o</span>
          <p className="font-cormorant text-base text-[var(--text-dark)] font-medium">{data.father}</p>
        </div>

        {/* Mother */}
        <div className="flex items-center justify-center gap-2">
          <span className="font-inter text-[10px] text-[#6B8E6B] opacity-60">&</span>
          <p className="font-cormorant text-base text-[var(--text-dark)] font-medium">{data.mother}</p>
        </div>
      </div>
    </Motion.div>
  );
};

export default function FamilySection() {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section className="scroll-section flex items-center justify-center bg-transparent px-5 py-10 overflow-hidden">
      <div className="w-full max-w-sm mx-auto">

        {/* Heading */}
        <Motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="font-inter text-[10px] uppercase tracking-[0.4em] text-[#B8913A] mb-3 opacity-80">
            With Blessings Of
          </p>
          <h2 className="font-cormorant italic text-3xl font-medium text-[var(--text-dark)] drop-shadow-sm">
            Our Families
          </h2>
          <p className="font-cormorant italic text-sm text-[var(--text-muted)] mt-2 opacity-80">
            United in love, blessed by both families
          </p>
        </Motion.div>

        {/* Two family cards */}
        <div className="flex flex-col gap-4">
          <FamilyCard side="groom" delay={0.1} />

          {/* Centre ampersand divider */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B8913A]/30 to-[#B8913A]/30" />
            <div className="w-9 h-9 rounded-full border border-[#B8913A]/30 flex items-center justify-center bg-white/60 shadow-sm">
              <span className="font-cormorant italic text-xl text-[#B8913A] font-bold">&</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#B8913A]/30 to-[#B8913A]/30" />
          </Motion.div>

          <FamilyCard side="bride" delay={0.45} />
        </div>

        {/* Blessing footer */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-6"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#B8913A]/30 to-transparent mx-auto mb-3" />
          <p className="font-cormorant italic text-[13px] text-[var(--text-muted)] leading-relaxed opacity-80">
            Together with our parents' blessings,<br />
            we begin our journey as one
          </p>
        </Motion.div>

      </div>
    </section>
  );
}

