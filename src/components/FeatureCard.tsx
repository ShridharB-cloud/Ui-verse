import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Settings, Info, Sparkles, Check, Crown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ColorPickerDemo } from "./features/ColorPickerDemo";
import { FeatureDetailsDialog } from "./features/FeatureDetailsDialog";
import { FeatureSettingsDialog } from "./features/FeatureSettingsDialog";
import { ThemeSwitcherDemo } from "./features/ThemeSwitcherDemo";
import { GenericFeatureDemo } from "./features/GenericFeatureDemo";
import { ResizablePanelsDemo } from "./features/ResizablePanelsDemo";
import { StickyLayoutDemo } from "./features/StickyLayoutDemo";
import { BreadcrumbDemo } from "./features/BreadcrumbDemo";
import { TableDemo } from "./features/TableDemo";
import { SearchDemo } from "./features/SearchDemo";
import { InfiniteScrollDemo } from "./features/InfiniteScrollDemo";
import { ToastDemo } from "./features/ToastDemo";
import { AccordionDemo } from "./features/AccordionDemo";
import { HelpDemo } from "./features/HelpDemo";
import { ErrorDemo } from "./features/ErrorDemo";
import { FontFamilyDemo } from "./features/FontFamilyDemo";
import { LayoutDemo } from "./features/LayoutDemo";
import { InteractionDemo } from "./features/InteractionDemo";
import { StateDemo } from "./features/StateDemo";
import { HighContrastDemo } from "./features/HighContrastDemo";
import { TimeBasedThemeDemo } from "./features/TimeBasedThemeDemo";
import { HoverEffectsDemo } from "./features/HoverEffectsDemo";
import { BatterySaverDemo } from "./features/BatterySaverDemo";
import { TouchFriendlyDemo } from "./features/TouchFriendlyDemo";
import { SessionRestoreDemo } from "./features/SessionRestoreDemo";
import { UIPersistenceDemo } from "./features/UIPersistenceDemo";
import { UndoRedoDemo } from "./features/UndoRedoDemo";
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
  // Demo states
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [showFontFamilyDemo, setShowFontFamilyDemo] = useState(false);
  const [showResizableDemo, setShowResizableDemo] = useState(false);
  const [showStickyDemo, setShowStickyDemo] = useState(false);
  const [showBreadcrumbDemo, setShowBreadcrumbDemo] = useState(false);
  const [showTableDemo, setShowTableDemo] = useState(false);
  const [showSearchDemo, setShowSearchDemo] = useState(false);
  const [showInfiniteDemo, setShowInfiniteDemo] = useState(false);
  const [showToastDemo, setShowToastDemo] = useState(false);
  const [showAccordionDemo, setShowAccordionDemo] = useState(false);
  const [showHelpDemo, setShowHelpDemo] = useState(false);
  const [showErrorDemo, setShowErrorDemo] = useState(false);
  const [showLayoutDemo, setShowLayoutDemo] = useState(false);
  const [showInteractionDemo, setShowInteractionDemo] = useState(false);
  const [showStateDemo, setShowStateDemo] = useState(false);
  const [showHighContrastDemo, setShowHighContrastDemo] = useState(false);
  const [showTimeDemo, setShowTimeDemo] = useState(false);
  const [showHoverDemo, setShowHoverDemo] = useState(false);
  const [showBatteryDemo, setShowBatteryDemo] = useState(false);
  const [showTouchDemo, setShowTouchDemo] = useState(false);
  const [showSessionDemo, setShowSessionDemo] = useState(false);
  const [showPersistenceDemo, setShowPersistenceDemo] = useState(false);
  const [showUndoRedoDemo, setShowUndoRedoDemo] = useState(false);
  const [showGenericDemo, setShowGenericDemo] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { toast } = useToast();

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

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    onToggle?.(feature.id, checked);
    toast({
      title: enabled ? "Deactivated" : "Activated",
      description: `${feature.title} has been ${enabled ? "disabled" : "enabled"}.`,
    });
  };

  const handleTryIt = () => {
    console.log("Try it clicked for", feature.title);
    toast({ title: "Feature Demo", description: "Demos are temporarily disabled for debugging." });
  };

  return (
    <>
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
                  onClick={handleTryIt}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  <Play className="w-4 h-4" />
                  Try it
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSettings(true)}
                  className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors border border-border"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDetails(true)}
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
    </>
  );
};
