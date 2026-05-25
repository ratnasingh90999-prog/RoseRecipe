import { motion } from "framer-motion";

export function BackgroundBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle, #ffc6d6 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, #e6d1ff 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/4 h-[520px] w-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle, #ffe2bf 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}