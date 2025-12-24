import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Columns, GripVertical } from "lucide-react";

interface ResizablePanelsDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ResizablePanelsDemo = ({ open, onOpenChange }: ResizablePanelsDemoProps) => {
    const [leftWidth, setLeftWidth] = useState(50); // Percentage
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMouseDown = () => {
        isDragging.current = true;
        document.body.style.cursor = "col-resize";
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        document.body.style.cursor = "default";
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const newValue = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Limit between 20% and 80%
        if (newValue >= 20 && newValue <= 80) {
            setLeftWidth(newValue);
        }
    };

    useEffect(() => {
        if (open) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Columns className="w-5 h-5" />
                        Resizable Panels
                    </DialogTitle>
                    <DialogDescription>
                        Drag the handle to resize the panels. Layout persists (simulated).
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6">
                    <div
                        ref={containerRef}
                        className="h-[300px] w-full border rounded-lg flex overflow-hidden select-none bg-muted/20"
                    >
                        {/* Left Panel */}
                        <div
                            style={{ width: `${leftWidth}%` }}
                            className="bg-card p-4 flex items-center justify-center border-r relative transition-all duration-75 ease-out"
                        >
                            <div className="text-center">
                                <span className="font-mono font-bold text-2xl">{Math.round(leftWidth)}%</span>
                                <p className="text-xs text-muted-foreground mt-1">Left Panel</p>
                            </div>
                        </div>

                        {/* Handle */}
                        <div
                            className="w-4 bg-muted hover:bg-primary/20 cursor-col-resize flex items-center justify-center -ml-2 z-10 hover:w-5 transition-all"
                            onMouseDown={handleMouseDown}
                        >
                            <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </div>

                        {/* Right Panel */}
                        <div className="flex-1 bg-muted/10 p-4 flex items-center justify-center">
                            <div className="text-center">
                                <span className="font-mono font-bold text-2xl">{Math.round(100 - leftWidth)}%</span>
                                <p className="text-xs text-muted-foreground mt-1">Right Panel</p>
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
