# Manufacturing Quality Hub 🏭

**Part of the Agentic AI Predictive Maintenance Platform**

A Vite + React + TypeScript portal for manufacturing quality and product engineering teams. Provides RCA/CAPA-driven insights, defect pattern analysis, and AI-powered quality recommendations to drive continuous improvement across vehicle models and production plants.

## 🎯 Purpose

The Manufacturer Portal serves quality engineers and product teams with:
- **Root Cause Analysis (RCA)** insights powered by AI agents
- **Corrective and Preventive Actions (CAPA)** tracking and recommendations
- **Model-wise defect patterns** with trend analysis and regional breakdowns
- **Plant-level quality metrics** comparing manufacturing locations
- **AI Quality Assistant** providing contextual answers about defect patterns, CAPA status, and quality trends

This portal completes the predictive maintenance ecosystem alongside:
- **Customer Portal** - vehicle health monitoring and service booking
- **OEM Portal** - fleet-level insights and service demand forecasting

## ✨ Key Features

### Dashboard
- Rising defect trends across models
- Top defect categories with incident counts
- CAPA pipeline status (proposed → accepted → in progress → implemented)
- Resolution metrics and quality KPIs

### Model Analytics
- Comprehensive model performance overview
- Defect type breakdown with RCA confidence scores
- Regional impact analysis
- Interactive RCA/CAPA detail panel with:
  - AI-generated root cause explanations
  - Workshop CAPA (field-driven actions)
  - Manufacturing CAPA (AI-suggested improvements)
  - Impact estimates and implementation status

### Plant/Location Insights
- Manufacturing plant comparison by defect count
- Dominant models and defect categories per location
- Regional quality patterns
- CAPA effectiveness tracking

### Quality Assistant
- Context-aware AI chat widget
- Model and location-specific queries
- Root cause exploration
- CAPA status and recommendation insights

## 🛠 Tech Stack
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **React Router 6** - Declarative routing
- **TanStack Query** - Powerful data fetching, caching, and synchronization
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Framer Motion** - Smooth animations and micro-interactions
- **Lucide React** - Beautiful, consistent icon system
- **Axios** - HTTP client (ready for real API integration)

### Design System
- **Glassmorphism** UI theme with dark mode aesthetics
- Custom color palette:
  - Emerald/Cyan - success, positive trends
  - Amber - warnings, pending actions
  - Coral - critical issues, rising trends
  - Purple - AI-driven insights
- Consistent component library (KPI cards, data tables, status badges)
- Responsive layout adapting from mobile to desktop

## 📋 Routes & Pages

| Route | Purpose |
|-------|---------|
| `/manufacturer/dashboard` | Overview of quality metrics, rising defects, and CAPA pipeline |
| `/manufacturer/models` | List of all vehicle models with defect counts and trends |
| `/manufacturer/model/:modelId` | Detailed RCA/CAPA analysis for specific model |
| `/manufacturer/locations` | Manufacturing plant comparison |
| `/manufacturer/location/:locId` | Plant-specific defect patterns and CAPA status |

All routes wrapped in `ManufacturerLayout` with:
- Navigation bar (Dashboard, Models, Plants)
- Time range filter (30/90/180 days)
- Region filter (All, North, South, East, West, Central)
- Quality Assistant chat widget

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** recommended
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/HackstersJr/EY-Manufacturer-frontend.git
cd EY-Manufacturer-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
- Navigate to the URL shown in terminal (typically `http://localhost:5173`)
- Routes are under `/manufacturer/*`
- Root path redirects to `/manufacturer/dashboard`

### Environment Variables (Optional)
Create a `.env` file for API configuration when integrating with backend:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_MOCK_DATA=false
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with hot module replacement |
| `npm run build` | Type-check with TypeScript, then build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint `.ts` and `.tsx` files with ESLint |

### Production Build
```bash
npm run build
# Output will be in the dist/ directory
```

