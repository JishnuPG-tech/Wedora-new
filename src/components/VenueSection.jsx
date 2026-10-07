import { CalendarPlus, ExternalLink, MapPin, Navigation } from "lucide-react";
import Reveal from "./Reveal";
import { weddingData } from "../config/weddingData";

function VenueMap({ event }) {
  return (
    <div className="venue-map">
      <div className="map-grid" />
      <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
      <div className="map-pin"><MapPin size={20} /></div>
      <div className="map-label">{event.venue}</div>
      <div className="map-compass">N</div>
    </div>
  );
}

function VenueSection() {
  const event = weddingData.events[0];
  const reception = weddingData.events[1];

  return (
    <section className="venue-section section-shell sage-surface" id="venue">
      <div className="section-inner">
        <Reveal>
          <div className="venue-heading">
            <span className="eyebrow">Find us here</span>
            <h2 className="section-title">Come for the<br /><i>moments.</i></h2>
            <p className="venue-note">Save the locations now so the only thing left to think about on the day is being together.</p>
          </div>
        </Reveal>

        <div className="venue-grid">
          {[event, reception].map((item, index) => (
            <Reveal key={item.id} delay={index * .08}>
              <article className="venue-card">
                <VenueMap event={item} />
                <div className="venue-card-body">
                  <span className="venue-kicker">{item.kicker}</span>
                  <h3>{item.venue}</h3>
                  <p>{item.address}</p>
                  <div className="venue-actions">
                    <a href={item.mapUrl} target="_blank" rel="noreferrer" className="solid-action"><Navigation size={15} /> Directions</a>
                    {index === 0 && <button className="ghost-action" onClick={() => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })}><CalendarPlus size={15} /> RSVP</button>}
                    <a className="icon-action" href={item.mapUrl} target="_blank" rel="noreferrer" aria-label="Open maps"><ExternalLink size={15} /></a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VenueSection;
