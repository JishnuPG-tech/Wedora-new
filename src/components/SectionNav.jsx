import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function SectionNav({ sections }) {
  const [active, setActive] = useState("invitation");

  useEffect(() => {
    const nodes = sections.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { threshold: [0.16, 0.35, 0.6], rootMargin: "-16% 0px -52% 0px" }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="section-nav" aria-label="Invitation navigation">
      <div className="section-nav-pill">
        {sections.map((item) => (
          <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}>
            <span>{item.label}</span>
            <motion.i animate={{ scaleX: active === item.id ? 1 : 0 }} transition={{ duration: .25 }} />
          </button>
        ))}
      </div>
    </nav>
  );
}

export default SectionNav;
