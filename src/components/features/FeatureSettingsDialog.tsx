import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Tables } from "@/integrations/supabase/types";
import { useState } from "react";

interface FeatureSettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    feature: Tables<"features">;
}

export const FeatureSettingsDialog = ({ open, onOpenChange, feature }: FeatureSettingsDialogProps) => {
    // Mock settings state
    const [notifications, setNotifications] = useState(true);
    const [autoUpdate, setAutoUpdate] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Configure {feature.title}</DialogTitle>
                    <DialogDescription>
                        Adjust the settings for this feature.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Generic Placeholder Settings */}
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="notifications" className="flex flex-col space-y-1">
                            <span>Notifications</span>
                            <span className="font-normal text-xs text-muted-foreground">Receive alerts for this feature</span>
                        </Label>
                        <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="auto-update" className="flex flex-col space-y-1">
                            <span>Auto-updates</span>
                            <span className="font-normal text-xs text-muted-foreground">Keep this feature updated automatically</span>
                        </Label>
                        <Switch id="auto-update" checked={autoUpdate} onCheckedChange={setAutoUpdate} />
                    </div>

                    <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                        <p className="text-xs text-muted-foreground text-center">
                            More configuration options coming soon.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="mr-2">Cancel</Button>
                    <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
