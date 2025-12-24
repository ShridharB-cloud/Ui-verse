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
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster"; // Ensure Toaster is available

interface ToastDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ToastDemo = ({ open, onOpenChange }: ToastDemoProps) => {
    const { toast } = useToast();
    const [localToasts, setLocalToasts] = useState<any[]>([]);

    const addLocalToast = (type: 'success' | 'warning' | 'info') => {
        const id = Date.now();
        const newToast = { id, type, title: "Notification", description: "This is a demo notification." };

        if (type === 'success') {
            newToast.title = "Success!";
            newToast.description = "Action completed successfully.";
        } else if (type === 'warning') {
            newToast.title = "Warning";
            newToast.description = "Please check your connection.";
        } else {
            newToast.title = "New Message";
            newToast.description = "You have received a new message.";
        }

        setLocalToasts(prev => [...prev, newToast]);

        // Trigger system toast as well
        toast({
            title: newToast.title,
            description: newToast.description,
            variant: type === 'warning' ? "destructive" : "default",
        });

        // Auto remove local toast
        setTimeout(() => {
            setLocalToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Smart Toast Notifications
                    </DialogTitle>
                    <DialogDescription>
                        Trigger different types of toast notifications interactively.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Trigger Buttons */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        <Button
                            variant="outline"
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-600 border-green-200"
                            onClick={() => addLocalToast('success')}
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Success
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 border-yellow-200"
                            onClick={() => addLocalToast('warning')}
                        >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Warning
                        </Button>
                        <Button
                            variant="outline"
                            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 border-blue-200"
                            onClick={() => addLocalToast('info')}
                        >
                            <Info className="w-4 h-4 mr-2" />
                            Info
                        </Button>
                    </div>

                    {/* Simulation Area */}
                    <div className="bg-muted/20 border rounded-xl h-[200px] relative p-4 overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 space-y-2 w-full max-w-[300px]">
                            {localToasts.map(t => (
                                <div
                                    key={t.id}
                                    className="bg-card border shadow-lg rounded-lg p-3 flex items-start gap-3 animate-in fade-in slide-in-from-right-5 duration-300"
                                >
                                    <div className={`mt-0.5 ${t.type === 'success' ? 'text-green-500' :
                                            t.type === 'warning' ? 'text-yellow-500' :
                                                'text-blue-500'
                                        }`}>
                                        {t.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                                            t.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> :
                                                <Info className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium leading-none">{t.title}</p>
                                        <p className="text-xs text-muted-foreground">{t.description}</p>
                                    </div>
                                    <button
                                        onClick={() => setLocalToasts(prev => prev.filter(item => item.id !== t.id))}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/50 p-2 rounded">
                            * System toasts also triggered via useToast hook
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
