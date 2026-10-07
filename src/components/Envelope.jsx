import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { weddingData } from "../config/weddingData";

function Envelope({ guestName, onComplete }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onComplete, 1750);
  };

  return (
    <div className="envelope-stage">
      <motion.div className="envelope-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2, duration: .7 }}>
        <span>{weddingData.strings.envelopeSmallTitle}</span>
        <strong>{guestName ? "Dear " + guestName : "An invitation for you"}</strong>
        <p>Tap the seal and step inside.</p>
      </motion.div>

      <button className={"envelope-wrap" + (opening ? " is-opening" : "")} onClick={open} aria-label="Open wedding invitation">
        <motion.div className="envelope-shadow" animate={opening ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }} />
        <div className="envelope-body">
          <motion.div
            className="envelope-paper"
            animate={opening ? { y: -120, rotate: -2, scale: 1.02 } : { y: 16, rotate: 0, scale: 1 }}
            transition={{ duration: .95, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="mini-script">{weddingData.strings.invitePrimaryMl}</span>
            <strong>{weddingData.couple.groom} {weddingData.couple.ampersand} {weddingData.couple.bride}</strong>
            <small>{weddingData.dates.headerDisplay}</small>
          </motion.div>
          <motion.div className="envelope-flap" animate={opening ? { rotateX: 170 } : { rotateX: 0 }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }} />
          <div className="envelope-bottom" />
          <div className="envelope-side left" />
          <div className="envelope-side right" />
          <motion.div className="wax-seal" animate={opening ? { scale: .5, opacity: 0, y: 34, rotate: 20 } : { scale: 1, opacity: 1, y: 0, rotate: 0 }} transition={{ duration: .45 }}>
            <span>A&M</span>
          </motion.div>
          <motion.div className="open-arrow" animate={opening ? { opacity: 0 } : { opacity: 1 }}><ArrowUpRight size={18} /></motion.div>
        </div>
      </button>

      <motion.div className="opening-footer" initial={{ opacity: 0 }} animate={{ opacity: .68 }} transition={{ delay: .55 }}>
        <span>{weddingData.dates.displayFull}</span><i /><span>Thrissur · Kerala</span>
      </motion.div>
    </div>
  );
}

export default Envelope;
