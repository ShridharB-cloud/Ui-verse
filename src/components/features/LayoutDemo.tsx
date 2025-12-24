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
import { LayoutGrid, List, AlignJustify, Sidebar, PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface LayoutDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
}

type LayoutMode = "grid" | "list" | "compact";

export const LayoutDemo = ({ open, onOpenChange, title = "Layout Demo" }: LayoutDemoProps) => {
    const [mode, setMode] = useState<LayoutMode>("grid");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const items = [1, 2, 3, 4, 5, 6];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <LayoutGrid className="w-5 h-5" />
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        Explore different layout compositions and structural patterns.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Preview Area */}
                    <div className="p-4 rounded-xl border bg-muted/30 overflow-hidden h-[300px] flex relative">
                        {/* Sidebar */}
                        <div className={`bg-card border-r transition-all duration-300 absolute left-0 top-0 bottom-0 z-10 ${sidebarOpen ? "w-16" : "w-0 overflow-hidden border-none"}`}>
                            <div className="p-2 space-y-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 mx-auto" />
                                <div className="h-4 w-8 rounded bg-muted mx-auto" />
                                <div className="h-4 w-8 rounded bg-muted mx-auto" />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className={`flex-1 transition-all duration-300 p-4 overflow-auto ${sidebarOpen ? "ml-16" : "ml-0"}`}>
                            <div className={`
                                transition-all duration-300 gap-4
                                ${mode === "grid" ? "grid grid-cols-2" : "flex flex-col"}
                             `}>
                                {items.map((i) => (
                                    <div key={i} className={`
                                        bg-card border rounded-lg p-3 shadow-sm transition-all
                                        ${mode === "compact" ? "flex items-center gap-3 py-2" : "space-y-2"}
                                    `}>
                                        <div className={`bg-primary/10 rounded ${mode === "compact" ? "w-8 h-8" : "w-full h-20"}`} />
                                        <div className="space-y-1 flex-1">
                                            <div className="h-3 w-16 bg-muted rounded" />
                                            {mode !== "compact" && <div className="h-2 w-full bg-muted/50 rounded" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Layout Mode</span>
                            <div className="flex bg-muted rounded-md p-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-7 px-2 ${mode === "grid" ? "bg-background shadow-sm" : ""}`}
                                    onClick={() => setMode("grid")}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-7 px-2 ${mode === "list" ? "bg-background shadow-sm" : ""}`}
                                    onClick={() => setMode("list")}
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-7 px-2 ${mode === "compact" ? "bg-background shadow-sm" : ""}`}
                                    onClick={() => setMode("compact")}
                                >
                                    <AlignJustify className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Sidebar</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                {sidebarOpen ? <PanelLeftClose className="w-4 h-4 mr-2" /> : <PanelLeftOpen className="w-4 h-4 mr-2" />}
                                {sidebarOpen ? "Collapse" : "Expand"}
                            </Button>
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
