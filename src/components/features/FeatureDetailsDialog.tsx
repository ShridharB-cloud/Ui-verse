import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, FileCode } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getFeatureCode } from "./codeMap";
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
    const { toast } = useToast();
    const [hasCopied, setHasCopied] = useState(false);
    const code = getFeatureCode(feature.title);

    const handleCopy = async () => {
        if (!code) return;
        await navigator.clipboard.writeText(code);
        setHasCopied(true);
        toast({
            title: "Copied!",
            description: "Code copied to clipboard.",
        });
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {feature.title}
                    </DialogTitle>
                    <DialogDescription>
                        Feature Information & Implementation
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="info" className="flex-1 overflow-hidden flex flex-col">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="info">Info</TabsTrigger>
                        <TabsTrigger value="code" disabled={!code}>Code</TabsTrigger>
                    </TabsList>

                    <TabsContent value="info" className="flex-1 overflow-y-auto py-4">
                        <div className="grid gap-4">
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
                    </TabsContent>

                    <TabsContent value="code" className="flex-1 overflow-hidden flex flex-col py-4 h-full">
                        <div className="relative flex-1 rounded-md bg-muted p-4 overflow-hidden border">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute right-2 top-2 h-8 w-8 bg-background/50 hover:bg-background"
                                onClick={handleCopy}
                            >
                                {hasCopied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                            <pre className="h-full overflow-auto p-2 text-xs font-mono">
                                <code>{code || "// Code not available for this feature yet."}</code>
                            </pre>
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};
