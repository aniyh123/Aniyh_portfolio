import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NODES = [
  {
    id: "frontend", num: "01",
    titleFr: "Développement Frontend",
    titleEn: "Frontend Development",
    descFr: "Création d'interfaces modernes, réactives et responsives avec React.js, Vue.js et React Native.",
    descEn: "Building modern, reactive and responsive interfaces with React.js, Vue.js and React Native.",
    icon: "react",
  },
  {
    id: "backend", num: "02",
    titleFr: "Développement Backend",
    titleEn: "Backend Development",
    descFr: "Conception d'API robustes, sécurisées et évolutives avec Node.js et Express.js.",
    descEn: "Designing robust, secure and scalable APIs with Node.js and Express.js.",
    icon: "node",
  },
  {
    id: "database", num: "03",
    titleFr: "Base de Données",
    titleEn: "Database Engineering",
    descFr: "Modélisation, optimisation et administration de bases de données relationnelles avec MySQL et PostgreSQL.",
    descEn: "Modeling, optimizing and administering relational databases with MySQL and PostgreSQL.",
    icon: "db",
  },
  {
    id: "devops", num: "04",
    titleFr: "Intégration & DevOps",
    titleEn: "Integration & DevOps",
    descFr: "Mise en place de pipelines CI/CD, conteneurisation avec Docker, orchestration Kubernetes et gestion de versions via Git & GitHub.",
    descEn: "Setting up CI/CD pipelines, Docker containerization, Kubernetes orchestration and version control via Git & GitHub.",
    icon: "devops",
  },
  {
    id: "project", num: "05",
    titleFr: "Gestion de Projet & Méthodologie",
    titleEn: "Project Management & Methodologies",
    descFr: "Application des méthodologies Agile (Scrum) et UML pour une livraison rapide, structurée et de qualité.",
    descEn: "Applying Agile (Scrum) and UML methodologies for fast, structured and quality delivery.",
    icon: "project",
  },
];

function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function tokens(dark) {
  return {
    bgPage: dark ? "#1a0e08" : "#fff8f4",
    textPrimary: dark ? "#fde0d0" : "#3a1508",
    textSecondary: dark ? "#f5b99a" : "#7a3618",
    textMuted: dark ? "rgba(245,185,154,0.5)" : "rgba(122,54,24,0.55)",
    textAccent: dark ? "#e8905e" : "#c9683a",
    accent: "#c9683a",
    accentLight: "#e8905e",
    accentGlow: dark ? "rgba(201,104,58,0.25)" : "rgba(201,104,58,0.15)",
    thread: dark ? "#e8905e" : "#c9683a",
    threadSoft: dark ? "rgba(232,144,94,0.35)" : "rgba(201,104,58,0.35)",
    cardBg: dark
      ? "linear-gradient(135deg,rgba(42,22,10,0.98),rgba(26,14,8,0.98))"
      : "linear-gradient(135deg,rgba(255,248,244,0.98),rgba(253,240,232,0.98))",
    cardBgHov: dark
      ? "linear-gradient(135deg,rgba(58,30,12,0.99),rgba(42,22,10,0.99))"
      : "linear-gradient(135deg,rgba(255,255,255,0.99),rgba(253,245,240,0.99))",
    cardTitleColor: dark ? "rgba(253,224,208,0.9)" : "#3a1508",
    cardTitleHov: dark ? "#fde0d0" : "#2a0d06",
    cardDescColor: dark ? "rgba(245,185,154,0.55)" : "rgba(58,21,8,0.6)",
    badgeBg: dark ? "rgba(26,14,8,0.98)" : "#fde0d0",
    badgeBorder: dark ? "rgba(201,104,58,0.5)" : "rgba(201,104,58,0.55)",
    badgeText: dark ? "#e8905e" : "#a04e27",
    scallop: dark ? "rgba(201,104,58,0.45)" : "rgba(201,104,58,0.5)",
    borderCard: dark ? "rgba(201,104,58,0.22)" : "rgba(201,104,58,0.32)",
    borderBadge: dark ? "rgba(201,104,58,0.4)" : "rgba(201,104,58,0.5)",
  };
}

