import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Settings, Info, Sparkles, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "stable" | "experimental" | "draft";
  enabled?: boolean;
  icon?: React.ReactNode;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const [enabled, setEnabled] = useState(feature.enabled ?? false);
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    stable: "bg-primary/20 text-primary",
    experimental: "bg-accent/20 text-accent",
    draft: "bg-muted text-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <div className="feature-card relative overflow-hidden">
        {/* Gradient border effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="p-2.5 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20"
              >
                {feature.icon || <Sparkles className="w-5 h-5 text-primary" />}
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${statusColors[feature.status]}`}>
                  {feature.status === "stable" && <Check className="w-3 h-3" />}
                  {feature.status}
                </span>
              </div>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={setEnabled}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {feature.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <Play className="w-4 h-4" />
              Playground
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Info className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
