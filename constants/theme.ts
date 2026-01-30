/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#F59E0B"; // Amber-500
const tintColorDark = "#FCD34D"; // Amber-300

export const ChartColors = [
  "#3B82F6", // Blue
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#6366F1", // Indigo
  "#14B8A6", // Teal
];

export const Colors = {
  light: {
    text: "#111827",
    textSecondary: "#6B7280",
    background: "#F9FAFB", // Light Gray background for specific contrast
    card: "#FFFFFF",
    tint: tintColorLight,
    icon: "#9CA3AF",
    border: "#E5E7EB",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorLight,
    chartPalette: ChartColors,
    primary: "#F59E0B",
  },
  dark: {
    text: "#F9FAFB",
    textSecondary: "#9CA3AF",
    background: "#111827",
    card: "#1F2937",
    tint: tintColorDark,
    icon: "#9CA3AF",
    border: "#374151",
    tabIconDefault: "#9CA3AF",
    tabIconSelected: tintColorDark,
    chartPalette: ChartColors,
    primary: "#FCD34D",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