## 📁 Project Structure
```
FrontEnds/Manufacturer/
├─ src/
│  ├─ App.tsx                       # App shell with router configuration
│  ├─ main.tsx                      # React entry point
│  ├─ index.css                     # Tailwind directives + custom theme
│  │
│  ├─ components/
│  │  ├─ ChatWidget.tsx             # Quality Assistant chat interface
│  │  └─ manufacturer/
│  │     ├─ ManufacturerLayout.tsx          # Main layout with nav and filters
│  │     ├─ ManufacturerKPISection.tsx      # Dashboard KPI cards
│  │     ├─ DefectByModelTable.tsx          # Model defect overview table
│  │     ├─ DefectByLocationTable.tsx       # Plant defect overview table
│  │     ├─ DefectTypesTable.tsx            # Defect categories breakdown
│  │     └─ RCACAPADetailPanel.tsx          # RCA/CAPA detail view
│  │
│  ├─ hooks/manufacturer/
│  │  ├─ useManufacturingOverview.ts        # Dashboard data
│  │  ├─ useManufacturingModels.ts          # Models list
│  │  ├─ useManufacturingModelDefects.ts    # Model detail with RCA/CAPA
│  │  ├─ useManufacturingLocations.ts       # Plants list
│  │  └─ useManufacturingLocationDefects.ts # Plant detail
│  │
│  ├─ lib/
│  │  ├─ manufacturerApi.ts         # Mock data API (replace with real endpoints)
│  │  ├─ queryClient.ts             # TanStack Query configuration
│  │  └─ types/index.ts             # TypeScript interfaces and types
│  │
│  └─ routes/manufacturer/
│     ├─ ManufacturerRoutes.tsx             # Route definitions
│     ├─ ManufacturerDashboardPage.tsx      # Dashboard page
│     ├─ ManufacturerModelsPage.tsx         # Models list page
│     ├─ ManufacturerModelDetailPage.tsx    # Model RCA/CAPA detail
│     ├─ ManufacturerLocationsPage.tsx      # Plants list page
│     └─ ManufacturerLocationDetailPage.tsx # Plant detail
│
├─ public/                          # Static assets
├─ index.html                       # HTML entry point
├─ package.json                     # Dependencies and scripts
├─ tailwind.config.js               # Tailwind theme customization
├─ tsconfig.json                    # TypeScript configuration
└─ vite.config.ts                   # Vite build configuration
```

### Key Component Responsibilities

**ManufacturerLayout**
- Navigation bar with active route highlighting
- Time range and region filters
- Responsive mobile menu
- Chat widget integration

**RCACAPADetailPanel**
- Displays root cause analysis with AI confidence scores
- Workshop CAPA vs Manufacturing CAPA comparison
- CAPA status badges (Proposed/Accepted/In Progress/Implemented)
- Impact estimates and assignment tracking

**DefectByModelTable / DefectByLocationTable**
- Sortable, interactive tables
- Trend indicators (increasing/decreasing/stable)
- Click-through navigation to detail pages
- Compact and full view modes

## 🔌 API Integration

### Current State: Mock Data
All data is generated locally in `src/lib/manufacturerApi.ts` with:
- Realistic random data generation
- Simulated network latency (300-800ms)
- Consistent patterns for demos

### Backend Integration Roadmap

When integrating with the real backend, update these endpoints:

#### Manufacturing Overview
```typescript
GET /api/manufacturing/overview?timeRange=30days&region=All
Response: {
  period: string
  modelsWithRisingDefects: Array<ModelTrendSummary>
  topDefectCategories: Array<DefectCategorySummary>
  capaStatus: { proposed, accepted, inProgress, implemented }
  totalDefects: number
  resolvedThisMonth: number
  avgResolutionTime: number
}
```

#### Model Performance
```typescript
GET /api/manufacturing/models
Response: Array<ManufacturingModelSummary>

GET /api/manufacturing/model/:modelId/defects
Response: {
  modelId, modelName
  defectTypes: Array<{
    defectId, defect, incidents, regions, trend
    rca: string              # AI-generated root cause
    rcaConfidence: number    # 0-1
    capaItems: Array<{
      id, type, action, status, estimatedImpact
      assignedTo, dueDate, aiConfidence?
    }>
    rootCauseDetails?: string
    impactedComponents?: string[]
  }>
}
```

#### Plant/Location Data
```typescript
GET /api/manufacturing/locations
Response: Array<ManufacturingLocationSummary>

GET /api/manufacturing/location/:locId/defects
Response: {
  locId, name, region
  defectsByModel: Array<ModelDefectSummary>
  capaStatus: Array<CAPAStatusItem>
}
```

#### Quality Assistant Chat
```typescript
POST /api/manufacturing/chat
Body: {
  message: string
  context?: { modelId?, locId?, timeRange?, region? }
}
Response: {
  message: string
  timestamp: string
}
```