function NodeIcon({ type, size = 36 }) {
  const s = size;
  const c = "#c9683a";
  if (type === "react") return (
    <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="22" r="4" fill={c}/>
      <ellipse cx="22" cy="22" rx="18" ry="7" stroke={c} strokeWidth="1.8" fill="none"/>
      <ellipse cx="22" cy="22" rx="18" ry="7" stroke={c} strokeWidth="1.8" fill="none" transform="rotate(60 22 22)"/>
      <ellipse cx="22" cy="22" rx="18" ry="7" stroke={c} strokeWidth="1.8" fill="none" transform="rotate(120 22 22)"/>
    </svg>
  );
  if (type === "node") return (
    <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
      <rect x="4" y="4" width="36" height="36" rx="10" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="1.5"/>
      <text x="22" y="29" textAnchor="middle" fontSize="16" fontWeight="700" fill={c} fontFamily="monospace">JS</text>
    </svg>
  );
  if (type === "db") return (
    <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
      <ellipse cx="22" cy="13" rx="14" ry="5" stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.1"/>
      <path d="M8 13v7c0 2.76 6.27 5 14 5s14-2.24 14-5v-7" stroke={c} strokeWidth="1.8" fill="none"/>
      <path d="M8 20v7c0 2.76 6.27 5 14 5s14-2.24 14-5v-7" stroke={c} strokeWidth="1.8" fill="none"/>
    </svg>
  );
  if (type === "devops") return (
    <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
      <path d="M10 22a12 12 0 0 1 20-8.5" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path d="M34 22a12 12 0 0 1-20 8.5" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <path d="M27 11l4 3-4 3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M17 27l-4 3 4 3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
  if (type === "project") return (
    <svg width={s} height={s} viewBox="0 0 44 44" fill="none">
      <circle cx="15" cy="13" r="5" stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.1"/>
      <circle cx="29" cy="13" r="5" stroke={c} strokeWidth="1.8" fill={c} fillOpacity="0.1"/>
      <path d="M5 38c0-5.52 4.48-10 10-10h14c5.52 0 10 4.48 10 10" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
  return null;
}

const STEPS = [{ side: "up" }, { side: "down" }, { side: "up" }, { side: "down" }, { side: "up" }];

function buildStitchPath(width, height, n) {
  const margin = 70;
  const usable = width - margin * 2;
  const step = usable / (n - 1);
  const yUp = height * 0.32;
  const yDown = height * 0.68;
  let d = "";
  for (let i = 0; i < n; i++) {
    const x = margin + step * i;
    const y = STEPS[i].side === "up" ? yUp : yDown;
    if (i === 0) {
      d += `M ${x} ${y}`;
    } else {
      const px = margin + step * (i - 1);
      const py = STEPS[i - 1].side === "up" ? yUp : yDown;
      const mx = (px + x) / 2;
      d += ` Q ${mx} ${py} ${mx} ${(py + y) / 2} T ${x} ${y}`;
    }
  }
  return { d, points: STEPS.map((s, i) => ({ x: margin + step * i, y: s.side === "up" ? yUp : yDown })) };
}

const VB_W = 1200, VB_H = 420;
const STITCH = buildStitchPath(VB_W, VB_H, NODES.length);

function StitchLine({ tk, hoveredIdx, dashOff }) {
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <path d={STITCH.d} fill="none" stroke={tk.thread} strokeWidth="2"
        strokeDasharray="10 8" strokeDashoffset={-dashOff} strokeLinecap="round" opacity="0.55"/>
      {STITCH.points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={hoveredIdx === i ? 7 : 5} fill={tk.thread}
            opacity={hoveredIdx === i ? 1 : 0.75} style={{ transition: "r 0.2s, opacity 0.2s" }}/>
          <circle cx={p.x} cy={p.y} r={hoveredIdx === i ? 13 : 9} fill="none" stroke={tk.thread}
            strokeWidth="1" opacity={hoveredIdx === i ? 0.5 : 0.25} style={{ transition: "r 0.2s, opacity 0.2s" }}/>
        </g>
      ))}
    </svg>
  );
}

function StitchedBorder({ tk, delay }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"
      style={{ pointerEvents: "none" }}>
      <motion.rect
        x="1.5" y="1.5" width="97" height="97" rx="9"
        fill="none" stroke={tk.thread} strokeWidth="1.6"
        strokeDasharray="3 2.2" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.9 }}
        viewport={{ once: true }}
        transition={{
          pathLength: { duration: 2.4, delay, ease: [0.25, 0.1, 0.3, 1] },
          opacity: { duration: 0.4, delay },
        }}
      />
    </svg>
  );
}

function scallopStyle(color) {
  return {
    backgroundImage: `radial-gradient(circle at 6px 0px, transparent 5px, ${color} 5.5px, ${color} 6px, transparent 6.5px)`,
    backgroundSize: "12px 7px",
    backgroundRepeat: "repeat-x",
    backgroundPosition: "bottom",
    height: 7,
    width: "100%",
    opacity: 0.6,
  };
}

