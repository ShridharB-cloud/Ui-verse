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
import { ChevronDown, ChevronUp, Layers } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AccordionDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AccordionDemo = ({ open, onOpenChange }: AccordionDemoProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        Expandable Sections
                    </DialogTitle>
                    <DialogDescription>
                        Toggle sections to reveal or hide content efficiently.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="border rounded-xl p-4 bg-card">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern. You can navigate through the items using keyboard arrows.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it styled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is it animated?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It&apos;s animated by default, but you can disable it if you prefer.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Can I use it for FAQ?</AccordionTrigger>
                                <AccordionContent>
                                    Absolutely! It is perfect for FAQs, product details, or any content that benefits from progressive disclosure.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
