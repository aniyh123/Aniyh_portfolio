import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import heroPhoto from "../assets/aniyh1.png";
import photo from "../assets/projet-motos.jpg";

export default function Hero() {
  const { t } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({ pseudo: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const WEB3FORMS_KEY = "abebf0c8-5d10-4973-835d-a1519ce5d330";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
  const handleAnchorClick = (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
      const hash = target.getAttribute('href');
      if (hash && hash !== '#') {
        e.preventDefault();
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  document.addEventListener('click', handleAnchorClick);
  return () => document.removeEventListener('click', handleAnchorClick);
}, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pseudo.trim()) newErrors.pseudo = "Pseudo requis";
    if (!formData.email.trim()) newErrors.email = "Email requis";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = async () => {
    if (!validateForm()) return;
    setIsSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.pseudo,
          email: formData.email,
          phone: formData.whatsapp,
          message: `${formData.pseudo} a laissé ses coordonnées.\nWhatsApp: ${formData.whatsapp}`,
          subject: `Nouveau message de ${formData.pseudo}`,
          replyto: formData.email,
          redirect: false
        })
      });

      const data = await response.json();

      if (data.success) {
        setStep("chat");
        setMessages([{
          id: 1,
          text: `👋 Bonjour ${formData.pseudo} ! Merci ! Je vous réponds dans les 24h.`,
          isBot: true,
          timestamp: new Date()
        }]);
      } else {
        alert("Erreur d'envoi : " + (data.message || "Réessayez"));
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue("");

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.pseudo,
          email: formData.email,
          phone: formData.whatsapp,
          message: messageText,
          subject: `Message de ${formData.pseudo} via le chat`
        })
      });

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: `Merci ! Je réponds rapidement sur ${formData.email} 💬`,
          isBot: true,
          timestamp: new Date()
        }]);
      }, 500);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: `Désolé, une erreur technique. Vous pouvez me contacter directement à ${formData.email} ou par WhatsApp.`,
          isBot: true,
          timestamp: new Date()
        }]);
      }, 500);
    }
  };

  const quickQuestions = [
    { text: "💻 Quelles technos ?" },
    { text: "📅 Disponibilités ?" },
    { text: "💰 Tarifs ?" }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-[6%] bg-white text-black dark:bg-[#0B0B0F] dark:text-white transition-colors duration-500 pt-28 md:pt-36">
      
      {/* Grande photo de fond à droite (uniquement visible sur desktop) */}
      <div className="absolute right-0 bottom-0 w-1/2 lg:w-[55%] h-full z-0 hidden md:block ">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 20%, transparent 60%),
              linear-gradient(to top, #ffffff 5%, transparent 40%),
              url(${heroPhoto})
            `,
          }}
        />
        <div
          className="absolute inset-0 w-full h-full opacity-0 dark:opacity-100 transition-opacity duration-500"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0B0B0F 20%, transparent 60%),
              linear-gradient(to top, #0B0B0F 5%, transparent 40%)
            `,
          }}
        />
      </div>

      {/* Chat flottant - responsive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="fixed bottom-4 right-4 z-20 w-[calc(100%-2rem)] max-w-[360px] sm:absolute sm:bottom-[5%] sm:right-[5%]"
      >
        <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header - dégradé violet/rose */}
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 cursor-pointer flex items-center justify-between"
            onClick={() => setChatOpen(!chatOpen)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">💬</div>
              <div>
                <p className="text-white font-bold text-sm">Contact</p>
                <p className="text-[10px] text-white/80">
                  {step === "form" ? "Laissez vos coordonnées" : formData.pseudo}
                </p>
              </div>
            </div>
            <span className="text-white">{chatOpen ? "▼" : "▲"}</span>
          </div>

          {chatOpen && (
            <div className="flex flex-col h-[480px]">
              {step === "form" ? (
                <div className="flex-1 p-4 space-y-3">
                  <input type="text" placeholder="Pseudo *" value={formData.pseudo} onChange={(e) => setFormData({...formData, pseudo: e.target.value})}
                    className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-[#2A2A2E]" />
                  {errors.pseudo && <p className="text-red-500 text-[10px]">{errors.pseudo}</p>}
                  
                  <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-[#2A2A2E]" />
                  {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
                  
                  <input type="tel" placeholder="WhatsApp *" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-[#2A2A2E]" />
                  {errors.whatsapp && <p className="text-red-500 text-[10px]">{errors.whatsapp}</p>}
                  
                  <button onClick={handleSubmitForm} disabled={isSending}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2.5 rounded-xl">
                    {isSending ? "Envoi..." : "Commencer →"}
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                        <div className={`max-w-[85%] p-2.5 rounded-xl text-xs ${msg.isBot ? "bg-gray-100 dark:bg-[#2A2A2E]" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="px-3 pb-2">
                    <p className="text-[9px] text-gray-400">⚡ Questions fréquentes :</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {quickQuestions.map((q, idx) => (
                        <button key={idx} onClick={() => handleSendMessage(q.text)}
                          className="text-[10px] bg-gray-100 dark:bg-[#2A2A2E] px-2 py-1 rounded-full">
                          {q.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 border-t flex gap-2">
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Votre message..." className="flex-1 text-xs p-2 rounded-xl bg-gray-100 dark:bg-[#2A2A2E]" />
                    <button onClick={handleSendMessage} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 rounded-xl">Envoyer</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Contenu texte + photo mobile */}
      <div className="relative z-10 w-full flex flex-col items-center md:items-start max-w-full md:max-w-[600px] mx-auto md:mx-0">
        
        {/* Photo de profil (cercle) visible uniquement sur mobile */}
        <div className="md:hidden mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-lg shadow-purple-500/30">
            <img src={heroPhoto} alt="Lydivine" className="w-full h-full object-cover" />
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-xs tracking-[3px] uppercase font-semibold mb-0 text-center md:text-left"
        >
          {t("hero_subtitle") || "WE CREATE WEBSITE FOR YOU"}
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
           className="text-[clamp(40px,8vw,110px)] font-black leading-[0.9] tracking-[-2px] uppercase mb-4 text-center md:text-left text-black dark:text-white"
        >
          {t("hero_title")}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
          className="text-gray-500 max-w-sm text-sm leading-7 mb-8 text-center md:text-left"
        >
          {t("hero_desc")}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 flex-wrap justify-center md:justify-start"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-7 py-3 rounded-full"
          >
            <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center">›</span>
            {t("contact_title") || "Contact Us"}
          </a>
         <a
          href="#projects"
          className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-full hover:scale-105 transition-transform text-sm"
        >
          <span className="text-blue-500 text-lg">📁</span>
          <div>
            <div className="font-extrabold text-base leading-none"></div>
            <div className="text-gray-500 text-[11px]">Voir mes projets</div>
          </div>
          <div className="flex -space-x-2 ml-1">
            {[101, 102, 103].map((i) => (
              <img
                key={i}
                src={photo}
                className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0B0B0F]"
                alt="Projet avatar"
              />
            ))}
          </div>
        </a>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">↓</div>
    </section>
  );
}