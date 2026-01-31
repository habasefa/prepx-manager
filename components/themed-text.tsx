import { StyleSheet, Text, type TextProps } from "react-native";

import { Colors, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <Text
      style={[
        { color },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "defaultSemiBold" && styles.defaultSemiBold,
        type === "subtitle" && styles.subtitle,
        type === "link" && {
          ...styles.link,
          color: theme.primary,
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Typography.families.body,
    fontSize: Typography.sizes.m,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontFamily: Typography.families.bodyMedium,
    fontSize: Typography.sizes.m,
    lineHeight: 24,
  },
  title: {
    fontFamily: Typography.families.headingBold,
    fontSize: Typography.sizes.xxl,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: Typography.families.heading,
    fontSize: Typography.sizes.l,
  },
  link: {
    fontFamily: Typography.families.body,
    lineHeight: 30,
    fontSize: Typography.sizes.m,
  },
});
