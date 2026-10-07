import React, { useEffect, useState } from 'react';
import './features.css';
import Envelope from './components/Envelope';
import HeroCover from './components/HeroCover';
import InsideDetails from './components/InsideDetails';
import Gallery from './components/Gallery';
import VenueSection from './components/VenueSection';
import ReceptionSection from './components/ReceptionSection';
import FamilySection from './components/FamilySection';
import RSVPForm from './components/RSVPForm';
import MusicWidget from './components/MusicWidget';
import AdminDashboard from './components/AdminDashboard';
import ScrollProgress from './components/ScrollProgress';
import { DarkModeToggle } from './components/UIControls';
import { useDarkMode } from './hooks/useLabHooks';
import { trackOpen } from './utils/analytics';

function FloatingLeaf({ style, className }) {
  return (
    <div className={`fixed pointer-events-none z-0 ${className}`} style={style}>
      <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path d="M30 95 C30 95 3 60 3 35 C3 15 15 3 30 3 C45 3 57 15 57 35 C57 60 30 95 30 95Z" fill="#6B8E6B" fillOpacity="0.12" />
        <path d="M30 95 L30 3" stroke="#6B8E6B" strokeWidth="0.6" strokeOpacity="0.2"/>
      </svg>
    </div>
  );
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [dark, setDark] = useDarkMode();

  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('guest') || '';

  useEffect(() => { if (loaderDone) trackOpen(guestName); }, [loaderDone, guestName]);

  if (window.location.pathname === '/admin') return <AdminDashboard />;

  return (
    <div className="relative w-full">
      {loaderDone && <ScrollProgress />}
      {loaderDone && <DarkModeToggle dark={dark} setDark={setDark} />}
      {!loaderDone && <Envelope onOpen={() => setLoaderDone(true)} />}

      <FloatingLeaf className="float-leaf"       style={{ top: '10%', left:  '-20px', width: 80, height: 110, opacity: 0.6 }} />
      <FloatingLeaf className="float-leaf-delay" style={{ top: '15%', right: '-18px', width: 65, height: 90,  opacity: 0.5, transform: 'scaleX(-1)' }} />
      <FloatingLeaf className="float-leaf"       style={{ top: '55%', left:  '-15px', width: 55, height: 80,  opacity: 0.4, transform: 'rotate(20deg)' }} />
      <FloatingLeaf className="float-leaf-delay" style={{ top: '60%', right: '-15px', width: 55, height: 80,  opacity: 0.4, transform: 'rotate(-20deg) scaleX(-1)' }} />

      <div className="scroll-container">
        <HeroCover guestName={guestName} />
        <InsideDetails guestName={guestName} />
        <VenueSection />
        <ReceptionSection />
        <Gallery />
        <FamilySection />
        <RSVPForm />
      </div>

      {loaderDone && <MusicWidget />}
    </div>
  );
}

