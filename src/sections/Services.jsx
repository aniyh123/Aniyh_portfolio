import { useEffect, useRef, useState } from "react";
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
    bgStop0: dark ? "#020817" : "#e8f2ff",
    bgStop1: dark ? "#020817" : "#ffffff",
    blobColor: dark ? "transparent" : "transparent",
    accent: "#2dd4ff",
    accentAlt: "#38bdf8",
    cgStop0: dark ? "#1a6faa" : "#1e90d4",
    cgStop1: dark ? "#0d3a5e" : "#1a70b0",
    cgStop2: dark ? "#050e1e" : "#0f4a80",
    haloOp0: dark ? "0.3"  : "0.18",
    haloOp1: dark ? "0.1"  : "0.06",
    lineBaseOp:  dark ? "0.28" : "0.45",
    lineHovOp:   dark ? "0.75" : "0.9",
    centerTextWhite:   dark ? "#ffffff"      : "#0f172a",
    centerTextSub:     dark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.45)",
    cardBg:       dark ? "linear-gradient(135deg,rgba(8,20,52,0.92),rgba(4,10,28,0.96))"
                       : "linear-gradient(135deg,rgba(240,248,255,0.95),rgba(220,238,255,0.98))",
    cardBgHov:    dark ? "linear-gradient(135deg,rgba(18,48,95,0.97),rgba(8,22,50,0.99))"
                       : "linear-gradient(135deg,rgba(210,235,255,0.98),rgba(195,225,255,0.99))",
    cardBorder:   dark ? "rgba(45,212,255,0.16)" : "rgba(45,212,255,0.30)",
    cardBorderHov:dark ? "rgba(45,212,255,0.50)" : "rgba(45,212,255,0.65)",
    cardTitleColor:dark? "rgba(255,255,255,0.82)": "#0f172a",
    cardTitleHov:  dark? "#ffffff"               : "#0c1a2e",
    cardDescColor: dark? "rgba(255,255,255,0.42)": "rgba(15,23,42,0.55)",
    badgeBg:     dark ? "rgba(5,15,40,0.95)"    : "rgba(230,244,255,0.95)",
    badgeBorder: "rgba(45,212,255,0.45)",
    badgeText:   "#2dd4ff",
    statsBg:     dark ? "rgba(5,14,36,0.85)"    : "rgba(235,246,255,0.9)",
    statsBorder: dark ? "rgba(45,212,255,0.10)" : "rgba(45,212,255,0.22)",
    statsDivider:dark ? "rgba(45,212,255,0.07)" : "rgba(45,212,255,0.14)",
    statsLabelColor: dark ? "#ffffff"           : "#0f172a",
    statsSubColor:   dark ? "rgba(255,255,255,0.32)" : "rgba(15,23,42,0.5)",
    statsIconBg:     dark ? "rgba(45,212,255,0.07)" : "rgba(45,212,255,0.1)",
    statsIconBorder: dark ? "rgba(45,212,255,0.18)" : "rgba(45,212,255,0.3)",
    mobileCenterBg: dark
      ? "radial-gradient(circle,rgba(26,111,168,0.85),rgba(5,14,30,0.97))"
      : "radial-gradient(circle,rgba(26,111,168,0.7),rgba(15,70,130,0.9))",
    mobileCenterText: dark ? "#ffffff" : "#ffffff",
    mobileCardBg:   dark ? "linear-gradient(135deg,rgba(8,20,52,0.92),rgba(4,10,28,0.96))"
                         : "linear-gradient(135deg,rgba(235,246,255,0.95),rgba(215,234,255,0.98))",
    mobileCardTitle:dark ? "#ffffff" : "#0f172a",
    mobileCardDesc: dark ? "rgba(255,255,255,0.42)" : "rgba(15,23,42,0.55)",
    headerTitle: dark ? "#ffffff" : "#0f172a",
    headerDesc:  dark ? "rgba(255,255,255,0.38)" : "rgba(15,23,42,0.55)",
    starsOpacity: dark ? 1 : 0,
  };
}

