---
trigger: always_on
---

# Next.js App Router: Universal Master Architecture & Coding Standard

This document establishes the mandatory directory architecture and coding standards, modeled after a high-scale production architecture (Clean Architecture).

---

## 1. Directory Architecture Map

### A. Presentation Layer (UI & Routing)
- **`src/app/`**: Next.js App Router core (Routing, Layouts, Server Components).
- **`src/views/`**: Feature-specific UI assemblies. Contains `components/`, `hooks.ts`, and `styles.ts`.
- **`src/UIKit/`**: Pure UI atoms (Button, Box, Modal). No business logic allowed.
- **`src/layout/`**: Shared global components like TopBar, Footer, and Navigation Menus.
- **`src/svgs/`**: Centralized icon management and SVG components.

### B. Logic & Data Layer
- **`src/services/`**: Domain services, API clients, and **Mappers**.
- **`src/state/`**: Global state management (Redux, Zustand, or similar).
- **`src/contexts/`**: React Context providers for localized global state.
- **`src/config/`**: Shared contracts:
  - `src/config/types/`: Centralized TypeScript interfaces.
  - `src/config/constants/`: Enums, API paths, and global static values.

### C. Infrastructure & Resources
- **`src/hooks/`**: Globally shared React hooks.
- **`src/utils/`**: Pure, stateless helper functions.
- **`src/resources/`**: Local data files, token lists, and static JSON assets.
- **`src/theme/`**: Design tokens and styling system configuration.
- **`src/api/`**: Core API client configuration (Axios/Fetch instances).

---

## 2. Mandatory Coding Standards

### A. Language & Communication
- **English Only**: All code, naming, and documentation MUST be in English. No other languages are permitted.
- **Self-Documenting Code**: Use descriptive names (e.g., `isAuthenticationRequired`) to minimize the need for comments.

### B. TypeScript Strictness
- **Strict Typing**: Usage of `any` is strictly prohibited. Use proper generics or explicit interfaces.
- **Explicit Returns**: All exported functions and service methods must define an explicit return type.
- **Domain Modeling**: All API data must be mapped to a domain model defined in `src/config/types`.

### C. Framework & Performance
- **Server Components First**: Use Server Components (`src/app`) for data fetching to minimize client-side JS.
- **SSR Safety**: Never use `window` or `document` in code that executes on the server.
- **Hydration Sync**: Use the `isMounted` pattern to prevent hydration mismatches for browser-only features.

### D. Styling (Styled-Components)
- **Token Usage**: Never hardcode colors or spacing. Always use `${props => props.theme...}`.
- **Responsive**: Use array-based responsive props (e.g., `padding={[10, 20]}`).

---

## 3. Naming Conventions

- **React Components**: `PascalCase` (e.g., `HomeBanner.tsx`).
- **Hooks**: `camelCase` with `use` prefix (e.g., `useMatchBreakpoints.ts`).
- **Services/Utils**: `PascalCase` for classes, `camelCase` for instances/functions.
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).

---

## 4. Architectural Data Flow (The "Golden Path")

1.  **Request**: Route is hit in `src/app`.
2.  **Orchestration**: `page.tsx` (Server Component) calls a Domain Service.
3.  **Infrastructure**: Service fetches data -> Passes it through a **Mapper** -> Returns a typed model.
4.  **Composition**: `page.tsx` passes the model to a View in `src/views`.
5.  **Rendering**: The View uses atomic components from `src/UIKit` and layouts from `src/layout` to render the page.
