import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MousePointer2, ArrowRight, Star, Heart } from "lucide-react";

interface HoverEffectsDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const HoverEffectsDemo = ({ open, onOpenChange }: HoverEffectsDemoProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MousePointer2 className="h-5 w-5" />
                        Hover Effects
                    </DialogTitle>
                    <DialogDescription>
                        Explore different visual feedback styles for hover interactions.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Lift Effect */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm cursor-pointer"
                        >
                            <div className="font-semibold mb-1">Lift</div>
                            <div className="text-xs text-muted-foreground">Moves up on hover</div>
                        </motion.div>

                        {/* Scale Effect */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm cursor-pointer"
                        >
                            <div className="font-semibold mb-1">Scale</div>
                            <div className="text-xs text-muted-foreground">Grows larger</div>
                        </motion.div>

                        {/* Glow Effect */}
                        <motion.div
                            whileHover={{ boxShadow: "0 0 20px -5px hsl(var(--primary) / 0.5)" }}
                            className="p-4 rounded-xl border bg-card text-card-foreground shadow-sm cursor-pointer transition-shadow"
                        >
                            <div className="font-semibold mb-1">Glow</div>
                            <div className="text-xs text-muted-foreground">Emits colored light</div>
                        </motion.div>

                        {/* Border Effect */}
                        <motion.div
                            className="p-4 rounded-xl border-2 border-transparent bg-secondary text-secondary-foreground shadow-sm cursor-pointer transition-colors hover:border-primary hover:bg-secondary/80"
                        >
                            <div className="font-semibold mb-1">Border</div>
                            <div className="text-xs text-muted-foreground">Highlight outline</div>
                        </motion.div>
                    </div>

                    <div className="space-y-3">
                        {/* Button with Icon Reveal */}
                        <Button className="w-full group overflow-hidden relative">
                            <span className="group-hover:-translate-x-2 transition-transform duration-300">
                                Hover Me
                            </span>
                            <ArrowRight className="absolute right-4 w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Button>

                        {/* Interactive List Item */}
                        <div className="group flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                    <Star className="w-4 h-4" />
                                </div>
                                <div className="text-sm font-medium">List Item Interaction</div>
                            </div>
                            <Heart className="w-4 h-4 text-muted-foreground group-hover:text-red-500 group-hover:fill-red-500 transition-colors duration-300" />
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
