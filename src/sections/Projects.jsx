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

const projectsData = [
  {
    id: "motos",
    titleKey: "projects_motos_title",
    descKey: "projects_motos_desc",
    longDescKey: "projects_motos_long_desc",
    techs: ["React", "Node.js", "PostgreSQL", "Express"],
    screenshots: [moto1, moto2, moto3, moto4, moto5, moto6],
    github: "https://github.com/aniyh/gestion-motos",
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
    github: "https://github.com/aniyh/gestion-places",
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
    github: "https://github.com/aniyh/gestion-viticole",
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
    github: "https://github.com/aniyh/portfolio",
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#0f172a] shadow-2xl"
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
                    idx === currentSlide ? "w-6 bg-blue-500" : "w-1.5 bg-white/50"
                  }`}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>
        </div>
    
        <div className="p-6 md:p-8">
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {t(project.longDescKey || project.descKey)}
          </p>

          <div className="mb-6">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-500 mb-3 flex items-center gap-2">
              <FaRocket size={14} /> {t("projects.features_title")}
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.featuresKeys.map((featureKey, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {t(featureKey)}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-blue-500 mb-3 flex items-center gap-2">
              <FaCode size={14} /> {t("projects.tech_title")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center pb-4">
            <button
              onClick={() => window.open(project.github, "_blank")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              <FaGithub /> {t("projects.github_button")}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const { t } = useTranslation();
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
        <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl">
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
                      idx === currentScreenshotIndex ? "w-4 bg-blue-500" : "w-1 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white text-sm font-semibold flex items-center gap-2">
                <FaArrowRight size={14} />
                {t("projects_view_details")}
              </div>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold mb-2 text-black dark:text-white line-clamp-1">
              {t(project.titleKey)}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {t(project.descKey)}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.techs.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500"
                >
                  {tech}
                </span>
              ))}
              {project.techs.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                  +{project.techs.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 rounded-2xl border-2 border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-300 pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden bg-white px-6 py-24 text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-xs font-semibold tracking-[4px] uppercase text-blue-400">
              {t("projects.subtitle")}
            </span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="mx-auto max-w-2xl text-2xl font-black leading-tight md:text-4xl text-slate-800 dark:text-white">
            {t("projects.titleBefore")} <span className="text-blue-500">{t("projects.highlight")}</span> {t("projects.titleAfter")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            {t("projects.description")}
          </p>
        </div>

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