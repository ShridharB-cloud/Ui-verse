import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Palette, Layout, Crown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div 
          className="orb orb-primary w-[700px] h-[700px] -top-48 -left-48"
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="orb orb-accent w-[600px] h-[600px] top-1/3 -right-48"
          style={{ animationDelay: "-8s" }}
        />
        <div 
          className="orb orb-mid w-[500px] h-[500px] bottom-0 left-1/4"
          style={{ animationDelay: "-15s" }}
        />
      </div>

      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Radial gradient from top */}
      <div className="absolute inset-0 bg-radial-gradient" />

      <div className="container relative z-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border border-primary/20"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 animate-pulse-glow">
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
          >
            Discover, Enable &{" "}
            <span className="text-gradient">Experiment</span>{" "}
            <br className="hidden sm:block" />
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-hero flex items-center gap-2"
            >
              Explore Features
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#docs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost-hero"
            >
              View Documentation
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            <StatCard icon={<Sparkles className="w-5 h-5" />} value="47+" label="Features" />
            <StatCard icon={<Palette className="w-5 h-5" />} value="9" label="Categories" />
            <StatCard icon={<Zap className="w-5 h-5" />} value="Live" label="Playground" highlight />
            <StatCard icon={<Layout className="w-5 h-5" />} value="100%" label="Modular" />
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
  highlight,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className={`glass-panel p-5 text-center relative overflow-hidden ${
      highlight ? "border-primary/30" : ""
    }`}
  >
    {highlight && (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
    )}
    <div className="relative z-10">
      <div className="flex justify-center mb-3">
        <div className={`p-2.5 rounded-xl ${
          highlight 
            ? "bg-primary/20 text-primary" 
            : "bg-secondary text-muted-foreground"
        }`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  </motion.div>
);
