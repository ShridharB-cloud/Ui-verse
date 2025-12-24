import { motion } from "framer-motion";
import { Sparkles, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-16 relative">
      <div className="absolute inset-0 bg-radial-gradient opacity-30" />
      
      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/">
              <motion.div
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary via-accent to-primary">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">UIverse</span>
              </motion.div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The ultimate developer platform for discovering, enabling, and
              experimenting with UI features.
            </p>
            <div className="flex gap-3">
              <SocialLink icon={<Github className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Twitter className="w-4 h-4" />} href="#" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#playground">Playground</FooterLink>
              <FooterLink href="#workspace">Workspace</FooterLink>
              <FooterLink href="#dashboard">Dashboard</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2">
              <FooterLink href="#">Documentation</FooterLink>
              <FooterLink href="#">API Reference</FooterLink>
              <FooterLink href="#">Changelog</FooterLink>
              <FooterLink href="#">Roadmap</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Account</h4>
            <ul className="space-y-2">
              <FooterLink href="/auth">Sign In</FooterLink>
              <FooterLink href="/auth">Create Account</FooterLink>
              <FooterLink href="#">Support</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 UIverse. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="p-2.5 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground border border-border"
  >
    {icon}
  </motion.a>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <li>
    <a
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </a>
  </li>
);
