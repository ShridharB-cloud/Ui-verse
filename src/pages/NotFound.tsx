import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Ghost, Home } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Ghost className="w-32 h-32 mx-auto text-primary relative z-10" />
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground">
              Oops! The page <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">{location.pathname}</span> usually exists in a parallel universe, but not this one.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