### Migration Steps
1. Create `src/lib/httpClient.ts` with axios instance
2. Add base URL from environment variables
3. Replace mock functions in `manufacturerApi.ts` with real API calls
4. Update error handling in React Query hooks
5. Add authentication headers if required

## 🎨 Design Tokens (Tailwind Theme)

Custom color palette defined in `tailwind.config.js`:

```javascript
colors: {
  'mfg-black': '#0A0E1A',
  'mfg-dark-gray': '#141824',
  'mfg-medium-gray': '#1E2433',
  'mfg-light-gray': '#2A3142',
  'mfg-border': '#3A4157',
  'mfg-text-muted': '#8B92B0',
  'mfg-text-secondary': '#B4BAD3',
  'mfg-emerald-400': '#34D399',
  'mfg-cyan-400': '#22D3EE',
  'mfg-amber-400': '#FBBF24',
  'mfg-coral-400': '#FB7185',
  'mfg-purple-400': '#C084FC'
}
```

### Semantic Usage
- **Emerald/Cyan** - Positive trends, implemented CAPA, decreasing defects
- **Amber** - Warnings, pending actions, moderate severity
- **Coral** - Critical issues, rising trends, high severity
- **Purple** - AI-driven insights, manufacturing CAPA recommendations

## 🚢 Deployment

### Build for Production
```bash
npm run build
```
Output: `dist/` directory with optimized static files

### Hosting Options
- **Vercel/Netlify** - Zero-config deployment from Git
- **AWS S3 + CloudFront** - Traditional static hosting
- **Docker** - Serve with nginx (see example below)

### Docker Example
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Subpath Deployment
If hosting under a subpath (e.g., `/manufacturer`):
1. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/manufacturer/',
  // ...
})
```
2. Update router basename in `App.tsx` if needed

## 🧪 Demo Scenario

The Manufacturer Portal demonstrates this workflow:

1. **Dashboard** shows Aurora EV model with rising brake defects (+23%)
2. Click into **Model Detail** for Aurora EV to see:
   - Brake Pad Wear defect with 45 incidents
   - AI-generated RCA: thermal stress degradation during high-temp cycles (89% confidence)
   - Workshop CAPA: enhanced inspection protocol
   - Manufacturing CAPA: update tolerances, add quality gate (AI-suggested)
3. **Quality Assistant** answers:
   - "What are the primary root causes of brake issues on Aurora EV?"
   - "Which CAPA actions are pending for the Detroit plant?"
4. **Location View** compares plants:
   - Detroit Assembly shows highest brake defect cluster
   - Links to supplier quality audit recommendation

This narrative connects with:
- **Customer Portal** - customer sees brake warning, books service
- **OEM Portal** - OEM sees increased Aurora EV service demand forecast

## 📊 Current Status & Roadmap

### ✅ Completed
- [x] Full UI implementation with mock data
- [x] All routes and page components
- [x] RCA/CAPA detail panel with AI confidence indicators
- [x] Interactive tables with sorting and filtering
- [x] Quality Assistant chat widget
- [x] Responsive design (mobile, tablet, desktop)
- [x] Framer Motion animations and transitions
- [x] Custom Tailwind theme with glassmorphism

### 🔄 Next Steps
- [ ] Backend API integration (replace mock data)
- [ ] Authentication and role-based access
- [ ] Real-time updates via WebSockets/polling
- [ ] Advanced filtering and search
- [ ] Data export (CSV/PDF reports)
- [ ] CAPA workflow management (status updates, assignments)
- [ ] Chart visualizations (defect trends over time)
- [ ] Persistent user preferences

## 🤝 Contributing

This is a hackathon project for **EY Techathon 6** by Team Hacksters.

### Development Guidelines
- Follow TypeScript strict mode
- Use functional components with hooks
- Maintain component modularity
- Keep API logic in `lib/manufacturerApi.ts`
- Use TanStack Query for all data fetching
- Follow existing naming conventions

## 📄 License

This project is developed for educational purposes as part of EY Techathon 6.

## 👥 Team

**Team Hacksters** - EY Techathon 6

## 🙏 Acknowledgments

- Built with modern React ecosystem
- Inspired by automotive quality management best practices
- Part of the Agentic AI Predictive Maintenance Platform

---

**Ready for demo! 🎉** For questions or integration support, refer to the Frontend Roadmap document.
