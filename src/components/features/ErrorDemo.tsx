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
import { AlertTriangle, RefreshCcw, Bug, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ErrorDemo = ({ open, onOpenChange }: ErrorDemoProps) => {
    const [hasError, setHasError] = useState(false);
    const [errorType, setErrorType] = useState<"crash" | "network" | null>(null);

    const triggerError = (type: "crash" | "network") => {
        setHasError(true);
        setErrorType(type);
    };

    const reset = () => {
        setHasError(false);
        setErrorType(null);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" />
                        Error Boundary UI
                    </DialogTitle>
                    <DialogDescription>
                        Simulate application errors and verify the graceful fallback UI.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-6">
                    {/* Controls */}
                    <div className="flex gap-4 justify-center">
                        {!hasError ? (
                            <>
                                <Button
                                    variant="destructive"
                                    onClick={() => triggerError("crash")}
                                    className="gap-2"
                                >
                                    <Bug className="w-4 h-4" />
                                    Simulate Crash
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => triggerError("network")}
                                    className="gap-2"
                                >
                                    <AlertTriangle className="w-4 h-4" />
                                    Simulate 500
                                </Button>
                            </>
                        ) : (
                            <Button onClick={reset} className="gap-2">
                                <RefreshCcw className="w-4 h-4" />
                                Reset / Recover
                            </Button>
                        )}
                    </div>

                    {/* Simulation Area */}
                    <div className="border rounded-xl h-[200px] flex items-center justify-center p-4 bg-muted/10 relative overflow-hidden">
                        {hasError ? (
                            <div className="w-full h-full animate-in zoom-in-95 duration-300">
                                {errorType === "crash" ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 bg-destructive/5 rounded-lg border border-destructive/20 p-4">
                                        <div className="bg-destructive/10 p-3 rounded-full">
                                            <Bug className="w-8 h-8 text-destructive" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Something went wrong</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Uncaught ReferenceError: foo is not defined
                                            </p>
                                        </div>
                                        <Alert variant="destructive" className="max-w-xs text-left">
                                            <AlertTitle>Critical Error</AlertTitle>
                                            <AlertDescription>
                                                The component crashed during render.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                        <div className="bg-yellow-500/10 p-3 rounded-full animate-pulse">
                                            <AlertTriangle className="w-8 h-8 text-yellow-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">Service Unavailable</h4>
                                            <p className="text-sm text-muted-foreground">
                                                The server encountered an internal error.
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={reset}>Try Again</Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center space-y-2">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 text-green-500 mb-2">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <h4 className="font-medium">System Normal</h4>
                                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                                    UI is rendering correctly with no intercepted errors.
                                </p>
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
