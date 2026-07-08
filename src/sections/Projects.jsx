import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaCode, 
  FaRocket,
  FaImage,
  FaArrowRight
} from "react-icons/fa";

import moto1 from "../assets/moto1.png";
import moto2 from "../assets/moto2.png";
import moto3 from "../assets/moto3.png";
import moto4 from "../assets/moto4.png";
import moto5 from "../assets/moto5.png";
import moto6 from "../assets/moto6.png";

import place1 from "../assets/place1.png";
import place2 from "../assets/place2.png";
import place3 from "../assets/place3.png";
import place4 from "../assets/place4.png";
import place5 from "../assets/place5.png";

import prestation1 from "../assets/prestation1.png";
import prestation2 from "../assets/prestation2.png";

import vitimaster2 from "../assets/vitimaster2.png";
import vitimaster3 from "../assets/vitimaster3.png";
import vitimaster4 from "../assets/vitimaster4.png";
import vitimaster5 from "../assets/vitimaster5.png";
import vitimaster6 from "../assets/vitimaster6.png";
import vitimaster7 from "../assets/vitimaster7.png";
import vitimaster8 from "../assets/vitimaster8.png";

import portfolio from "../assets/portfolio.png";

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

function getTokens(dark) {
  return {
    bgPage: dark ? "#1a0e08" : "#fff8f4",
    bgCard: dark ? "rgba(42,22,10,0.98)" : "rgba(255,248,244,0.98)",
    bgCardHov: dark ? "linear-gradient(135deg,rgba(58,30,12,0.99),rgba(42,22,10,0.99))"
                    : "linear-gradient(135deg,rgba(255,255,255,0.99),rgba(253,245,240,0.99))",
    textPrimary: dark ? "#fde0d0" : "#3a1508",
    textSecondary: dark ? "#f5b99a" : "#7a3618",
    textMuted: dark ? "rgba(245,185,154,0.5)" : "rgba(122,54,24,0.55)",
    textAccent: dark ? "#e8905e" : "#c9683a",
    accent: "#c9683a",
    accentLight: "#e8905e",
    accentGlow: dark ? "rgba(201,104,58,0.25)" : "rgba(201,104,58,0.15)",
    borderCard: dark ? "rgba(201,104,58,0.22)" : "rgba(201,104,58,0.32)",
    borderCardHov: dark ? "rgba(201,104,58,0.6)" : "rgba(201,104,58,0.75)",
    shadowCard: dark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 16px rgba(122,54,24,0.08)",
    shadowCardHov: dark ? "0 0 24px rgba(201,104,58,0.18),0 8px 32px rgba(0,0,0,0.5)"
                        : "0 0 20px rgba(201,104,58,0.14),0 8px 24px rgba(122,54,24,0.12)",
    badgeBg: dark ? "rgba(201,104,58,0.15)" : "#fde0d0",
    badgeBorder: dark ? "rgba(201,104,58,0.4)" : "rgba(201,104,58,0.5)",
    badgeText: dark ? "#e8905e" : "#a04e27",
    borderPage: dark ? "rgba(201,104,58,0.18)" : "rgba(201,104,58,0.25)",
    modalBg: dark ? "#1a0e08" : "#fff8f4",
    modalOverlay: "rgba(0,0,0,0.8)",
    techBg: dark ? "rgba(201,104,58,0.12)" : "rgba(201,104,58,0.08)",
    techText: dark ? "#e8905e" : "#c9683a",
    featureDot: "#c9683a",
  };
}

