import React from 'react';
import { Sidebar } from '../../layout/Sidebar';
import { TopBar } from '../../layout/TopBar';

export default function SystemOverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, paddingLeft: '280px', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <TopBar />
        <main style={{ flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
