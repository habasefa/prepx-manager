import { Platform } from "react-native";

// --- 0. Palettes ---

// Brand: Amber
const Amber = {
  50: "#FFFBEB",
  100: "#FEF3C7",
  200: "#FDE68A",
  300: "#FCD34D",
  400: "#FBBF24",
  500: "#F59E0B", // Primary
  600: "#D97706",
  700: "#B45309",
  800: "#92400E",
  900: "#78350F",
};

// Neutral: Gray (Cool/Slate mix for polished look, or Warm Gray for harmony)
const Neutral = {
  white: "#FFFFFF",
  black: "#000000",
  50: "#FAFAFA",
  100: "#F4F4F5",
  200: "#E4E4E7",
  300: "#D4D4D8",
  400: "#A1A1AA",
  500: "#71717A",
  600: "#52525B",
  700: "#3F3F46",
  800: "#27272A",
  900: "#18181B",
};

const tintColorLight = Amber[500];
const tintColorDark = Amber[300];

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
  families: {
    sans: "Inter_400Regular",
    serif: "serif",
    mono: "monospace",
    heading: "Poppins_600SemiBold",
    headingBold: "Poppins_700Bold",
    body: "Inter_400Regular",
    bodyMedium: "Inter_500Medium",
  },
  sizes: {
    xs: 12,
    s: 14,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
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
    s: createShadow(2, Neutral[900], 0.05, 3),
    m: createShadow(4, Neutral[900], 0.1, 6),
    l: createShadow(8, Neutral[900], 0.15, 12),
  },
  dark: {
    s: createShadow(2, "#000", 0.3, 3),
    m: createShadow(4, "#000", 0.5, 6),
    l: createShadow(8, "#000", 0.7, 12),
  },
};

// Strict Palette: Shades of Amber, Black, and Gray only.
export const ChartColors = [
  Amber[500], // Primary
  Neutral[800], // Dark Gray
  Amber[300], // Light Amber
  Neutral[500], // Medium Gray
  Amber[700], // Dark Amber
  Neutral[300], // Light Gray
  Amber[400],
  Neutral[900],
];

export const Colors = {
  light: {
    text: Neutral[900],
    textSecondary: Neutral[500],
    background: Neutral[50], // Very light gray, almost white
    card: Neutral.white,
    tint: tintColorLight,
    icon: Neutral[400],
    border: Neutral[200],
    tabIconDefault: Neutral[300],
    tabIconSelected: tintColorLight,
    chartPalette: ChartColors,
    primary: Amber[500],
    success: Amber[600],
    error: Neutral[900],
    // Semantic Cards
    card1: { bg: Amber[50], fg: Amber[600] },
    card2: { bg: Neutral[100], fg: Neutral[900] },
    card3: { bg: Neutral.white, fg: Neutral[800] },
    card4: { bg: Amber[100], fg: Amber[700] },
  },
  dark: {
    text: Neutral[50],
    textSecondary: Neutral[400],
    background: Neutral[900],
    card: Neutral[800],
    tint: tintColorDark,
    icon: Neutral[500],
    border: Neutral[700],
    tabIconDefault: Neutral[600],
    tabIconSelected: tintColorDark,
    chartPalette: ChartColors,
    primary: Amber[300],
    success: Amber[400],
    error: Neutral[50],
    // Semantic Cards
    card1: { bg: Amber[900], fg: Amber[200] },
    card2: { bg: Neutral[700], fg: Neutral[100] },
    card3: { bg: Neutral[800], fg: Neutral[200] },
    card4: { bg: Amber[800], fg: Amber[100] },
  },
};


