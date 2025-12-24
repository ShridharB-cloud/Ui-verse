import { useState } from "react";
import { motion } from "framer-motion";
import { FeatureCard, Feature } from "./FeatureCard";
import { CategoryFilter } from "./CategoryFilter";
import {
  Palette,
  Layout,
  Zap,
  Smartphone,
  Save,
  Accessibility,
  Search,
  Settings,
  Flag,
} from "lucide-react";

const categories = [
  "All",
  "Theme & Appearance",
  "Layout & Navigation",
  "Interactions",
  "Responsive",
  "State & Persistence",
  "Accessibility",
  "Content",
  "System",
  "Meta",
];

const features: Feature[] = [
  {
    id: "1",
    title: "Dark / Light / System Mode",
    description: "Intelligent theme switching with system preference detection and smooth transitions.",
    category: "Theme & Appearance",
    status: "stable",
    enabled: true,
    icon: <Palette className="w-5 h-5 text-primary" />,
  },
  {
    id: "2",
    title: "Time-Based Auto Theme",
    description: "Automatically switch themes based on time of day for optimal viewing experience.",
    category: "Theme & Appearance",
    status: "experimental",
    icon: <Palette className="w-5 h-5 text-primary" />,
  },
  {
    id: "3",
    title: "Collapsible Sidebar",
    description: "Space-efficient navigation with smooth collapse animations and keyboard shortcuts.",
    category: "Layout & Navigation",
    status: "stable",
    icon: <Layout className="w-5 h-5 text-primary" />,
  },
  {
    id: "4",
    title: "Resizable Panels",
    description: "Drag-to-resize panels with snap points and persistent layout memory.",
    category: "Layout & Navigation",
    status: "stable",
    icon: <Layout className="w-5 h-5 text-primary" />,
  },
  {
    id: "5",
    title: "Smart Toast Notifications",
    description: "Context-aware notifications with stacking, actions, and auto-dismiss.",
    category: "Interactions",
    status: "stable",
    enabled: true,
    icon: <Zap className="w-5 h-5 text-primary" />,
  },
  {
    id: "6",
    title: "Skeleton Loaders",
    description: "Elegant loading states that match your content structure perfectly.",
    category: "Interactions",
    status: "stable",
    icon: <Zap className="w-5 h-5 text-primary" />,
  },
  {
    id: "7",
    title: "Device-Adaptive UI",
    description: "Automatic UI adjustments based on device type, screen size, and capabilities.",
    category: "Responsive",
    status: "stable",
    icon: <Smartphone className="w-5 h-5 text-primary" />,
  },
  {
    id: "8",
    title: "Network-Aware UI",
    description: "Gracefully degrade features based on network speed and connection type.",
    category: "Responsive",
    status: "experimental",
    icon: <Smartphone className="w-5 h-5 text-primary" />,
  },
  {
    id: "9",
    title: "UI State Persistence",
    description: "Remember user preferences, panel sizes, and view states across sessions.",
    category: "State & Persistence",
    status: "stable",
    icon: <Save className="w-5 h-5 text-primary" />,
  },
  {
    id: "10",
    title: "Undo / Redo Stack",
    description: "Full state history with branching and keyboard shortcut support.",
    category: "State & Persistence",
    status: "experimental",
    icon: <Save className="w-5 h-5 text-primary" />,
  },
  {
    id: "11",
    title: "Keyboard Navigation",
    description: "Full keyboard control with visible focus indicators and skip links.",
    category: "Accessibility",
    status: "stable",
    enabled: true,
    icon: <Accessibility className="w-5 h-5 text-primary" />,
  },
  {
    id: "12",
    title: "Screen Reader Labels",
    description: "Comprehensive ARIA labels for all interactive elements.",
    category: "Accessibility",
    status: "stable",
    icon: <Accessibility className="w-5 h-5 text-primary" />,
  },
  {
    id: "13",
    title: "Smart Search with Highlighting",
    description: "Instant search with fuzzy matching and result highlighting.",
    category: "Content",
    status: "stable",
    icon: <Search className="w-5 h-5 text-primary" />,
  },
  {
    id: "14",
    title: "Infinite Scroll / Lazy Load",
    description: "Seamless content loading with scroll detection and prefetching.",
    category: "Content",
    status: "stable",
    icon: <Search className="w-5 h-5 text-primary" />,
  },
  {
    id: "15",
    title: "Feature Flag UI",
    description: "Visual feature flag management with A/B testing support.",
    category: "System",
    status: "stable",
    icon: <Settings className="w-5 h-5 text-primary" />,
  },
  {
    id: "16",
    title: "Error Boundary UI",
    description: "Graceful error handling with recovery options and error reporting.",
    category: "System",
    status: "stable",
    icon: <Settings className="w-5 h-5 text-primary" />,
  },
  {
    id: "17",
    title: "Feature Dependency Manager",
    description: "Automatic handling of feature dependencies and conflicts.",
    category: "Meta",
    status: "experimental",
    icon: <Flag className="w-5 h-5 text-primary" />,
  },
  {
    id: "18",
    title: "Feature Usage Analytics",
    description: "Track feature adoption, usage patterns, and performance metrics.",
    category: "Meta",
    status: "stable",
    icon: <Flag className="w-5 h-5 text-primary" />,
  },
];

export const FeaturesSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFeatures =
    activeCategory === "All"
      ? features
      : features.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="py-24 relative">
      <div className="container px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Feature <span className="text-gradient">Encyclopedia</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive collection of UI features. Enable, configure,
            and experiment with each one in real-time.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="glass-panel p-2 inline-flex flex-wrap justify-center gap-2">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
