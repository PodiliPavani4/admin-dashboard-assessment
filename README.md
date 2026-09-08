# Scalable Admin Dashboard Architecture

A high-performance, data-heavy admin dashboard built with **Next.js (App Router)**, **React**, **Tailwind CSS**, and **Recharts**, designed following modular design system principles and clean state separation.

---



### 1. Installation
Clone the repository and install project dependencies:
```bash
git clone <repository-url>
cd admin-dashboard-assessment
npm install
```

### 2. Environment Configuration
Copy the `.env.example` file:
```bash
cp .env.example .env.local
```

### 3. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Technology Stack & Rationale

- **Framework**: **Next.js 16 (App Router)**
  - *Why*: Provides file-based routing, server components, seamless layout nesting, and optimal client bundle performance.
- **Styling**: **Tailwind CSS**
  - *Why*: Enables rapid component styling and uniform design system tokens (matching Figma Purple UI kit).
- **Data Visualization**: **Recharts**
  - *Why*: Composable, responsive SVG chart primitives tailored for analytics dashboards.
- **Iconography**: **Lucide React**
  - *Why*: Consistent, lightweight, accessible icon set.

---

## Repository Structure & Scalability Guide

```
src/
├── app/                        # Next.js App Router routes & layouts
│   ├── (dashboard)/            # Route group for authenticated layout shell
│   │   ├── layout.js           # Main shell wrapping Sidebar and Topbar
│   │   ├── dashboard/          # Dashboard Overview page (Cards, Recharts, Quick Actions)
│   │   ├── users/              # Data Table page (Search, Sort, Filter, Pagination)
│   │   │   ├── page.js
│   │   │   ├── [id]/page.js    # User Detail & Edit Form
│   │   │   └── new/page.js     # User Creation Form
│   │   └── settings/           # Settings page (Profile, RBAC roles)
│   ├── globals.css             # Tailwind CSS & design system reset
│   └── layout.js               # Root layout wrapper
├── components/                 # Reusable UI component design system
│   ├── ui/                     # Primitives (Button, Card, Input, Select, Modal)
│   ├── data-display/           # Table wrappers (DataTable, TablePagination, TableFilter)
│   ├── charts/                 # Recharts wrappers (LineChartCard, BarChartCard)
│   └── layout/                 # Navigation shell (Sidebar, Topbar, MobileNav, PageHeader)
├── context/                    # React Context providers
│   └── AuthContext.js          # Role-Based Access Control (Admin, Manager, Viewer)
├── hooks/                      # Reusable custom React hooks
│   ├── useMockFetch.js         # Server State data fetcher with loading/error handling
│   └── useTableState.js        # Table UI State (sorting, filtering, pagination)
└── lib/                        # Utility functions & Mock API layer
    ├── mockApi.js              # In-memory CRUD database with latency
    ├── mockData.js             # Initial seed data
    └── utils.js                # Helper functions (formatDate)
```

### 📍 Where Would a New Feature Go?
If adding a new domain feature (e.g., **Inventory Management**):
1. **Mock Data & Service API**: Add seed dataset and CRUD endpoints in `src/lib/mockApi.js`.
2. **Feature Components**: Create modular widgets under `src/components/inventory/` using base UI components (`Card`, `DataTable`, `Select`).
3. **App Route**: Add page under `src/app/(dashboard)/inventory/page.js`.
4. **Navigation Link**: Register item in `menuSections` array inside `src/components/layout/Sidebar.js`.

---

## 🔄 State Management Architecture

A key architectural pattern of this project is the **strict separation between Server State and UI State**:

### 1. Server State (`useMockFetch`)
- Responsible for fetching, caching, loading spinners, error states, and mutation revalidations.
- Decoupled from rendering components so pages can handle network latency and retries cleanly.
- `mockApi.js` simulates async REST behavior (`300-500ms` delay).

### 2. UI State (`useTableState`, `AuthContext`)
- **Table Controls**: `useTableState` manages active page, sort column, sort direction, category filters, and search query.
- **Role-Based Access (RBAC)**: `AuthContext` tracks the active demo role (`Admin`, `Manager`, `Viewer`) to dynamically restrict action buttons or lock form inputs.

---

##  Features Built & What Is Not

###  What Is Completed
- [x] **Dashboard Overview**: Metrics cards with trend badges, Recharts line and bar charts, user action breakdown, quick actions.
- [x] **Data Table Page**: Full directory view with search input, status/role filtering, multi-column sorting, row pagination, and deletion modal.
- [x] **Detail & Edit Form Page**: User record loading, client form validation, live interactive profile card preview.
- [x] **New User Creation Page**: Responsive form with field validation and dataset append.
- [x] **Settings Page**: Multi-tab management for Profile, RBAC Role switcher.
- [x] **Role-Based Navigation**: Interactive role switcher (`Admin`, `Manager`, `Viewer`) in topbar and settings demonstrating read-only view locks.
- [x] **Unit Tests**: Automated tests for `DataTable` component and `useTableState` hook.

### What Is Not / Future Extensions
- Persistent backend API database (currently backed by `localStorage` + mock service layer).
- OAuth 2.0 / JWT backend authentication flow (simulated via client AuthContext role selector).
