import { useRef, useState, MouseEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MousePointer2, Sparkles, Zap, Fingerprint } from "lucide-react";

interface HoverEffectsDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// --- Spotlight Card Component ---
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={`group relative border border-white/10 bg-gray-900 overflow-hidden rounded-xl ${className}`}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
};

// --- Magnetic Button Component ---
const MagneticButton = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    function handleMouseMove(e: MouseEvent) {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const center = { x: left + width / 2, y: top + height / 2 };
        x.set((clientX - center.x) * 0.3); // Magnetic pull strength
        y.set((clientY - center.y) * 0.3);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            className={`relative rounded-full px-6 py-3 font-medium transition-colors ${className}`}
        >
            {children}
        </motion.button>
    );
};

export const HoverEffectsDemo = ({ open, onOpenChange }: HoverEffectsDemoProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl bg-black border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-light tracking-wide text-white">
                        <MousePointer2 className="h-5 w-5 text-sky-400" />
                        Interactive Highlights
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Premium hover interactions: Spotlight gradients and Magnetic pulls.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-8">
                    {/* Section 1: Spotlight Cards */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wider">Spotlight Grid</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <SpotlightCard className="p-6 h-40 flex flex-col justify-between">
                                <Sparkles className="w-8 h-8 text-sky-400 mb-2" />
                                <div>
                                    <div className="font-semibold text-white">Discovery</div>
                                    <div className="text-xs text-gray-400 mt-1">Reveal content with light</div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-6 h-40 flex flex-col justify-between">
                                <Fingerprint className="w-8 h-8 text-purple-400 mb-2" />
                                <div>
                                    <div className="font-semibold text-white">Identity</div>
                                    <div className="text-xs text-gray-400 mt-1">Unique interaction patterns</div>
                                </div>
                            </SpotlightCard>

                            <SpotlightCard className="p-6 h-40 flex flex-col justify-between">
                                <Zap className="w-8 h-8 text-amber-400 mb-2" />
                                <div>
                                    <div className="font-semibold text-white">Energy</div>
                                    <div className="text-xs text-gray-400 mt-1">Dynamic feedback loops</div>
                                </div>
                            </SpotlightCard>
                        </div>
                    </div>

                    {/* Section 2: Magnetic Buttons */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-6 uppercase tracking-wider">Magnetic Controls</h3>
                        <div className="flex flex-wrap gap-8 items-center justify-center p-8 rounded-xl border border-white/5 bg-white/5">
                            <MagneticButton className="bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/20">
                                Primary Action
                            </MagneticButton>

                            <MagneticButton className="border border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                                Secondary
                            </MagneticButton>

                            <MagneticButton className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20">
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Magic
                                </span>
                            </MagneticButton>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-gray-400 hover:text-white hover:bg-white/5"
                    >
                        Close Demo
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
