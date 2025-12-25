import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Battery, BatteryCharging, BatteryLow, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

interface BatterySaverDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const BatterySaverDemo = ({ open, onOpenChange }: BatterySaverDemoProps) => {
    const [batteryLevel, setBatteryLevel] = useState(80);
    const [isSaverMode, setIsSaverMode] = useState(false);

    // Auto-enable saver mode when battery is low
    useEffect(() => {
        if (batteryLevel <= 20 && !isSaverMode) {
            setIsSaverMode(true);
        } else if (batteryLevel > 20 && isSaverMode) {
            setIsSaverMode(false);
        }
    }, [batteryLevel]);

    const getBatteryIcon = () => {
        if (isSaverMode) return <BatteryLow className="h-5 w-5 text-yellow-500" />;
        if (batteryLevel > 20) return <BatteryCharging className="h-5 w-5 text-green-500" />;
        return <Battery className="h-5 w-5" />;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        Battery Saver Mode
                    </DialogTitle>
                    <DialogDescription>
                        UI adapts to preserve battery life by reducing animations and effects.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-8">
                    {/* Controls */}
                    <div className="space-y-4 p-4 rounded-lg bg-muted/50">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Battery Level</span>
                                <span className="font-mono">{batteryLevel}%</span>
                            </div>
                            <Progress value={batteryLevel} className="h-2" />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={batteryLevel}
                                onChange={(e) => setBatteryLevel(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {getBatteryIcon()}
                                <span className="text-sm font-medium">Saver Mode</span>
                            </div>
                            <Switch
                                checked={isSaverMode}
                                onCheckedChange={setIsSaverMode}
                            />
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preview</h4>

                        {/* Animated Card */}
                        <div className={`
                            p-6 rounded-xl border relative overflow-hidden transition-all duration-300
                            ${isSaverMode ? "bg-card shadow-none" : "bg-gradient-to-br from-primary/10 to-accent/10 shadow-lg"}
                        `}>
                            {/* Background Animation - Hidden in Saver Mode */}
                            {!isSaverMode && (
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
                                </div>
                            )}

                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-lg mb-1">Heavy Animation</div>
                                    <div className="text-sm text-muted-foreground">
                                        {isSaverMode
                                            ? "Animations disabled to save power"
                                            : "Full visual effects active"}
                                    </div>
                                </div>
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center
                                    ${isSaverMode
                                        ? "bg-secondary text-secondary-foreground"
                                        : "bg-primary text-primary-foreground animate-spin-slow"}
                                `}>
                                    <Zap className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Video / Media Placeholder */}
                        <div className={`
                            h-24 rounded-lg flex items-center justify-center border-2 border-dashed
                            ${isSaverMode ? "bg-muted/30 border-muted" : "bg-muted/50 border-primary/30"}
                        `}>
                            {isSaverMode ? (
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                    Autoplay Disabled
                                </div>
                            ) : (
                                <div className="text-xs text-primary flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Video Autoplaying...
                                </div>
                            )}
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
