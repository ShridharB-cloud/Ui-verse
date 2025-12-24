import { useState } from "react";
import { Check } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const PRESET_COLORS = [
    { name: "Violet (Default)", value: "270 50% 55%" },
    { name: "Ocean Blue", value: "210 100% 50%" },
    { name: "Emerald", value: "150 60% 45%" },
    { name: "Amber", value: "35 90% 50%" },
    { name: "Rose", value: "340 75% 55%" },
    { name: "Crimson", value: "0 72% 51%" },
];

interface ColorPickerDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ColorPickerDemo = ({ open, onOpenChange }: ColorPickerDemoProps) => {
    const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0].value);

    const applyColor = (colorValue: string) => {
        setSelectedColor(colorValue);
        document.documentElement.style.setProperty("--primary", colorValue);
        // Also update the ring and glow colors for consistency
        document.documentElement.style.setProperty("--ring", colorValue);
        document.documentElement.style.setProperty("--glow-primary", colorValue);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Customize Accent Color</DialogTitle>
                    <DialogDescription>
                        Choose a primary color for your theme. This will update the application's look immediately.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Label>Select Color</Label>
                    <div className="grid grid-cols-3 gap-3">
                        {PRESET_COLORS.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => applyColor(color.value)}
                                className={`
                  relative h-12 rounded-md border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${selectedColor === color.value ? "border-primary ring-2 ring-primary ring-offset-2" : "border-transparent"}
                `}
                                style={{ backgroundColor: `hsl(${color.value})` }}
                            >
                                {selectedColor === color.value && (
                                    <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md">
                                        <Check className="h-5 w-5" />
                                    </span>
                                )}
                                <span className="sr-only">{color.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
