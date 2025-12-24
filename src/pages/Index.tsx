import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Playground } from "@/components/Playground";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CommandPalette />
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <Playground />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
