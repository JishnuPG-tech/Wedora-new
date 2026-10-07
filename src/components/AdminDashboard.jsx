import { useEffect, useMemo, useState } from "react";
import { Download, LogOut, Search, Users, CheckCircle2, XCircle, LayoutDashboard } from "lucide-react";
import { supabase } from "../config/supabase";

function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session || !supabase) return;
    setLoading(true);
    supabase.from("rsvps").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      setRows(data || []);
      setMessage(error ? "Could not load RSVPs. Check your RLS policy." : "");
      setLoading(false);
    });
  }, [session]);

  const filtered = useMemo(() => rows.filter((row) => String(row.name || "").toLowerCase().includes(query.toLowerCase())), [rows, query]);
  const attending = rows.filter((row) => row.attending).length;
  const guests = rows.filter((row) => row.attending).reduce((sum, row) => sum + Number(row.guest_count || 0), 0);

  const signIn = async (event) => {
    event.preventDefault();
    if (!supabase) return setMessage("Supabase is not configured.");
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage("Sign-in failed. Check the host account.");
  };

  const exportCsv = () => {
    const headers = ["Name", "Attending", "Guests", "Meal", "Message"];
    const csv = [headers, ...rows.map((row) => [row.name, row.attending ? "Yes" : "No", row.guest_count, row.meal_preference, row.message])]
      .map((line) => line.map((cell) => '"' + String(cell ?? "").replace(/"/g, '""') + '"').join(",")).join("\\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = "wedora-rsvps.csv";
    link.click();
  };

  if (!supabase || !session) {
    return (
      <div className="admin-shell">
        <div className="admin-login">
          <div className="admin-mark">A&M</div>
          <span className="eyebrow">Wedora host studio</span>
          <h1>Welcome back.</h1>
          <p>Sign in with the Supabase host account connected to this invitation.</p>
          {!supabase && <div className="admin-warning">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable the host studio.</div>}
          {supabase && <form onSubmit={signIn}><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Host email" required /><input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required /><button className="solid-action">Enter host studio</button></form>}
          {message && <p className="admin-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand"><LayoutDashboard size={16} /> Wedora</div>
        <span>Host studio</span>
        <nav><a className="active">Overview</a><a>Guest list</a><a>Invitation analytics</a></nav>
        <button className="admin-signout" onClick={() => supabase.auth.signOut()}><LogOut size={15} /> Sign out</button>
      </aside>
      <main className="admin-main">
        <div className="admin-header"><div><span className="eyebrow">Private space</span><h1>Wedding overview</h1></div><button className="outline-action" onClick={exportCsv}><Download size={15} /> Export CSV</button></div>
        <div className="admin-stats">
          <div><span>Total replies</span><strong>{rows.length}</strong><small><Users size={14} /> Responses</small></div>
          <div><span>Attending</span><strong>{attending}</strong><small><CheckCircle2 size={14} /> Confirmed</small></div>
          <div><span>Not attending</span><strong>{rows.length - attending}</strong><small><XCircle size={14} /> Declined</small></div>
          <div><span>Total guests</span><strong>{guests}</strong><small><Users size={14} /> Seats</small></div>
        </div>
        <div className="admin-table-card">
          <div className="admin-table-head"><div><h2>Guest responses</h2><p>{loading ? "Loading…" : filtered.length + " visible responses"}</p></div><label className="admin-search"><Search size={15} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guests" /></label></div>
          <div className="admin-table-scroll"><table><thead><tr><th>Name</th><th>Attendance</th><th>Guests</th><th>Meal</th><th>Message</th></tr></thead><tbody>{filtered.map((row) => <tr key={row.id}><td>{row.name}</td><td><span className={row.attending ? "status yes" : "status no"}>{row.attending ? "Attending" : "Declined"}</span></td><td>{row.attending ? row.guest_count : "—"}</td><td>{row.attending ? row.meal_preference : "—"}</td><td>{row.message || "—"}</td></tr>)}</tbody></table></div>
          {message && <div className="admin-warning">{message}</div>}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
