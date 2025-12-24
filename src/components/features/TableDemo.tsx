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
import { Table, ArrowUpDown, MoreHorizontal, Filter, Download } from "lucide-react";

interface TableDemoProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const TableDemo = ({ open, onOpenChange }: TableDemoProps) => {
    const [sortAsc, setSortAsc] = useState(true);

    // Initial data
    const initialData = [
        { id: 1, name: "Project Alpha", status: "Active", budget: "$12,000", team: 4 },
        { id: 2, name: "Website Redesign", status: "Pending", budget: "$8,500", team: 2 },
        { id: 3, name: "Mobile App", status: "In Progress", budget: "$24,000", team: 6 },
        { id: 4, name: "Q4 Marketing", status: "Active", budget: "$45,000", team: 8 },
        { id: 5, name: "Legacy Migration", status: "Completed", budget: "$15,000", team: 3 },
    ];

    const [data, setData] = useState(initialData);

    const handleSort = () => {
        const newData = [...data].sort((a, b) => {
            return sortAsc
                ? a.budget.localeCompare(b.budget)
                : b.budget.localeCompare(a.budget);
        });
        setData(newData);
        setSortAsc(!sortAsc);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Table className="w-5 h-5" />
                        Customizable Tables
                    </DialogTitle>
                    <DialogDescription>
                        Interactive table with sorting, filtering, and row actions.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8">
                                <Filter className="w-3 h-3 mr-2" />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm" className="h-8">
                                <Download className="w-3 h-3 mr-2" />
                                Export
                            </Button>
                        </div>
                        <span className="text-xs text-muted-foreground">{data.length} records found</span>
                    </div>

                    {/* Table Area */}
                    <div className="border rounded-md overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 border-b">
                                <tr>
                                    <th className="h-10 px-4 text-left font-medium text-muted-foreground">Project Name</th>
                                    <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                                    <th className="h-10 px-4 text-left font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={handleSort}>
                                        <div className="flex items-center gap-1">
                                            Budget
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="h-10 px-4 text-right font-medium text-muted-foreground">Sales</th>
                                    <th className="h-10 px-4 w-[50px]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row) => (
                                    <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-medium">{row.name}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${row.status === "Active" ? "bg-green-500/10 text-green-500" :
                                                    row.status === "Pending" ? "bg-yellow-500/10 text-yellow-500" :
                                                        "bg-blue-500/10 text-blue-500"
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="p-4 font-mono">{row.budget}</td>
                                        <td className="p-4 text-right">{row.team}</td>
                                        <td className="p-4 text-center">
                                            <Button variant="ghost" size="icon" className="h-6 w-6">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>Close Demo</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
