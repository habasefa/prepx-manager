# Dashboard API Response Documentation

This document details the JSON return bodies for the Admin Dashboard API endpoints.

## 1. Summary Statistics

**Endpoint**: `GET /stat/summary`

**Description**: Returns high-level summary statistics including total users and revenue figures.

**Response Type**: `SummaryOut`

**Example Response**:
```json
{
  "students": 1250,
  "subscribers": 850,
  "totalRevenue": 450000.00,
  "currentMonthRevenue": 25000.00,
  "maxRevenue": 1000000.00
}
```

**Type Definition**:
```typescript
interface SummaryOut {
    students: number;
    subscribers: number;
    totalRevenue: number;
    currentMonthRevenue: number;
    maxRevenue: number;
}
```

---

## 2. Monthly Revenue Breakdown

**Endpoint**: `GET /stat/monthly-breakdown`

**Description**: Provides a breakdown of revenue generation month by month, useful for tracking growth trends.

**Response Type**: Array of `MonthlyRevenueOut`

**Example Response**:
```json
[
  {
    "year": 2024,
    "month": 1,
    "revenue": 15000.00
  },
  {
    "year": 2024,
    "month": 2,
    "revenue": 18500.00
  }
]
```

**Type Definition**:
```typescript
interface MonthlyRevenueOut {
    year: number;
    month: number;
    revenue: number;
}
```

---

## 3. Daily KPIs Breakdown

**Endpoint**: `GET /stat/daily-breakdown`

**Description**: Offers a day-by-day count of new students and subscribers, typically used for area charts or activity graphs.

**Response Type**: Array of `DailyKpiOut`

**Example Response**:
```json
[
  {
    "date": "27/01/2025",
    "students": 15,
    "subscribers": 5
  },
  {
    "date": "28/01/2025",
    "students": 22,
    "subscribers": 8
  }
]
```

**Type Definition**:
```typescript
interface DailyKpiOut {
    date: string; // Format: "DD/MM/YYYY" is typical
    students: number;
    subscribers: number;
}
```

---

## 4. Regional Breakdown

**Endpoint**: `GET /stat/regional-breakdown`

**Description**: Breakdown of user demographics by region.

**Response Type**: Array of `RegionKpiOut`

**Example Response**:
```json
[
  {
    "region": "Addis Ababa",
    "students": 500,
    "subscribers": 350
  },
  {
    "region": "Oromia",
    "students": 300,
    "subscribers": 150
  }
]
```

**Type Definition**:
```typescript
interface RegionKpiOut {
    region: string;
    students: number;
    subscribers: number;
}
```

---

## 5. Grade Breakdown

**Endpoint**: `GET /stat/grade-breakdown`

**Description**: Breakdown of students and subscribers by grade level (e.g., Grade 9, Grade 10).

**Response Type**: Array of `GradeKpiOut`

**Example Response**:
```json
[
  {
    "grade": 9,
    "students": 450,
    "subscribers": 200
  },
  {
    "grade": 10,
    "students": 300,
    "subscribers": 180
  }
]
```

**Type Definition**:
```typescript
interface GradeKpiOut {
    grade: number | string;
    students: number;
    subscribers: number;
}
```

---

## 6. Revenue by Plan

**Endpoint**: `GET /stat/by-plan`

**Description**: Segments revenue by the subscription plan type (e.g., Monthly, Yearly).

**Response Type**: Array of `RevenueByPlanOut`

**Example Response**:
```json
[
  {
    "plan_code": "monthly_basic",
    "total_revenue": 150000.00,
    "subscriptions": 300
  },
  {
    "plan_code": "yearly_premium",
    "total_revenue": 300000.00,
    "subscriptions": 150
  }
]
```

**Type Definition**:
```typescript
interface RevenueByPlanOut {
    plan_code: string;
    total_revenue: number;
    subscriptions: number;
}
```
