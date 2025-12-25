import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save, History, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface SessionRestoreDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const SessionRestoreDemo = ({ open, onOpenChange }: SessionRestoreDemoProps) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        subject: "",
        content: ""
    });
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Simulate auto-save
    useEffect(() => {
        const timer = setTimeout(() => {
            if (formData.subject || formData.content) {
                setLastSaved(new Date());
                localStorage.setItem("demo_session_draft", JSON.stringify(formData));
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [formData]);

    // Initial restore
    useEffect(() => {
        if (open) {
            const saved = localStorage.getItem("demo_session_draft");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setFormData(parsed);
                    setLastSaved(new Date());
                    toast({
                        title: "Session Restored",
                        description: "Your previous draft has been recovered.",
                        variant: "default",
                    });
                } catch (e) {
                    console.error("Failed to restore session", e);
                }
            }
        }
    }, [open, toast]);

    const handleReload = () => {
        setIsLoading(true);
        // Simulate page reload by clearing state first
        setFormData({ subject: "", content: "" });

        setTimeout(() => {
            // Restore from storage
            const saved = localStorage.getItem("demo_session_draft");
            if (saved) {
                setFormData(JSON.parse(saved));
                toast({
                    title: "Page Reloaded",
                    description: "Session data automatically restored.",
                });
            }
            setIsLoading(false);
        }, 1500);
    };

    const handleClear = () => {
        setFormData({ subject: "", content: "" });
        setLastSaved(null);
        localStorage.removeItem("demo_session_draft");
        toast({
            title: "Session Cleared",
            description: "Started a fresh session.",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <History className="h-5 w-5 text-primary" />
                        Session Restore
                    </DialogTitle>
                    <DialogDescription>
                        Data persists across page reloads or accidental closures.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    {/* Status Indicator */}
                    <div className="flex items-center justify-between text-sm bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            {lastSaved ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span>Saved {lastSaved.toLocaleTimeString()}</span>
                                </>
                            ) : (
                                <span>Unsaved changes...</span>
                            )}
                        </div>
                        {isLoading && <span className="text-primary animate-pulse">Restoring...</span>}
                    </div>

                    {isLoading ? (
                        <div className="space-y-4 py-8">
                            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                                <p>Simulating Page Reload...</p>
                            </div>
                            <Progress value={66} className="w-full" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Input
                                    value={formData.subject}
                                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                                    placeholder="Enter subject..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Content</Label>
                                <Textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                    placeholder="Start typing (auto-saves)..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            onClick={handleReload}
                            disabled={isLoading}
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Simulate Page Reload
                        </Button>
                        <Button
                            variant="destructive"
                            className="w-full gap-2"
                            onClick={handleClear}
                            disabled={isLoading}
                        >
                            Clear Session
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
