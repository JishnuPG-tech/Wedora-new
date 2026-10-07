import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { supabase } from '../config/supabase';
import { weddingData } from '../config/weddingData';
import { Users, Mail, Check, X, Clock, Leaf, Beef, Plus, Minus } from 'lucide-react';

function spawnConfetti() {
  const colors = ['#B8913A', '#6B8E6B', '#F2EBD9', '#e8c97a', '#4A6A4A'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;overflow:hidden;';
  document.body.appendChild(container);
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    const size = Math.random() * 8 + 4;
    el.style.cssText = `position:absolute;left:${Math.random()*100}%;top:-10px;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};opacity:${Math.random()*.8+.2};animation:confettiFall ${Math.random()*2+1.5}s ease-in ${Math.random()*.8}s forwards;`;
    container.appendChild(el);
  }
  const style = document.createElement('style');
  style.textContent = '@keyframes confettiFall{to{transform:translateY(110vh) rotate(720deg);opacity:0;}}';
  document.head.appendChild(style);
  setTimeout(() => { container.remove(); style.remove(); }, 4000);
}

function DeadlineCountdown() {
  const deadline = useMemo(() => new Date(weddingData.dates.rsvpDeadlineIso), []);
  const [diff, setDiff] = useState(() => deadline - new Date());
  useEffect(() => {
    const id = setInterval(() => setDiff(deadline - new Date()), 1000);
    return () => clearInterval(id);
  }, [deadline]);
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hrs  = Math.floor((diff % 86400000) / 3600000);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 mb-5">
      <Clock size={12} className="text-[var(--gold)]" strokeWidth={1.5} />
      <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-[var(--gold)]">
        RSVP closes in <strong>{days}d {hrs}h</strong>
      </p>
    </motion.div>
  );
}

function GuestCounter({ value, onChange }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1}
        className="w-9 h-9 rounded-full border border-[var(--sage-dark)]/30 flex items-center justify-center text-[var(--sage-dark)] hover:bg-[var(--sage-dark)]/10 disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95">
        <Minus size={14} strokeWidth={2} />
      </button>
      <div className="text-center min-w-[60px]">
        <span className="font-cormorant text-3xl font-semibold text-[var(--text-dark)]">{value}</span>
        <p className="font-inter text-[9px] uppercase tracking-[0.2em] text-[var(--text-muted)] mt-0.5">{value === 1 ? 'Guest' : 'Guests'}</p>
      </div>
      <button type="button" onClick={() => onChange(Math.min(8, value + 1))} disabled={value >= 8}
        className="w-9 h-9 rounded-full border border-[var(--sage-dark)]/30 flex items-center justify-center text-[var(--sage-dark)] hover:bg-[var(--sage-dark)]/10 disabled:opacity-30 disabled:cursor-not-allowed transition active:scale-95">
        <Plus size={14} strokeWidth={2} />
      </button>
    </div>
  );
}

