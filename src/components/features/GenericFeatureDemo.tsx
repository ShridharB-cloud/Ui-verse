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
import { MoveRight, RefreshCcw, Zap } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

interface GenericFeatureDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    feature: Tables<"features">;
}

export const GenericFeatureDemo = ({ open, onOpenChange, feature }: GenericFeatureDemoProps) => {
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {feature.title} Demo
                    </DialogTitle>
                    <DialogDescription>
                        Interactive preview for {feature.title}.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Interactive Preview Area */}
                    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center gap-4 min-h-[200px] relative overflow-hidden transition-all duration-300">

                        <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />

                        <div className="relative z-10 text-center space-y-2">
                            <div className={`p-4 rounded-full bg-secondary transition-transform duration-300 ${isActive ? "scale-110" : "scale-100"}`}>
                                <Zap className={`w-8 h-8 transition-colors duration-300 ${isActive ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                            </div>

                            <div className="text-2xl font-bold font-mono tabular-nums">
                                {count}
                            </div>

                            <p className="text-xs text-muted-foreground">
                                Interaction Counter
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                setIsActive(false);
                                setCount(0);
                            }}
                        >
                            <RefreshCcw className="w-4 h-4" />
                        </Button>

                        <Button
                            className="w-full max-w-[200px] group"
                            onClick={() => {
                                setCount(c => c + 1);
                                setIsActive(true);
                            }}
                        >
                            Trigger Action
                            <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
