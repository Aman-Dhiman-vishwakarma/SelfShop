import { motion } from "framer-motion";

const Loader = () => {
  const text = "SelfShop";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] overflow-hidden relative">

      {/* GLASSY Blur Glow Background */}
      {/* <div className="absolute w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div> */}

      {/* Typing Animated Text */}
      <motion.div
        className="text-red-700 text-5xl font-extrabold tracking-wide flex space-x-1 z-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Bouncing Dots */}
      <div className="flex space-x-2 mt-6 z-10">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-red-200 to-pink-700 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              delay,
            }}
          />
        ))}
      </div>

      {/* Tagline Text */}
      <motion.p
        className="text-gray-700 text-sm mt-4 z-10 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Loading Your SelfShop Experience...
      </motion.p>

    </div>
  );
};

export default Loader;