const projectsData = [
  {
    id: "motos",
    titleKey: "projects_motos_title",
    descKey: "projects_motos_desc",
    longDescKey: "projects_motos_long_desc",
    techs: ["React", "Node.js", "PostgreSQL", "Express"],
    screenshots: [moto1, moto2, moto3, moto4, moto5, moto6],
    githubFrontend: "https://github.com/aniyh123/VenteMoto_frontend",
    githubBackend: "https://github.com/aniyh123/gestion-moto",
    featuresKeys: [
      "projects_motos_feature_1",
      "projects_motos_feature_2",
      "projects_motos_feature_3",
      "projects_motos_feature_4",
      "projects_motos_feature_5"
    ]
  },
  {
    id: "places",
    titleKey: "projects_places_title",
    descKey: "projects_places_desc",
    longDescKey: "projects_places_long_desc",
    techs: ["Express.js", "React", "PostgreSQL"],
    screenshots: [place1, place2, place3, place4, place5],
    githubFrontend: "https://github.com/aniyh123/GestionPlace_frontend",
    githubBackend: "https://github.com/aniyh123/GestionPlace_backend",
    featuresKeys: [
      "projects_places_feature_1",
      "projects_places_feature_2",
      "projects_places_feature_3",
      "projects_places_feature_4"
    ]
  },
  {
    id: "prestation",
    titleKey: "projects_prestation_title",
    descKey: "projects_prestation_desc",
    longDescKey: "projects_prestation_long_desc",
    techs: ["Express", "React", "MySQL"],
    screenshots: [prestation1, prestation2],
    github: "https://github.com/aniyh/gestion-prestation",
    featuresKeys: [
      "projects_prestation_feature_1",
      "projects_prestation_feature_2",
      "projects_prestation_feature_3",
      "projects_prestation_feature_4"
    ]
  },
  {
    id: "viticole",
    titleKey: "projects_viticole_title",
    descKey: "projects_viticole_desc",
    longDescKey: "projects_viticole_long_desc",
    techs: ["React", "Node.js", "MongoDB", "Express", "TailwindCSS"],
    screenshots: [vitimaster2, vitimaster3, vitimaster4, vitimaster5, vitimaster6, vitimaster7, vitimaster8],
    githubFrontend: "https://github.com/aniyh123/ViniBetsi_frontend",
    githubBackend: "https://github.com/aniyh123/ViniBetsi_backend",
    featuresKeys: [
      "projects_viticole_feature_1",
      "projects_viticole_feature_2",
      "projects_viticole_feature_3",
      "projects_viticole_feature_4",
      "projects_viticole_feature_5",
      "projects_viticole_feature_6",
      "projects_viticole_feature_7",
      "projects_viticole_feature_8"
    ]
  },
  {
    id: "portfolio",
    titleKey: "projects_portfolio_title",
    descKey: "projects_portfolio_desc",
    longDescKey: "projects_portfolio_long_desc",
    techs: ["React", "Tailwind CSS", "Framer Motion", "i18next"],
    screenshots: [portfolio],
    github: "https://github.com/aniyh123/Aniyh_portfolio",
    featuresKeys: [
      "projects_portfolio_feature_1",
      "projects_portfolio_feature_2",
      "projects_portfolio_feature_3",
      "projects_portfolio_feature_4",
      "projects_portfolio_feature_5"
    ]
  }
];

