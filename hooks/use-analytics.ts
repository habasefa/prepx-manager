import {
    analyticsService,
    DailyKpiOut,
    GradeKpiOut,
    MonthlyRevenueOut,
    RegionKpiOut,
    RevenueByPlanOut,
    SummaryOut,
} from "@/services/analytics.service";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export function useDashboardData() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Data States
  const [summary, setSummary] = useState<SummaryOut | null>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenueOut[]>([]);
  const [revenueByPlan, setRevenueByPlan] = useState<RevenueByPlanOut[]>([]);
  const [dailyKpis, setDailyKpis] = useState<DailyKpiOut[]>([]);
  const [regionKpis, setRegionKpis] = useState<RegionKpiOut[]>([]);
  const [gradeKpis, setGradeKpis] = useState<GradeKpiOut[]>([]);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const fetchSafe = async <T>(
        fn: () => Promise<T>,
        fallback: any = [],
      ): Promise<T | any> => {
        try {
          return await fn();
        } catch (e) {
          console.error("Fetch failed:", e);
          return fallback;
        }
      };

      const [
        summaryData,
        monthlyData,
        planData,
        dailyData,
        regionData,
        gradeData,
      ] = await Promise.all([
        fetchSafe(() => analyticsService.getSummary(), null),
        fetchSafe(() => analyticsService.getMonthlyRevenue(), []),
        fetchSafe(() => analyticsService.getRevenueByPlan(), []),
        fetchSafe(() => analyticsService.getDailyKpis(), []),
        fetchSafe(() => analyticsService.getRegionKpis(), []),
        fetchSafe(() => analyticsService.getGradeKpis(), []),
      ]);

      if (summaryData) setSummary(summaryData);
      setMonthlyRevenue(monthlyData);
      setRevenueByPlan(planData);
      setDailyKpis(dailyData);
      setRegionKpis(regionData);
      setGradeKpis(gradeData);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch dashboard data");
    } finally {
      if (isRefresh) setRefreshing(false);
      else setLoading(false);
    }
  }, []);

  return {
    loading,
    refreshing,
    fetchData,
    summary,
    monthlyRevenue,
    revenueByPlan,
    dailyKpis,
    regionKpis,
    gradeKpis,
  };
}
