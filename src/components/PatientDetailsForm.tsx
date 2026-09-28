import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Stethoscope,
  Calendar,
  Clock,
  ChevronDown,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Home as HomeIcon,
  Activity,
  ClipboardList,
  HeartPulse,
  Users,
  LogIn,
  Menu,
  X,
} from "lucide-react";

const REDIRECT_SECONDS = 6;

function goHome() {
  window.location.href = "/";
}

// Brand logo (embedded so the component stays self-contained)
const LOGO_SRC =
  "data:image/webp;base64,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";

const NAV_LINKS = [
  { label: "Home", icon: HomeIcon },
  { label: "Symptom Analyser", icon: Activity },
  { label: "Report Analyser", icon: ClipboardList },
  { label: "Recovery Tracker", icon: HeartPulse },
  { label: "Our Doctors", icon: Users },
];

const DOCTORS = [
  { id: "rajesh-kumar", name: "Dr. Rajesh Kumar", specialty: "General Physician" },
  { id: "priya-sharma", name: "Dr. Priya Sharma", specialty: "Dermatologist" },
  { id: "anjali-reddy", name: "Dr. Anjali Reddy", specialty: "Cardiologist" },
  { id: "arjun-patel", name: "Dr. Arjun Patel", specialty: "Orthopedic Surgeon" },
  { id: "suresh-varma", name: "Dr. Suresh Varma", specialty: "Neurologist" },
  { id: "kavitha-rao", name: "Dr. Kavitha Rao", specialty: "Pediatrician" },
];

function getDoctorById(id) {
  return DOCTORS.find((d) => d.id === id) || null;
}

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