function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();
  const dark = useTheme();
  const tk = getTokens(dark);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % project.screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      style={{ background: tk.modalOverlay }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: tk.modalBg }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-50 p-2 mr-4 mt-4 rounded-full bg-black/50 hover:bg-black/70 text-white transition cursor-pointer"
          style={{ cursor: "pointer" }}
        >
          <FaTimes size={20} />
        </button>

        <div className="clear-both" />

        <div className="relative bg-gray-900 p-4">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white text-center">
            {t(project.titleKey)}
          </h3>
          <div className="relative h-[300px] md:h-[450px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={project.screenshots[currentSlide]}
                alt={`${t(project.titleKey)} - ${t("projects_screenshot")} ${currentSlide + 1}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-contain bg-gray-900"
              />
            </AnimatePresence>

            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition cursor-pointer z-10"
                  style={{ cursor: "pointer" }}
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition cursor-pointer z-10"
                  style={{ cursor: "pointer" }}
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {project.screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? "w-6" : "w-1.5"
                  }`}
                  style={{
                    background: idx === currentSlide ? tk.accent : "rgba(255,255,255,0.5)",
                    cursor: "pointer"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
    
        <div className="p-6 md:p-8" style={{ color: tk.textPrimary }}>
          <p className="mb-6 leading-relaxed" style={{ color: tk.textSecondary }}>
            {t(project.longDescKey || project.descKey)}
          </p>

          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: tk.textAccent }}>
              <FaRocket size={14} /> {t("projects.features_title")}
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.featuresKeys.map((featureKey, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm" style={{ color: tk.textSecondary }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: tk.featureDot }} />
                  {t(featureKey)}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: tk.textAccent }}>
              <FaCode size={14} /> {t("projects.tech_title")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{
                    background: tk.techBg,
                    color: tk.techText,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pb-4">
            {project.githubFrontend && (
              <button
                onClick={() => window.open(project.githubFrontend, "_blank")}
                className="px-8 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #a04e27, #c9683a)",
                  cursor: "pointer"
                }}
              >
                <FaGithub /> {t("projects.github_frontend_button", "Frontend")}
              </button>
            )}
            {project.githubBackend && (
              <button
                onClick={() => window.open(project.githubBackend, "_blank")}
                className="px-8 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #a04e27, #c9683a)",
                  cursor: "pointer"
                }}
              >
                <FaGithub /> {t("projects.github_backend_button", "Backend")}
              </button>
            )}
            {!project.githubFrontend && !project.githubBackend && project.github && (
              <button
                onClick={() => window.open(project.github, "_blank")}
                className="px-8 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(to right, #a04e27, #c9683a)",
                  cursor: "pointer"
                }}
              >
                <FaGithub /> {t("projects.github_button")}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const { t } = useTranslation();
  const dark = useTheme();
  const tk = getTokens(dark);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  useEffect(() => {
    if (project.screenshots.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentScreenshotIndex((prev) => (prev + 1) % project.screenshots.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [project.screenshots.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        className="group cursor-pointer"
        onClick={() => onOpen(project)}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div
          className="relative overflow-hidden rounded-2xl backdrop-blur-lg shadow-xl transition-all duration-300"
          style={{
            background: tk.bgCard,
            border: `1px solid ${tk.borderCard}`,
            boxShadow: tk.shadowCard,
          }}
        >
          <div className="relative h-56 overflow-hidden">
            <motion.img
              key={currentScreenshotIndex}
              src={project.screenshots[currentScreenshotIndex]}
              alt={t(project.titleKey)}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {project.screenshots.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
                <FaImage size={10} /> {project.screenshots.length}
              </div>
            )}

            {project.screenshots.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.screenshots.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentScreenshotIndex ? "w-4" : "w-1"
                    }`}
                    style={{
                      background: idx === currentScreenshotIndex ? tk.accent : "rgba(255,255,255,0.5)",
                    }}
                  />
                ))}
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-semibold flex items-center gap-2"
                style={{ background: `${tk.accent}33` }}
              >
                <FaArrowRight size={14} />
                {t("projects.view_details")}
              </div>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold mb-2 line-clamp-1" style={{ color: tk.textPrimary }}>
              {t(project.titleKey)}
            </h3>
            <p className="text-sm mb-4 line-clamp-2" style={{ color: tk.textMuted }}>
              {t(project.descKey)}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.techs.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    background: tk.techBg,
                    color: tk.techText,
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.techs.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full" style={{ color: tk.textMuted }}>
                  +{project.techs.length - 3}
                </span>
              )}
            </div>
          </div>

          <div
            className="absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none"
            style={{
              borderColor: "transparent",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const dark = useTheme();
  const tk = getTokens(dark);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden px-6 py-24 transition-colors duration-500"
      style={{ background: tk.bgPage, color: tk.textPrimary }}
    >
      <div className="relative mx-auto max-w-7xl">
        {/* ── Nouveau titre style barre latérale ── */}
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
                {t("projects.subtitle")}
              </span>
              <span style={{ fontSize: 11, color: tk.textMuted, opacity: 0.6 }}>
                / 04
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
              {t("projects.titleBefore")}{" "}
              <span style={{ color: tk.accent }}>{t("projects.highlight")}</span>{" "}
              {t("projects.titleAfter")}
            </h2>
          </div>
        </motion.div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}