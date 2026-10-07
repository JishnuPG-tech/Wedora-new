import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Heart, Send } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { weddingData } from "../config/weddingData";
import { supabase } from "../config/supabase";

const steps = ["Your name", "Will you join?", "Guest details", "A little note"];

function RSVPForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", attending: true, guest_count: 1, meal_preference: "Veg", message: "" });

  const deadlinePassed = useMemo(() => Date.now() > new Date(weddingData.dates.rsvpDeadlineIso).getTime(), []);

  const next = () => {
    if (step === 0 && !form.name.trim()) return setError("Please enter your name.");
    setError("");
    setStep((v) => Math.min(v + 1, steps.length - 1));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!supabase) return setError("RSVP service is not connected yet.");
    const { error: insertError } = await supabase.from("rsvps").insert(form);
    if (insertError) return setError("We couldn't save your RSVP. Please try again.");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="rsvp-section section-shell paper-surface" id="rsvp">
        <div className="section-inner">
          <motion.div className="rsvp-success" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="success-ring"><Check size={30} /></div>
            <span className="eyebrow">You're on the list</span>
            <h2>Thank you, {form.name}.</h2>
            <p>We can't wait to celebrate with you on {weddingData.dates.displayFull}.</p>
            <div className="success-details"><span>{form.attending ? "Attending" : "Unable to attend"}</span><i />{form.attending && <span>{form.guest_count} guest{form.guest_count > 1 ? "s" : ""}</span>}</div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="rsvp-section section-shell paper-surface" id="rsvp">
      <div className="section-inner rsvp-layout">
        <Reveal>
          <div className="rsvp-copy">
            <span className="eyebrow">A little yes?</span>
            <h2 className="section-title">Will you join<br /><i>our celebration?</i></h2>
            <p>{deadlinePassed ? "The RSVP window shown in this invitation has closed." : "A small reply helps us prepare a seat, a plate and a warm welcome just for you."}</p>
            <div className="rsvp-note"><Heart size={16} fill="currentColor" /> RSVP by {new Date(weddingData.dates.rsvpDeadlineIso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
          </div>
        </Reveal>

        <Reveal delay={.1}>
          <form className="rsvp-card" onSubmit={submit}>
            <div className="form-progress">{steps.map((label, index) => <span key={label} className={index <= step ? "active" : ""}>{index + 1}</span>)}</div>
            <div className="form-step">
              <span className="form-kicker">Step {step + 1} of {steps.length}</span>
              {step === 0 && (
                <label>What should we call you?
                  <input autoFocus value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" />
                </label>
              )}
              {step === 1 && (
                <div>
                  <label>Will you be there?</label>
                  <div className="choice-grid">
                    <button type="button" className={form.attending ? "choice active" : "choice"} onClick={() => setForm({ ...form, attending: true })}>Yes, with joy</button>
                    <button type="button" className={!form.attending ? "choice active" : "choice"} onClick={() => setForm({ ...form, attending: false })}>Not this time</button>
                  </div>
                </div>
              )}
              {step === 2 && form.attending && (
                <div className="detail-stack">
                  <label>How many are joining?
                    <select value={form.guest_count} onChange={(event) => setForm({ ...form, guest_count: Number(event.target.value) })}>
                      {Array.from({ length: weddingData.rsvp.maxGuests }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} guest{count > 1 ? "s" : ""}</option>)}
                    </select>
                  </label>
                  <label>Meal preference
                    <select value={form.meal_preference} onChange={(event) => setForm({ ...form, meal_preference: event.target.value })}><option>Veg</option><option>Non-Veg</option></select>
                  </label>
                </div>
              )}
              {step === 2 && !form.attending && <div className="unable-box">Thank you for letting us know. We will miss having you with us.</div>}
              {step === 3 && (
                <label>Leave us a little wish
                  <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows="5" placeholder="A blessing, a note, or a little love..." />
                </label>
              )}
              {error && <p className="form-error">{error}</p>}
            </div>

            <div className="form-actions">
              {step > 0 ? <button type="button" className="ghost-action" onClick={() => { setError(""); setStep((v) => v - 1); }}><ChevronLeft size={15} /> Back</button> : <span />}
              {step < steps.length - 1 ? <button type="button" className="solid-action" onClick={next}>Continue <ChevronRight size={15} /></button> : <button className="solid-action" type="submit"><Send size={15} /> Send RSVP</button>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default RSVPForm;
