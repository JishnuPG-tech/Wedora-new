import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MapPin, Sparkles } from "lucide-react";
import heroImage from "../assets/hero.png";
import { weddingData } from "../config/weddingData";

function HeroCover({ guestName }) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 100]);
  const titleY = useTransform(scrollY, [0, 700], [0, -80]);

  const readInvitation = () => document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero-section" id="home">
      <motion.div className="hero-image" style={{ y: imageY, backgroundImage: "url(" + heroImage + ")" }} />
      <div className="hero-vignette" />
      <div className="hero-grain" />

      <div className="hero-topbar">
        <div className="hero-monogram">{weddingData.couple.initials}</div>
        <div className="hero-topbar-center"><span /> digital wedding invitation <span /></div>
        <div className="hero-topbar-right"><Sparkles size={14} /> made with love</div>
      </div>

      <motion.div className="hero-content" style={{ y: titleY }}>
        <span className="eyebrow">{weddingData.strings.heroEyebrow}</span>
        <p className="hero-malayalam">{weddingData.strings.invitePrimaryMl}</p>
        {guestName && <span className="hero-guest">Especially for {guestName}</span>}
        <h1>
          <span>{weddingData.couple.groom}</span>
          <em>{weddingData.couple.ampersand}</em>
          <span>{weddingData.couple.bride}</span>
        </h1>
        <div className="hero-meta">
          <span>{weddingData.dates.calendar.dayOfWeek}</span><i /><span>{weddingData.dates.displayFull}</span><i /><span>Thrissur, Kerala</span>
        </div>
      </motion.div>

      <div className="hero-bottom">
        <div className="hero-location"><MapPin size={14} /> Thrissur · Kerala</div>
        <button className="hero-scroll" onClick={readInvitation} aria-label="Read invitation">
          <span>Read the invitation</span><ChevronDown size={18} />
        </button>
      </div>
    </section>
  );
}

export default HeroCover;
