import { useEffect, useRef, useState } from "react";
import { Music2, Volume2, VolumeX } from "lucide-react";

function MusicWidget() {
  const audio = useRef(null);
  const [active, setActive] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const muted = localStorage.getItem("wedora-music-muted") === "1";
    if (muted) setActive(false);
  }, []);

  const toggle = async () => {
    if (!audio.current) return;
    try {
      if (active) {
        audio.current.pause();
        setActive(false);
      } else {
        await audio.current.play();
        setActive(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  if (!available) return null;

  return (
    <div className={"music-widget " + (active ? "is-playing" : "")}>
      <audio ref={audio} src="/music.m4a" preload="none" loop onError={() => setAvailable(false)} />
      <button onClick={toggle} aria-label={active ? "Pause music" : "Play music"}>
        <span className="music-icon">{active ? <Volume2 size={17} /> : <Music2 size={17} />}</span>
        <span>{active ? "Playing" : "Music"}</span>
        {active ? <VolumeX size={13} /> : null}
      </button>
    </div>
  );
}

export default MusicWidget;
