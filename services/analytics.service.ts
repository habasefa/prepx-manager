import axiosInstance from "./axios-instance";

export interface SummaryOut {
  students: number;
  subscribers: number;
  totalRevenue: number;
  currentMonthRevenue: number;
  maxRevenue: number;
}

export interface MonthlyRevenueOut {
  year: number;
  month: number;
  revenue: number;
}

export interface RevenueByPlanOut {
  plan_code: string;
  total_revenue: number;
  subscriptions: number;
}

export interface DailyKpiOut {
  date: string;
  students: number;
  subscribers: number;
}

export interface RegionKpiOut {
  region: string;
  students: number;
  subscribers: number;
}

export interface GradeKpiOut {
  grade: string | number;
  students: number;
  subscribers: number;
}

export const analyticsService = {
  getSummary: async (): Promise<SummaryOut> => {
    const response = await axiosInstance.get("/stat/summary");
    return response.data;
  },

  getMonthlyRevenue: async (): Promise<MonthlyRevenueOut[]> => {
    const response = await axiosInstance.get("/stat/monthly-breakdown");
    return response.data;
  },

  getRevenueByPlan: async (): Promise<RevenueByPlanOut[]> => {
    const response = await axiosInstance.get("/stat/by-plan");
    return response.data;
  },

  getDailyKpis: async (): Promise<DailyKpiOut[]> => {
    const response = await axiosInstance.get("/stat/daily-breakdown");
    return response.data;
  },

  getRegionKpis: async (): Promise<RegionKpiOut[]> => {
    const response = await axiosInstance.get("/stat/regional-breakdown");
    return response.data;
  },

  getGradeKpis: async (): Promise<GradeKpiOut[]> => {
    const response = await axiosInstance.get("/stat/grade-breakdown");
    return response.data;
  },
};
