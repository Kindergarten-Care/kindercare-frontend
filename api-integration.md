# API Integration Guide for KinderCare FE

This guide outlines the mandatory architecture, naming conventions, and workflows for integrating new backend (BE) API endpoints into the KinderCare frontend (FE) monorepo.

---

## Architecture Overview

We follow a clean, type-safe Architecture:
1. **API Endpoints**: Configured centrally in the `SERVER` object under `packages/core/src/config/server.ts` (shared across the monorepo).
2. **API DTO and Domain Models**: Defined in `src/config/types/` (for app-specific types) or `packages/core/src/types/` (for shared types).
3. **The 2-File Pattern inside `src/services/<DomainService>/`**:
   - `Mapper.ts`: Pure mapper functions to transform API DTOs into Domain Models.
     - **Timestamps**: API returns Unix epoch seconds/milliseconds. Timestamps in Domain Models must always be converted and stored as `bigint`.
   - `Service.ts` (or `index.ts`): Service class and singleton export invoking the API via `apiClient`.
4. **Context / State Managers**: React Contexts in `src/contexts/` to propagate state across Layouts and Views.

---

## Step-by-Step Workflow

### Step 1: Define the API Endpoint in `SERVER`

Add the new endpoint path to the `SERVER` constant in `packages/core/src/config/server.ts`.

```typescript
// packages/core/src/config/server.ts
export const SERVER = {
  auth: {
    login:   '/auth/login',
    logout:  '/auth/logout',
  },
  parent: {
    getChildren: '/parent/children', // Add your endpoint here
  },
} as const;
```

### Step 2: Define API DTO and Domain Model

Add TypeScript interfaces to `src/config/types/<domain>.ts` or `packages/core/src/types/<domain>.ts`.

```typescript
// Define DTO received from the server
export interface ChildApiDto {
  studentId: number;
  fullName: string;
  dateOfBirth: number; // Unix timestamp in seconds
  admissionDate: number; // Unix timestamp in seconds
  avatarUrl: string | null;
  className: string;
}

// Define the Domain Model used by FE UI
export interface ChildDomainModel {
  studentId: number;
  fullName: string;
  dateOfBirth: bigint; // Date/Time fields MUST be bigint (epoch time)
  admissionDate: bigint; // Date/Time fields MUST be bigint (epoch time)
  avatarUrl: string | null;
  className: string;
}
```

### Step 3: Create the Mapper (`src/services/<DomainService>/Mapper.ts`)

Write pure transform functions or a static mapper class inside the domain folder.

```typescript
// src/services/student/StudentMapper.ts
import { ChildApiDto, ChildDomainModel } from '@/config/types/student';

export class StudentMapper {
  static toDomain(dto: ChildApiDto): ChildDomainModel {
    return {
      studentId: dto.studentId,
      fullName: dto.fullName,
      dateOfBirth: BigInt(dto.dateOfBirth), // seconds -> bigint
      admissionDate: BigInt(dto.admissionDate), // seconds -> bigint
      avatarUrl: dto.avatarUrl,
      className: dto.className,
    };
  }

  static toDomainList(dtos: ChildApiDto[]): ChildDomainModel[] {
    return dtos.map(this.toDomain);
  }
}
```

### Step 4: Create the Service Class (`src/services/<DomainService>/Service.ts`)

Create the service class and export its singleton instance in the same domain folder. Use the central `SERVER` constant path instead of a hardcoded string.

```typescript
// src/services/student/StudentService.ts
import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { ChildApiDto, ChildDomainModel } from '@/config/types/student';
import { StudentMapper } from './StudentMapper';

class StudentService {
  async getChildren(): Promise<ChildDomainModel[]> {
    const { data: res } = await apiClient.get<ApiResponse<ChildApiDto[]>>(SERVER.parent.getChildren);
    if (!res.success) {
      throw new Error(res.message);
    }
    return StudentMapper.toDomainList(res.data);
  }
}

export const studentService = new StudentService();
```

### Step 5: Propagate State via React Context

For shared states (like active child selection in Sidebar & Dashboard), define a context provider in `src/contexts/<Domain>Context.tsx`.

- **Security Note**: Only fire authenticated queries if the user is logged in (`isAuthenticated === true`) to prevent `401 Unauthorized` responses.

```typescript
// src/contexts/StudentContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@kindercare/core';
import { ChildDomainModel } from '@/config/types/student';
import { studentService } from '@/services/student/StudentService';

interface StudentContextValue {
  children: ChildDomainModel[];
  activeStudent: ChildDomainModel | null;
  loading: boolean;
  setActiveStudent: (student: ChildDomainModel) => void;
}

const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [students, setStudents] = useState<ChildDomainModel[]>([]);
  const [activeStudent, setActiveStudent] = useState<ChildDomainModel | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated) {
      setLoading(true);
      studentService.getChildren()
        .then(data => {
          setStudents(data);
          if (data.length > 0) setActiveStudent(data[0]);
        })
        .finally(() => setLoading(false));
    } else {
      setStudents([]);
      setActiveStudent(null);
    }
  }, [isAuthenticated, authLoading]);

  return (
    <StudentContext.Provider value={{ children: students, activeStudent, loading, setActiveStudent }}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudent = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudent must be used inside StudentProvider');
  return ctx;
};
```

### Step 6: Consume in UI Components

Connect components to the context or the service, formatting `bigint` dates to localized format where needed.

```typescript
// src/views/ParentDashboard/index.tsx
import { useStudent } from '@/contexts/StudentContext';

export function ParentDashboard() {
  const { activeStudent } = useStudent();
  
  if (!activeStudent) return <div>Loading...</div>;

  // Convert bigint timestamp (seconds) back to Date and format
  const dobString = new Date(Number(activeStudent.dateOfBirth) * 1000).toLocaleDateString('vi-VN');

  return (
    <div>
      <h1>{activeStudent.fullName}</h1>
      <p>Lớp: {activeStudent.className}</p>
      <p>Ngày sinh: {dobString}</p>
    </div>
  );
}
```

---

## Agent Verification Checklist

Before completing any API integrations:
- [ ] New endpoint path configured in `SERVER` constant inside `packages/core/src/config/server.ts`?
- [ ] DTO & Domain Model interfaces added to `src/config/types/` or `packages/core/src/types/?`
- [ ] Date/time fields in FE Domain Models typed as `bigint` (Unix epoch seconds/milliseconds)?
- [ ] Mapper and Service files contained in a dedicated domain folder under `src/services/<DomainService>/`?
- [ ] Mapper transforms API data, parsing timestamps into `bigint`?
- [ ] Service calls standard `apiClient` instance using `SERVER` path constant?
- [ ] Request handles authentication correctly (only calls API if `isAuthenticated` is true)?
- [ ] React Context provided and wrapped around layout correctly?
- [ ] Pages Router features (`getServerSideProps`/`getStaticProps`) are NOT used (since we are on App Router)?
