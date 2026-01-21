'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Đang xử lý...');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('✅ Thành công! Hãy mở Prisma Studio để cộng tiền.');
      setEmail('');
    } else {
      setMessage(`❌ Lỗi: ${data.error}`);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>ASOS VIETNAM 2026</h1>
      <h3>Tạo tài khoản khách hàng mới</h3>
      <form onSubmit={handleRegister}>
        <input 
          type="email" 
          placeholder="Nhập Email khách hàng..." 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px', background: 'black', color: 'white', cursor: 'pointer' }}>
          Tạo tài khoản ngay
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}