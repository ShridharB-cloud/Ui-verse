import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Layout, Palette, Zap, Settings, Command, User, LogIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action?: () => void;
}

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const commands: CommandItem[] = [
    { 
      id: "1", 
      title: "Browse All Features", 
      category: "Navigation", 
      icon: <Sparkles className="w-4 h-4" />,
      action: () => {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }
    },
    { 
      id: "2", 
      title: "Theme & Appearance", 
      category: "Categories", 
      icon: <Palette className="w-4 h-4" />,
      action: () => setOpen(false)
    },
    { 
      id: "3", 
      title: "Layout & Navigation", 
      category: "Categories", 
      icon: <Layout className="w-4 h-4" />,
      action: () => setOpen(false)
    },
    { 
      id: "4", 
      title: "Interactions & Micro-UX", 
      category: "Categories", 
      icon: <Zap className="w-4 h-4" />,
      action: () => setOpen(false)
    },
    { 
      id: "5", 
      title: "Sign In / Sign Up", 
      category: "Account", 
      icon: <LogIn className="w-4 h-4" />,
      action: () => {
        navigate("/auth");
        setOpen(false);
      }
    },
    { 
      id: "6", 
      title: "Platform Settings", 
      category: "System", 
      icon: <Settings className="w-4 h-4" />,
      action: () => setOpen(false)
    },
  ];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((o) => !o);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden glass-panel border-border bg-card/95 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search features, commands, settings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm"
            autoFocus
          />
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-medium text-muted-foreground bg-secondary rounded border border-border">
            <Command className="w-3 h-3" />K
          </kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          <AnimatePresence mode="wait">
            {Object.entries(groupedCommands).map(([category, items], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: idx * 0.03 }}
                className="mb-3"
              >
                <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {category}
                </p>
                {items.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-secondary transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="p-2 rounded-lg bg-secondary group-hover:bg-primary/10 group-hover:text-primary transition-colors border border-border">
                      {item.icon}
                    </span>
                    <span className="flex-1 font-medium text-sm">{item.title}</span>
                  </motion.button>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCommands.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-sm">No results found for "{search}"</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
