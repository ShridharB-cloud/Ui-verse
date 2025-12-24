import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/integrations/supabase/types";

// Helper to get status color
const getStatusColor = (status: string) => {
    switch (status) {
        case "stable": return "text-emerald-400";
        case "experimental": return "text-amber-400";
        case "deprecated": return "text-red-400";
        default: return "text-muted-foreground";
    }
};

interface FeatureDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    feature: Tables<"features">;
}

export const FeatureDetailsDialog = ({ open, onOpenChange, feature }: FeatureDetailsDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {feature.title}
                    </DialogTitle>
                    <DialogDescription>
                        Feature Information
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium leading-none mb-2">Description</h4>
                            <p className="text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-sm font-medium leading-none mb-2">Status</h4>
                                <div className={`text-sm ${getStatusColor(feature.status)} capitalize`}>
                                    {feature.status}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium leading-none mb-2">Category</h4>
                                <div className="text-sm text-foreground capitalize">
                                    {feature.category.replace('_', ' ')}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium leading-none mb-2">Premium</h4>
                                <div className="text-sm text-foreground">
                                    {feature.is_premium ? "Yes (Pro Plan)" : "No (Free)"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
