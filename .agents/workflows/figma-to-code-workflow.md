# Figma to Code: Agent Skill & Workflow Specification

This document defines the mandatory workflow for agents using the Figma MCP to implement UI in the KinderCare project. It ensures alignment with the project's Clean Architecture and strict coding standards.

## 1. Analysis Phase
- **Tool**: `mcp_figma_get_figma_data`
- **Action**: Fetch detailed JSON information of the specified Figma Node ID.
- **Requirement**: Identify Design Tokens (Colors, Typography, Spacing, Shadows) and verify them against `src/theme`. 
  - If a token is missing, the agent MUST propose a theme update in `src/theme` before proceeding with UI code.
  - No hardcoded hex codes or pixel values are allowed in components.

## 2. Directory & Component Mapping
Agents MUST categorize UI elements from Figma into the correct architectural layers as defined in `PROJECT_STANDARD.md`:

| Figma Element Type | Project Directory | Notes |
| :--- | :--- | :--- |
| **Atomic UI** (Button, Input, Badge) | `src/UIKit/` | Pure UI atoms. No business logic. |
| **Global Layout** (TopBar, Sidebar) | `src/layout/` | Shared structural components. |
| **Feature UI** (Complex sections) | `src/views/{Feature}/components/` | Specific to a domain feature. |
| **Icons / Vectors** | `src/svgs/` | Exported as optimized React SVG components. |
| **Assets / Images** | `public/images/` | Static images downloaded via MCP. |
| **Context Providers** | `src/contexts/` | Global state logic (e.g., Toast, Auth). |
| **Domain Logic** | `src/services/` | Data mappers and API integration. |
| **Types / Interfaces** | `src/config/types/` | Centralized TypeScript definitions. |

## 3. Implementation Workflow (The Golden Path)
Strictly follow these steps to ensure architectural integrity:

1.  **Step 1: Resource Initialization**: Use `mcp_figma_download_figma_images` to fetch assets. Place icons in `src/svgs` and images in `public/images`.
2.  **Step 2: Domain Modeling**: Create required interfaces in `src/config/types` based on the data structures seen in Figma.
3.  **Step 3: Atomic Building**: Build or update missing atomic components in `src/UIKit`.
4.  **Step 4: Logic Layer**: If the UI requires global state, implement it in `src/contexts`. For API interactions, use `src/services`.
5.  **Step 5: View Assembly**: 
    - Create the feature view in `src/views/{FeatureName}/`.
    - Use `styles.ts` for Styled-Components.
    - Use `hooks.ts` for localized logic.
    - Use `index.tsx` for the main assembly.
6.  **Step 6: Page Integration**: Import the final View into a `page.tsx` within `src/app/` (Server Component).

## 4. Mandatory Coding Standards
- **Language**: 100% English for naming, comments, and documentation.
- **Styling**: Use `styled-components` with theme tokens: `${props => props.theme.colors.primary}`.
- **Responsive**: Use array-based props for spacing/layout: `padding={[12, 24, 32]}`.
- **TypeScript**: `any` is strictly prohibited. Use explicit interfaces or generics.
- **Naming Conventions**:
  - `PascalCase` for Components (e.g., `PrimaryButton.tsx`).
  - `camelCase` for Hooks (e.g., `useAuth.ts`).
  - `UPPER_SNAKE_CASE` for Constants.
- **Hydration Safety**: Use the `isMounted` pattern for any browser-only APIs.

## 5. Verification
- Validate the UI against Figma using the browser tool if possible.
- Ensure all logic is mapped through `src/services` (No direct API calls in Views).
- Check that all exported functions have explicit return types.
