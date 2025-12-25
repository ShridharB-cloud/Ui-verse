import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Moon, Sun, Clock } from "lucide-react";
import { useState, useMemo } from "react";

interface TimeBasedThemeDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TimeBasedThemeDemo = ({ open, onOpenChange }: TimeBasedThemeDemoProps) => {
    // 0 to 24 hours
    const [time, setTime] = useState([12]);

    const hours = time[0];
    const isNight = hours < 6 || hours >= 18;

    const formatTime = (h: number) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const displayH = h % 12 || 12;
        return `${displayH}:00 ${ampm}`;
    };

    const skyGradient = useMemo(() => {
        if (hours >= 6 && hours < 12) {
            // Morning
            return "from-sky-300 to-blue-200";
        } else if (hours >= 12 && hours < 17) {
            // Afternoon
            return "from-blue-400 to-sky-300";
        } else if (hours >= 17 && hours < 20) {
            // Sunset
            return "from-orange-400 to-purple-500";
        } else {
            // Night
            return "from-slate-900 via-purple-900 to-slate-900";
        }
    }, [hours]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Time-Based Auto Theme
                    </DialogTitle>
                    <DialogDescription>
                        Theme automatically adjusts based on the time of day.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Visual Preview */}
                    <div className={`
                        relative w-full h-48 rounded-xl overflow-hidden shadow-inner transition-colors duration-1000
                        bg-gradient-to-b ${skyGradient}
                    `}>
                        {/* Sun/Moon Position */}
                        <div
                            className="absolute left-1/2 bottom-0 w-full h-full origin-bottom transition-transform duration-500 ease-out"
                            style={{ transform: `rotate(${(hours - 12) * 15}deg)` }}
                        >
                            {/* Celestial Body */}
                            <div className="absolute top-8 left-1/2 -translate-x-1/2">
                                {isNight ? (
                                    <Moon className="w-12 h-12 text-yellow-100 drop-shadow-[0_0_15px_rgba(255,255,200,0.5)]" fill="currentColor" />
                                ) : (
                                    <Sun className="w-16 h-16 text-yellow-400 drop-shadow-[0_0_25px_rgba(255,200,0,0.6)] animate-pulse" fill="currentColor" />
                                )}
                            </div>
                        </div>

                        {/* UI Mockup Overlay */}
                        <div className={`
                            absolute bottom-4 left-4 right-4 p-4 rounded-lg backdrop-blur-md transition-colors duration-500
                            ${isNight
                                ? "bg-slate-900/80 border border-slate-700 text-slate-100"
                                : "bg-white/80 border border-white/50 text-slate-800"
                            }
                        `}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="font-semibold text-sm">App Interface</div>
                                <div className="text-xs opacity-70">{isNight ? "Dark Mode" : "Light Mode"}</div>
                            </div>
                            <div className={`h-2 rounded w-3/4 mb-2 ${isNight ? "bg-slate-700" : "bg-slate-200"}`} />
                            <div className={`h-2 rounded w-1/2 ${isNight ? "bg-slate-700" : "bg-slate-200"}`} />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium"> Simulated Time</label>
                            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                {formatTime(hours)}
                            </span>
                        </div>
                        <Slider
                            value={[hours]}
                            min={0}
                            max={23}
                            step={1}
                            onValueChange={setTime}
                            className="cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-muted-foreground px-1">
                            <span>12 AM</span>
                            <span>6 AM</span>
                            <span>12 PM</span>
                            <span>6 PM</span>
                            <span>12 AM</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            Drag slider to change time. Theme switches at 6:00 PM and 6:00 AM.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
