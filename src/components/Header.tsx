import { motion } from "framer-motion";
import { Command, Sparkles, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient">UIverse</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#playground">Playground</NavLink>
            <NavLink href="#docs">Docs</NavLink>
            <NavLink href="#workspace">Workspace</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm"
              onClick={() => {
                const event = new KeyboardEvent("keydown", {
                  key: "k",
                  metaKey: true,
                });
                document.dispatchEvent(event);
              }}
            >
              <Command className="w-4 h-4" />
              <span className="text-muted-foreground">Search</span>
              <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
            </motion.button>
            <ThemeToggle />
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
              <MobileNavLink href="#workspace">Workspace</MobileNavLink>
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
    className="text-muted-foreground hover:text-foreground transition-colors font-medium"
    whileHover={{ y: -2 }}
  >
    {children}
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
