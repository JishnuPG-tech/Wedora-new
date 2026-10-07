import { CalendarDays, Clock3, Heart, MapPinned } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { weddingData } from "../config/weddingData";

function InsideDetails() {
  const addToCalendar = () => {
    const start = weddingData.dates.icsFormat.dateStart;
    const end = weddingData.dates.icsFormat.dateEnd;
    const ics = [
      "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Wedora//Wedding//EN","BEGIN:VEVENT",
      "UID:wedora-" + weddingData.couple.initials + "@wedora",
      "DTSTAMP:20260101T000000Z",
      "DTSTART:" + start,
      "DTEND:" + end,
      "SUMMARY:" + weddingData.couple.displayName + " Wedding",
      "LOCATION:Kalyana Mandapam, Thrissur, Kerala",
      "END:VEVENT","END:VCALENDAR"
    ].join("\\r\\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedora-invitation.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="invitation-intro section-shell paper-surface" id="invitation">
      <div className="section-inner invitation-grid">
        <Reveal>
          <div className="invitation-symbol"><Heart size={18} fill="currentColor" /></div>
          <span className="eyebrow">The invitation</span>
          <p className="invite-malayalam">{weddingData.strings.invitePrimaryMl}</p>
          <h2 className="section-title">A day we will remember.<br /><i>A lifetime we will share.</i></h2>
          <p className="section-intro invitation-copy">{weddingData.strings.inviteSecondaryEn}</p>
          <div className="invite-signature">{weddingData.couple.groom} <span>&</span> {weddingData.couple.bride}</div>
          <button className="text-action" onClick={addToCalendar}><CalendarDays size={15} /> Add to calendar</button>
        </Reveal>

        <Reveal delay={.12}>
          <div className="date-card">
            <span className="date-card-top">{weddingData.dates.calendar.dayOfWeek}</span>
            <strong>{weddingData.dates.calendar.dayNumber}</strong>
            <span>{weddingData.dates.calendar.month} {weddingData.dates.calendar.year}</span>
            <div className="date-card-line" />
            <small>With the blessings of our families</small>
          </div>
        </Reveal>
      </div>

      <div className="section-inner event-intro" id="events">
        <Reveal>
          <div>
            <span className="eyebrow">The wedding day</span>
            <h2 className="section-title">Gather. Celebrate.<br /><i>Begin again.</i></h2>
          </div>
          <div className="event-intro-note"><Clock3 size={17} /> Two beautiful moments, one unforgettable day.</div>
        </Reveal>

        <div className="event-list">
          {weddingData.events.map((event, index) => (
            <Reveal key={event.id} delay={index * .08}>
              <motion.article whileHover={{ y: -5 }} className="event-story-card">
                <div className="event-number">0{index + 1}</div>
                <div className="event-main">
                  <span className="event-kicker">{event.kicker}</span>
                  <h3>{event.titleEn}</h3>
                  <p className="event-ml">{event.titleMl}</p>
                  <div className="event-time"><Clock3 size={15} /> {event.timeText}</div>
                  <div className="event-place"><MapPinned size={15} /> {event.venue}</div>
                  <p className="event-address">{event.address}</p>
                  <a className="outline-action" href={event.mapUrl} target="_blank" rel="noreferrer">Open location</a>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InsideDetails;
