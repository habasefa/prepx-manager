import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MonthlyRevenueOut } from "@/services/analytics.service";
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

  // Calculate Growth
  const growthData = [];
  let totalGrowth = 0;

  for (let i = 1; i < data.length; i++) {
    const current = data[i].revenue;
    const previous = data[i - 1].revenue;
    const growth = previous === 0 ? 0 : ((current - previous) / previous) * 100;

    growthData.push({
      value: growth,
      label: monthNames[data[i].month] || String(data[i].month),
      dataPointText: `${growth.toFixed(1)}%`,
      textColor: theme.textSecondary,
    });
    totalGrowth += growth;
  }

  const avgGrowth = totalGrowth / growthData.length;
  const isPositive = avgGrowth >= 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, shadowColor: theme.text },
      ]}
    >
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>
          MoM Growth
        </ThemedText>
        <View
          style={[
            styles.badge,
            { backgroundColor: isPositive ? "#DCFCE7" : "#FEE2E2" },
          ]}
        >
          <ThemedText
            style={{
              color: isPositive ? "#166534" : "#991B1B",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            Avg: {avgGrowth > 0 ? "+" : ""}
            {avgGrowth.toFixed(1)}%
          </ThemedText>
        </View>
      </View>

      <View style={{ overflow: "hidden" }}>
        <LineChart
          data={growthData}
          color={isPositive ? theme.primary : "#EF4444"}
          thickness={3}
          dataPointsColor={isPositive ? theme.primary : "#EF4444"}
          textColor={theme.textSecondary}
          xAxisColor={theme.border}
          yAxisColor={theme.border}
          yAxisTextStyle={{ color: theme.textSecondary, fontSize: 10 }}
          xAxisLabelTextStyle={{
            color: theme.textSecondary,
            fontSize: 10,
          }}
          startFillColor={isPositive ? theme.primary : "#EF4444"}
          endFillColor={isPositive ? theme.primary : "#EF4444"}
          startOpacity={0.2}
          endOpacity={0.05}
          areaChart
          width={screenWidth - 80}
          height={50}
          curved
          isAnimated
          hideRules
          scrollToEnd
          initialSpacing={10}
          endSpacing={10}
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: theme.textSecondary,
            pointerStripWidth: 2,
            pointerColor: theme.textSecondary,
            radius: 6,
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
                  <ThemedText
                    style={{
                      color: theme.textSecondary,
                      fontSize: 14,
                      marginBottom: 6,
                      textAlign: "center",
                    }}
                  >
                    {items[0].date}
                  </ThemedText>

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
                      {items[0].value.toFixed(1)}%
                    </ThemedText>
                  </View>
                </View>
              );
            },
          }}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
