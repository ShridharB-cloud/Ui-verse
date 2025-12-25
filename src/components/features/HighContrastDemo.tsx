import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Contrast, Check } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface HighContrastDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const HighContrastDemo = ({ open, onOpenChange }: HighContrastDemoProps) => {
    const [isHighContrast, setIsHighContrast] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Contrast className="h-5 w-5" />
                        High Contrast Mode
                    </DialogTitle>
                    <DialogDescription>
                        Maximize contrast ratios for better readability.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <h4 className="font-medium text-sm">Enable High Contrast</h4>
                            <p className="text-xs text-muted-foreground">
                                Apply high contrast styles to the preview area.
                            </p>
                        </div>
                        <Switch
                            checked={isHighContrast}
                            onCheckedChange={setIsHighContrast}
                        />
                    </div>

                    <div
                        className={`
                            rounded-xl p-6 transition-colors duration-300
                            ${isHighContrast
                                ? "bg-black border-2 border-white text-white"
                                : "bg-muted/50 border border-border text-foreground"
                            }
                        `}
                    >
                        <h3 className={`font-bold text-lg mb-2 ${isHighContrast ? "text-yellow-400" : ""}`}>
                            Sample Content
                        </h3>
                        <p className={`text-sm mb-4 ${isHighContrast ? "text-white" : "text-muted-foreground"}`}>
                            This is how content appears in high contrast mode. Backgrounds become darker, text becomes brighter, and borders become more distinct.
                        </p>
                        <div className="flex gap-3">
                            <button
                                className={`
                                    px-4 py-2 rounded-lg font-bold text-sm transition-colors
                                    ${isHighContrast
                                        ? "bg-yellow-400 text-black hover:bg-yellow-300 ring-2 ring-white"
                                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                                    }
                                `}
                            >
                                Primary Action
                            </button>
                            <button
                                className={`
                                    px-4 py-2 rounded-lg font-bold text-sm transition-colors
                                    ${isHighContrast
                                        ? "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black"
                                        : "bg-background border border-border hover:bg-accent hover:text-accent-foreground"
                                    }
                                `}
                            >
                                Secondary
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg border flex items-center gap-3 ${isHighContrast ? "bg-black border-white" : "bg-card"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isHighContrast ? "bg-yellow-400 text-black" : "bg-primary/10 text-primary"}`}>
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={`text-xs font-bold ${isHighContrast ? "text-white" : "text-muted-foreground"}`}>Contrast Ratio</div>
                                <div className={`font-bold ${isHighContrast ? "text-yellow-400" : "text-foreground"}`}>21:1</div>
                            </div>
                        </div>
                        <div className={`p-4 rounded-lg border flex items-center gap-3 ${isHighContrast ? "bg-black border-white" : "bg-card"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isHighContrast ? "bg-white text-black" : "bg-primary/10 text-primary"}`}>
                                <Contrast className="w-5 h-5" />
                            </div>
                            <div>
                                <div className={`text-xs font-bold ${isHighContrast ? "text-white" : "text-muted-foreground"}`}>Standards</div>
                                <div className={`font-bold ${isHighContrast ? "text-white" : "text-foreground"}`}>AAA Level</div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
