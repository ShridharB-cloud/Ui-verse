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
import { FontFamilyDemo } from "./features/FontFamilyDemo";
import { LayoutDemo } from "./features/LayoutDemo";
import { InteractionDemo } from "./features/InteractionDemo";
import { StateDemo } from "./features/StateDemo";
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
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);
  const [showFontFamilyDemo, setShowFontFamilyDemo] = useState(false);
  const [showResizableDemo, setShowResizableDemo] = useState(false);
  const [showStickyDemo, setShowStickyDemo] = useState(false);
  const [showBreadcrumbDemo, setShowBreadcrumbDemo] = useState(false);
  const [showTableDemo, setShowTableDemo] = useState(false);
  const [showSearchDemo, setShowSearchDemo] = useState(false);
  const [showInfiniteDemo, setShowInfiniteDemo] = useState(false);
  const [showLayoutDemo, setShowLayoutDemo] = useState(false);
  const [showInteractionDemo, setShowInteractionDemo] = useState(false);
  const [showStateDemo, setShowStateDemo] = useState(false);
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
    if (feature.title === "Accent Color Picker") {
      setShowColorPicker(true);
      return;
    }

    if (feature.title === "Theme Switcher" || feature.title === "Dark / Light / System Mode") {
      setShowThemeSwitcher(true);
      return;
    }

    if (feature.title === "Font Family Switcher") {
      setShowFontFamilyDemo(true);
      return;
    }

    // Specific Layout Overrides
    if (feature.title.includes("Resizable Panels")) {
      setShowResizableDemo(true);
      return;
    }
    if (feature.title.includes("Sticky Header")) {
      setShowStickyDemo(true);
      return;
    }
    if (feature.title.includes("Breadcrumb")) {
      setShowBreadcrumbDemo(true);
      return;
    }
    if (feature.title.includes("Table") || feature.title.includes("Sort")) {
      setShowTableDemo(true);
      return;
    }
    if (feature.title.includes("Search")) {
      setShowSearchDemo(true);
      return;
    }
    if (feature.title.includes("Infinite") || feature.title.includes("Lazy")) {
      setShowInfiniteDemo(true);
      return;
    }

    // Layout & Navigation group
    if (feature.title.includes("Layout") || feature.title.includes("Grid") || feature.title.includes("Sidebar") || feature.title.includes("Panel") || feature.title.includes("Nav") || feature.title.includes("Header") || feature.title.includes("Footer") || feature.title.includes("List") || feature.title.includes("Table") || feature.title.includes("Sort") || feature.title.includes("Filter") || feature.title.includes("Search") || feature.title.includes("Infinite") || feature.title.includes("Lazy") || feature.title.includes("Orientation")) {
      setShowLayoutDemo(true);
      return;
    }

    // Interaction & UX group
    if (feature.title.includes("Interaction") || feature.title.includes("Hover") || feature.title.includes("Focus") || feature.title.includes("Touch") || feature.title.includes("Toast") || feature.title.includes("Skeleton") || feature.title.includes("Tooltip") || feature.title.includes("High Contrast") || feature.title.includes("Motion") || feature.title.includes("Screen Reader") || feature.title.includes("ARIA") || feature.title.includes("Keyboard") || feature.title.includes("Device") || feature.title.includes("Help")) {
      setShowInteractionDemo(true);
      return;
    }

    // State, Persistence & System Status group
    if (feature.title.includes("State") || feature.title.includes("Save") || feature.title.includes("Undo") || feature.title.includes("Session") || feature.title.includes("Draft") || feature.title.includes("History") || feature.title.includes("Offline") || feature.title.includes("Network") || feature.title.includes("Battery") || feature.title.includes("Error") || feature.title.includes("Flag") || feature.title.includes("Role")) {
      setShowStateDemo(true);
      return;
    }

    // Universal fallback for complex system/meta features where generic demo is most appropriate
    setShowGenericDemo(true);
  };

  return (
    <>
      {feature.title === "Accent Color Picker" && (
        <ColorPickerDemo open={showColorPicker} onOpenChange={setShowColorPicker} />
      )}
      {(feature.title === "Theme Switcher" || feature.title === "Dark / Light / System Mode") && (
        <ThemeSwitcherDemo open={showThemeSwitcher} onOpenChange={setShowThemeSwitcher} />
      )}
      {feature.title === "Font Family Switcher" && (
        <FontFamilyDemo open={showFontFamilyDemo} onOpenChange={setShowFontFamilyDemo} />
      )}
      {feature.title.includes("Resizable Panels") && (
        <ResizablePanelsDemo open={showResizableDemo} onOpenChange={setShowResizableDemo} />
      )}
      {feature.title.includes("Sticky Header") && (
        <StickyLayoutDemo open={showStickyDemo} onOpenChange={setShowStickyDemo} />
      )}
      {feature.title.includes("Breadcrumb") && (
        <BreadcrumbDemo open={showBreadcrumbDemo} onOpenChange={setShowBreadcrumbDemo} />
      )}
      {(feature.title.includes("Table") || feature.title.includes("Sort")) && (
        <TableDemo open={showTableDemo} onOpenChange={setShowTableDemo} />
      )}
      {feature.title.includes("Search") && (
        <SearchDemo open={showSearchDemo} onOpenChange={setShowSearchDemo} />
      )}
      {(feature.title.includes("Infinite") || feature.title.includes("Lazy")) && (
        <InfiniteScrollDemo open={showInfiniteDemo} onOpenChange={setShowInfiniteDemo} />
      )}

      <LayoutDemo open={showLayoutDemo} onOpenChange={setShowLayoutDemo} title={feature.title} />
      <InteractionDemo open={showInteractionDemo} onOpenChange={setShowInteractionDemo} title={feature.title} />
      <StateDemo open={showStateDemo} onOpenChange={setShowStateDemo} title={feature.title} />
      <GenericFeatureDemo open={showGenericDemo} onOpenChange={setShowGenericDemo} feature={feature} />
      <FeatureDetailsDialog open={showDetails} onOpenChange={setShowDetails} feature={feature} />
      <FeatureSettingsDialog open={showSettings} onOpenChange={setShowSettings} feature={feature} />

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
