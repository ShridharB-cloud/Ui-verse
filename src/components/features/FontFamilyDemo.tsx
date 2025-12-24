import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Type } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

interface FontFamilyDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    feature?: Tables<"features">; // Optional to allow standalone use if needed
}

type FontFamily = "sans" | "serif" | "mono";

export const FontFamilyDemo = ({ open, onOpenChange }: FontFamilyDemoProps) => {
    const [font, setFont] = useState<FontFamily>("sans");

    const getFontClass = (f: FontFamily) => {
        switch (f) {
            case "serif": return "font-serif";
            case "mono": return "font-mono";
            default: return "font-sans";
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Type className="w-5 h-5" />
                        Font Family Switcher
                    </DialogTitle>
                    <DialogDescription>
                        Preview content with different typography settings.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Preview Area */}
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm min-h-[160px] flex flex-col justify-center gap-2 transition-all">
                        <h3 className={`text-2xl font-bold ${getFontClass(font)} transition-all duration-300`}>
                            The quick brown fox
                        </h3>
                        <p className={`text-muted-foreground ${getFontClass(font)} transition-all duration-300`}>
                            Jumps over the lazy dog. Typography plays a crucial role in user interface design.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-3 gap-2">
                        <Button
                            variant={font === "sans" ? "default" : "outline"}
                            onClick={() => setFont("sans")}
                            className="font-sans"
                        >
                            Sans
                        </Button>
                        <Button
                            variant={font === "serif" ? "default" : "outline"}
                            onClick={() => setFont("serif")}
                            className="font-serif"
                        >
                            Serif
                        </Button>
                        <Button
                            variant={font === "mono" ? "default" : "outline"}
                            onClick={() => setFont("mono")}
                            className="font-mono"
                        >
                            Mono
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
