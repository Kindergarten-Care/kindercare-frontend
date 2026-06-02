"use client";

import React, { useState } from 'react';

export default function LoginPage() {
  const [role, setRole] = useState('teacher');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect
    if (role === 'teacher') {
      window.location.href = '/teacher';
    } else if (role === 'principal') {
      window.location.href = '/principal';
    } else if (role === 'admin') {
      window.location.href = '/admin';
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f9' }}>
      <div style={{ padding: '2rem', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', color: '#334155', marginBottom: '1.5rem' }}>Đăng nhập Hệ thống</h1>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Email</label>
            <input type="email" placeholder="Email của bạn" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Mật khẩu</label>
            <input type="password" placeholder="Mật khẩu" style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569' }}>Đăng nhập với vai trò (Demo)</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
              <option value="teacher">Giáo viên</option>
              <option value="principal">Hiệu trưởng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          <button type="submit" style={{ marginTop: '1rem', padding: '0.75rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
