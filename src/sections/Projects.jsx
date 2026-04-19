import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";

// Import des images
import motosImg from "../assets/projet-motos.jpg";
import placesImg from "../assets/projet-places.jpg";
import prestationImg from "../assets/projet-prestation.jpg";
import portfolioImg from "../assets/projet-prestation.jpg"; // 🔁 Change le nom du fichier si nécessaire

const projects = [
  {
    id: "motos",
    img: motosImg,
    tech: ["React", "Node.js", "PostgreSQL", "Express"],
    link: "#",
  },
  {
    id: "places",
    img: placesImg,
    tech: ["Express.js", "React", "PostgreSQL"],
    link: "#",
  },
  {
    id: "prestation",
    img: prestationImg,
    tech: ["Express", "React", "MySQL"],
    link: "#",
  },
  {
    id: "portfolio",
    img: portfolioImg,
    tech: ["React", "Tailwind CSS", "Framer Motion", "i18next"],
    link: "#",
  },
];

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="py-20 px-[6%] bg-white text-black dark:bg-[#0B0B0F] dark:text-white transition-colors duration-500"
    >
      <Reveal>
          <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">
          {t("projects_title")}
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="group p-6 bg-black/5 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Image du projet */}
              <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img
                  src={project.img}
                  alt={t(`projects_${project.id}_title`)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <h3 className="text-xl font-bold text-black dark:text-white">{t(`projects_${project.id}_title`)}</h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2 flex-1 text-sm leading-relaxed">
                {t(`projects_${project.id}_desc`)}
              </p>
              
              <div className="flex gap-2 mt-4 flex-wrap">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                 className="bg-black/10 dark:bg-white/10 text-black dark:text-white px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => window.open(project.link, "_blank")}
                className="mt-6 px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform duration-300 active:scale-95"
              >
                {t("projects_voir_projet")}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}