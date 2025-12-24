import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpToLine, ArrowDownToLine } from "lucide-react";

interface StickyLayoutDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const StickyLayoutDemo = ({ open, onOpenChange }: StickyLayoutDemoProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ArrowUpToLine className="w-5 h-5" />
                        Sticky Header / Footer
                    </DialogTitle>
                    <DialogDescription>
                        Scroll the content below to see the sticky behavior in action.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6">
                    <div className="h-[300px] w-full border rounded-lg flex flex-col overflow-hidden relative shadow-inner bg-muted/20">

                        {/* Sticky Header */}
                        <div className="sticky top-0 left-0 right-0 bg-primary text-primary-foreground p-3 shadow-md z-10 flex justify-between items-center opacity-90 backdrop-blur-sm">
                            <span className="font-bold text-sm">Sticky Header</span>
                            <ArrowUpToLine className="w-4 h-4" />
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-auto flex-1 p-4 space-y-4">
                            <p className="text-sm text-muted-foreground">Scroll down...</p>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="h-16 bg-card rounded border flex items-center justify-center shadow-sm">
                                    Item {i + 1}
                                </div>
                            ))}
                            <p className="text-sm text-muted-foreground">Keep scrolling...</p>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i + 8} className="h-16 bg-card rounded border flex items-center justify-center shadow-sm">
                                    Item {i + 9}
                                </div>
                            ))}
                        </div>

                        {/* Sticky Footer */}
                        <div className="sticky bottom-0 left-0 right-0 bg-secondary text-secondary-foreground p-3 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 flex justify-between items-center">
                            <span className="font-bold text-sm">Sticky Footer</span>
                            <ArrowDownToLine className="w-4 h-4" />
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