function NodeIcon({ type, size = 44 }) {
  const s = size;
  const c = "#2dd4ff";
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

function StatIcon({ type }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "#2dd4ff", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "rocket") return <svg {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
  if (type === "shield") return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
  if (type === "code")   return <svg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
  if (type === "cloud")  return <svg {...p}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>;
  return null;
}

const CX = 500, CY = 385;

const CDOTS = {
  frontend: { x: 345, y: 300 },
  backend:  { x: 655, y: 300 },
  database: { x: 655, y: 470 },
  devops:   { x: 345, y: 470 },
  project:  { x: 500, y: 530 },
};

const KDOTS = {
  frontend: { x: 300, y: 248 },
  backend:  { x: 700, y: 248 },
  database: { x: 700, y: 524 },
  devops:   { x: 300, y: 524 },
  project:  { x: 500, y: 640 },
};

function linePath(id) {
  const c = CDOTS[id], k = KDOTS[id];
  if (id === "frontend") return `M ${c.x} ${c.y} L ${k.x + 10} ${c.y} L ${k.x} ${k.y}`;
  if (id === "backend")  return `M ${c.x} ${c.y} L ${k.x - 10} ${c.y} L ${k.x} ${k.y}`;
  if (id === "database") return `M ${c.x} ${c.y} L ${k.x - 10} ${c.y} L ${k.x} ${k.y}`;
  if (id === "devops")   return `M ${c.x} ${c.y} L ${k.x + 10} ${c.y} L ${k.x} ${k.y}`;
  if (id === "project")  return `M ${c.x} ${c.y} L ${c.x} ${k.y + 8} L ${k.x} ${k.y}`;
  return `M ${c.x} ${c.y} L ${k.x} ${k.y}`;
}

function ArchSVG({ hoveredId, lang, dashOff, tk }) {
  return (
    <svg
      viewBox="0 0 1000 820"
      preserveAspectRatio="xMidYMid meet"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <defs>
        <radialGradient id="cg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={tk.cgStop0} stopOpacity="0.95"/>
          <stop offset="45%"  stopColor={tk.cgStop1} stopOpacity="0.88"/>
          <stop offset="100%" stopColor={tk.cgStop2} stopOpacity="0.99"/>
        </radialGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#2dd4ff" stopOpacity={tk.haloOp0}/>
          <stop offset="55%"  stopColor="#1a9fd8" stopOpacity={tk.haloOp1}/>
          <stop offset="100%" stopColor="#0a6fa8" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="svgbg" cx="50%" cy="40%" r="60%">
          <stop offset="0%"   stopColor={tk.bgStop0}/>
          <stop offset="100%" stopColor={tk.bgStop1}/>
        </radialGradient>
        <filter id="gl" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="gl2" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="10" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M1 1.5L8.5 5L1 8.5" fill="none" stroke="#2dd4ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>

      <rect width="1000" height="820" fill="transparent" />

      <circle cx="200" cy="200" r="200" fill={tk.blobColor} fillOpacity="0.18"/>
      <circle cx="800" cy="600" r="180" fill={tk.blobColor} fillOpacity="0.14"/>

      {NODES.map(node => {
        const hov  = hoveredId === node.id;
        const path = linePath(node.id);
        return (
          <g key={node.id}>
            <path d={path} fill="none" stroke="#2dd4ff"
              strokeWidth={hov ? 1.6 : 1.1}
              strokeOpacity={hov ? parseFloat(tk.lineHovOp) : parseFloat(tk.lineBaseOp)}
              strokeDasharray="7 6" strokeDashoffset={-dashOff}
              strokeLinecap="round"
              style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}/>
            <path d={path} fill="none" stroke="#2dd4ff"
              strokeWidth={hov ? 4 : 2}
              strokeOpacity={hov ? 0.35 : 0.07}
              strokeDasharray="25 150" strokeDashoffset={-dashOff * 2.8}
              filter="url(#gl)"
              style={{ transition: "stroke-opacity 0.3s" }}/>
            <path d={path} fill="none" stroke="#2dd4ff"
              strokeWidth="1.2"
              strokeOpacity={hov ? 0.9 : parseFloat(tk.lineBaseOp) + 0.1}
              markerEnd="url(#arr)"
              style={{ transition: "stroke-opacity 0.3s" }}/>
          </g>
        );
      })}

      {Object.entries(CDOTS).map(([id, p]) => (
        <g key={id} filter="url(#gl)">
          <circle cx={p.x} cy={p.y} r={8}   fill="#2dd4ff" fillOpacity="0.18"/>
          <circle cx={p.x} cy={p.y} r={4.5} fill="#2dd4ff" fillOpacity="0.75"/>
          <circle cx={p.x} cy={p.y} r={2}   fill="white"/>
        </g>
      ))}

      {Object.entries(KDOTS).map(([id, p]) => (
        <g key={id} filter="url(#gl)">
          <circle cx={p.x} cy={p.y} r={8}   fill="#2dd4ff" fillOpacity="0.18"/>
          <circle cx={p.x} cy={p.y} r={4.5} fill="#2dd4ff" fillOpacity="0.75"/>
          <circle cx={p.x} cy={p.y} r={2}   fill="white"/>
        </g>
      ))}

      <circle cx={CX} cy={CY} r={155}
        fill="none" stroke="#2dd4ff" strokeWidth="0.8" strokeOpacity="0.2"
        strokeDasharray="9 7" strokeDashoffset={dashOff * 0.6}/>
      <rect x={CX-205} y={CY-155} width="410" height="310" rx="155"
        fill="none" stroke="#2dd4ff" strokeWidth="0.8" strokeOpacity="0.14"
        strokeDasharray="11 9" strokeDashoffset={-dashOff * 0.4}/>

      <circle cx={CX} cy={CY} r={165} fill="url(#halo)" filter="url(#gl2)"/>

      <circle cx={CX} cy={CY} r={104} fill="none" stroke="#2dd4ff" strokeWidth="2.5" strokeOpacity="0.5" filter="url(#gl)"/>
      <circle cx={CX} cy={CY} r={104} fill="none" stroke="#2dd4ff" strokeWidth="0.8" strokeOpacity="0.9"/>

      <circle cx={CX} cy={CY} r={100} fill="url(#cg)"/>
      <circle cx={CX} cy={CY} r={88}  fill="none" stroke="#2dd4ff" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="4 3"/>

      <text x={CX} y={CY-28} textAnchor="middle" fill="#2dd4ff" fontSize="30" fontWeight="300" fontFamily="monospace" opacity="0.9">&lt;/&gt;</text>
      <text x={CX} y={CY+12} textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="system-ui,sans-serif">Fullstack</text>
      <text x={CX} y={CY+38} textAnchor="middle" fill="#2dd4ff" fontSize="22" fontWeight="800" fontFamily="system-ui,sans-serif">Developer</text>
      <text x={CX} y={CY+60} textAnchor="middle" fill="white" fontSize="9.5" opacity="0.4" fontFamily="system-ui,sans-serif">
        {lang === "fr" ? "Je conçois, développe et" : "I design, develop and"}
      </text>
      <text x={CX} y={CY+74} textAnchor="middle" fill="white" fontSize="9.5" opacity="0.4" fontFamily="system-ui,sans-serif">
        {lang === "fr" ? "déploie des applications" : "deploy performant and"}
      </text>
      <text x={CX} y={CY+88} textAnchor="middle" fill="white" fontSize="9.5" opacity="0.4" fontFamily="system-ui,sans-serif">
        {lang === "fr" ? "performantes et scalables" : "scalable applications"}
      </text>
    </svg>
  );
}

