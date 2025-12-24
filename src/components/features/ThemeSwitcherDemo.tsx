import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeSwitcherDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type Theme = "dark" | "light" | "system";

export const ThemeSwitcherDemo = ({ open, onOpenChange }: ThemeSwitcherDemoProps) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        // Initialize theme from document class
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "dark" : "light");
    }, []);

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme);
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (newTheme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(newTheme);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Theme Switcher</DialogTitle>
                    <DialogDescription>
                        Choose your preferred appearance mode.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 py-4">
                    <Button
                        variant={theme === "light" ? "default" : "outline"}
                        className="flex flex-col items-center gap-2 h-auto py-4"
                        onClick={() => handleThemeChange("light")}
                    >
                        <Sun className="h-6 w-6" />
                        <span>Light</span>
                    </Button>
                    <Button
                        variant={theme === "dark" ? "default" : "outline"}
                        className="flex flex-col items-center gap-2 h-auto py-4"
                        onClick={() => handleThemeChange("dark")}
                    >
                        <Moon className="h-6 w-6" />
                        <span>Dark</span>
                    </Button>
                    <Button
                        variant={theme === "system" ? "default" : "outline"}
                        className="flex flex-col items-center gap-2 h-auto py-4"
                        onClick={() => handleThemeChange("system")}
                    >
                        <Monitor className="h-6 w-6" />
                        <span>System</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
