export default function LandingPage() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1>KinderCare Landing Page</h1>
      <p>Chào mừng bạn đến với hệ thống quản lý mầm non toàn diện.</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <a href="https://parent.kindercare.app" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', border: '1px solid white', borderRadius: '5px' }}>Phụ huynh</a>
        <a href="https://teacher.kindercare.app" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', border: '1px solid white', borderRadius: '5px' }}>Giáo viên</a>
        <a href="https://admin.kindercare.app" style={{ color: 'white', textDecoration: 'none', padding: '10px 20px', border: '1px solid white', borderRadius: '5px' }}>Quản trị viên</a>
      </div>
    </div>
  );
}
