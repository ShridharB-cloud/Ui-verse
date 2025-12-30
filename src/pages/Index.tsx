import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Playground } from "@/components/Playground";
import { DocsSection } from "@/components/DocsSection";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { DottedSurface } from "@/components/ui/dotted-surface";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated background layer */}
      <DottedSurface />

      <CommandPalette />
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <Playground />
        <DocsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
