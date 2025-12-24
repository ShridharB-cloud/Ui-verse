import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Settings, Info, Sparkles, Check, Crown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import type { Tables } from "@/integrations/supabase/types";

type Feature = Tables<"features">;

interface FeatureCardProps {
  feature: Feature;
  index: number;
  onToggle?: (featureId: string, enabled: boolean) => void;
}

export const FeatureCard = ({ feature, index, onToggle }: FeatureCardProps) => {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    onToggle?.(feature.id, checked);
  };

  const statusStyles = {
    stable: "status-stable",
    experimental: "status-experimental",
    draft: "status-draft",
    deprecated: "status-deprecated",
    removed: "status-deprecated",
  };

  const categoryLabels: Record<string, string> = {
    theme_appearance: "Theme",
    layout_navigation: "Layout",
    interactions: "UX",
    responsive: "Responsive",
    state_persistence: "State",
    accessibility: "A11y",
    content: "Content",
    system: "System",
    meta: "Meta",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <div className="feature-card relative overflow-hidden h-full">
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.05))",
          }}
        />

        {/* Premium indicator */}
        {feature.is_premium && (
          <div className="absolute top-4 right-4 z-20">
            <div className="premium-badge flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Pro
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="p-2.5 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/10"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {feature.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${statusStyles[feature.status]}`}>
                    {feature.status === "stable" && <Check className="w-3 h-3" />}
                    {feature.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {categoryLabels[feature.category]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-5 line-clamp-2 min-h-[40px]">
            {feature.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors border border-primary/20"
              >
                <Play className="w-4 h-4" />
                Try it
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors border border-border"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors border border-border"
              >
                <Info className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>
            
            <Switch
              checked={enabled}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
