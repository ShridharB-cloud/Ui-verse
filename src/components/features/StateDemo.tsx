import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Save, RotateCcw, RotateCw, History, FileText, CheckCircle2 } from "lucide-react";

interface StateDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
}

export const StateDemo = ({ open, onOpenChange, title = "State Demo" }: StateDemoProps) => {
    const [text, setText] = useState("");
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [history, setHistory] = useState<string[]>([""]);
    const [historyIndex, setHistoryIndex] = useState(0);

    // Simulate auto-save
    useEffect(() => {
        const timer = setTimeout(() => {
            if (text !== history[historyIndex]) {
                setSaving(true);
                setTimeout(() => {
                    setSaving(false);
                    setLastSaved(new Date());
                    // Add to history
                    const newHistory = history.slice(0, historyIndex + 1);
                    newHistory.push(text);
                    setHistory(newHistory);
                    setHistoryIndex(newHistory.length - 1);
                }, 800);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [text]);

    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setText(history[historyIndex - 1]);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setText(history[historyIndex + 1]);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Save className="w-5 h-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        Experience real-time state persistence and history management.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg border">
                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleUndo}
                                disabled={historyIndex === 0}
                                title="Undo"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleRedo}
                                disabled={historyIndex === history.length - 1}
                                title="Redo"
                            >
                                <RotateCw className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground px-2">
                            {saving ? (
                                <span className="flex items-center gap-1 text-amber-500">
                                    <History className="w-3 h-3 animate-spin" />
                                    Saving...
                                </span>
                            ) : lastSaved ? (
                                <span className="flex items-center gap-1 text-emerald-500">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Saved {lastSaved.toLocaleTimeString()}
                                </span>
                            ) : (
                                <span>Ready</span>
                            )}
                        </div>
                    </div>

                    {/* Editor Area */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Content Editor
                        </label>
                        <textarea
                            className="w-full h-32 p-3 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Type here to test auto-save and undo/redo..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    {/* State Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground bg-muted/20 p-3 rounded-md">
                        <div>History States: {history.length}</div>
                        <div>Current Index: {historyIndex}</div>
                        <div>Characters: {text.length}</div>
                        <div>Persisted: Yes</div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
