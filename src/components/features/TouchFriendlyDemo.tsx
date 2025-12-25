import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MousePointer2, Touchpad, Check, Settings, Mail, Bell } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TouchFriendlyDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TouchFriendlyDemo = ({ open, onOpenChange }: TouchFriendlyDemoProps) => {
    const [isTouchMode, setIsTouchMode] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {isTouchMode ? <Touchpad className="h-5 w-5 text-primary" /> : <MousePointer2 className="h-5 w-5" />}
                        {isTouchMode ? "Touch Mode Active" : "Mouse Mode"}
                    </DialogTitle>
                    <DialogDescription>
                        Compare standard mouse interactions vs. touch-optimized UI (larger targets, more spacing).
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-8">
                    {/* Controls */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Enable Touch Optimization</span>
                        </div>
                        <Switch
                            checked={isTouchMode}
                            onCheckedChange={setIsTouchMode}
                        />
                    </div>

                    {/* Preview Area */}
                    <div className="space-y-6 border rounded-xl p-6 bg-card relative overflow-hidden">
                        <div className="absolute top-2 right-2 text-[10px] bg-muted px-2 py-1 rounded text-muted-foreground uppercase tracking-widest">
                            {isTouchMode ? "Touch UI" : "Standard UI"}
                        </div>

                        {/* Navigation / List Items */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">List Items</Label>
                            <div className={`
                                border rounded-lg overflow-hidden
                                ${isTouchMode ? "divide-y-2" : "divide-y"}
                            `}>
                                {[
                                    { icon: Mail, label: "Messages" },
                                    { icon: Bell, label: "Notifications" },
                                    { icon: Settings, label: "Settings" }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`
                                            flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-all
                                            ${isTouchMode ? "p-4" : "p-2.5"}
                                        `}
                                    >
                                        <item.icon className={isTouchMode ? "w-6 h-6" : "w-4 h-4"} />
                                        <span className={isTouchMode ? "text-base font-medium" : "text-sm"}>{item.label}</span>
                                        <Check className={`ml-auto opacity-0 ${isTouchMode ? "w-5 h-5" : "w-4 h-4"}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Input Fields */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Inputs</Label>
                                <Input
                                    placeholder="Tap to type..."
                                    className={`transition-all ${isTouchMode ? "h-12 text-base" : "h-9 text-sm"}`}
                                />
                            </div>

                            {/* Buttons */}
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Actions</Label>
                                <Button
                                    className={`w-full transition-all ${isTouchMode ? "h-12 text-base" : "h-9 text-sm"}`}
                                >
                                    {isTouchMode ? "Tap Me" : "Click Me"}
                                </Button>
                            </div>
                        </div>

                        {/* Touch Target Info */}
                        {isTouchMode && (
                            <div className="flex items-center gap-2 p-3 bg-primary/10 text-primary rounded-lg text-sm">
                                <Check className="w-4 h-4" />
                                <span>Min. target size: 44x44px</span>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
