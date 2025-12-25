import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Sidebar, RefreshCw, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UIPersistenceDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UIPersistenceDemo = ({ open, onOpenChange }: UIPersistenceDemoProps) => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // UI States
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showSidebar, setShowSidebar] = useState(true);
    const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

    // Persist to localStorage on change
    useEffect(() => {
        const settings = { viewMode, showSidebar, density };
        localStorage.setItem("demo_ui_persistence", JSON.stringify(settings));
    }, [viewMode, showSidebar, density]);

    // Initial restore
    useEffect(() => {
        if (open) {
            restoreSettings();
        }
    }, [open]);

    const restoreSettings = (notify = false) => {
        const saved = localStorage.getItem("demo_ui_persistence");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setViewMode(parsed.viewMode || "grid");
                setShowSidebar(parsed.showSidebar ?? true);
                setDensity(parsed.density || "comfortable");

                if (notify) {
                    toast({
                        title: "UI State Restored",
                        description: "Your layout preferences have been loaded.",
                    });
                }
            } catch (e) {
                console.error("Failed to restore settings", e);
            }
        }
    };

    const handleReload = () => {
        setIsLoading(true);
        // Reset to defaults to simulate reload
        setViewMode("grid");
        setShowSidebar(true);
        setDensity("comfortable");

        setTimeout(() => {
            restoreSettings(true);
            setIsLoading(false);
        }, 1200);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Save className="h-5 w-5 text-primary" />
                        UI State Persistence
                    </DialogTitle>
                    <DialogDescription>
                        Custom layout preferences are saved locally and restored on return.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Controls */}
                    <div className="grid gap-6 p-4 border rounded-lg bg-muted/30">
                        <div className="space-y-3">
                            <Label>View Mode preference</Label>
                            <div className="flex gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                    className="gap-2"
                                >
                                    <LayoutGrid className="w-4 h-4" /> Grid
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("list")}
                                    className="gap-2"
                                >
                                    <List className="w-4 h-4" /> List
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2">
                                <Sidebar className="w-4 h-4" />
                                Show Sidebar
                            </Label>
                            <Switch
                                checked={showSidebar}
                                onCheckedChange={setShowSidebar}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Density</Label>
                            <RadioGroup value={density} onValueChange={(v: any) => setDensity(v)} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comfortable" id="r1" />
                                    <Label htmlFor="r1">Comfortable</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="compact" id="r2" />
                                    <Label htmlFor="r2">Compact</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Live Preview */}
                    <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview</div>
                        <div className={`
                            border rounded-lg overflow-hidden h-40 flex bg-background
                            ${density === "compact" ? "text-sm" : "text-base"}
                        `}>
                            {/* Animated Sidebar */}
                            <div className={`
                                bg-muted border-r transition-all duration-300 ease-in-out
                                ${showSidebar ? "w-1/3 opacity-100" : "w-0 opacity-0 overflow-hidden border-none"}
                            `}>
                                <div className="p-4 space-y-2">
                                    <div className="h-4 w-3/4 bg-primary/20 rounded animate-pulse" />
                                    <div className="h-4 w-1/2 bg-primary/20 rounded animate-pulse delay-75" />
                                    <div className="h-4 w-2/3 bg-primary/20 rounded animate-pulse delay-150" />
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 p-4 overflow-auto">
                                <div className={`
                                    grid gap-2 transition-all
                                    ${viewMode === "grid" ? "grid-cols-2" : "grid-cols-1"}
                                `}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`
                                                bg-accent/50 rounded flex items-center justify-center text-muted-foreground
                                                ${viewMode === "grid" ? "aspect-square" : "h-12"}
                                                ${density === "compact" ? "p-1" : "p-4"}
                                            `}
                                        >
                                            Item {i}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="secondary"
                        className="w-full gap-2"
                        onClick={handleReload}
                        disabled={isLoading}
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                        {isLoading ? "Reloading..." : "Simulate Page Reload"}
                    </Button>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
