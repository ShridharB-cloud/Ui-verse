import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { CategoryFilter } from "./CategoryFilter";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Loader2 } from "lucide-react";

type Feature = Tables<"features">;

const categories = [
  { value: "all", label: "All" },
  { value: "theme_appearance", label: "Theme & Appearance" },
  { value: "layout_navigation", label: "Layout & Navigation" },
  { value: "interactions", label: "Interactions" },
  { value: "responsive", label: "Responsive" },
  { value: "state_persistence", label: "State & Persistence" },
  { value: "accessibility", label: "Accessibility" },
  { value: "content", label: "Content" },
  { value: "system", label: "System" },
  { value: "meta", label: "Meta" },
];

/* Existing imports */
import { useToast } from "@/hooks/use-toast";

export const FeaturesSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    /* fetchFeatures logic remains */
    const fetchFeatures = async () => {
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .order("category", { ascending: true })
        .order("title", { ascending: true });

      if (!error && data) {
        setFeatures(data);
      }
      setLoading(false);
    };

    fetchFeatures();
  }, []);

  const handleToggle = async (featureId: string, enabled: boolean) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Optional: Toast to inform user that setting won't persist across devices
      console.log("User not logged in, setting local only");
      return;
    }

    const { error } = await supabase
      .from("user_feature_configs")
      .upsert({
        user_id: session.user.id,
        feature_id: featureId,
        enabled: enabled,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id, feature_id'
      });

    if (error) {
      console.error("Error saving feature config:", error);
      toast({
        title: "Error",
        description: "Failed to save feature preference.",
        variant: "destructive",
      });
    }
  };

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-radial-gradient opacity-50" />

      <div className="container px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
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
          className="mb-12"
        >
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </motion.div>

        {/* Features Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredFeatures.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No features found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
