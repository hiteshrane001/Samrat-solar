import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const {
    loginEmail, loginPass, loginErr, loginMode,
    registerName, registerPhone,
    setLoginEmail, setLoginPass, setLoginMode,
    setRegisterName, setRegisterPhone,
    login, register
  } = useApp();

  const handleSubmit = () => {
    if (loginMode === 'register') {
      register();
    } else {
      login();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="ll-bg"></div>
        <div className="ll-content">
          <div className="ll-logo">☀️</div>
          <div className="ll-title">India's Premium<br /><span>Solar Solutions</span></div>
          <div className="ll-sub">Configure, order, and track your complete rooftop solar system — all in one place.</div>
          <div className="ll-feat">
            <div className="lf-item"><span className="lf-icon">⚡</span><span className="lf-text">HJT, N-Type TOPCon &amp; PERC Modules</span></div>
            <div className="lf-item"><span className="lf-icon">🛡️</span><span className="lf-text">25–30 Year Product Warranty</span></div>
            <div className="lf-item"><span className="lf-icon">📦</span><span className="lf-text">All-Inclusive BOS Kit with Every Order</span></div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-box">
          <div className="lb-header">
            <div className="lb-logo">☀️</div>
            <div className="lb-brand">Samrat <span>Solar</span></div>
            <div className="lb-tagline">Powering India's Rooftops Since 2014</div>
          </div>
          <div className="login-title">{loginMode === 'register' ? 'Create Account' : 'Sign In'}</div>
          <div className="login-sub">
            {loginMode === 'register'
              ? 'Register to start configuring your solar system'
              : 'Access your solar configurator'}
          </div>

          {loginMode === 'login' && (
            <div className="demo-hint">
              <strong>Demo Credentials</strong><br />
              Email: demo@samratsolar.com<br />
              Password: solar123
            </div>
          )}

          {loginErr && <div className="login-err">⚠ {loginErr}</div>}

          {loginMode === 'register' && (
            <div className="fg" style={{ marginBottom: '12px' }}>
              <label className="fl">Full Name *</label>
              <input className="fi" type="text" placeholder="Rajesh Kumar"
                value={registerName} onChange={(e) => setRegisterName(e.target.value)}
                onKeyDown={handleKeyDown} />
            </div>
          )}

          <div className="fg" style={{ marginBottom: '12px' }}>
            <label className="fl">Email Address *</label>
            <input className="fi" type="email" placeholder="your@email.com"
              value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
              onKeyDown={handleKeyDown} />
          </div>

          <div className="fg" style={{ marginBottom: loginMode === 'register' ? '12px' : '16px' }}>
            <label className="fl">Password *</label>
            <input className="fi" type="password" placeholder="••••••••"
              value={loginPass} onChange={(e) => setLoginPass(e.target.value)}
              onKeyDown={handleKeyDown} />
          </div>

          {loginMode === 'register' && (
            <div className="fg" style={{ marginBottom: '16px' }}>
              <label className="fl">Phone (Optional)</label>
              <input className="fi" type="tel" placeholder="98XXXXXXXX"
                value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)}
                onKeyDown={handleKeyDown} />
            </div>
          )}

          <button className="login-btn" onClick={handleSubmit}>
            {loginMode === 'register' ? 'Create Account →' : 'Sign In →'}
          </button>

          <div className="login-footer">
            {loginMode === 'login' ? (
              <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setLoginMode('register'); }}>Register</a></>
            ) : (
              <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setLoginMode('login'); }}>Sign In</a></>
            )}
          </div>

          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #ddd', textAlign: 'center' }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#c70039',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline',
              fontWeight: '500'
            }} onClick={() => window.location.href = '/?view=admin'}>
              Admin Login →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
