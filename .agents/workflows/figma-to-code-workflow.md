# Figma to Code: Agent Skill & Workflow Specification

This document defines the mandatory workflow for agents using the Figma MCP to implement UI in the KinderCare project.

## 1. Analysis Phase (Bóc tách dữ liệu)
- **Tool**: `mcp_figma_get_figma_data`
- **Action**: Fetch detailed information of the specified Node ID.
- **Requirement**: Identify Design Tokens (Colors, Typography, Spacing) and map them to `src/theme`. If tokens are missing, propose a theme update first.

## 2. Component Mapping (Phân loại thành phần)
Agents MUST categorize UI elements from Figma into the correct architectural layers:
- **src/UIKit/**: Atomic components used across the project (Button, Input, Typography, Badge, Avatar). NO business logic allowed.
- **src/layout/**: Structural components (TopBar, Sidebar, Footer, Navigation).
- **src/views/{Feature}/components/**: UI components exclusive to a specific feature.
- **src/svgs/**: Export icons from Figma as React components in this directory.

## 3. Implementation Workflow (Quy trình thực thi)
Strictly follow "The Golden Path":
1. **Step 1: Resource Setup**: Download images/icons using `mcp_figma_download_figma_images` into `public/images` or `src/resources`.
2. **Step 2: Type Definition**: Define data interfaces in `src/config/types`.
3. **Step 3: Atomic Building**: Build missing atomic UI in `src/UIKit`.
4. **Step 4: View Assembly**: Build feature UI in `src/views`. Use `styled-components` and responsive array props.
5. **Step 5: Page Integration**: Import the View into `src/app` (Server Component) for rendering.

## 4. Coding Standards (Tiêu chuẩn Code)
- **Styled-Components**: Always use `${props => props.theme...}`.
- **Responsive**: Use array-based props: `padding={[10, 20, 30]}`.
- **Hydration Safe**: Use `isMounted` pattern for client-only components.
- **Strict Typing**: NO usage of `any`. All props must be explicitly typed.
- **Self-Documenting**: Use descriptive names for components and variables.

## 5. Verification (Kiểm tra)
- Run `yarn lint` after generating code.
- Ensure no hardcoded values (colors, font sizes) exist outside of tokens.
