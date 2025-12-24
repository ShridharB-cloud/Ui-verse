import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
