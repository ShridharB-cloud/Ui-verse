import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw, RotateCw, History, Plus, Layers } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface UndoRedoDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface Action {
    id: number;
    type: string;
    color: string;
    timestamp: Date;
}

const COLORS = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
];

export const UndoRedoDemo = ({ open, onOpenChange }: UndoRedoDemoProps) => {
    // We keep a single history array and a pointer
    // history: [Action1, Action2, Action3]
    // pointer: 2 (points to Action3, the current state)
    // If pointer < history.length - 1, we can Redo
    // If pointer >= 0, we can Undo (pointer becomes -1 if empty)

    const [history, setHistory] = useState<Action[]>([]);
    const [pointer, setPointer] = useState(-1);

    const canUndo = pointer >= 0;
    const canRedo = pointer < history.length - 1;

    const addAction = () => {
        const newAction: Action = {
            id: Date.now(),
            type: `Added Item #${Math.floor(Math.random() * 1000)}`,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            timestamp: new Date(),
        };

        // If we are in the middle of the stack (after undoing), discard the "future"
        const newHistory = history.slice(0, pointer + 1);
        newHistory.push(newAction);

        setHistory(newHistory);
        setPointer(newHistory.length - 1);
    };

    const handleUndo = () => {
        if (canUndo) {
            setPointer(pointer - 1);
        }
    };

    const handleRedo = () => {
        if (canRedo) {
            setPointer(pointer + 1);
        }
    };

    const currentStack = history.slice(0, pointer + 1);
    const futureStack = history.slice(pointer + 1);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-primary" />
                        Undo / Redo Stack
                    </DialogTitle>
                    <DialogDescription>
                        Visualize the state history stack. Actions can be reversed and reapplied.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    {/* Controls */}
                    <div className="flex items-center justify-between gap-4 p-4 border rounded-lg bg-muted/40">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleUndo}
                                disabled={!canUndo}
                                title="Undo (Ctrl+Z)"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleRedo}
                                disabled={!canRedo}
                                title="Redo (Ctrl+Y)"
                            >
                                <RotateCw className="w-4 h-4" />
                            </Button>
                        </div>

                        <Button onClick={addAction} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add New Action
                        </Button>
                    </div>

                    {/* Visualization */}
                    <div className="grid grid-cols-2 gap-4 h-[300px]">
                        {/* Active Stack (Past + Present) */}
                        <div className="border rounded-md flex flex-col overflow-hidden">
                            <div className="bg-muted p-2 text-xs font-semibold text-center border-b flex justify-between items-center">
                                <span>Active State</span>
                                <Badge variant="secondary" className="text-[10px]">{pointer + 1} Items</Badge>
                            </div>
                            <ScrollArea className="flex-1 p-4 bg-background">
                                <div className="space-y-2 flex flex-col-reverse justify-end min-h-full">
                                    <AnimatePresence mode="popLayout">
                                        {currentStack.map((action, index) => (
                                            <motion.div
                                                key={action.id}
                                                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex items-center gap-3 p-2 rounded-md border text-sm shadow-sm bg-card"
                                            >
                                                <div className={`w-3 h-3 rounded-full ${action.color} flex-shrink-0`} />
                                                <div className="flex-1 truncate font-medium">
                                                    {action.type}
                                                </div>
                                                <span className="text-[10px] text-muted-foreground tabular-nums">
                                                    {index + 1}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {currentStack.length === 0 && (
                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm py-10 opacity-50">
                                            <History className="w-8 h-8 mb-2" />
                                            <p>Initial State (Empty)</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>

                        {/* Future Stack (Redo) */}
                        <div className="border rounded-md flex flex-col overflow-hidden border-dashed">
                            <div className="bg-muted/50 p-2 text-xs font-semibold text-center border-b flex justify-between items-center text-muted-foreground">
                                <span>Redo Stack (Future)</span>
                                <Badge variant="outline" className="text-[10px]">{futureStack.length} Items</Badge>
                            </div>
                            <ScrollArea className="flex-1 p-4 bg-muted/10">
                                <div className="space-y-2 flex flex-col-reverse justify-end min-h-full">
                                    <AnimatePresence mode="popLayout">
                                        {futureStack.map((action, index) => (
                                            <motion.div
                                                key={action.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 0.5, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="flex items-center gap-3 p-2 rounded-md border border-dashed text-sm bg-background/50 grayscale"
                                            >
                                                <div className={`w-3 h-3 rounded-full ${action.color} flex-shrink-0`} />
                                                <div className="flex-1 truncate">
                                                    {action.type}
                                                </div>
                                                <span className="text-[10px] text-muted-foreground">
                                                    Redo
                                                </span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {futureStack.length === 0 && (
                                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm py-10 opacity-30">
                                            <p>No actions to redo</p>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
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