function Card({ node, lang, hov, onEnter, onLeave, posStyle, tk }) {
  const title = lang === "fr" ? node.titleFr : node.titleEn;
  const desc  = lang === "fr" ? node.descFr  : node.descEn;

  return (
    <motion.div
      className="absolute"
      style={posStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 5 + parseInt(node.num) * 0.8, repeat: Infinity, ease: "easeInOut", delay: parseInt(node.num) * 0.55 }}
    >
      <div
        className="absolute -top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full z-10"
        style={{
          background: tk.badgeBg,
          border: `1px solid ${tk.badgeBorder}`,
          color: tk.badgeText,
          boxShadow: "0 0 14px rgba(45,212,255,0.2)",
          transition: "background 0.5s, border-color 0.5s",
        }}
      >
        {node.num}
      </div>

      <div
        className="w-full h-full rounded-2xl p-4 flex items-start gap-3 relative overflow-hidden"
        style={{
          background: hov ? tk.cardBgHov : tk.cardBg,
          border: `1px solid ${hov ? tk.cardBorderHov : tk.cardBorder}`,
          boxShadow: hov
            ? "0 0 28px rgba(45,212,255,0.18), 0 0 55px rgba(45,212,255,0.07), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "none",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="absolute top-0 left-6 right-6 h-px" style={{
          background: "linear-gradient(to right, transparent, rgba(45,212,255,0.55), transparent)",
          opacity: hov ? 1 : 0.3, transition: "opacity 0.3s",
        }}/>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{
          background: "linear-gradient(to right, rgba(45,212,255,0.35), transparent)",
          opacity: hov ? 0.7 : 0.15, transition: "opacity 0.3s",
        }}/>

        <div className="shrink-0 mt-0.5" style={{
          filter: hov ? "drop-shadow(0 0 10px rgba(45,212,255,0.55))" : "drop-shadow(0 0 3px rgba(45,212,255,0.2))",
          transition: "filter 0.3s",
        }}>
          <NodeIcon type={node.icon} size={42}/>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm leading-snug mb-2"
            style={{ color: hov ? tk.cardTitleHov : tk.cardTitleColor, transition: "color 0.3s" }}>
            {title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: tk.cardDescColor }}>
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MobileLayout({ lang, tk }) {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <div className="flex justify-center mb-2">
        <div className="flex flex-col items-center justify-center w-32 h-32 rounded-full" style={{
          background: tk.mobileCenterBg,
          border: "1px solid rgba(45,212,255,0.35)",
          boxShadow: "0 0 30px rgba(45,212,255,0.18)",
        }}>
          <span style={{ color: "#2dd4ff", fontSize: 22, fontFamily: "monospace" }}>&lt;/&gt;</span>
          <span style={{ color: tk.mobileCenterText }} className="font-bold text-sm">Fullstack</span>
          <span style={{ color: "#2dd4ff" }} className="font-bold text-sm">Developer</span>
        </div>
      </div>

      {NODES.map((node, i) => {
        const title = lang === "fr" ? node.titleFr : node.titleEn;
        const desc  = lang === "fr" ? node.descFr  : node.descEn;
        return (
          <motion.div key={node.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{
              background: tk.mobileCardBg,
              border: `1px solid ${tk.cardBorder}`,
              transition: "background 0.5s, border-color 0.5s",
            }}
          >
            <div className="shrink-0"><NodeIcon type={node.icon} size={38}/></div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(45,212,255,0.12)", color: "#2dd4ff", border: "1px solid rgba(45,212,255,0.3)" }}>
                  {node.num}
                </span>
                <h3 className="text-sm font-bold" style={{ color: tk.mobileCardTitle }}>{title}</h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: tk.mobileCardDesc }}>{desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Services() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "fr";
  const dark = useTheme();
  const tk = tokens(dark);

  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dashOff, setDashOff] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      setDashOff(((ts - start) / 35) % 300);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const cards = [
    { node: NODES[0], pos: { left: "0%",  top: "17%", width: "28%", height: "22%" } },
    { node: NODES[1], pos: { left: "72%", top: "17%", width: "28%", height: "22%" } },
    { node: NODES[2], pos: { left: "72%", top: "53%", width: "28%", height: "22%" } },
    { node: NODES[3], pos: { left: "0%",  top: "53%", width: "28%", height: "22%" } },
    { node: NODES[4], pos: { left: "31%", top: "77%", width: "38%", height: "19%" } },
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen overflow-hidden bg-white px-6 py-24 text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white"
    >
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="relative z-10 text-center pt-8 pb-0 px-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs font-semibold tracking-[4px] uppercase text-blue-400">
              {lang === "fr" ? "Mes Services" : "My Services"}
            </span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 className="mx-auto max-w-2xl text-2xl font-black leading-tight md:text-4xl">
            {lang === "fr" ? "Une expertise complète," : "Complete expertise,"}
            <br />
            <span className="text-blue-500">
              {lang === "fr" ? "un écosystème connecté" : "a connected ecosystem"}
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            {lang === "fr"
              ? "De l'idée au déploiement, je conçois des solutions modernes, robustes et évolutives."
              : "From idea to deployment, I design modern, robust and scalable solutions."}
          </p>
        </motion.div>

        {isMobile ? (
          <MobileLayout lang={lang} tk={tk}/>
        ) : (
          <motion.div
            className="relative mx-auto -mt-12"
            style={{ maxWidth: 1000, width: "100%", aspectRatio: "1000/820" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ArchSVG hoveredId={hovered} lang={lang} dashOff={dashOff} tk={tk}/>

            {cards.map(({ node, pos }) => (
              <Card key={node.id} node={node} lang={lang}
                hov={hovered === node.id}
                onEnter={() => setHovered(node.id)}
                onLeave={() => setHovered(null)}
                posStyle={pos}
                tk={tk}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}