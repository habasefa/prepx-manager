import { ThemedText } from "@/components/themed-text";
import { Colors, Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MonthlyRevenueOut } from "@/services/analytics.service";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface RevenueChartProps {
  data: MonthlyRevenueOut[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const screenWidth = Dimensions.get("window").width;

  if (!data || data.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.card, shadowColor: theme.text },
        ]}
      >
        <ThemedText style={{ color: theme.textSecondary }}>
          No revenue data available.
        </ThemedText>
      </View>
    );
  }

  const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const chartData = data.map((item, index) => ({
    value: item.revenue,
    label: monthNames[item.month] || String(item.month),
    frontColor: theme.chartPalette[index % theme.chartPalette.length],
    topLabelComponent: () => (
      <ThemedText
        style={{ fontSize: 10, color: theme.textSecondary, marginBottom: 4 }}
      >
        ${(item.revenue / 1000).toFixed(1)}k
      </ThemedText>
    ),
  }));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, shadowColor: theme.text },
      ]}
    >
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          Monthly Revenue
        </ThemedText>
      </View>
      <View style={{ overflow: "visible" }}>
        <BarChart
          data={chartData}
          barWidth={22}
          spacing={24}
          roundedTop
          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisTextStyle={{ color: theme.textSecondary, fontSize: 10 }}
          xAxisLabelTextStyle={{
            color: theme.textSecondary,
            fontSize: 10,
            marginTop: 4,
          }}
          noOfSections={4}
          width={screenWidth - 80} // Adjusted for padding
          height={220}
          isAnimated
          showGradient
          gradientColor={theme.card}
          scrollToEnd
          initialSpacing={10}
          endSpacing={10}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontFamily: Typography.families.headingBold,
    fontSize: 18,
  },
});
