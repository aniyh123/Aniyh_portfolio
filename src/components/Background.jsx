import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Glow 1 */}
      <motion.div
        className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30"
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -100, 200, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      />

      {/* Glow 2 */}
      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 right-0"
        animate={{
          x: [0, -200, 100, 0],
          y: [0, 100, -200, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
        }}
      />

    </div>
  );
}