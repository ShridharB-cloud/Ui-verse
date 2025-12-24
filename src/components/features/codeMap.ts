// @ts-ignore
import ColorPickerDemoCode from "./ColorPickerDemo.tsx?raw";
// @ts-ignore
import ThemeSwitcherDemoCode from "./ThemeSwitcherDemo.tsx?raw";

const defaultCode = `
import { Button } from "@/components/ui/button";

export const FeatureDemo = () => {
  return (
    <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">Feature Demo</h3>
        <p className="text-sm text-muted-foreground">
          This is a placeholder for the feature implementation.
          The actual code will be available once the feature is fully implemented.
        </p>
      </div>
      <div className="p-6 pt-0">
        <Button onClick={() => console.log("Action triggered")}>
          Interact
        </Button>
      </div>
    </div>
  );
};
`;

export const featureCodeMap: Record<string, string> = {
    "Accent Color Picker": ColorPickerDemoCode,
    "Theme Switcher": ThemeSwitcherDemoCode,
    "Dark / Light / System Mode": ThemeSwitcherDemoCode,
};

export const getFeatureCode = (title: string): string => {
    return featureCodeMap[title] || defaultCode;
}
