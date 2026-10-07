import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { Users, CheckCircle, XCircle, Lock, Download, Link2, Copy, Check, Smartphone, UtensilsCrossed } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Jishnu2005';

function exportCSV(list) {
  const headers = ['Name', 'Attending', 'Guest Count', 'Meal Preference', 'Message', 'Submitted'];
  const rows = list.map(r => [
    r.name || '', r.attending ? 'Yes' : 'No', r.guest_count || 1,
    r.meal_preference || '-', (r.message || '').replace(/,/g, ';'),
    new Date(r.created_at).toLocaleString('en-IN')
  ]);
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${weddingData.couple.groom}_${weddingData.couple.bride}_RSVP.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function LinkGenerator() {
  const [name, setName] = useState('');
  const [generated, setGenerated] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!name.trim()) return;
    const base = window.location.origin + window.location.pathname;
    const encoded = name.trim().split(' ').map(encodeURIComponent).join('+');
    setGenerated(`${base}?guest=${encoded}`);
    setCopied(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendWhatsapp = () => {
    const text = `${weddingData.strings.whatsappShareText}\n\nOpen your personal invite: ${generated}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="mb-6 p-4 rounded-xl border border-[rgba(107,142,107,0.2)]" style={{ background: 'rgba(255,255,255,0.6)' }}>
      <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[var(--sage-dark)] mb-3 font-semibold flex items-center gap-1.5">
        <Link2 size={12} strokeWidth={1.5} /> Invite Link Generator
      </p>
      <div className="flex gap-2 mb-3">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Guest name..."
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--sage-dark)]/25 bg-white/70 text-[var(--text-dark)] font-inter outline-none focus:border-[var(--sage-dark)]"
          onKeyDown={e => e.key === 'Enter' && generate()} />
        <button onClick={generate} className="btn-primary px-4 py-2 text-xs">Generate</button>
      </div>
      {generated && (
        <div className="p-3 rounded-lg border border-[var(--sage-dark)]/15" style={{ background: 'rgba(248,247,244,0.9)' }}>
          <p className="font-inter text-[9px] text-[var(--text-muted)] mb-2 break-all">{generated}</p>
          <div className="flex gap-2">
            <button onClick={copy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-inter border hover:opacity-80 transition" style={{ background: 'rgba(107,142,107,0.1)', color: 'var(--sage-dark)', borderColor: 'rgba(107,142,107,0.2)' }}>
              {copied ? <Check size={10}/> : <Copy size={10}/>} {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={sendWhatsapp} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-inter text-[#128C7E] border border-[#25D366]/20 hover:opacity-80 transition" style={{ background: 'rgba(37,211,102,0.1)' }}>
              <Smartphone size={10}/> Send WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [rsvps, setRsvps] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  const loading = authed && rsvps === null;
  const login = () => { if (pw === ADMIN_PASSWORD) setAuthed(true); else setError('Wrong password'); };

  useEffect(() => {
    if (!authed) return;
    supabase.from('rsvps').select('*').order('created_at', { ascending: false })
      .then(({ data, error: e }) => { setRsvps(!e ? (data || []) : []); });
  }, [authed]);

  const list = rsvps || [];
  const filtered = filter === 'all' ? list : filter === 'yes' ? list.filter(r => r.attending) : list.filter(r => !r.attending);
  const yesCount    = list.filter(r => r.attending).length;
  const noCount     = list.filter(r => !r.attending).length;
  const totalGuests = list.filter(r => r.attending).reduce((s, r) => s + (r.guest_count || 1), 0);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg-main, #F8F7F4)' }}>
        <div className="glass-card rounded-2xl p-8 w-full max-w-sm text-center">
          <Lock size={28} className="mx-auto mb-4" style={{ color: 'var(--sage-dark)' }} strokeWidth={1.2} />
          <h2 className="font-cormorant text-2xl font-semibold mb-6" style={{ color: 'var(--text-dark)' }}>Admin Access</h2>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
            placeholder="Enter password" className="w-full px-4 py-3 rounded-xl border bg-white/70 font-inter text-sm outline-none mb-3" style={{ borderColor: 'rgba(107,142,107,0.3)', color: 'var(--text-dark)' }} />
          {error && <p className="text-red-400 text-xs mb-3 font-inter">{error}</p>}
          <button onClick={login} className="btn-primary w-full">Enter Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--bg-main, #F8F7F4)' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-cormorant italic text-3xl text-center mb-2" style={{ color: 'var(--text-dark)' }}>Admin Dashboard</h1>
          <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-center mb-6" style={{ color: 'var(--sage-dark)' }}>
            {weddingData.couple.groom} &amp; {weddingData.couple.bride} · {weddingData.dates.headerDisplay}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { icon: <Users size={18} strokeWidth={1.5}/>,       label: 'Total RSVPs', value: list.length },
              { icon: <CheckCircle size={18} strokeWidth={1.5}/>, label: 'Attending',   value: yesCount },
              { icon: <XCircle size={18} strokeWidth={1.5}/>,     label: 'Not Coming',  value: noCount },
              { icon: <UtensilsCrossed size={18} strokeWidth={1.5}/>, label: 'Total Guests', value: totalGuests },
            ].map((s, i) => (
              <div key={i} className="glass-card rounded-xl p-3 text-center">
                <div className="flex justify-center mb-1" style={{ color: 'var(--sage-dark)' }}>{s.icon}</div>
                <p className="font-cormorant text-2xl font-bold" style={{ color: 'var(--text-dark)' }}>{s.value}</p>
                <p className="font-inter text-[8px] uppercase tracking-wider opacity-70" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Link generator */}
          <LinkGenerator />

          {/* Filter + CSV */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-1">
              {['all','yes','no'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-[9px] font-inter uppercase tracking-wider transition border ${filter === f ? 'text-white' : 'bg-white/60 opacity-70'}`}
                  style={filter === f ? { background: 'var(--sage-dark)', borderColor: 'var(--sage-dark)' } : { borderColor: 'rgba(107,142,107,0.2)', color: 'var(--text-muted)' }}>
                  {f === 'all' ? 'All' : f === 'yes' ? 'Attending' : 'Not Coming'}
                </button>
              ))}
            </div>
            <button onClick={() => exportCSV(list)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-inter font-semibold border hover:opacity-80 transition"
              style={{ background: 'rgba(184,145,58,0.1)', color: 'var(--gold)', borderColor: 'rgba(184,145,58,0.2)' }}>
              <Download size={11}/> CSV
            </button>
          </div>

          {/* Table */}
          {loading ? (
            <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-10 skeleton rounded-lg" />)}</div>
          ) : (
            <div className="glass-card rounded-xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'rgba(107,142,107,0.12)', background: 'rgba(107,142,107,0.05)' }}>
                    {['Name','Attending','Guests','Meal','Message','Date'].map(h => (
                      <th key={h} className="px-3 py-2.5 font-inter text-[8px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap" style={{ color: 'var(--sage-dark)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <motion.tr key={r.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="border-b hover:bg-white/40 transition-colors" style={{ borderColor: 'rgba(107,142,107,0.08)' }}>
                      <td className="px-3 py-2.5 font-cormorant text-[13px] font-semibold whitespace-nowrap" style={{ color: 'var(--text-dark)' }}>{r.name}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex items-center gap-1 text-[8px] font-inter uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap ${r.attending ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-500'}`}>
                          {r.attending ? <><CheckCircle size={8}/> Yes</> : <><XCircle size={8}/> No</>}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 font-inter text-[11px] text-center" style={{ color: 'var(--text-dark)' }}>{r.attending ? (r.guest_count || 1) : '-'}</td>
                      <td className="px-3 py-2.5 font-inter text-[10px] whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{r.meal_preference || '-'}</td>
                      <td className="px-3 py-2.5 font-inter text-[10px] italic max-w-[140px] truncate" style={{ color: 'var(--text-muted)' }}>{r.message || '-'}</td>
                      <td className="px-3 py-2.5 font-inter text-[9px] opacity-60 whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{new Date(r.created_at).toLocaleDateString('en-IN')}</td>
                    </motion.tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="text-center font-cormorant italic opacity-60 py-8" style={{ color: 'var(--text-muted)' }}>No RSVPs yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
