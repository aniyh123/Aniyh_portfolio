import { useState } from "react";
import { useTranslation } from "react-i18next";
import Reveal from "../components/Reveal";
import react from "../assets/React-JS.png";
import html from "../assets/HTML-CSS.jpg";
import js from "../assets/js.png";
import tailwind from "../assets/tailwind.png";
import postgres from "../assets/postgres.png";
import express from "../assets/express.png";
import uml from "../assets/uml.png";
import agile from "../assets/agile.png";
import mysql from "../assets/mysql.png";
import node from "../assets/node2.png";
import figma from "../assets/figma2.png";
import github from "../assets/github.png";
import cicd from "../assets/ci-cd.png";
import postman from "../assets/postman.png";
import docker from "../assets/docker.png";
import kubernete from "../assets/kubernete.png";
import merise from "../assets/merise.png";
import vue from "../assets/vue.png";
import python from "../assets/Python.jpg";
import reactnative from "../assets/react-native-2-logo.png";

const skills = [
  // Frontend
  {
    id: "frontend",
    labelKey: "frontend_category",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "#a855f7",
    glow: "rgba(168,85,247,0.35)",
    techs: [
      { nameKey: "react", percentage: 85, logoUrl: react },
      { nameKey: "vue", percentage: 70, logoUrl: vue },
      { nameKey: "reactnative", percentage: 60, logoUrl: reactnative },
      { nameKey: "javascript", percentage: 90, logoUrl: js },
      { nameKey: "html_css", percentage: 90, logoUrl: html },
      { nameKey: "tailwind", percentage: 80, logoUrl: tailwind },
    ],
  },
  // Backend
  {
    id: "backend",
    labelKey: "backend_category",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 2v20M5 6h14M5 18h14" /></svg>),
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.35)",
    techs: [
      { nameKey: "nodejs", percentage: 80, logoUrl: node },
      { nameKey: "express", percentage: 85, logoUrl: express },
      { nameKey: "python", percentage: 60, logoUrl: python },
    ],
  },
  // Base de données
  {
    id: "database",
    labelKey: "database_category",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><ellipse cx="12" cy="6" rx="10" ry="3" /><path d="M2 6v12c0 1.656 4.477 3 10 3s10-1.344 10-3V6" /></svg>),
    color: "#f97316",
    glow: "rgba(249,115,22,0.35)",
    techs: [
      { nameKey: "mysql", percentage: 90, logoUrl: mysql },
      { nameKey: "postgresql", percentage: 80, logoUrl: postgres },
    ],
  },
  // DevOps & Outils
  {
    id: "tools",
    labelKey: "devops_category",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M4 4h16v16H4z" /></svg>),
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.35)",
    techs: [
      { nameKey: "docker", percentage: 60, logoUrl: docker },
      { nameKey: "git_cicd", percentage: 70, logoUrl: cicd },
      { nameKey: "github", percentage: 85, logoUrl: github },
      { nameKey: "kubernetes", percentage: 60, logoUrl: kubernete },
      { nameKey: "postman", percentage: 85, logoUrl: postman },
    ],
  },
  // Méthodologie
  {
    id: "method",
    labelKey: "methodology_category",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>),
    color: "#facc15",
    glow: "rgba(250,204,21,0.35)",
    techs: [
      { nameKey: "merise", percentage: 80, logoUrl: merise },
      { nameKey: "agile_scrum", percentage: 85, logoUrl: agile },
      { nameKey: "uml", percentage: 80, logoUrl: uml },
    ],
  },
  // Design
  {
    id: "design",
    labelKey: "design_category",
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><circle cx="12" cy="12" r="10" /><path d="M4 12h16M12 4v16" /></svg>),
    color: "#f43f5e",
    glow: "rgba(244,63,94,0.35)",
    techs: [
      { nameKey: "figma", percentage: 80, logoUrl: figma },
    ],
  },
];

export default function Competences() {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <section id="competences" className="relative py-28 px-[6%] bg-white text-black dark:bg-[#0B0B0F] dark:text-white transition-colors duration-500 overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10 dark:opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }} />

      {/* Section Title */}
      <Reveal>
        <div className="text-center mb-16">
          <p className="text-xs tracking-[4px] uppercase font-semibold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Stack technique</p>
            <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">{t("skills_title") || "Compétences"}</h2>
          <div className="mt-4 mx-auto w-16 h-1 rounded-full" style={{ background: "linear-gradient(to right, #a855f7, #ec4899)" }} />
        </div>
      </Reveal>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skills.map((category) => (
          <Reveal key={category.id}>
            <div
              className="relative group rounded-2xl p-6 border transition-all duration-500 cursor-default overflow-hidden"
              style={{
                background: hovered === category.id ? "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.08))" : "rgba(0,0,0,0.03)",
                borderColor: hovered === category.id ? `${category.color}55` : "rgba(128,128,128,0.15)",
                boxShadow: hovered === category.id ? `0 8px 40px ${category.glow}, inset 0 1px 0 rgba(255,255,255,0.05)` : "none",
                transform: hovered === category.id ? "translateY(-4px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHovered(category.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300" style={{ background: `linear-gradient(135deg, ${category.color}22, ${category.color}44)`, color: category.color, boxShadow: hovered === category.id ? `0 0 16px ${category.glow}` : "none" }}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight text-black dark:text-white">{t(category.labelKey)}</h3>
                  <p className="text-xs text-black/40 dark:text-white/40">{category.techs.length} technologie{category.techs.length > 1 ? "s" : ""}</p>
                </div>
              </div>

              {/* Tech cards : avec nom au survol */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {category.techs.map((tech) => (
                  <div
                    key={tech.nameKey}
                    className="relative aspect-square rounded-xl border overflow-hidden transition-all duration-300 group/tech"
                    style={{
                      background: hoveredTech === `${category.id}-${tech.nameKey}` ? `linear-gradient(135deg, ${category.color}22, ${category.color}33)` : "rgba(128,128,128,0.07)",
                      borderColor: hoveredTech === `${category.id}-${tech.nameKey}` ? `${category.color}66` : "rgba(128,128,128,0.12)",
                      transform: hoveredTech === `${category.id}-${tech.nameKey}` ? "scale(1.02)" : "scale(1)",
                      boxShadow: hoveredTech === `${category.id}-${tech.nameKey}` ? `0 4px 12px ${category.glow}` : "none",
                    }}
                    onMouseEnter={() => setHoveredTech(`${category.id}-${tech.nameKey}`)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <img
                      src={tech.logoUrl}
                      alt={t(tech.nameKey)}
                      className="w-full h-full object-cover"
                    />
                    {/* Pourcentage en haut à gauche */}
                    <div className="absolute top-1 left-1 text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-1 rounded backdrop-blur-[2px] z-10">
                      {tech.percentage}%
                    </div>
                    {/* Nom qui apparaît au survol */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/90 to-pink-500/90 flex items-center justify-center opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300 z-20">
                      <span className="text-white text-xs font-bold text-center px-1">
                        {t(tech.nameKey)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}