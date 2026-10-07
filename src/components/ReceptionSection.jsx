import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { weddingData } from "../config/weddingData";

function ReceptionSection() {
  return (
    <section className="story-section section-shell sage-surface" id="story">
      <div className="section-inner">
        <div className="story-heading">
          <Reveal>
            <span className="eyebrow">A little story</span>
            <h2 className="section-title">From a first hello<br /><i>to this forever.</i></h2>
          </Reveal>
          <Reveal delay={.1}>
            <p className="story-intro">Some stories are written in chapters. Ours is made of moments, people, laughter and a promise to keep choosing each other.</p>
          </Reveal>
        </div>
        <div className="story-list">
          {weddingData.story.map((item, index) => (
            <Reveal key={item.number} delay={index * .1}>
              <motion.article className="story-item" whileHover={{ x: 8 }}>
                <span className="story-number">{item.number}</span>
                <div className="story-dot" />
                <div className="story-copy">
                  <span>The chapter</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReceptionSection;
