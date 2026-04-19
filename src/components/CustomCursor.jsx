import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  // Suivre la souris
  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Détecter hover sur boutons et liens
  useEffect(() => {
    const add = () => setHover(true);
    const remove = () => setHover(false);

    const elements = document.querySelectorAll("a, button");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", add);
      el.addEventListener("mouseleave", remove);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", add);
        el.removeEventListener("mouseleave", remove);
      });
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: hover ? 40 : 20,
        height: hover ? 40 : 20,
        background: "linear-gradient(135deg, #7C3AED, #EC4899)",
        boxShadow: "0 0 20px rgba(124,58,237,0.7)",
        transition: "width 0.2s ease, height 0.2s ease",
      }}
    />
  );
}