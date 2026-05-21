import { useEffect, useState } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMobile) return; 

    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return; 

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
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: hover ? 40 : 20,
        height: hover ? 40 : 20,
        background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
        boxShadow: "0 0 20px rgba(37,99,235,0.7)",
        transition: "width 0.2s ease, height 0.2s ease",
      }}
    />
  );
}