import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    RotateCw,
    Palette,
    Zap,
    Copy,
    MousePointerClick,
    Maximize2,
    Type,
    TextCursorInput,
    Ban
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Playground = () => {
    // Card State
    const [rotation, setRotation] = useState([0]);
    const [scale, setScale] = useState([1]);
    const [isGlow, setIsGlow] = useState(false);

    // Button State
    const [btnVariant, setBtnVariant] = useState<"default" | "destructive" | "outline" | "secondary" | "ghost" | "link">("default");
    const [btnSize, setBtnSize] = useState<"default" | "sm" | "lg" | "icon">("default");

    // Input State
    const [inputType, setInputType] = useState<"text" | "password" | "email">("text");
    const [inputPlaceholder, setInputPlaceholder] = useState("Enter text...");
    const [inputDisabled, setInputDisabled] = useState(false);

    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("card");

    const copyCode = () => {
        let code = "";

        if (activeTab === "card") {
            code = `
<div style={{
  transform: 'rotate(${rotation[0]}deg) scale(${scale[0]})',
  transition: 'all 0.3s ease'
}} className="w-48 h-48 flex items-center justify-center bg-background border-2 ${isGlow
                    ? "border-primary shadow-[0_0_50px_-12px_hsl(var(--primary))]"
                    : "border-border"
                } rounded-xl">
  <div className="text-center p-4">
    <span className="font-bold text-lg">Interactive Card</span>
  </div>
</div>`;
        } else if (activeTab === "button") {
            code = `<Button variant="${btnVariant}" size="${btnSize}">
  Click Me
</Button>`;
        } else if (activeTab === "input") {
            code = `<Input 
  type="${inputType}" 
  placeholder="${inputPlaceholder}" 
  ${inputDisabled ? "disabled" : ""} 
/>`;
        }

        navigator.clipboard.writeText(code);
        toast({
            title: "Code copied!",
            description: "The CSS/JSX has been copied to your clipboard.",
        });
    };

    return (
        <section id="playground" className="py-24 relative overflow-hidden">
            <div className="container px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Interactive <span className="text-gradient">Playground</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Test our components and animations in real-time. Tweak values and see
                        immediate results.
                    </p>
                </motion.div>

                <Tabs defaultValue="card" onValueChange={setActiveTab} className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid w-full max-w-md grid-cols-3">
                            <TabsTrigger value="card">Card</TabsTrigger>
                            <TabsTrigger value="button">Button</TabsTrigger>
                            <TabsTrigger value="input">Input</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* CARD TAB */}
                    <TabsContent value="card">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2">
                                            <RotateCw className="w-4 h-4" /> Rotation ({rotation[0]}°)
                                        </Label>
                                    </div>
                                    <Slider
                                        value={rotation}
                                        onValueChange={setRotation}
                                        max={360}
                                        step={1}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="flex items-center gap-2">
                                            <Palette className="w-4 h-4" /> Scale ({scale[0]}x)
                                        </Label>
                                    </div>
                                    <Slider
                                        value={scale}
                                        onValueChange={setScale}
                                        min={0.5}
                                        max={2}
                                        step={0.1}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label className="flex items-center gap-2">
                                        <Zap className="w-4 h-4" /> Glow Effect
                                    </Label>
                                    <Switch checked={isGlow} onCheckedChange={setIsGlow} />
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button
                                        onClick={() => {
                                            setRotation([0]);
                                            setScale([1]);
                                            setIsGlow(false);
                                        }}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Reset
                                    </Button>
                                    <Button onClick={copyCode} className="flex-1 gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <motion.div
                                    animate={{
                                        rotate: rotation[0],
                                        scale: scale[0],
                                    }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                >
                                    <Card className={`w-48 h-48 flex items-center justify-center bg-background border-2 transition-all duration-300 ${isGlow
                                        ? "border-primary shadow-[0_0_50px_-12px_hsl(var(--primary))]"
                                        : "border-border"
                                        }`}>
                                        <div className="text-center p-4">
                                            <Zap className={`w-12 h-12 mx-auto mb-2 transition-colors ${isGlow ? "text-primary" : "text-muted-foreground"
                                                }`} />
                                            <span className="font-bold text-lg">Interactive Card</span>
                                        </div>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* BUTTON TAB */}
                    <TabsContent value="button">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <MousePointerClick className="w-4 h-4" /> Variant
                                    </Label>
                                    <RadioGroup
                                        value={btnVariant}
                                        onValueChange={(v: any) => setBtnVariant(v)}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        {["default", "destructive", "outline", "secondary", "ghost", "link"].map((v) => (
                                            <div key={v} className="flex items-center space-x-2">
                                                <RadioGroupItem value={v} id={`r-${v}`} />
                                                <Label htmlFor={`r-${v}`} className="capitalize">{v}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Maximize2 className="w-4 h-4" /> Size
                                    </Label>
                                    <RadioGroup
                                        value={btnSize}
                                        onValueChange={(v: any) => setBtnSize(v)}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        {["default", "sm", "lg", "icon"].map((s) => (
                                            <div key={s} className="flex items-center space-x-2">
                                                <RadioGroupItem value={s} id={`s-${s}`} />
                                                <Label htmlFor={`s-${s}`} className="capitalize">{s === "default" ? "Default" : s}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button
                                        onClick={() => {
                                            setBtnVariant("default");
                                            setBtnSize("default");
                                        }}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Reset
                                    </Button>
                                    <Button onClick={copyCode} className="flex-1 gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="relative">
                                    <Button variant={btnVariant} size={btnSize}>
                                        {btnSize === "icon" ? <Zap className="w-4 h-4" /> : "Click Me"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* INPUT TAB */}
                    <TabsContent value="input">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" /> Type
                                    </Label>
                                    <RadioGroup
                                        value={inputType}
                                        onValueChange={(v: "text" | "password" | "email") => setInputType(v)}
                                        className="grid grid-cols-3 gap-4"
                                    >
                                        {["text", "password", "email"].map((t) => (
                                            <div key={t} className="flex items-center space-x-2">
                                                <RadioGroupItem value={t} id={`t-${t}`} />
                                                <Label htmlFor={`t-${t}`} className="capitalize">{t}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2">
                                        <TextCursorInput className="w-4 h-4" /> Placeholder
                                    </Label>
                                    <Input
                                        value={inputPlaceholder}
                                        onChange={(e) => setInputPlaceholder(e.target.value)}
                                        placeholder="Type placeholder text..."
                                        className="bg-secondary/50"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Label className="flex items-center gap-2">
                                        <Ban className="w-4 h-4" /> Disabled
                                    </Label>
                                    <Switch checked={inputDisabled} onCheckedChange={setInputDisabled} />
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button
                                        onClick={() => {
                                            setInputType("text");
                                            setInputPlaceholder("Enter text...");
                                            setInputDisabled(false);
                                        }}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Reset
                                    </Button>
                                    <Button onClick={copyCode} className="flex-1 gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="w-full max-w-sm p-6">
                                    <Input
                                        type={inputType}
                                        placeholder={inputPlaceholder}
                                        disabled={inputDisabled}
                                        className="w-full bg-background"
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};
