'use client';

import React from 'react';
import styled from 'styled-components';
import type { TechCardKind } from '@/config/types';

const Screen = styled.div<{ $bg?: string }>`
  padding: 0.8rem 0.7rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: ${({ $bg }) => $bg ?? 'transparent'};
`;

const Bar = styled.div<{ $width?: string; $color?: string }>`
  height: 6px;
  border-radius: 4px;
  background: ${({ $color }) => $color ?? 'rgba(255,255,255,.15)'};
  width: ${({ $width }) => $width ?? '100%'};
`;

const Block = styled.div<{ $h?: number; $color?: string }>`
  height: ${({ $h }) => $h ?? 32}px;
  border-radius: 6px;
  background: ${({ $color }) => $color ?? 'rgba(255,255,255,.08)'};
`;

const Avatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(90, 158, 68, 0.4);
  margin-bottom: 0.3rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  margin: 0.15rem 0;
`;

const Dot = styled.span<{ $color?: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color ?? 'rgba(90,158,68,.6)'};
`;

const Badge = styled.div<{ $color?: string }>`
  height: 14px;
  border-radius: 20px;
  width: 36px;
  background: ${({ $color }) => $color ?? 'rgba(196,136,10,.4)'};
`;

function DashboardMock(): React.ReactElement {
  return (
    <Screen>
      <Avatar />
      <Bar $width="60%" $color="rgba(90,158,68,.5)" />
      <Bar $width="40%" />
      <Block $color="rgba(45,106,34,.5)" />
      <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.4rem' }}>
        <Badge />
        <Badge $color="rgba(45,106,34,.3)" />
        <Badge $color="rgba(45,106,34,.2)" />
      </div>
      <Block />
      <Block $h={22} />
      <Row>
        <Dot />
        <Bar />
      </Row>
      <Row>
        <Dot $color="rgba(196,136,10,.6)" />
        <Bar $width="40%" />
      </Row>
      <Row>
        <Dot />
        <Bar $width="30%" />
      </Row>
    </Screen>
  );
}

function CameraMock(): React.ReactElement {
  return (
    <Screen $bg="#0d1a0a">
      <div
        style={{
          background: '#1a2e14',
          borderRadius: '6px',
          height: '110px',
          marginBottom: '0.4rem',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid rgba(90,158,68,.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(90,158,68,.6)',
            }}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '4px',
            left: '6px',
            fontSize: '7px',
            color: 'rgba(255,255,255,.4)',
            fontFamily: 'monospace',
          }}
        >
          CAM 01
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            right: '6px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#f87171',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.3rem' }}>
        <Block $h={22} $color="rgba(45,106,34,.4)" />
        <Block $h={22} $color="rgba(255,255,255,.07)" />
        <Block $h={22} $color="rgba(255,255,255,.07)" />
      </div>
      <Bar $color="rgba(255,255,255,.1)" />
      <Bar $width="40%" $color="rgba(255,255,255,.08)" />
    </Screen>
  );
}

function MenuMock(): React.ReactElement {
  return (
    <Screen>
      <Bar $width="60%" $color="rgba(90,158,68,.5)" />
      <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.4rem' }}>
        <div style={{ flex: 1, height: '14px', borderRadius: '10px', background: 'rgba(45,106,34,.5)' }} />
        <div style={{ flex: 1, height: '14px', borderRadius: '10px', background: 'rgba(255,255,255,.1)' }} />
        <div style={{ flex: 1, height: '14px', borderRadius: '10px', background: 'rgba(255,255,255,.1)' }} />
        <div style={{ flex: 1, height: '14px', borderRadius: '10px', background: 'rgba(255,255,255,.1)' }} />
        <div style={{ flex: 1, height: '14px', borderRadius: '10px', background: 'rgba(255,255,255,.1)' }} />
      </div>
      <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {[
          { sq: 'rgba(196,136,10,.4)', bar: 'rgba(255,255,255,.15)' },
          { sq: 'rgba(45,106,34,.4)', bar: 'rgba(255,255,255,.12)' },
          { sq: 'rgba(90,158,68,.3)', bar: 'rgba(255,255,255,.1)' },
        ].map((row, idx) => (
          <div key={idx} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: row.sq, flexShrink: 0 }} />
            <div style={{ flex: 1, height: '6px', borderRadius: '4px', background: row.bar }} />
          </div>
        ))}
      </div>
      <Block $h={40} />
    </Screen>
  );
}

function PaymentsMock(): React.ReactElement {
  return (
    <Screen>
      <div style={{ background: 'rgba(196,136,10,.3)', borderRadius: '8px', padding: '0.5rem', marginBottom: '0.4rem' }}>
        <Bar $width="50%" $color="rgba(255,255,255,.3)" />
        <div style={{ height: '4px' }} />
        <Bar $width="40%" $color="rgba(255,255,255,.2)" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.3rem' }}>
        {[
          { w: '50%', amount: 'rgba(90,158,68,.5)' },
          { w: '40%', amount: 'rgba(196,136,10,.5)' },
          { w: '45%', amount: 'rgba(90,158,68,.4)' },
        ].map((row, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.3rem 0',
              borderBottom: idx < 2 ? '1px solid rgba(255,255,255,.07)' : 'none',
            }}
          >
            <div style={{ width: row.w, height: '6px', borderRadius: '4px', background: 'rgba(255,255,255,.13)' }} />
            <div style={{ width: '20%', height: '6px', borderRadius: '4px', background: row.amount }} />
          </div>
        ))}
      </div>
      <Block $h={26} $color="rgba(45,106,34,.5)" />
    </Screen>
  );
}

function ProgressMock(): React.ReactElement {
  return (
    <Screen>
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '3px solid rgba(90,158,68,.5)',
          margin: '0.4rem auto',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.2rem' }}>
        {[
          { label: '35%', valColor: 'rgba(90,158,68,.5)', fill: '85%', color: 'rgba(90,158,68,.5)' },
          { label: '40%', valColor: 'rgba(90,158,68,.5)', fill: '90%', color: 'rgba(90,158,68,.5)' },
          { label: '30%', valColor: 'rgba(196,136,10,.5)', fill: '78%', color: 'rgba(196,136,10,.4)' },
        ].map((row, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.15rem' }}>
              <div style={{ width: row.label, height: '5px', borderRadius: '4px', background: 'rgba(255,255,255,.2)' }} />
              <div style={{ width: '12%', height: '5px', borderRadius: '4px', background: row.valColor }} />
            </div>
            <div style={{ height: '5px', borderRadius: '4px', background: 'rgba(255,255,255,.08)' }}>
              <div style={{ width: row.fill, height: '100%', borderRadius: '4px', background: row.color }} />
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

const mockMap: Record<TechCardKind['mockKind'], () => React.ReactElement> = {
  dashboard: DashboardMock,
  camera: CameraMock,
  menu: MenuMock,
  payments: PaymentsMock,
  progress: ProgressMock,
};

interface TechMockProps {
  kind: TechCardKind['mockKind'];
}

export function TechMock({ kind }: TechMockProps): React.ReactElement {
  const Component = mockMap[kind];
  return <Component />;
}
