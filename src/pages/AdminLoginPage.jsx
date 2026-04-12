import { useAdmin } from '../context/AdminContext';
import { useState } from 'react';

export default function AdminLoginPage() {
  const { adminLogin } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await adminLogin(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <div className="admin-logo">👨‍💼</div>
            <div className="admin-title">Samrat Solar</div>
            <div className="admin-subtitle">Admin Panel</div>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <div className="admin-form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@samratsolar.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="admin-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <button 
            className="admin-login-btn" 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? '🔄 Signing In...' : '🔐 Sign In'}
          </button>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(199, 0, 57, 0.2)', textAlign: 'center' }}>
            <a href="/" style={{
              color: '#c70039',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }} onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>
              ← Back to User Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
