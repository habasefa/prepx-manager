import React, { useEffect } from "react";
// Force refresh
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useDashboardData } from "@/hooks/use-analytics";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Redirect } from "expo-router";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Dashboard Components
import { GradeChart } from "@/components/dashboard/GradeChart";
import { InsightPieChart } from "@/components/dashboard/InsightPieChart";
import { MonthGrowthChart } from "@/components/dashboard/MonthGrowthChart";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { RevenueByPlanChart } from "@/components/dashboard/RevenueByPlanChart";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { UserRateChart } from "@/components/dashboard/UserRateChart";

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const { user, isLoading: authLoading } = useAuth();
  const {
    loading,
    refreshing,
    fetchData,
    summary,
    monthlyRevenue,
    revenueByPlan,
    dailyKpis,
    regionKpis,
    gradeKpis,
  } = useDashboardData();

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  if (authLoading) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Checking session...</ThemedText>
      </ThemedView>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ThemedView style={styles.center}>
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? "light"].tint}
          />
          <ThemedText style={{ marginTop: 16 }}>
            Loading Dashboard...
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchData(true)}
          />
        }
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title">Dashboard</ThemedText>
          <ThemedText style={styles.subtitle}>
            Welcome back, {user.name}!
          </ThemedText>
        </ThemedView>

        <OverviewCards data={summary} loading={loading} />

        <UserRateChart data={dailyKpis} />

        <RevenueChart data={monthlyRevenue} />

        <MonthGrowthChart data={monthlyRevenue} />

        <InsightPieChart data={regionKpis} title="Regional Insights" />

        <GradeChart data={gradeKpis} />

        <RevenueByPlanChart data={revenueByPlan} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
});
