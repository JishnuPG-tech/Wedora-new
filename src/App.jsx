import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AdminDashboard from "./components/AdminDashboard";
import Envelope from "./components/Envelope";
import FamilySection from "./components/FamilySection";
import Gallery from "./components/Gallery";
import HeroCover from "./components/HeroCover";
import InsideDetails from "./components/InsideDetails";
import MusicWidget from "./components/MusicWidget";
import ReceptionSection from "./components/ReceptionSection";
import RSVPForm from "./components/RSVPForm";
import ScrollProgress from "./components/ScrollProgress";
import SectionNav from "./components/SectionNav";
import UIControls from "./components/UIControls";
import VenueSection from "./components/VenueSection";
import { weddingData } from "./config/weddingData";
import { trackOpen } from "./utils/analytics";

const sections = [
  { id: "invitation", label: "Invite" },
  { id: "events", label: "Events" },
  { id: "story", label: "Story" },
  { id: "gallery", label: "Gallery" },
  { id: "families", label: "Families" },
  { id: "venue", label: "Venue" },
  { id: "rsvp", label: "RSVP" },
];

function App() {
  if (window.location.pathname === "/admin") return <AdminDashboard />;

  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestName(params.get("guest")?.trim() || "");
  }, []);

  useEffect(() => {
    if (!isOpened) return;
    const key = "wedora-opened";
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    trackOpen(guestName || null);
  }, [guestName, isOpened]);

  useEffect(() => {
    document.title = \`\${weddingData.couple.displayName} · Wedora\`;
  }, []);

  return (
    <div className="wedora-app">
      <ScrollProgress />
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            className="opening-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="opening-glow opening-glow-one" />
            <div className="opening-glow opening-glow-two" />
            <Envelope guestName={guestName} onComplete={() => setIsOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className={isOpened ? "invitation-page is-visible" : "invitation-page"} aria-hidden={!isOpened}>
        <HeroCover guestName={guestName} />
        <InsideDetails />
        <ReceptionSection />
        <Gallery />
        <FamilySection />
        <VenueSection />
        <RSVPForm />
        <section className="closing-section section-shell">
          <div className="closing-photo" aria-hidden="true"><div className="closing-photo-overlay" /></div>
          <div className="closing-content">
            <span className="eyebrow">With love, always</span>
            <p className="closing-malayalam">{weddingData.strings.invitePrimaryMl}</p>
            <h2>{weddingData.couple.groom} <span>{weddingData.couple.ampersand}</span> {weddingData.couple.bride}</h2>
            <p>{weddingData.strings.closingLine}</p>
            <div className="closing-date">{weddingData.dates.displayFull}</div>
            <div className="closing-hosts">{weddingData.hosts.join(" · ")}</div>
          </div>
        </section>
      </main>

      {isOpened && (
        <>
          <SectionNav sections={sections} />
          <UIControls />
          <MusicWidget />
        </>
      )}
    </div>
  );
}

export default App;
