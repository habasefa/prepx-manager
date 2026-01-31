import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MonthlyRevenueOut } from "@/services/analytics.service";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface MonthGrowthChartProps {
  data: MonthlyRevenueOut[];
}

export function MonthGrowthChart({ data }: MonthGrowthChartProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  const screenWidth = Dimensions.get("window").width;

  if (!data || data.length < 2) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.card, shadowColor: theme.text },
        ]}
      >
        <ThemedText style={{ color: theme.textSecondary }}>
          Not enough data for growth analysis.
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

  // Calculate Avg Growth for Footer
  let totalGrowth = 0;
  for (let i = 1; i < data.length; i++) {
    const current = data[i].revenue;
    const previous = data[i - 1].revenue;
    const growth = previous === 0 ? 0 : ((current - previous) / previous) * 100;
    totalGrowth += growth;
  }
  const avgGrowth = totalGrowth / (data.length - 1);
  const isPositive = avgGrowth >= 0;

  // Prepare Chart Data (Revenue)
  const chartData = data.map((item) => ({
    value: item.revenue,
    label: monthNames[item.month],
    labelTextStyle: { color: theme.textSecondary, fontSize: 10 },
  }));

  // Calculate card width accounting for margins and padding
  // Screen padding (approx 16-20px each side) + Card padding (24px each side)
  const cardWidth = screenWidth - 88;

  const formatYLabel = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return `${(num / 1000).toFixed(1)}k ETB`;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, shadowColor: theme.text },
      ]}
    >
      <ThemedText type="subtitle" style={styles.title}>
        Month to Month Growth
      </ThemedText>

      <View style={{ marginVertical: 20, alignItems: "center" }}>
        <LineChart
          data={chartData}
          color="#F97316"
          thickness={2}
          hideDataPoints
          initialSpacing={20}
          endSpacing={20}
          hideRules={false}
          rulesType="solid"
          rulesColor={theme.border + "40"} // Transparent border
          yAxisThickness={0}
          xAxisThickness={0}
          yAxisTextStyle={{
            color: theme.textSecondary,
            fontSize: 10,
          }}
          formatYLabel={formatYLabel}
          xAxisLabelTextStyle={{
            color: theme.textSecondary,
            fontSize: 10,
          }}
          width={cardWidth}
          height={180}
          curved={false}
          isAnimated
          showVerticalLines={false}
          adjustToWidth={false} // Disable auto adjust to strictly respect width
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: theme.textSecondary,
            pointerStripWidth: 2,
            pointerColor: "#F97316",
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: (items: any[]) => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: "center",
                    marginTop: -30,
                    marginLeft: -40,
                  }}
                >
                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor: theme.card,
                      borderWidth: 1,
                      borderColor: theme.border,
                    }}
                  >
                    <ThemedText
                      style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {items[0].value.toFixed(0)} ETB
                    </ThemedText>
                  </View>
                </View>
              );
            },
          }}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.statRow}>
          <ThemedText
            style={[styles.statLabel, { color: theme.textSecondary }]}
          >
            Avg monthly growth:
          </ThemedText>
          <ThemedText
            style={[
              styles.statValue,
              { color: isPositive ? "#166534" : "#EF4444" },
            ]}
          >
            {avgGrowth.toFixed(1)}%
          </ThemedText>
          <Ionicons
            name={isPositive ? "arrow-up" : "arrow-down"}
            size={12}
            color={isPositive ? "#166534" : "#EF4444"}
            style={{ marginLeft: 2 }}
          />
        </View>
        <ThemedText style={{ color: theme.textSecondary, fontSize: 12 }}>
          Showing revenue growth for 2025
        </ThemedText>
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
  },
  footer: {
    marginTop: 10,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
});
