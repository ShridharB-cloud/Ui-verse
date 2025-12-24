import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Palette, Layout } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb-primary w-[600px] h-[600px] -top-40 -left-40 animate-float" />
        <div className="orb orb-accent w-[500px] h-[500px] top-1/2 -right-40 animate-float-delayed" />
        <div className="orb orb-primary w-[400px] h-[400px] bottom-0 left-1/3 animate-float-slow" />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20">
              <Sparkles className="w-3 h-3 text-primary" />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              The Future of UI Feature Discovery
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            Discover, Enable &{" "}
            <span className="text-gradient">Experiment</span>{" "}
            with UI Features
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            A next-level developer platform where you can explore, toggle, and
            integrate website features you didn't even know existed.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-hero flex items-center gap-2"
            >
              Explore Features
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost-hero"
            >
              View Documentation
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <StatCard icon={<Sparkles />} value="50+" label="Features" />
            <StatCard icon={<Palette />} value="9" label="Categories" />
            <StatCard icon={<Zap />} value="Live" label="Playground" />
            <StatCard icon={<Layout />} value="100%" label="Modular" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="glass-panel p-4 text-center"
  >
    <div className="flex justify-center mb-2">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
    </div>
    <div className="text-2xl font-bold text-foreground">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </motion.div>
);
