import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { RevenueByPlanOut } from "@/services/analytics.service";
import React from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface RevenueByPlanChartProps {
  data: RevenueByPlanOut[];
}

export function RevenueByPlanChart({ data }: RevenueByPlanChartProps) {
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
          No revenue plan data.
        </ThemedText>
      </View>
    );
  }

  const chartData = data.map((item, index) => ({
    value: item.total_revenue,
    color: theme.chartPalette[index % theme.chartPalette.length],
  }));

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    theme.chartPalette[index % theme.chartPalette.length],
                },
              ]}
            />
            <ThemedText
              style={[styles.legendText, { color: theme.textSecondary }]}
            >
              {item.plan_code}:{" "}
              <ThemedText style={{ fontWeight: "bold" }}>
                ${item.total_revenue.toLocaleString()}
              </ThemedText>
            </ThemedText>
          </View>
        ))}
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
        Revenue By Plan
      </ThemedText>
      <View style={styles.chartRow}>
        <View style={{ alignItems: "center" }}>
          <PieChart
            data={chartData}
            donut
            radius={80}
            innerRadius={60}
            innerCircleColor={theme.card}
            showGradient
            sectionAutoFocus
            centerLabelComponent={() => {
              const total = data.reduce(
                (acc, curr) => acc + curr.total_revenue,
                0,
              );
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <ThemedText
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: theme.text,
                    }}
                  >
                    ${(total / 1000).toFixed(1)}k
                  </ThemedText>
                  <ThemedText
                    style={{ fontSize: 10, color: theme.textSecondary }}
                  >
                    Revenue
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
