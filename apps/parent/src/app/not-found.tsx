export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'linear-gradient(160deg, #EFF6F1 0%, #F7FBF8 60%, #FFFFFF 100%)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          textAlign: 'center',
          background: '#FFFFFF',
          border: '1px solid #E6EEE9',
          borderRadius: 24,
          padding: '48px 36px',
          boxShadow: '0 18px 48px -12px rgba(0, 90, 54, 0.16), 0 6px 16px -6px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            margin: '0 auto 24px',
            borderRadius: 24,
            background: '#E6F3ED',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://media.kindercare.app/KinderCare%20Logo/KinderCare_MainLogo.png"
            alt="KinderCare"
            style={{ width: 52, height: 52, objectFit: 'contain' }}
          />
        </div>

        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.06em',
            color: '#005A36',
            marginBottom: 8,
          }}
        >
          LỖI 404
        </div>

        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#1F2937',
            margin: '0 0 12px',
          }}
        >
          Trang này không tồn tại
        </h1>

        <p
          style={{
            fontSize: 14.5,
            lineHeight: 1.6,
            color: '#6B7280',
            margin: '0 0 32px',
          }}
        >
          Đường dẫn bạn truy cập có thể đã bị thay đổi, xóa bỏ, hoặc chưa từng
          tồn tại. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
        </p>

        <a
          href="/dashboard"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            padding: '13px 20px',
            borderRadius: 12,
            background: '#005A36',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 14.5,
            textDecoration: 'none',
            boxShadow: '0 8px 18px -7px rgba(0, 90, 54, 0.5)',
          }}
        >
          Về trang tổng quan
        </a>
      </div>
    </div>
  );
}
