import { motion } from "framer-motion";
import { Command, Sparkles, Menu, LogIn } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerCommandPalette = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <nav className="glass-panel px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary via-accent to-primary glow-primary">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">UIverse</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#playground">Playground</NavLink>
            <NavLink href="#docs">Docs</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm border border-border"
              onClick={triggerCommandPalette}
            >
              <Command className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Search</span>
              <kbd className="px-1.5 py-0.5 text-xs bg-background/50 rounded text-muted-foreground border border-border">
                ⌘K
              </kbd>
            </motion.button>
            
            <ThemeToggle />
            
            <Link to="/auth">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm font-medium border border-primary/20"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </motion.button>
            </Link>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-panel mt-2 p-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              <MobileNavLink href="#features">Features</MobileNavLink>
              <MobileNavLink href="#playground">Playground</MobileNavLink>
              <MobileNavLink href="#docs">Docs</MobileNavLink>
              <Link
                to="/auth"
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium text-center"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    className="text-muted-foreground hover:text-foreground transition-colors font-medium relative group"
    whileHover={{ y: -2 }}
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
  </motion.a>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="px-4 py-2 rounded-lg hover:bg-secondary transition-colors font-medium"
  >
    {children}
  </a>
);
