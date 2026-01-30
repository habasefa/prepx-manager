import { Platform } from "react-native";

const tintColorLight = "#F59E0B"; // Amber-500
const tintColorDark = "#FCD34D"; // Amber-300

// --- 1. Spacing ---
export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

// --- 2. Border Radius ---
export const BorderRadius = {
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  round: 9999,
};

// --- 3. Typography ---
export const Typography = {
  sizes: {
    xs: 12,
    s: 14,
    m: 16,
    l: 20,
    xl: 24,
  },
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
};

// --- 4. Shadows ---
function createShadow(
  elevation: number,
  shadowColor: string,
  shadowOpacity: number,
  shadowRadius: number,
  width = 0,
  height = 2,
) {
  return Platform.select({
    ios: {
      shadowColor,
      shadowOffset: { width, height },
      shadowOpacity,
      shadowRadius,
    },
    android: {
      elevation,
    },
  });
}

export const Shadows = {
  light: {
    s: createShadow(2, "#000", 0.1, 3),
    m: createShadow(4, "#000", 0.15, 6),
    l: createShadow(8, "#000", 0.2, 12),
  },
  dark: {
    s: createShadow(2, "#FFF", 0.1, 3),
    m: createShadow(4, "#000", 0.3, 6), // Dark mode shadows are tricky, usually need darker background
    l: createShadow(8, "#000", 0.4, 12),
  },
};

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

const BaseColors = {
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
  },
  brand: {
    primary: tintColorLight,
    primaryDark: tintColorDark,
  },
};

export const Colors = {
  light: {
    text: BaseColors.neutral.gray900,
    textSecondary: BaseColors.neutral.gray500,
    background: BaseColors.neutral.gray50,
    card: BaseColors.neutral.white,
    tint: tintColorLight,
    icon: BaseColors.neutral.gray400,
    border: BaseColors.neutral.gray200,
    tabIconDefault: BaseColors.neutral.gray400,
    tabIconSelected: tintColorLight,
    chartPalette: ChartColors,
    primary: BaseColors.brand.primary,
    success: "#10B981",
    error: "#EF4444",
  },
  dark: {
    text: BaseColors.neutral.gray50,
    textSecondary: BaseColors.neutral.gray400,
    background: BaseColors.neutral.gray900,
    card: BaseColors.neutral.gray800,
    tint: tintColorDark,
    icon: BaseColors.neutral.gray400,
    border: BaseColors.neutral.gray700,
    tabIconDefault: BaseColors.neutral.gray400,
    tabIconSelected: tintColorDark,
    chartPalette: ChartColors,
    primary: BaseColors.brand.primaryDark,
    success: "#34D399",
    error: "#F87171",
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