const EMPTY_FORM = { name: "", phone: "", email: "", doctor: "", date: "", time: "" };

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function Navbar() {
  const [hovered, setHovered] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <button type="button" onClick={goHome} style={styles.navBrand} className="nav-brand">
          <img src={LOGO_SRC} alt="Med AI Assist logo" style={styles.navLogo} />
          <span style={styles.navBrandName}>Med AI Assist</span>
        </button>

        <div style={styles.navLinks} className="nav-links">
          {NAV_LINKS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={goHome}
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
              className="nav-link"
              style={{ ...styles.navLink, ...(hovered === label ? styles.navLinkHover : {}) }}
            >
              <Icon size={14} style={{ opacity: 0.8 }} />
              {label}
            </button>
          ))}
        </div>

        <div style={styles.navActions} className="nav-actions">
          <button
            type="button"
            aria-current="page"
            style={styles.navBookBtn}
            className="nav-book-btn"
          >
            <span className="nav-active-dot" />
            Book Appointment
          </button>
          <button type="button" style={styles.navLoginBtn} className="nav-login-btn">
            <LogIn size={14} />
            Login
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          style={styles.navMenuBtn}
          className="nav-menu-btn"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={styles.navMobilePanel} className="fade-in">
          {NAV_LINKS.map(({ label, icon: Icon }) => (
            <button key={label} type="button" onClick={goHome} style={styles.navMobileLink}>
              <Icon size={15} />
              {label}
            </button>
          ))}
          <div style={styles.navMobileActions}>
            <button type="button" aria-current="page" style={styles.navBookBtn} className="nav-book-btn">
              <span className="nav-active-dot" />
              Book Appointment
            </button>
            <button type="button" style={styles.navLoginBtn} className="nav-login-btn">
              <LogIn size={14} />
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Two entry points into this same form:
//
// 1) From the HOME page — link straight to the booking page with no doctor
//    context, so the dropdown starts empty and the user picks for themself:
//      <a href="/book-appointment">Book Appointment</a>
//
// 2) From a DOCTOR's profile page — pass that doctor along via a `doctor`
//    query param (its id from the DOCTORS list above), and this component
//    pre-fills the dropdown with it:
//      <a href={`/book-appointment?doctor=${doctor.id}`}>Book Appointment</a>
//
// If you're wiring this into a router that hands off state directly instead
// of a URL (e.g. React Router's <Link state={...}>), pass the same id as the
// `preselectedDoctorId` prop — it takes priority over the URL param:
//      <AppointmentBookingSimple preselectedDoctorId="priya-sharma" />
// ---------------------------------------------------------------------------
export default function AppointmentBookingSimple({ preselectedDoctorId } = {}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [shaking, setShaking] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [booking, setBooking] = useState(null);
  const [doctorPrefilled, setDoctorPrefilled] = useState(false);
  const topRef = useRef(null);

  // Decide the starting doctor once, on mount: prop first, then URL param,
  // otherwise leave it empty so the user chooses.
  useEffect(() => {
    let initialId = "";

    if (preselectedDoctorId && getDoctorById(preselectedDoctorId)) {
      initialId = preselectedDoctorId;
    } else if (typeof window !== "undefined") {
      const fromUrl = new URLSearchParams(window.location.search).get("doctor");
      if (fromUrl && getDoctorById(fromUrl)) initialId = fromUrl;
    }

    if (initialId) {
      setForm((f) => ({ ...f, doctor: initialId }));
      setDoctorPrefilled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearPrefilledDoctor() {
    setForm((f) => ({ ...f, doctor: "" }));
    setDoctorPrefilled(false);
  }

  const set = (key) => (e) => {
    if (key === "doctor") setDoctorPrefilled(false);
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  function clearShake(field) {
    setShaking((prev) => {
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  }

  function validate() {
    const missing = new Set();
    if (!form.name.trim()) missing.add("name");
    if (!form.phone.trim() || form.phone.trim().length < 7) missing.add("phone");
    if (!form.email.trim() || !form.email.includes("@")) missing.add("email");
    if (!form.doctor) missing.add("doctor");
    if (!form.date) missing.add("date");
    if (!form.time) missing.add("time");
    return missing;
  }

  function handleSubmit() {
    const missing = validate();
    if (missing.size > 0) {
      setShaking(missing);
      const el = document.getElementById(`field-${[...missing][0]}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setBooking(form);
    setSubmitted(true);
  }

  function handleClear() {
    setForm(EMPTY_FORM);
    setShaking(new Set());
  }

  function reset() {
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setBooking(null);
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div style={styles.page} ref={topRef}>
      <style>{css}</style>
      <Navbar />

      <div style={styles.wrap}>
        <button type="button" onClick={goHome} className="back-link" style={styles.backLink}>
          <ArrowLeft size={15} className="back-arrow" />
          Back to home
        </button>

        <h1 style={styles.title}>Book a Doctor Appointment</h1>
        <p style={styles.subtitle}>Skip the wait — book your visit with a trusted specialist in minutes.</p>

        <div style={styles.card} className="fade-in">
          {!submitted ? (
            <>
              <div style={styles.grid}>
                <Field
                  id="field-name"
                  label="Patient Name"
                  icon={<User size={14} />}
                  error={shaking.has("name")}
                  onAnimEnd={() => clearShake("name")}
                >
                  <input
                    type="text"
                    placeholder="Ananya Verma"
                    value={form.name}
                    onChange={set("name")}
                    style={styles.input}
                  />
                </Field>

                <Field
                  id="field-phone"
                  label="Phone Number"
                  icon={<Phone size={14} />}
                  error={shaking.has("phone")}
                  onAnimEnd={() => clearShake("phone")}
                >
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={set("phone")}
                    style={styles.input}
                  />
                </Field>

                <Field
                  id="field-email"
                  label="Email"
                  icon={<Mail size={14} />}
                  error={shaking.has("email")}
                  onAnimEnd={() => clearShake("email")}
                >
                  <input
                    type="email"
                    placeholder="ananya.verma@email.com"
                    value={form.email}
                    onChange={set("email")}
                    style={styles.input}
                  />
                </Field>

                <Field
                  id="field-doctor"
                  label="Doctor"
                  icon={<Stethoscope size={14} />}
                  error={shaking.has("doctor")}
                  onAnimEnd={() => clearShake("doctor")}
                >
                  <div style={styles.selectShell}>
                    <select value={form.doctor} onChange={set("doctor")} style={styles.select}>
                      <option value="">Choose a specialist</option>
                      {DOCTORS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} — {d.specialty}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} style={styles.selectChevron} />
                  </div>
                  {doctorPrefilled && form.doctor && (
                    <div style={styles.prefillNote} className="fade-in">
                      Pre-filled from doctor profile
                      <button type="button" onClick={clearPrefilledDoctor} style={styles.prefillChangeBtn}>
                        Change
                      </button>
                    </div>
                  )}
                </Field>

                <Field
                  id="field-date"
                  label="Preferred Date"
                  icon={<Calendar size={14} />}
                  error={shaking.has("date")}
                  onAnimEnd={() => clearShake("date")}
                >
                  <input
                    type="date"
                    min={todayISO()}
                    value={form.date}
                    onChange={set("date")}
                    style={styles.input}
                  />
                </Field>

                <Field
                  id="field-time"
                  label="Preferred Time"
                  icon={<Clock size={14} />}
                  error={shaking.has("time")}
                  onAnimEnd={() => clearShake("time")}
                >
                  <div style={styles.selectShell}>
                    <select value={form.time} onChange={set("time")} style={styles.select}>
                      <option value="">Choose a slot</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={15} style={styles.selectChevron} />
                  </div>
                </Field>
              </div>

              <div style={styles.actions}>
                <button type="button" onClick={handleSubmit} className="book-btn" style={styles.bookBtn}>
                  Book Appointment
                </button>
                <button type="button" onClick={handleClear} className="clear-btn" style={styles.clearBtn}>
                  Clear
                </button>
              </div>
            </>
          ) : (
            <SuccessPanel booking={booking} onReset={reset} />
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ id, label, icon, children, error, onAnimEnd }) {
  return (
    <div id={id} style={styles.field}>
      <span style={styles.label}>
        <span style={styles.labelIcon}>{icon}</span>
        {label}
      </span>
      <div className={error ? "shake field-error" : ""} onAnimationEnd={onAnimEnd}>
        {children}
      </div>
    </div>
  );
}

function SuccessPanel({ booking, onReset }) {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      goHome();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  if (!booking) return null;
  const progress = ((REDIRECT_SECONDS - secondsLeft) / REDIRECT_SECONDS) * 100;

  return (
    <div style={styles.successWrap} className="fade-in">
      <svg viewBox="0 0 52 52" width="52" height="52" style={{ marginBottom: 14 }}>
        <circle className="check-circle" cx="26" cy="26" r="24" fill="none" stroke="#00B4D8" strokeWidth="2.5" />
        <path className="check-mark" fill="none" stroke="#8E24AA" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M15 27 L23 35 L38 18" />
      </svg>

      <h2 style={styles.successTitle}>Appointment booked</h2>
      <p style={styles.successSub}>A confirmation has been sent to {booking.email}.</p>

      <div style={styles.summaryCard}>
        <SummaryRow icon={<User size={14} />} label="Patient" value={booking.name} />
        <SummaryRow
          icon={<Stethoscope size={14} />}
          label="Doctor"
          value={getDoctorById(booking.doctor)?.name || booking.doctor}
        />
        <SummaryRow icon={<Calendar size={14} />} label="Date" value={booking.date} />
        <SummaryRow icon={<Clock size={14} />} label="Time" value={booking.time} />
      </div>

      <div style={styles.actions}>
        <button type="button" onClick={onReset} className="clear-btn" style={styles.clearBtn}>
          <RotateCcw size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
          Book another
        </button>
        <button type="button" onClick={goHome} className="book-btn" style={styles.bookBtn}>
          <HomeIcon size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
          Back to home
        </button>
      </div>

      <div style={styles.redirectNote}>
        <div style={styles.redirectTrack}>
          <div style={{ ...styles.redirectFill, width: `${progress}%` }} />
        </div>
        <span>Returning to home in {secondsLeft}s…</span>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value }) {
  return (
    <div style={styles.summaryRow}>
      <span style={styles.summaryIcon}>{icon}</span>
      <span style={styles.summaryLabel}>{label}</span>
      <span style={styles.summaryValue}>{value}</span>
    </div>
  );
}

const font = { body: "'Work Sans','Segoe UI',sans-serif" };

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F7FBFC",
    fontFamily: font.body,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wrap: { width: "100%", maxWidth: 860, padding: "44px 20px 56px" },

  nav: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    width: "100%",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid #EEF2F6",
  },
  navInner: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "0 24px",
    height: 68,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    marginRight: 18,
  },
  navLogo: { width: 30, height: 30, objectFit: "contain", borderRadius: 7 },
  navBrandName: { fontSize: 14.5, fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap" },
  navLinks: { display: "flex", alignItems: "center", gap: 4, flex: 1 },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    padding: "9px 12px",
    borderRadius: 999,
    fontSize: 13.5,
    fontWeight: 600,
    color: "#475569",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  navLinkHover: { background: "#F0FBFD", color: "#00B4D8" },
  navActions: { display: "flex", alignItems: "center", gap: 10 },
  navLoginBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#fff",
    border: "1.5px solid #E2E8F0",
    color: "#334155",
    padding: "9px 16px",
    borderRadius: 999,
    fontSize: 13.5,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  navBookBtn: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 7,
    backgroundImage: "linear-gradient(100deg,#00B4D8,#76FF03)",
    backgroundSize: "220% auto",
    border: "none",
    color: "#fff",
    padding: "9px 18px",
    borderRadius: 999,
    fontSize: 13.5,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    boxShadow: "0 0 0 2px rgba(0,180,216,0.18)",
  },
  navMenuBtn: {
    display: "none",
    background: "none",
    border: "1.5px solid #E2E8F0",
    borderRadius: 10,
    padding: 7,
    color: "#0F172A",
    cursor: "pointer",
    marginLeft: "auto",
  },
  navMobilePanel: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "10px 20px 18px",
    borderTop: "1px solid #EEF2F6",
  },
  navMobileLink: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "none",
    border: "none",
    padding: "10px 4px",
    fontSize: 14,
    fontWeight: 600,
    color: "#334155",
    cursor: "pointer",
    textAlign: "left",
  },
  navMobileActions: { display: "flex", gap: 10, marginTop: 10 },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    color: "#00B4D8",
    fontSize: 13.5,
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
    marginBottom: 22,
  },
  title: { fontSize: "clamp(28px, 4vw, 34px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" },
  subtitle: { fontSize: 15, color: "#64748B", marginTop: 8, marginBottom: 30 },

  card: {
    background: "#fff",
    borderRadius: 24,
    padding: "34px 32px",
    boxShadow: "0 20px 45px -25px rgba(15,23,42,0.18)",
    border: "1px solid #EEF2F6",
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 24, rowGap: 20 },
  field: { display: "flex", flexDirection: "column" },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    color: "#475569",
    marginBottom: 9,
  },
  labelIcon: { display: "flex", color: "#94A3B8" },

  input: {
    width: "100%",
    padding: "12px 18px",
    borderRadius: 999,
    border: "1.5px solid #E2E8F0",
    background: "#fff",
    fontSize: 14.5,
    color: "#0F172A",
    outline: "none",
    fontFamily: font.body,
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  },
  selectShell: { position: "relative", display: "flex", alignItems: "center" },
  select: {
    width: "100%",
    padding: "12px 40px 12px 18px",
    borderRadius: 999,
    border: "1.5px solid #E2E8F0",
    background: "#fff",
    fontSize: 14.5,
    color: "#0F172A",
    outline: "none",
    appearance: "none",
    fontFamily: font.body,
    cursor: "pointer",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  },
  selectChevron: { position: "absolute", right: 16, color: "#94A3B8", pointerEvents: "none" },
  prefillNote: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    fontSize: 11.5,
    color: "#8E24AA",
    fontWeight: 600,
  },
  prefillChangeBtn: {
    background: "none",
    border: "none",
    padding: 0,
    color: "#00B4D8",
    fontSize: 11.5,
    fontWeight: 700,
    textDecoration: "underline",
    cursor: "pointer",
  },

  actions: { display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" },
  bookBtn: {
    backgroundImage: "linear-gradient(100deg,#00B4D8,#76FF03)",
    backgroundSize: "220% auto",
    color: "#fff",
    border: "none",
    padding: "13px 28px",
    borderRadius: 999,
    fontSize: 14.5,
    fontWeight: 700,
    cursor: "pointer",
  },
  clearBtn: {
    background: "#fff",
    color: "#334155",
    border: "1.5px solid #E2E8F0",
    padding: "13px 24px",
    borderRadius: 999,
    fontSize: 14.5,
    fontWeight: 700,
    cursor: "pointer",
  },

  successWrap: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "10px 0" },
  successTitle: { fontSize: 21, fontWeight: 800, color: "#0F172A" },
  successSub: { fontSize: 13.5, color: "#64748B", marginTop: 6 },
  summaryCard: { marginTop: 22, width: "100%", maxWidth: 380, border: "1.5px solid #EEF2F6", borderRadius: 16, padding: "4px 16px" },
  summaryRow: { display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: "1px solid #F1F5F9", fontSize: 13.5 },
  summaryIcon: { color: "#00B4D8", display: "flex" },
  summaryLabel: { color: "#64748B", width: 62, flexShrink: 0, textAlign: "left" },
  summaryValue: { color: "#0F172A", fontWeight: 600, textAlign: "right", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },

  redirectNote: { marginTop: 22, width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, fontSize: 12, color: "#64748B" },
  redirectTrack: { width: "100%", height: 4, borderRadius: 999, background: "#F1F5F9", overflow: "hidden" },
  redirectFill: { height: "100%", backgroundImage: "linear-gradient(90deg,#00B4D8,#8E24AA,#76FF03)", borderRadius: 999, transition: "width 1s linear" },
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700;800&display=swap');

@media (max-width: 640px) {
  div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
}

button { font-family: inherit; }

.nav-link { transition: background 0.15s ease, color 0.15s ease; position: relative; }
.nav-link::after {
  content: "";
  position: absolute;
  left: 12px; right: 12px; bottom: 4px;
  height: 2px;
  background: #00B4D8;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
}
.nav-link:hover::after { transform: scaleX(1); }

.nav-brand { transition: opacity 0.15s ease; }
.nav-brand:hover { opacity: 0.8; }

.nav-login-btn { transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease; }
.nav-login-btn:hover { border-color: #8E24AA; color: #8E24AA; transform: translateY(-1px); }

.nav-book-btn { transition: transform 0.15s ease, box-shadow 0.15s ease, background-position 0.6s ease; }
.nav-book-btn:hover { transform: translateY(-1px); background-position: 100% center; box-shadow: 0 0 0 2px rgba(142,36,170,0.22); }

.nav-active-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #fff; display: inline-block;
  box-shadow: 0 0 0 0 rgba(255,255,255,0.7);
  animation: navDotPulse 1.8s ease-in-out infinite;
}
@keyframes navDotPulse {
  0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.6); }
  70% { box-shadow: 0 0 0 6px rgba(255,255,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
}

.nav-menu-btn { transition: border-color 0.15s ease; }
.nav-menu-btn:hover { border-color: #00B4D8; }

@media (max-width: 980px) {
  .nav-links { display: none !important; }
  .nav-actions { display: none !important; }
  .nav-menu-btn { display: inline-flex !important; align-items: center; justify-content: center; }
}

.back-link { transition: color 0.15s ease, gap 0.15s ease; }
.back-link:hover { color: #8E24AA; }
.back-arrow { transition: transform 0.15s ease; }
.back-link:hover .back-arrow { transform: translateX(-3px); }

input:focus, select:focus {
  border-color: #00B4D8 !important;
  box-shadow: 0 0 0 4px rgba(0,180,216,0.14);
}

.field-error input, .field-error select {
  border-color: #E5484D !important;
  box-shadow: 0 0 0 4px rgba(229,72,77,0.12) !important;
}

.book-btn { transition: transform 0.16s ease, box-shadow 0.16s ease, background-position 0.6s ease; }
.book-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 26px -12px rgba(0,180,216,0.55); background-position: 100% center; }
.book-btn:active { transform: translateY(0); }

.clear-btn { transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease; }
.clear-btn:hover { border-color: #8E24AA; color: #8E24AA; transform: translateY(-2px); }

.fade-in { animation: fadeIn 0.5s ease both; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.shake { animation: shake 0.4s ease; }
@keyframes shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}

.check-circle { stroke-dasharray: 152; stroke-dashoffset: 152; animation: drawCircle 0.6s ease forwards; }
.check-mark { stroke-dasharray: 40; stroke-dashoffset: 40; animation: drawCheck 0.4s 0.5s ease forwards; }
@keyframes drawCircle { to { stroke-dashoffset: 0; } }
@keyframes drawCheck { to { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  .fade-in, .shake, .check-circle, .check-mark, .book-btn, .clear-btn, .back-link, .back-arrow,
  .nav-link, .nav-brand, .nav-login-btn, .nav-book-btn, .nav-active-dot, .nav-menu-btn {
    animation: none !important; transition: none !important;
  }
}
`;
