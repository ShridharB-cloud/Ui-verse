// @ts-ignore
import ColorPickerDemoCode from "./ColorPickerDemo.tsx?raw";
// @ts-ignore
import ThemeSwitcherDemoCode from "./ThemeSwitcherDemo.tsx?raw";
// @ts-ignore
import GenericFeatureDemoCode from "./GenericFeatureDemo.tsx?raw";
// @ts-ignore
import FontFamilyDemoCode from "./FontFamilyDemo.tsx?raw";
// @ts-ignore
import LayoutDemoCode from "./LayoutDemo.tsx?raw";
// @ts-ignore
import InteractionDemoCode from "./InteractionDemo.tsx?raw";
// @ts-ignore
import StateDemoCode from "./StateDemo.tsx?raw";

// @ts-ignore
import ResizablePanelsDemoCode from "./ResizablePanelsDemo.tsx?raw";
// @ts-ignore
import ResizablePanelsDemoCode from "./ResizablePanelsDemo.tsx?raw";
// @ts-ignore
import StickyLayoutDemoCode from "./StickyLayoutDemo.tsx?raw";
// @ts-ignore
import BreadcrumbDemoCode from "./BreadcrumbDemo.tsx?raw";
// @ts-ignore
import TableDemoCode from "./TableDemo.tsx?raw";
// @ts-ignore
import SearchDemoCode from "./SearchDemo.tsx?raw";
// @ts-ignore
import InfiniteScrollDemoCode from "./InfiniteScrollDemo.tsx?raw";

export const featureCodeMap: Record<string, string> = {
  // Specific Demos
  "Accent Color Picker": ColorPickerDemoCode,
  "Theme Switcher": ThemeSwitcherDemoCode,
  "Dark / Light / System Mode": ThemeSwitcherDemoCode,
  "Time-Based Auto Theme": ThemeSwitcherDemoCode,
  "Font Family Switcher": FontFamilyDemoCode,
  "Resizable Panels": ResizablePanelsDemoCode,
  "Sticky Header / Footer": StickyLayoutDemoCode,

  // Layout Demos
  "Grid / List / Compact View": LayoutDemoCode,
  "Collapsible Sidebar": LayoutDemoCode,
  "Orientation-Based Layout": LayoutDemoCode,
  "Breadcrumb Navigation": LayoutDemoCode,
  "Layout Navigation": LayoutDemoCode,
  "Customizable Tables": TableDemoCode,
  "Expandable Sections": LayoutDemoCode,
  "Filter & Sort Engine": TableDemoCode,
  "Smart Search with Highlighting": SearchDemoCode,
  "Infinite Scroll / Lazy Load": InfiniteScrollDemoCode,

  // Interaction Demos
  "Cursor Interaction Effects": InteractionDemoCode,
  "Hover-Based UI Highlights": InteractionDemoCode,
  "Focus Ring Manager": InteractionDemoCode,
  "Touch-Friendly Mode": InteractionDemoCode,
  "Smart Toast Notifications": InteractionDemoCode,
  "Skeleton Loaders": InteractionDemoCode,
  "Tooltips with Delay": InteractionDemoCode,
  "High Contrast Mode": InteractionDemoCode,
  "Reduced Motion Mode": InteractionDemoCode,
  "Keyboard Navigation": InteractionDemoCode,
  "Screen Reader Labels": InteractionDemoCode,
  "ARIA State Indicators": InteractionDemoCode,
  "Device-Adaptive UI": InteractionDemoCode,
  "Context-Aware Help Hints": InteractionDemoCode,

  // State Demos
  "Auto-Save Indicator": StateDemoCode,
  "Draft Mode UI": StateDemoCode,
  "Session Restore": StateDemoCode,
  "Session Restore UI": StateDemoCode,
  "UI State Persistence": StateDemoCode,
  "State Persistence": StateDemoCode,
  "Undo / Redo Stack": StateDemoCode,
  "Battery Saver UI Mode": StateDemoCode,
  "Network-Aware UI": StateDemoCode,
  "Offline UI Indicator": StateDemoCode,
  "Error Boundary UI": StateDemoCode,
  "Feature Flag UI": StateDemoCode,
  "Role-Based UI Visibility": StateDemoCode,
};

export const getFeatureCode = (title: string): string => {
  // Exact match
  if (featureCodeMap[title]) return featureCodeMap[title];

  // Fuzzy match for code display fallback
  if (title.includes("Layout") || title.includes("Grid") || title.includes("Sidebar") || title.includes("Panel") || title.includes("Nav") || title.includes("Header") || title.includes("Footer") || title.includes("List") || title.includes("Table") || title.includes("Sort") || title.includes("Filter") || title.includes("Search") || title.includes("Infinite") || title.includes("Lazy") || title.includes("Orientation")) {
    return LayoutDemoCode;
  }
  if (title.includes("Interaction") || title.includes("Hover") || title.includes("Focus") || title.includes("Touch") || title.includes("Toast") || title.includes("Skeleton") || title.includes("Tooltip") || title.includes("High Contrast") || title.includes("Motion") || title.includes("Screen Reader") || title.includes("ARIA") || title.includes("Keyboard") || title.includes("Device") || title.includes("Help")) {
    return InteractionDemoCode;
  }
  if (title.includes("State") || title.includes("Save") || title.includes("Undo") || title.includes("Session") || title.includes("Draft") || title.includes("History") || title.includes("Offline") || title.includes("Network") || title.includes("Battery") || title.includes("Error") || title.includes("Flag") || title.includes("Role")) {
    return StateDemoCode;
  }
  if (title.includes("Theme") || title.includes("Dark") || title.includes("Light") || title.includes("Time")) {
    return ThemeSwitcherDemoCode;
  }

  // Default
  return GenericFeatureDemoCode;
}
