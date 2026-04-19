import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal"; // Ajustez le chemin si nécessaire

const iconMap = {
  frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16v16H4z" />
      <path d="M8 8h8v8H8z" />
      <path d="M12 4v16" />
      <path d="M4 12h16" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16v16H4z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M4 8h16M4 16h16" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  ),
  devops: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  project: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 3v18" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2a10 10 0 0 1 10 10c0 4.42-3.58 8-8 8h-2a8 8 0 0 1-8-8 10 10 0 0 1 8-8z" />
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

const Services = () => {
  const { t } = useTranslation();

  const services = [
    { id: "frontend", titleKey: "service_frontend_title", descKey: "service_frontend_desc", icon: "frontend" },
    { id: "backend", titleKey: "service_backend_title", descKey: "service_backend_desc", icon: "backend" },
    { id: "database", titleKey: "service_database_title", descKey: "service_database_desc", icon: "database" },
    { id: "devops", titleKey: "service_devops_title", descKey: "service_devops_desc", icon: "devops" },
    { id: "project", titleKey: "service_project_title", descKey: "service_project_desc", icon: "project" },
    { id: "support", titleKey: "service_support_title", descKey: "service_support_desc", icon: "support" },
  ];

  return (
    <section
      id="services"
      className="py-20 px-[6%] bg-white text-black dark:bg-[#0B0B0F] dark:text-white transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[4px] uppercase font-semibold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t("services_subtitle", "Ce que je fais")}
            </p>
             <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">
              {t("services_title", "Mes services")}
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl p-6 bg-gray-50 dark:bg-[#1A1A1E] border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="relative z-10 mb-5 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-7 h-7">
                    {iconMap[service.icon]}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t(service.descKey)}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;