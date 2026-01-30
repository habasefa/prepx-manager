# Admin Sign In and Dashboard Documentation

This document outlines the implementation details for the Admin Sign In process and the Admin Dashboard, including endpoints, handling logic, and graphical representations of statistics.

## 1. Admin Sign In

The admin sign-in process is designed to be secure, employing a multi-step authentication flow (or a unified flow depending on configuration) to verify credentials and establish a secure session.

### 1.1. Overview
The authentication flow is managed by the `useAuth` hook (`src/hooks/use-auth.ts`) and the `authService` (`src/services/auth/auth-service.ts`). It supports:
- **Two-Step Login**: Initial credentials validation followed by a confirmation step (e.g., for multi-factor authentication or session binding).
- **Session Management**: Secure storage of access and refresh tokens using `useAuthStore`.
- **Token Refresh**: Automatic handling of token expiration via reactive and proactive refresh mechanisms.

### 1.2. Authentication Flow

1.  **Initial Login**:
    - The user submits `username` and `password`.
    - The system validates credentials and returns a `confirmation_token` along with `session_info`.
    
2.  **Confirmation Login**:
    - The system sends the `confirmation_token` back with the credentials to finalize the login.
    - Upon success, the system returns the final `access_token`, `refresh_token`, and user details.

3.  **Token Management**:
    - Tokens are stored in the application state.
    - The application monitors token expiry and attempts to refresh the token before it expires.

### 1.3. Endpoints

| Action | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Initial Login** | `POST` | `/auth/signin` | Validates initial credentials. Returns `confirmation_token`. payload: `{ username, password }` |
| **Confirm Login** | `POST` | `/auth/signin` | Finalizes login. Returns auth tokens. payload: `{ username, password, confirmation_token }` |
| **Logout** | `POST` | `/auth/logout` | Invalidates the current session. |
| **Refresh Token** | `POST` | `/auth/refresh` | Refreshes the access token using a valid refresh token. payload: `{ refresh_token }` |
| **Get Current User** | `GET` | `/auth/me` | Retrieves details of the currently authenticated user. |

---

## 2. Admin Dashboard

The Admin Dashboard provides a comprehensive real-time overview of the platform's performance, focusing on user growth, revenue metrics, and regional insights.

### 2.1. Overview
The dashboard is built using a modular component architecture (`src/components/admin/dashboard/`). Data is fetched using React Query hooks (`src/hooks/useAnalytics.ts`) which communicate with the `AnalyticsService` (`src/services/api/analytics/analytics-service.ts`).

### 2.2. Statistics and Graphical Representations

The dashboard visualizes data using the `recharts` library. Below are the key components and their data sources.

#### A. Overview Cards (`OverviewCards.tsx`)
**Description**: A set of summary cards displaying high-level key performance indicators (KPIs).
- **Metrics Displayed**:
  - Total Students
  - Active Subscribers
  - Total Revenue Collected
  - Current Month Revenue
  - Maximum Possible Revenue
- **Endpoint**: `GET /stat/summary`
- **Method**: `AnalyticsService.getSummary`

#### B. User Rate Chart (`UserRateChart.tsx`)
**Description**: Tracks the growth trend of students and subscribers over time.
- **Visual Representation**: **Area Chart** (ComposedChart)
  - **Yellow Area**: Students count
  - **Orange Area**: Subscribers count
- **Data Source**: Daily breakdown of KPIs.
- **Endpoint**: `GET /stat/daily-breakdown`
- **Method**: `AnalyticsService.getDailyKpis`

#### C. Revenue Chart (`RevenueChart.tsx`)
**Description**: Visualizes revenue generation per month to identify financial trends.
- **Visual Representation**: **Bar Chart**
  - Displays revenue totals for each month.
  - Includes a year filter to view historical data.
- **Data Source**: Monthly revenue breakdown.
- **Endpoint**: `GET /stat/monthly-breakdown`
- **Method**: `AnalyticsService.getMonthlyRevenue`

#### D. Month to Month Growth Chart (`MonthGrowthChart.tsx`)
**Description**: Analyzing the percentage growth (or decline) in revenue compared to the previous month.
- **Visual Representation**: **Line Chart**
  - Plots revenue trends over time.
  - Calculates and displays the average monthly growth percentage.
- **Data Source**: Monthly revenue breakdown (reuses data from Revenue Chart).
- **Endpoint**: `GET /stat/monthly-breakdown`
- **Method**: `AnalyticsService.getMonthlyRevenue`

#### E. Regional Insights (`InsightPieChart.tsx`)
**Description**: Breaks down the user base by region to understand geographic distribution.
- **Visual Representation**: **Pie Chart**
  - Shows the percentage of Students or Subscribers per region.
  - Interactive toggle to switch between "Students" and "Subscribers" views.
- **Data Source**: Regional KPI breakdown.
- **Endpoint**: `GET /stat/regional-breakdown`
- **Method**: `AnalyticsService.getRegionKpis`

#### F. Grade Distribution (`GradeChart.tsx`)
**Description**: Shows the distribution of users or performance across different grades/levels.
- **Endpoint**: `GET /stat/grade-breakdown`
- **Method**: `AnalyticsService.getGradeKpis`

#### G. Revenue by Plan (`RevenueByPlanChart.tsx`)
**Description**: break down of revenue sources based on different subscription plans.
- **Endpoint**: `GET /stat/by-plan`
- **Method**: `AnalyticsService.getRevenueByPlan`

### 2.3. Data Fetching Strategy
- **Caching**: All dashboard data uses a stale time of 5 minutes (`staleTime: 5 * 60 * 1000`) to minimize API load while keeping data relatively fresh.
- **Skeleton Loading**: All components implement skeleton loaders to provide a smooth user experience while data is being fetched.
