import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowDownCircle, Loader2, Image as ImageIcon } from "lucide-react";

interface InfiniteScrollDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const InfiniteScrollDemo = ({ open, onOpenChange }: InfiniteScrollDemoProps) => {
    const [items, setItems] = useState<number[]>(Array.from({ length: 10 }, (_, i) => i + 1));
    const [loading, setLoading] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(() => {
        setLoading(true);
        setTimeout(() => {
            setItems((prev) => [
                ...prev,
                ...Array.from({ length: 5 }, (_, i) => prev.length + i + 1),
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [loading, loadMore, open]);

    // Reset on close/open
    useEffect(() => {
        if (!open) {
            setItems(Array.from({ length: 10 }, (_, i) => i + 1));
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ArrowDownCircle className="w-5 h-5" />
                        Infinite Scroll / Lazy Load
                    </DialogTitle>
                    <DialogDescription>
                        Scroll down to automatically load more content.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="h-[300px] overflow-y-auto border rounded-xl p-4 bg-muted/10 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item}
                                className="h-24 bg-card rounded-lg border shadow-sm flex items-center p-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                <div className="h-16 w-16 bg-muted rounded flex items-center justify-center flex-shrink-0">
                                    <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-3/4 bg-muted rounded" />
                                    <div className="h-3 w-1/2 bg-muted/50 rounded" />
                                </div>
                                <span className="font-mono text-xs text-muted-foreground mr-2">#{item}</span>
                            </div>
                        ))}

                        {/* Sentinel / Loading Indicator */}
                        <div ref={observerTarget} className="flex justify-center py-4">
                            {loading && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Loading more...
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mt-2">
                        Currently showing {items.length} items
                    </p>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
