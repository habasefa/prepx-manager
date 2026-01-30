import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { DailyKpiOut } from "@/services/analytics.service";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface UserRateChartProps {
  data: DailyKpiOut[];
}

export function UserRateChart({ data }: UserRateChartProps) {
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
          No user rate data available.
        </ThemedText>
      </View>
    );
  }

  // Format data for the chart
  const studentsData = data.map((item) => ({
    value: item.students,
    label: item.date.split("-").slice(1).join("/"),
  }));
  const subscribersData = data.map((item) => ({
    value: item.subscribers,
    label: item.date.split("-").slice(1).join("/"),
  }));

  const color1 = theme.chartPalette[2]; // Amber
  const color2 = theme.chartPalette[0]; // Blue

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, shadowColor: theme.text },
      ]}
    >
      <ThemedText type="subtitle" style={styles.title}>
        User Growth
      </ThemedText>
      <View style={{ overflow: "hidden" }}>
        <LineChart
          areaChart
          curved
          data={studentsData}
          data2={subscribersData}
          height={200}
          width={screenWidth - 80}
          spacing={40}
          color1={color1}
          color2={color2}
          startFillColor1={color1}
          startFillColor2={color2}
          endFillColor1={color1}
          endFillColor2={color2}
          startOpacity={0.3}
          endOpacity={0.05}
          noOfSections={4}
          yAxisColor={theme.border}
          xAxisColor={theme.border}
          yAxisTextStyle={{ color: theme.textSecondary }}
          xAxisLabelTextStyle={{
            color: theme.textSecondary,
            fontSize: 10,
          }}
          rulesColor={theme.border}
          hideDataPoints
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
                    {items[0].label}
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
                      {items[0].value}
                    </ThemedText>
                    <ThemedText
                      style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {items[1]?.value}
                    </ThemedText>
                  </View>
                </View>
              );
            },
          }}
        />
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: color1 }]} />
          <ThemedText style={styles.legendText}>Students</ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: color2 }]} />
          <ThemedText style={styles.legendText}>Subscribers</ThemedText>
        </View>
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
    marginBottom: 16,
    fontSize: 18,
    fontWeight: "bold",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    gap: 20,
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
    fontWeight: "500",
  },
});
