import { motion } from "framer-motion";

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={"reveal-block " + className}
      initial={{ opacity: 0, y: 26, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: .12 }}
      transition={{ duration: .72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
