import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { GradeKpiOut } from "@/services/analytics.service";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface GradeChartProps {
  data: GradeKpiOut[];
}

export function GradeChart({ data }: GradeChartProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  if (!data || data.length === 0) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.card, shadowColor: theme.text },
        ]}
      >
        <ThemedText style={{ color: theme.textSecondary }}>
          No grade distribution data.
        </ThemedText>
      </View>
    );
  }

  const extendedPalette = [
    "#F59E0B", // Amber 500
    "#78716C", // Stone 500
    "#3B82F6", // Blue 500
    "#10B981", // Emerald 500
    "#EF4444", // Red 500
    "#8B5CF6", // Violet 500
    "#EC4899", // Pink 500
    "#6366F1", // Indigo 500
    "#14B8A6", // Teal 500
    "#F97316", // Orange 500
  ];

  const chartData = data.map((item, index) => {
    const total = item.students + item.subscribers;
    return {
      value: total,
      color: extendedPalette[index % extendedPalette.length],
    };
  });

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {data.map((item, index) => {
          const total = item.students + item.subscribers;
          return (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      extendedPalette[index % extendedPalette.length],
                  },
                ]}
              />
              <ThemedText
                style={[styles.legendText, { color: theme.textSecondary }]}
              >
                {item.grade}:{" "}
                <ThemedText style={{ fontWeight: "bold" }}>{total}</ThemedText>
              </ThemedText>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, shadowColor: theme.text },
      ]}
    >
      <ThemedText type="subtitle" style={styles.title}>
        Grade Distribution
      </ThemedText>
      <View style={styles.chartRow}>
        <View style={{ alignItems: "center" }}>
          <PieChart
            data={chartData}
            radius={80}
            donut
            innerRadius={60}
            innerCircleColor={theme.card}
            showGradient
            sectionAutoFocus
            centerLabelComponent={() => {
              const total = data.reduce(
                (acc, curr) => acc + curr.students + curr.subscribers,
                0,
              );
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <ThemedText
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: theme.text,
                    }}
                  >
                    {total}
                  </ThemedText>
                  <ThemedText
                    style={{ fontSize: 10, color: theme.textSecondary }}
                  >
                    Students
                  </ThemedText>
                </View>
              );
            }}
          />
        </View>
        {renderLegend()}
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
  title: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: "bold",
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  legendContainer: {
    flex: 1,
    marginLeft: 24,
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
  },
});
