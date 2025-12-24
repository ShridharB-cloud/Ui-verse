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
import { MousePointer2, Touchpad, Move, Focus, Hand } from "lucide-react";

interface InteractionDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
}

export const InteractionDemo = ({ open, onOpenChange, title = "Interaction Demo" }: InteractionDemoProps) => {
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [active, setActive] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MousePointer2 className="w-5 h-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        Test various interaction states and visual feedback mechanisms.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-8 space-y-8 flex flex-col items-center">
                    {/* Interactive Element */}
                    <div
                        className={`
                            w-32 h-32 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300
                            ${hovered ? "scale-110 shadow-xl bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground shadow-sm"}
                            ${active ? "scale-95 ring-4 ring-primary/30" : ""}
                            ${focused ? "ring-2 ring-offset-2 ring-ring" : ""}
                        `}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => { setHovered(false); setActive(false); }}
                        onMouseDown={() => setActive(true)}
                        onMouseUp={() => setActive(false)}
                        onClick={() => setFocused(!focused)}
                        role="button"
                        tabIndex={0}
                    >
                        {hovered ? <Hand className="w-10 h-10 animate-pulse" /> : <MousePointer2 className="w-10 h-10" />}
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                            <div className={`w-3 h-3 rounded-full ${hovered ? "bg-green-500" : "bg-muted"}`} />
                            <span className="text-sm">Hover State</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                            <div className={`w-3 h-3 rounded-full ${active ? "bg-blue-500" : "bg-muted"}`} />
                            <span className="text-sm">Active/Press</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                            <div className={`w-3 h-3 rounded-full ${focused ? "bg-purple-500" : "bg-muted"}`} />
                            <span className="text-sm">Focus Ring</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 rounded-lg border bg-card">
                            <Touchpad className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Touch Ready</span>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                        Interact with the box above: Hover, Click, or Press to see effects.
                    </p>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
