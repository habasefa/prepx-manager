import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SummaryOut } from "@/services/analytics.service";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface OverviewCardsProps {
  data: SummaryOut | null;
  loading: boolean;
}

export function OverviewCards({ data, loading }: OverviewCardsProps) {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText style={{ color: theme.textSecondary }}>
          Updating summary...
        </ThemedText>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText style={{ color: theme.textSecondary }}>
          No summary data available.
        </ThemedText>
      </View>
    );
  }

  const cards = [
    {
      label: "Total Students",
      value: data.students.toString(),
      icon: "people",
      color: "#3B82F6", // Blue
      bg: "#EFF6FF",
    },
    {
      label: "Subscribers",
      value: data.subscribers.toString(),
      icon: "star",
      color: "#F59E0B", // Amber
      bg: "#FFFBEB",
    },
    {
      label: "Total Revenue",
      value: `$${data.totalRevenue.toLocaleString()}`,
      icon: "cash",
      color: "#10B981", // Emerald
      bg: "#ECFDF5",
    },
    {
      label: "This Month",
      value: `$${data.currentMonthRevenue.toLocaleString()}`,
      icon: "trending-up",
      color: "#8B5CF6", // Violet
      bg: "#F5F3FF",
    },
  ];

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <View
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              shadowColor: theme.text,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: card.bg }]}>
              <Ionicons name={card.icon as any} size={20} color={card.color} />
            </View>
            {/* Optional trend indicator could go here */}
          </View>

          <ThemedText style={[styles.value, { color: theme.text }]}>
            {card.value}
          </ThemedText>
          <ThemedText style={[styles.label, { color: theme.textSecondary }]}>
            {card.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: "48%", // Roughly half width minus gap
    padding: 16,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)", // Subtle border
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
  },
});
