import { motion } from "framer-motion";
import { Book, Code, Component, Layout, FileJson, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const DocsSection = () => {
    const docs = [
        {
            icon: <Layout className="w-5 h-5" />,
            title: "Getting Started",
            description: "Learn the basics of using UIverse components in your project.",
            code: "npm install @uiverse/core",
        },
        {
            icon: <Component className="w-5 h-5" />,
            title: "Components",
            description: "Explore our library of 50+ pre-built accessible components.",
            code: "import { Button } from '@uiverse/core';",
        },
        {
            icon: <FileJson className="w-5 h-5" />,
            title: "Theming",
            description: "Customize the look and feel with our powerful theming engine.",
            code: "// theme.config.js\nmodule.exports = { ... }",
        },
        {
            icon: <Terminal className="w-5 h-5" />,
            title: "CLI Tool",
            description: "Use our CLI to scaffold projects and generate code.",
            code: "uiverse init my-app",
        },
    ];

    return (
        <section id="docs" className="py-24 bg-secondary/30 relative">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Book className="w-4 h-4" />
                        Documentation
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Everything you need to <span className="text-gradient">build</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Comprehensive documentation to help you get started and master the details.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {docs.map((doc, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 h-full hover:shadow-lg transition-shadow border-border/50 bg-background/50 backdrop-blur-sm">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                        {doc.icon}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <h3 className="font-semibold text-lg">{doc.title}</h3>
                                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                                        {doc.code && (
                                            <div className="mt-4 p-3 rounded-md bg-muted font-mono text-xs text-muted-foreground flex items-center gap-2">
                                                <Code className="w-3 h-3" />
                                                {doc.code}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
