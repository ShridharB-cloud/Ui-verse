import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface HelpDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const HelpDemo = ({ open, onOpenChange }: HelpDemoProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        Context-Aware Help Hints
                    </DialogTitle>
                    <DialogDescription>
                        Hover over elements or click help icons to see contextual assistance.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-8 space-y-8 flex flex-col items-center">
                    {/* Tooltip Example */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Hover for info:</span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                                        <Info className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>This is a tooltip providing quick context.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {/* Popover Example */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Click for details:</span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="secondary" size="sm" className="gap-2">
                                    Help Guide
                                    <HelpCircle className="w-4 h-4 ml-1" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Help Guide</h4>
                                        <p className="text-sm text-muted-foreground">
                                            This popover can contain more detailed instructions, links to documentation, or a mini-tour of the feature.
                                        </p>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <span className="text-xs font-bold col-span-1">Step 1:</span>
                                            <span className="text-xs col-span-2">Click the button</span>
                                        </div>
                                        <div className="grid grid-cols-3 items-center gap-4">
                                            <span className="text-xs font-bold col-span-1">Step 2:</span>
                                            <span className="text-xs col-span-2">Read the content</span>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
