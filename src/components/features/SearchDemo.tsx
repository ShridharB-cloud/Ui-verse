import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const SearchDemo = ({ open, onOpenChange }: SearchDemoProps) => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    // Initial items to search
    const allItems = [
        { id: 1, title: "Getting Started Guide", category: "Documentation" },
        { id: 2, title: "Advanced Configuration", category: "Documentation" },
        { id: 3, title: "API Reference", category: "Developer" },
        { id: 4, title: "User Authentication", category: "Security" },
        { id: 5, title: "Theme Customization", category: "Design" },
        { id: 6, title: "Security Best Practices", category: "Security" },
        { id: 7, title: "Database Schema", category: "Developer" },
    ];

    const showResults = query.length > 0;
    const filteredItems = allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    const Highlight = ({ text, highlight }: { text: string, highlight: string }) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={i} className="bg-yellow-500/30 text-yellow-500 font-medium rounded-[2px] px-0.5">{part}</span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </span>
        );
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if (e.target.value) {
            setLoading(true);
            // Simulate network latency
            setTimeout(() => setLoading(false), 300);
        } else {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Smart Search
                    </DialogTitle>
                    <DialogDescription>
                        Real-time filtering with keyword highlighting.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Type to search..."
                            className="pl-9"
                            value={query}
                            onChange={handleSearch}
                            autoFocus
                        />
                        {loading && (
                            <div className="absolute right-3 top-2.5">
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            </div>
                        )}
                    </div>

                    <div className="min-h-[200px] border rounded-lg overflow-hidden bg-muted/10">
                        {showResults ? (
                            <div className="divide-y">
                                {filteredItems.length > 0 ? (
                                    filteredItems.map(item => (
                                        <div key={item.id} className="p-3 hover:bg-muted/50 transition-colors flex flex-col cursor-pointer group">
                                            <span className="text-sm font-medium group-hover:text-primary transition-colors">
                                                <Highlight text={item.title} highlight={query} />
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                In <Highlight text={item.category} highlight={query} />
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-muted-foreground text-sm">
                                        No results found for "{query}"
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-8 flex flex-col items-center justify-center text-muted-foreground/50 gap-2 h-full">
                                <Search className="w-12 h-12 opacity-20" />
                                <p className="text-sm">Start typing to see results...</p>
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
