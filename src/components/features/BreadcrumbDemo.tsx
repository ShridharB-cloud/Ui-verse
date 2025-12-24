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
import { ChevronRight, Home, Folder, FileText } from "lucide-react";

interface BreadcrumbDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const BreadcrumbDemo = ({ open, onOpenChange }: BreadcrumbDemoProps) => {
    const [path, setPath] = useState(["Home"]);

    const directories = {
        "Home": ["Documents", "Images", "Settings"],
        "Documents": ["Work", "Personal", "Invoices"],
        "Images": ["Vacation", "Screenshots", "Wallpapers"],
        "Settings": ["Profile", "Account", "Security"],
        "Work": ["Project A", "Project B", "Reports"],
        "Personal": ["Notes", "Journal", "Recipes"],
        "Vacation": ["2023", "2024", "Beach"],
    };

    const navigate = (dir: string) => {
        setPath([...path, dir]);
    };

    const navigateTo = (index: number) => {
        setPath(path.slice(0, index + 1));
    };

    const currentDir = path[path.length - 1];
    const subDirs = directories[currentDir as keyof typeof directories] || [];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <span className="flex items-center text-muted-foreground">
                            <Home className="w-4 h-4 mr-1" /> /
                        </span>
                        Breadcrumb Navigation
                    </DialogTitle>
                    <DialogDescription>
                        Navigate through the hierarchy to see dynamic breadcrumbs update.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Breadcrumb Bar */}
                    <div className="flex items-center flex-wrap gap-1 p-3 bg-muted/30 rounded-lg border text-sm">
                        {path.map((item, index) => (
                            <div key={index} className="flex items-center">
                                {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
                                <button
                                    onClick={() => navigateTo(index)}
                                    className={`hover:bg-accent px-2 py-1 rounded transition-colors flex items-center gap-1 ${index === path.length - 1 ? "font-semibold text-foreground pointer-events-none" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    {index === 0 && <Home className="w-3 h-3" />}
                                    {item}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="min-h-[200px] border rounded-lg p-4 bg-card">
                        <h4 className="font-medium mb-4 flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
                            <Folder className="w-4 h-4" />
                            Contents of {currentDir}
                        </h4>

                        {subDirs.length > 0 ? (
                            <div className="grid grid-cols-3 gap-2">
                                {subDirs.map((dir) => (
                                    <Button
                                        key={dir}
                                        variant="outline"
                                        className="h-20 flex flex-col gap-2 items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all"
                                        onClick={() => navigate(dir)}
                                    >
                                        <Folder className="w-6 h-6 text-yellow-500/80 fill-yellow-500/20" />
                                        <span className="text-xs truncate w-full px-1">{dir}</span>
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[120px] text-muted-foreground gap-2">
                                <FileText className="w-8 h-8 opacity-20" />
                                <p className="text-xs">No subdirectories</p>
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
