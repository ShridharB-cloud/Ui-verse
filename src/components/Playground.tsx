import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    Ban,
    MessageSquare,
    AlertCircle,
    Info,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

    // Toast State
    const [toastTitle, setToastTitle] = useState("Notification");
    const [toastDesc, setToastDesc] = useState("Action completed successfully.");
    const [toastVariant, setToastVariant] = useState<"default" | "destructive">("default");

    // Dialog State
    const [dialogTitle, setDialogTitle] = useState("Are you sure?");
    const [dialogDesc, setDialogDesc] = useState("This action cannot be undone.");

    // Accordion State
    const [accordionItems, setAccordionItems] = useState(3);

    // Popover State
    const [popoverAlign, setPopoverAlign] = useState<"center" | "start" | "end">("center");

    // Sheet State
    const [sheetSide, setSheetSide] = useState<"top" | "right" | "bottom" | "left">("right");

    // Tooltip State
    const [tooltipText, setTooltipText] = useState("Add to library");

    // Badge State
    const [badgeText, setBadgeText] = useState("New Feature");
    const [badgeVariant, setBadgeVariant] = useState<"default" | "secondary" | "destructive" | "outline">("default");

    // Avatar State
    const [avatarFallback, setAvatarFallback] = useState("CN");
    const [showAvatarImage, setShowAvatarImage] = useState(true);

    // Switch State
    const [switchChecked, setSwitchChecked] = useState(false);
    const [switchLabel, setSwitchLabel] = useState("Airplane Mode");
    const [switchDisabled, setSwitchDisabled] = useState(false);

    // Select State
    const [selectValue, setSelectValue] = useState("");

    // Slider State
    const [sliderValue, setSliderValue] = useState([50]);

    // Checkbox State
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    // Radio Group State
    const [radioValue, setRadioValue] = useState("comfortable");

    // Textarea State
    const [textareaValue, setTextareaValue] = useState("");
    const [textareaDisabled, setTextareaDisabled] = useState(false);

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
        } else if (activeTab === "toast") {
            code = `toast({
  title: "${toastTitle}",
  description: "${toastDesc}",
  variant: "${toastVariant}"
});`;
        } else if (activeTab === "dialog") {
            code = `<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>${dialogTitle}</DialogTitle>
      <DialogDescription>${dialogDesc}</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`;
        } else if (activeTab === "accordion") {
            code = `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;
        } else if (activeTab === "popover") {
            code = `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80" align="${popoverAlign}">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
    </div>
  </PopoverContent>
</Popover>`;
        } else if (activeTab === "sheet") {
            code = `<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent side="${sheetSide}">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`;
        } else if (activeTab === "alert") {
            code = `<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;
        } else if (activeTab === "tooltip") {
            code = `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover Me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>${tooltipText}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`;
        } else if (activeTab === "badge") {
            code = `<Badge variant="${badgeVariant}">${badgeText}</Badge>`;
        } else if (activeTab === "avatar") {
            code = `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>${avatarFallback}</AvatarFallback>
</Avatar>`;
        } else if (activeTab === "scroll") {
            code = `<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {tags.map((tag) => (
      <>
        <div key={tag} className="text-sm">
          {tag}
        </div>
        <Separator className="my-2" />
      </>
    ))}
  </div>
</ScrollArea>`;
        } else if (activeTab === "switch") {
            code = `<div className="flex items-center space-x-2">
  <Switch id="airplane-mode"${switchDisabled ? ' disabled' : ''} />
  <Label htmlFor="airplane-mode">${switchLabel}</Label>
</div>`;
        } else if (activeTab === "select") {
            code = `<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="blueberry">Blueberry</SelectItem>
      <SelectItem value="grapes">Grapes</SelectItem>
      <SelectItem value="pineapple">Pineapple</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;
        } else if (activeTab === "slider") {
            code = `<Slider defaultValue={[50]} max={100} step={1} />`;
        } else if (activeTab === "checkbox") {
            code = `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label
    htmlFor="terms"
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    Accept terms and conditions
  </label>
</div>`;
        } else if (activeTab === "radio") {
            code = `<RadioGroup defaultValue="comfortable">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`;
        } else if (activeTab === "tabs") {
            code = `<Tabs defaultValue="account" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <div className="p-4 rounded-md border">
      Make changes to your account here.
    </div>
  </TabsContent>
  <TabsContent value="password">
    <div className="p-4 rounded-md border">
      Change your password here.
    </div>
  </TabsContent>
</Tabs>`;
        } else if (activeTab === "textarea") {
            code = `<div className="grid w-full gap-1.5">
  <Label htmlFor="message">Your message</Label>
  <Textarea placeholder="Type your message here." id="message"${textareaDisabled ? ' disabled' : ''} />
</div>`;
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
                        <TabsList className="grid w-full max-w-[125rem] grid-cols-[repeat(20,minmax(0,1fr))]">
                            <TabsTrigger value="card">Card</TabsTrigger>
                            <TabsTrigger value="button">Button</TabsTrigger>
                            <TabsTrigger value="input">Input</TabsTrigger>
                            <TabsTrigger value="toast">Toast</TabsTrigger>
                            <TabsTrigger value="dialog">Dialog</TabsTrigger>
                            <TabsTrigger value="accordion">Accordion</TabsTrigger>
                            <TabsTrigger value="popover">Popover</TabsTrigger>
                            <TabsTrigger value="sheet">Sheet</TabsTrigger>
                            <TabsTrigger value="alert">Alert</TabsTrigger>
                            <TabsTrigger value="tooltip">Tooltip</TabsTrigger>
                            <TabsTrigger value="badge">Badge</TabsTrigger>
                            <TabsTrigger value="avatar">Avatar</TabsTrigger>
                            <TabsTrigger value="scroll">Scroll</TabsTrigger>
                            <TabsTrigger value="switch">Switch</TabsTrigger>
                            <TabsTrigger value="select">Select</TabsTrigger>
                            <TabsTrigger value="slider">Slider</TabsTrigger>
                            <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
                            <TabsTrigger value="radio">Radio</TabsTrigger>
                            <TabsTrigger value="tabs">Tabs</TabsTrigger>
                            <TabsTrigger value="textarea">Textarea</TabsTrigger>
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
                    {/* TOAST TAB */}
                    <TabsContent value="toast">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2">
                                        <Type className="w-4 h-4" /> Message Title
                                    </Label>
                                    <Input
                                        value={toastTitle}
                                        onChange={(e) => setToastTitle(e.target.value)}
                                        placeholder="Toast title..."
                                        className="bg-secondary/50"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2">
                                        <TextCursorInput className="w-4 h-4" /> Message Description
                                    </Label>
                                    <Input
                                        value={toastDesc}
                                        onChange={(e) => setToastDesc(e.target.value)}
                                        placeholder="Toast description..."
                                        className="bg-secondary/50"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Ban className="w-4 h-4" /> Variant
                                    </Label>
                                    <RadioGroup
                                        value={toastVariant}
                                        onValueChange={(v: "default" | "destructive") => setToastVariant(v)}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="default" id="tv-d" />
                                            <Label htmlFor="tv-d">Default</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="destructive" id="tv-dest" />
                                            <Label htmlFor="tv-dest">Destructive</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button
                                        onClick={() => {
                                            setToastTitle("Notification");
                                            setToastDesc("This is a toast message.");
                                            setToastVariant("default");
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
                                <div className="text-center">
                                    <Button
                                        size="lg"
                                        onClick={() => {
                                            toast({
                                                title: toastTitle,
                                                description: toastDesc,
                                                variant: toastVariant
                                            })
                                        }}
                                        className="gap-2"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        Trigger Toast
                                    </Button>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        Click to see the notification
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* DIALOG TAB */}
                    <TabsContent value="dialog">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2">
                                        <Type className="w-4 h-4" /> Dialog Title
                                    </Label>
                                    <Input
                                        value={dialogTitle}
                                        onChange={(e) => setDialogTitle(e.target.value)}
                                        placeholder="Dialog title..."
                                        className="bg-secondary/50"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2">
                                        <TextCursorInput className="w-4 h-4" /> Dialog Content
                                    </Label>
                                    <Input
                                        value={dialogDesc}
                                        onChange={(e) => setDialogDesc(e.target.value)}
                                        placeholder="Dialog content..."
                                        className="bg-secondary/50"
                                    />
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button
                                        onClick={() => {
                                            setDialogTitle("Are you sure?");
                                            setDialogDesc("This action cannot be undone.");
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
                                <div className="text-center">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="lg" className="gap-2">
                                                <Maximize2 className="w-4 h-4" />
                                                Open Dialog
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{dialogTitle}</DialogTitle>
                                                <DialogDescription>
                                                    {dialogDesc}
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        Click to open the modal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* ACCORDION TAB */}
                    <TabsContent value="accordion">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" /> Item Count
                                    </Label>
                                    <RadioGroup
                                        value={accordionItems.toString()}
                                        onValueChange={(v) => setAccordionItems(parseInt(v))}
                                        className="grid grid-cols-3 gap-4"
                                    >
                                        {[1, 2, 3].map((count) => (
                                            <div key={count} className="flex items-center space-x-2">
                                                <RadioGroupItem value={count.toString()} id={`ac-${count}`} />
                                                <Label htmlFor={`ac-${count}`}>{count} {count === 1 ? 'Item' : 'Items'}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button
                                        onClick={() => setAccordionItems(3)}
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
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="w-full max-w-md bg-background/50 p-6 rounded-xl border border-border/50 backdrop-blur-sm">
                                    <Accordion type="single" collapsible className="w-full">
                                        {Array.from({ length: accordionItems }).map((_, i) => (
                                            <AccordionItem key={i} value={`item-${i + 1}`}>
                                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                                <AccordionContent>
                                                    Yes. It adheres to the WAI-ARIA design pattern.
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* POPOVER TAB */}
                    <TabsContent value="popover">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Maximize2 className="w-4 h-4" /> Align
                                    </Label>
                                    <RadioGroup
                                        value={popoverAlign}
                                        onValueChange={(v) => setPopoverAlign(v as "center" | "start" | "end")}
                                        className="grid grid-cols-3 gap-4"
                                    >
                                        {["start", "center", "end"].map((align) => (
                                            <div key={align} className="flex items-center space-x-2">
                                                <RadioGroupItem value={align} id={`align-${align}`} />
                                                <Label htmlFor={`align-${align}`} className="capitalize">{align}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button
                                        onClick={() => setPopoverAlign("center")}
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
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="text-center">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline">Open Popover</Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80" align={popoverAlign}>
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Set the dimensions for the layer.
                                                    </p>
                                                </div>
                                                <div className="grid gap-2">
                                                    <div className="grid grid-cols-3 items-center gap-4">
                                                        <Label htmlFor="width">Width</Label>
                                                        <Input
                                                            id="width"
                                                            defaultValue="100%"
                                                            className="col-span-2 h-8"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <p className="mt-8 text-sm text-muted-foreground">
                                        Click to see popover content
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* SHEET TAB */}
                    <TabsContent value="sheet">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Maximize2 className="w-4 h-4" /> Side
                                    </Label>
                                    <RadioGroup
                                        value={sheetSide}
                                        onValueChange={(v) => setSheetSide(v as "top" | "right" | "bottom" | "left")}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        {["top", "right", "bottom", "left"].map((side) => (
                                            <div key={side} className="flex items-center space-x-2">
                                                <RadioGroupItem value={side} id={`side-${side}`} />
                                                <Label htmlFor={`side-${side}`} className="capitalize">{side}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button
                                        onClick={() => setSheetSide("right")}
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
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="text-center">
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline">Open Sheet ({sheetSide})</Button>
                                        </SheetTrigger>
                                        <SheetContent side={sheetSide}>
                                            <SheetHeader>
                                                <SheetTitle>Edit profile</SheetTitle>
                                                <SheetDescription>
                                                    Make changes to your profile here. Click save when you're done.
                                                </SheetDescription>
                                            </SheetHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">
                                                        Name
                                                    </Label>
                                                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="username" className="text-right">
                                                        Username
                                                    </Label>
                                                    <Input id="username" value="@peduarte" className="col-span-3" />
                                                </div>
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                    <p className="mt-8 text-sm text-muted-foreground">
                                        Click to open the side drawer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* ALERT TAB */}
                    <TabsContent value="alert">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <AlertCircle className="w-4 h-4" /> Description
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Alert Dialogs are interruptive modals that require user acknowledgement.
                                        They are typically used for confirmation of destructive actions.
                                    </p>
                                    <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                                        <p className="text-sm text-destructive font-medium flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            Destructive Action Demo
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="text-center">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive">Delete Account</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <p className="mt-8 text-sm text-muted-foreground">
                                        Click to test the confirmation flow
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* TOOLTIP TAB */}
                    <TabsContent value="tooltip">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" /> Tooltip Text
                                    </Label>
                                    <Input
                                        value={tooltipText}
                                        onChange={(e) => setTooltipText(e.target.value)}
                                        placeholder="Enter tooltip text"
                                        className="bg-background/50 border-white/10"
                                    />
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Tooltips are used to provide extra information about an element when hovering or focusing.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="text-center">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" className="gap-2">
                                                    <Info className="w-4 h-4" />
                                                    Hover Me
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{tooltipText}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <p className="mt-8 text-sm text-muted-foreground">
                                        Hover over the button to see the tooltip
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* BADGE TAB */}
                    <TabsContent value="badge">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" /> Badge Text
                                    </Label>
                                    <Input
                                        value={badgeText}
                                        onChange={(e) => setBadgeText(e.target.value)}
                                        placeholder="Enter badge text"
                                        className="bg-background/50 border-white/10"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Maximize2 className="w-4 h-4" /> Variant
                                    </Label>
                                    <RadioGroup
                                        value={badgeVariant}
                                        onValueChange={(v) => setBadgeVariant(v as "default" | "secondary" | "destructive" | "outline")}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        {["default", "secondary", "destructive", "outline"].map((variant) => (
                                            <div key={variant} className="flex items-center space-x-2">
                                                <RadioGroupItem value={variant} id={`badge-${variant}`} />
                                                <Label htmlFor={`badge-${variant}`} className="capitalize">{variant}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="text-center">
                                    <Badge variant={badgeVariant} className="text-lg px-4 py-2">
                                        {badgeText}
                                    </Badge>
                                    <p className="mt-8 text-sm text-muted-foreground">
                                        Badges are used to highlight status, tags, or counts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* AVATAR TAB */}
                    <TabsContent value="avatar">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" /> Fallback Initials
                                    </Label>
                                    <Input
                                        value={avatarFallback}
                                        onChange={(e) => setAvatarFallback(e.target.value.slice(0, 2).toUpperCase())}
                                        placeholder="CN"
                                        maxLength={2}
                                        className="bg-background/50 border-white/10"
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        Max 2 characters.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="avatar-image"
                                            checked={showAvatarImage}
                                            onCheckedChange={(c) => setShowAvatarImage(!!c)}
                                        />
                                        <Label htmlFor="avatar-image">Show Image</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Uncheck to see the fallback state.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="text-center">
                                    <Avatar className="w-24 h-24 mx-auto">
                                        {showAvatarImage && (
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        )}
                                        <AvatarFallback className="text-2xl">{avatarFallback}</AvatarFallback>
                                    </Avatar>
                                    <div className="mt-8 space-y-1">
                                        <h3 className="font-medium text-lg">Shadcn</h3>
                                        <p className="text-sm text-muted-foreground">@shadcn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* SCROLL AREA TAB */}
                    <TabsContent value="scroll">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" />
                                        <Label>Description</Label>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Scroll Area augments native scroll functionality for custom, cross-browser styling.
                                    </p>
                                </div>

                                <div className="grid gap-2">
                                    <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Content
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        A list of 50 tags to demonstrate vertical scrolling.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="flex items-center justify-center">
                                    <ScrollArea className="h-72 w-48 rounded-md border bg-background/50 backdrop-blur-sm">
                                        <div className="p-4">
                                            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
                                            {Array.from({ length: 50 }).map((_, i) => (
                                                <div key={i}>
                                                    <div className="text-sm">
                                                        v1.2.0-beta.{50 - i}
                                                    </div>
                                                    <Separator className="my-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* SWITCH TAB */}
                    <TabsContent value="switch">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <Label className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" /> Switch Label
                                    </Label>
                                    <Input
                                        value={switchLabel}
                                        onChange={(e) => setSwitchLabel(e.target.value)}
                                        placeholder="Enter label"
                                        className="bg-background/50 border-white/10"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="switch-disabled"
                                            checked={switchDisabled}
                                            onCheckedChange={(c) => setSwitchDisabled(!!c)}
                                        />
                                        <Label htmlFor="switch-disabled">Disabled State</Label>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="flex items-center gap-4 p-6 bg-background/50 rounded-lg border backdrop-blur-sm">
                                    <Switch
                                        id="airplane-mode"
                                        checked={switchChecked}
                                        onCheckedChange={setSwitchChecked}
                                        disabled={switchDisabled}
                                    />
                                    <Label htmlFor="airplane-mode">{switchLabel}</Label>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* SELECT TAB */}
                    <TabsContent value="select">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" />
                                        <Label>Selected Value</Label>
                                    </div>
                                    <div className="p-4 rounded-md bg-muted/50 border font-mono text-sm">
                                        {selectValue || "No selection"}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Select components are used for collecting user provided information from a list of options.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="w-[180px]">
                                    <Select value={selectValue} onValueChange={setSelectValue}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* SLIDER TAB */}
                    <TabsContent value="slider">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" />
                                        <Label>Current Value</Label>
                                    </div>
                                    <div className="p-4 rounded-md bg-muted/50 border font-mono text-2xl text-center">
                                        {sliderValue[0]}%
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Sliders allow users to make selections from a range of values.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="w-[60%] space-y-4">
                                    <Slider
                                        defaultValue={[50]}
                                        max={100}
                                        step={1}
                                        value={sliderValue}
                                        onValueChange={setSliderValue}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* CHECKBOX TAB */}
                    <TabsContent value="checkbox">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" />
                                        <Label>Status</Label>
                                    </div>
                                    <div className="p-4 rounded-md bg-muted/50 border font-mono text-sm">
                                        {checkboxChecked ? "Checked" : "Unchecked"}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Checkboxes are used when a user may select zero to many options from a list.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="flex items-center space-x-2 p-6 bg-background/50 rounded-lg border backdrop-blur-sm">
                                    <Checkbox
                                        id="terms"
                                        checked={checkboxChecked}
                                        onCheckedChange={(c) => setCheckboxChecked(!!c)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Accept terms and conditions
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            You agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* RADIO GROUP TAB */}
                    <TabsContent value="radio">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" />
                                        <Label>Selected Option</Label>
                                    </div>
                                    <div className="p-4 rounded-md bg-muted/50 border font-mono text-sm capitalize">
                                        {radioValue}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Radio Groups allows the user to select one option from a set.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <div className="p-6 bg-background/50 rounded-lg border backdrop-blur-sm">
                                    <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="default" id="r1" />
                                            <Label htmlFor="r1">Default</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="comfortable" id="r2" />
                                            <Label htmlFor="r2">Comfortable</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="compact" id="r3" />
                                            <Label htmlFor="r3">Compact</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    {/* TABS TAB */}
                    <TabsContent value="tabs">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Controls */}
                            <div className="space-y-8 glass-panel p-8 rounded-2xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Type className="w-4 h-4" />
                                        <Label>Overview</Label>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Tabs allow users to organize and navigate between groups of content that are related and at the same level of hierarchy.
                                    </p>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button onClick={copyCode} className="w-full gap-2">
                                        <Copy className="w-4 h-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex items-center justify-center min-h-[400px] glass-panel rounded-2xl relative overflow-hidden p-8">
                                <div className="absolute inset-0 grid-pattern opacity-50" />
                                <Tabs defaultValue="account" className="w-[400px]">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="account">Account</TabsTrigger>
                                        <TabsTrigger value="password">Password</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="account">
                                        <Card>
                                            <div className="p-6 space-y-2">
                                                <h3 className="text-lg font-medium">Account</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Make changes to your account here. Click save when you're done.
                                                </p>
                                                <div className="space-y-1">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" defaultValue="Pedro Duarte" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="username">Username</Label>
                                                    <Input id="username" defaultValue="@peduarte" />
                                                </div>
                                                <Button className="mt-4">Save changes</Button>
                                            </div>
                                        </Card>
                                    </TabsContent>
                                    <TabsContent value="password">
                                        <Card>
                                            <div className="p-6 space-y-2">
                                                <h3 className="text-lg font-medium">Password</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Change your password here. After saving, you'll be logged out.
                                                </p>
                                                <div className="space-y-1">
                                                    <Label htmlFor="current">Current password</Label>
                                                    <Input id="current" type="password" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="new">New password</Label>
                                                    <Input id="new" type="password" />
                                                </div>
                                                <Button className="mt-4">Save password</Button>
                                            </div>
                                        </Card>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};
