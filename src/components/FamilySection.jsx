import { Heart } from "lucide-react";
import Reveal from "./Reveal";
import { weddingData } from "../config/weddingData";

function FamilySection() {
  const families = [weddingData.family.groom, weddingData.family.bride];

  return (
    <section className="family-section section-shell paper-surface" id="families">
      <div className="section-inner">
        <Reveal>
          <div className="family-heading">
            <span className="eyebrow">With the blessings</span>
            <h2 className="section-title">Our families</h2>
            <p className="section-intro">The people who loved us first, and whose blessings we carry into this new chapter.</p>
          </div>
        </Reveal>

        <div className="family-grid">
          {families.map((family, index) => (
            <Reveal key={family.name} delay={index * .08}>
              <article className="family-card">
                <div className="family-card-top">
                  <span>Family {index + 1}</span>
                  <Heart size={17} fill="currentColor" />
                </div>
                <h3>{family.name}</h3>
                <p className="family-relation">{family.relation}</p>
                <div className="family-parents">
                  <span>{family.father}</span>
                  <span>{family.mother}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="family-hostline">
          {weddingData.hosts.join("  ·  ")}
        </div>
      </div>
    </section>
  );
}

export default FamilySection;
