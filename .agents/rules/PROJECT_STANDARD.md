# KinderCare Monorepo: Universal Master Architecture & Coding Standard

This document establishes the mandatory directory architecture and coding standards for the KinderCare Monorepo.

---

## 1. Directory Architecture (Monorepo)

### A. Applications (`apps/`)
Each application corresponds to a specific user role and follows the Next.js App Router structure.
- **`apps/parent/`**: Parent (User) application.
- **`apps/teacher/`**: Teacher application.
- **`apps/principal/`**: Principal application.
- **`apps/admin/`**: Admin/Management application.

### B. Shared Packages (`packages/`)
Code shared across multiple applications.
- **`@kindercare/ui`**: Pure UI atoms (UIKit), Design Tokens (Theme), and SVGs.
- **`@kindercare/core`**: Domain services, API clients, Mappers, Types, Constants, and Utils.
- **`@kindercare/config`**: Shared configurations (ESLint, TSConfig).

---

## 2. Component Architecture (Per App)

### A. Presentation Layer
- **`src/app/`**: Next.js App Router core (Routing, Layouts, Server Components).
- **`src/views/`**: Feature-specific UI assemblies. Contains `components/`, `hooks.ts`, and `styles.ts`.
- **`src/layout/`**: App-specific shared global components (TopBar, Navigation).

### B. Logic & Data Layer
- **`src/state/`**: Global state management (Zustand/Redux).
- **`src/contexts/`**: React Context providers for localized state.
- **`src/hooks/`**: App-specific React hooks.

---

## 3. Mandatory Coding Standards

### A. Language & Communication
- **English Only**: All code, naming, and documentation MUST be in English.
- **Self-Documenting Code**: Use descriptive names (e.g., `isAuthenticationRequired`).

### B. TypeScript Strictness
- **Strict Typing**: Usage of `any` is strictly prohibited.
- **Explicit Returns**: All exported functions and service methods must define an explicit return type.
- **Shared Types**: Use types from `@kindercare/core` whenever possible.

### C. Styling (Styled-Components)
- **Design Tokens**: Never hardcode colors or spacing. Use `${props => props.theme...}` from `@kindercare/ui`.
- **Responsive**: Use array-based responsive props (e.g., `padding={[10, 20]}`).

### D. Framework & Performance
- **Server Components First**: Use Server Components for data fetching.
- **Turborepo**: Use `yarn dev` from root to start all apps, or `yarn workspace @kindercare/<app> dev`.

---

## 4. Architectural Data Flow (The "Golden Path")

1.  **Request**: Route is hit in `apps/<role>/src/app`.
2.  **Orchestration**: `page.tsx` calls a Domain Service from `@kindercare/core`.
3.  **Infrastructure**: Service fetches data -> Passes it through a **Mapper** -> Returns a typed model.
4.  **Composition**: `page.tsx` passes the model to a View in `src/views`.
5.  **Rendering**: The View uses atomic components from `@kindercare/ui`.

---

## 5. Naming Conventions

- **Folder Names**:
  - First-level directories directly under `src/` (e.g., `src/views`, `src/services`, `src/hooks`, `src/contexts`) must be written in lowercase (e.g., `views`, `services`, `hooks`).
  - Subfolders within these directories (e.g., `src/views/ParentDashboard`, `src/services/Student`) must follow `PascalCase` (e.g., `SampleFolderName`), capitalizing the first letter of each word.
  - **Utils Folder Structure**: Under `src/utils/`, organize files by domain/topic into subfolders (e.g., `src/utils/Student/`). Within each domain subfolder, name utility files after their specific functionality (e.g., `Avatar.ts`, `Date.ts`).
- **React Components**: `PascalCase` (e.g., `HomeBanner.tsx`).
- **Hooks**: `camelCase` with `use` prefix (e.g., `useMatchBreakpoints.ts`).
- **Services/Utils**: `PascalCase` for classes, `camelCase` for instances/functions.
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).

---

## 6. Deployment & CI/CD

- **Matrix Build**: Each app is built into a separate Docker image in parallel.
- **Port Mapping (Prod)**:
  - Parent: 3000
  - Teacher: 3001
  - Principal: 3002
  - Admin: 3003
