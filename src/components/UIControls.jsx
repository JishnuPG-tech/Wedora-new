import { useEffect, useState } from "react";
import { Moon, Share2, Sun, Heart } from "lucide-react";

function UIControls() {
  const [night, setNight] = useState(() => localStorage.getItem("wedora-theme") === "night");
  const [shared, setShared] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("theme-night", night);
    localStorage.setItem("wedora-theme", night ? "night" : "day");
  }, [night]);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: "Wedora Wedding Invitation", text: "You're invited to celebrate with us.", url });
      else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        window.setTimeout(() => setShared(false), 1800);
      }
    } catch {}
  };

  return (
    <div className="utility-stack">
      <button className="utility-button" onClick={() => setNight((v) => !v)} aria-label="Toggle theme">{night ? <Sun size={16} /> : <Moon size={16} />}</button>
      <button className="utility-button" onClick={share} aria-label="Share invitation">{shared ? <Heart size={16} fill="currentColor" /> : <Share2 size={16} />}</button>
    </div>
  );
}

export default UIControls;