function StepCard({ node, lang, hov, onEnter, onLeave, side, tk, idx }) {
  const title = lang === "fr" ? node.titleFr : node.titleEn;
  const desc = lang === "fr" ? node.descFr : node.descEn;
  const delay = idx * 0.55;

  return (
    <motion.div
      className="flex-1 flex flex-col items-center px-2"
      style={{ marginTop: side === "down" ? "13%" : "0%" }}
      initial={{ opacity: 0, y: 24, rotate: side === "down" ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.34, 1.2, 0.4, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.div
        className="relative w-full max-w-[210px] rounded-2xl p-4 flex flex-col items-start gap-2"
        animate={{ rotate: [0, 1.4, 0, -1.4, 0], y: [0, -2, 0, 2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: delay + 2.6 }}
        style={{
          background: hov ? tk.cardBgHov : tk.cardBg,
          boxShadow: hov
            ? `0 0 20px ${tk.accentGlow}, 0 0 36px rgba(201,104,58,0.05)`
            : "0 2px 10px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s ease, background 0.3s ease",
        }}
      >
        <StitchedBorder tk={tk} delay={delay + 0.2} />

        <motion.div
          className="flex items-center justify-between w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.9 }}
        >
          <NodeIcon type={node.icon} size={32}/>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: tk.badgeBg, border: `1px solid ${tk.badgeBorder}`, color: tk.badgeText }}>
            {node.num}
          </span>
        </motion.div>
        <motion.h3
          className="font-bold text-sm leading-tight"
          style={{ color: hov ? tk.cardTitleHov : tk.cardTitleColor }}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 1.2 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-xs leading-relaxed" style={{ color: tk.cardDescColor }}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 1.45 }}
        >
          {desc}
        </motion.p>

        <div style={scallopStyle(tk.scallop)} />
      </motion.div>
    </motion.div>
  );
}

function MobileLayout({ lang, tk }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 relative">
      <div className="absolute left-6 top-0 bottom-0 w-px"
        style={{ background: `repeating-linear-gradient(to bottom, ${tk.thread} 0 6px, transparent 6px 12px)`, opacity: 0.5 }}/>
      {NODES.map((node, i) => {
        const title = lang === "fr" ? node.titleFr : node.titleEn;
        const desc = lang === "fr" ? node.descFr : node.descEn;
        return (
          <motion.div key={node.id}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="ml-10 relative rounded-2xl p-4 flex items-start gap-3"
            style={{ background: tk.cardBg }}
          >
            <StitchedBorder tk={tk} delay={i * 0.12} />
            <div className="absolute -left-[34px] top-5 w-3 h-3 rounded-full" style={{ background: tk.thread }}/>
            <div className="shrink-0"><NodeIcon type={node.icon} size={32}/></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: tk.badgeBg, color: tk.badgeText, border: `1px solid ${tk.badgeBorder}` }}>
                  {node.num}
                </span>
                <h3 className="text-sm font-bold" style={{ color: tk.cardTitleColor }}>{title}</h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: tk.cardDescColor }}>{desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Services() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "fr";
  const dark = useTheme();
  const tk = tokens(dark);

  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dashOff, setDashOff] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let raf, start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      setDashOff(((ts - start) / 45) % 300);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="services"
      className="relative min-h-screen overflow-hidden px-6 py-24 transition-colors duration-500"
      style={{ background: tk.bgPage, color: tk.textPrimary }}
    >
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.3, 1] }}
          className="flex items-start gap-4 mb-16"
        >
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: 4,
              height: 72,
              background: tk.accent,
              borderRadius: 2,
              flexShrink: 0,
              marginTop: 4,
              transformOrigin: "top",
            }}
          />
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span
                className="text-xs font-semibold tracking-[3px] uppercase"
                style={{ color: tk.accent }}
              >
                {lang === "fr" ? "Mes Services" : "My Services"}
              </span>
              <span style={{ fontSize: 11, color: tk.textMuted, opacity: 0.6 }}>
                / 03
              </span>
            </div>
            <h2
              className="font-black leading-tight"
              style={{
                fontSize: "clamp(22px, 4vw, 36px)",
                color: tk.textPrimary,
                margin: 0,
              }}
            >
              {lang === "fr" ? "Ce que je sais faire," : "What I actually do,"}{" "}
              <span style={{ color: tk.accent }}>
                {lang === "fr" ? "expliqué simplement" : "explained simply"}
              </span>
            </h2>
          </div>
        </motion.div>

        {isMobile ? (
          <MobileLayout lang={lang} tk={tk}/>
        ) : (
          <div className="relative mt-16" style={{ height: 420 }}>
            <StitchLine tk={tk} hoveredIdx={hovered} dashOff={dashOff}/>
            <div className="relative z-10 flex h-full items-stretch">
              {NODES.map((node, i) => (
                <StepCard
                  key={node.id}
                  node={node}
                  lang={lang}
                  idx={i}
                  side={STEPS[i].side}
                  hov={hovered === i}
                  onEnter={() => setHovered(i)}
                  onLeave={() => setHovered(null)}
                  tk={tk}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}