export default function RSVPForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', attending: true, guest_count: 1, meal_preference: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [liveCount, setLiveCount] = useState(null);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('rsvps').select('guest_count').eq('attending', true)
      .then(({ data }) => { if (data) setLiveCount(data.reduce((s, r) => s + (r.guest_count || 1), 0)); })
      .catch(() => {}); // silent – rsvps table may not exist yet
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (!supabase) { setStatus('error'); return; }
    if (navigator.vibrate) navigator.vibrate(30);
    setStatus('loading');
    const { error } = await supabase.from('rsvps').insert({
      name: form.name.trim(), attending: form.attending,
      guest_count: form.attending ? form.guest_count : 1,
      meal_preference: form.meal_preference || null,
      message: form.message.trim() || null,
    });
    if (error) { setStatus('error'); return; }
    if (form.attending) spawnConfetti();
    setStatus('success');
  };

  return (
    <section className="scroll-section flex items-center justify-center bg-transparent px-5 py-10">
      <div className="w-full max-w-sm mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-6">
          <p className="font-inter text-[10px] uppercase tracking-[0.4em] text-[var(--sage-dark)] mb-2 opacity-80">Will you join us?</p>
          <h2 className="font-cormorant italic text-3xl font-medium text-[var(--text-dark)]">RSVP</h2>
          {liveCount !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-1.5 mt-2">
              <Users size={11} className="text-[var(--sage-dark)]" strokeWidth={1.5} />
              <p className="font-inter text-[9px] text-[var(--sage-dark)] opacity-70">{liveCount} guests attending so far</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="glass-card floral-border rounded-[20px] px-6 py-8">
          <DeadlineCountdown />
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="flex justify-center mb-3">
                  {form.attending ? <Check size={40} className="text-[var(--sage-dark)]" strokeWidth={1} /> : <Mail size={40} className="text-[var(--gold)]" strokeWidth={1} />}
                </div>
                <p className="font-cormorant italic text-xl text-[var(--text-dark)] mb-2">{form.attending ? 'See you there!' : 'Thank you for letting us know'}</p>
                <p className="font-inter text-xs text-[var(--text-muted)] opacity-80">{form.attending ? `We can't wait to celebrate with you, ${form.name.split(' ')[0]}!` : 'You will be missed, but we understand.'}</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} className="space-y-5">
                <div>
                  <label className="font-inter text-[9px] uppercase tracking-[0.25em] text-[var(--sage-dark)] block mb-1.5">Your Name</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="Full name"
                    className="w-full px-4 py-3 rounded-xl border border-[var(--sage-dark)]/20 bg-white/60 text-[var(--text-dark)] font-inter text-sm outline-none focus:border-[var(--sage-dark)] transition" />
                </div>
                <div>
                  <label className="font-inter text-[9px] uppercase tracking-[0.25em] text-[var(--sage-dark)] block mb-2">Will you attend?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[{ value: true, label: 'Joyfully Yes', icon: <Check size={13} strokeWidth={2}/> }, { value: false, label: 'Regretfully No', icon: <X size={13} strokeWidth={2}/> }].map(opt => (
                      <button key={String(opt.value)} type="button" onClick={() => set('attending', opt.value)}
                        className={`py-2.5 rounded-xl text-sm font-inter font-medium border transition flex items-center justify-center gap-1.5 ${form.attending === opt.value ? 'bg-[var(--sage-dark)] text-white border-[var(--sage-dark)]' : 'bg-white/60 text-[var(--text-muted)] border-[var(--sage-dark)]/20 hover:border-[var(--sage-dark)]'}`}>
                        {opt.icon}{opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <AnimatePresence>
                  {form.attending && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-5 overflow-hidden">
                      <div>
                        <label className="font-inter text-[9px] uppercase tracking-[0.25em] text-[var(--sage-dark)] block mb-3 text-center">Number of Guests <span className="opacity-50 normal-case">(max 8)</span></label>
                        <GuestCounter value={form.guest_count} onChange={v => set('guest_count', v)} />
                      </div>
                      <div>
                        <label className="font-inter text-[9px] uppercase tracking-[0.25em] text-[var(--sage-dark)] block mb-2">Meal Preference</label>
                        <div className="grid grid-cols-2 gap-2">
                          {[{ value: 'Veg', icon: <Leaf size={13} strokeWidth={1.5}/>, label: 'Veg' }, { value: 'Non-Veg', icon: <Beef size={13} strokeWidth={1.5}/>, label: 'Non-Veg' }].map(m => (
                            <button key={m.value} type="button" onClick={() => set('meal_preference', form.meal_preference === m.value ? '' : m.value)}
                              className={`py-2.5 rounded-xl text-sm font-inter border transition flex items-center justify-center gap-1.5 ${form.meal_preference === m.value ? 'bg-[var(--gold)] text-white border-[var(--gold)]' : 'bg-white/60 text-[var(--text-muted)] border-[var(--gold)]/20 hover:border-[var(--gold)]'}`}>
                              {m.icon}{m.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div>
                  <label className="font-inter text-[9px] uppercase tracking-[0.25em] text-[var(--sage-dark)] block mb-1.5">A Blessing (optional)</label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={2} placeholder="Share your wishes..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--sage-dark)]/20 bg-white/60 text-[var(--text-dark)] font-inter text-sm outline-none focus:border-[var(--sage-dark)] resize-none transition" />
                </div>
                {status === 'error' && <p className="font-inter text-xs text-red-400 text-center">Something went wrong. Please try again.</p>}
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-60 flex items-center justify-center gap-2">
                  {status === 'loading' ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Mail size={14} strokeWidth={1.5}/>Send RSVP</>}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Developer credit footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-col items-center justify-center w-full"
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#B8913A] to-transparent opacity-40 mb-4" />
          <p className="font-cormorant italic text-sm text-[var(--text-muted)] mb-3 text-center">
            Made with love for {weddingData.couple.groom} {weddingData.couple.ampersand} {weddingData.couple.bride}
          </p>
          <a
            href="mailto:jishnupg2005@gmail.com"
            className="group flex flex-col items-center gap-1.5 px-6 py-3 rounded-2xl border border-transparent hover:border-[rgba(184,145,58,0.2)] hover:bg-[rgba(255,255,255,0.4)] transition-all duration-300"
            style={{ textDecoration: 'none' }}
          >
            <p className="font-inter text-[9.5px] uppercase tracking-[0.25em] text-[var(--text-muted)] opacity-80">
              Crafted by <span className="font-semibold text-[#B8913A] tracking-[0.1em] group-hover:text-[#9A7A30] transition-colors">Jishnu P G</span>
            </p>
            <p className="font-inter text-[8.5px] lowercase tracking-[0.15em] text-[var(--text-muted)] opacity-50 group-hover:opacity-90 transition-opacity flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              jishnupg2005@gmail.com
            </p>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

