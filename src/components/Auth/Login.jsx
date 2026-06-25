import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaKey, FaHandPointDown } from 'react-icons/fa';
import { authController } from '../../controller';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('login'); // 'login' or 'forgot'
  const [mobile, setMobile] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both Username and Password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await authController.login({ username, password, ip: '127.0.0.1' });
      if (response && (response.error === "0" || response.error === 0)) {
        const token = response.LoginToken || response.apitoken || response.token;
        localStorage.setItem('loginToken', token);
        localStorage.setItem('username', response.username || username);
        
        login({
          loginToken: token,
          username: response.username || username,
          balance: response.balance || '0.00',
          exposure: response.exposure || '0.00'
        });
        
        navigate('/');
      } else {
        setError(response?.msg || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!mobile) {
      setError('Please enter your mobile number.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await authController.forgotPassword(mobile);
      if (response && (response.error === "0" || response.error === 0)) {
        alert(response.msg || 'Instructions sent to your mobile number');
        setView('login');
      } else {
        setError(response?.msg || 'Failed to request password reset');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Heading */}
      <h2 style={{ color: '#008de4', margin: '0 0 20px', fontSize: 26, fontWeight: 600, textAlign: 'center', lineHeight: '1.2' }}
        className="flex items-center justify-center gap-1.5"
      >
        {view === 'login' ? 'Login' : 'Forgot Password'} <FaHandPointDown style={{ fontSize: 20 }} />
      </h2>

      {error && <div className="bg-red-100 text-red-600 p-2 text-[14px] rounded-[3px] mb-4 text-center border border-red-200">{error}</div>}

      {view === 'login' ? (
        <form className="space-y-[16px]" onSubmit={handleLogin}>
          {/* Username */}
          <div className="flex bg-white border border-[#d4d4d4] rounded-[3px] overflow-hidden h-[44px]">
            <input
              type="text"
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-grow px-3 bg-transparent text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none"
            />
            <div className="bg-[#e4e4e4] w-[44px] border-l border-[#d4d4d4] flex items-center justify-center flex-shrink-0">
              <FaUser className="text-[#333] text-[17px]" />
            </div>
          </div>

          {/* Password */}
          <div className="flex bg-white border border-[#d4d4d4] rounded-[3px] overflow-hidden h-[44px]">
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-grow px-3 bg-transparent text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none"
            />
            <div className="bg-[#e4e4e4] w-[44px] border-l border-[#d4d4d4] flex items-center justify-center flex-shrink-0">
              <FaKey className="text-[#333] text-[16px]" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008de4] hover:bg-[#007cc7] text-white font-medium py-[11px] px-4 rounded-[3px] flex items-center justify-center relative transition-colors shadow-sm text-[16px] disabled:opacity-50"
          >
            <span>{loading ? 'Processing...' : 'Login'}</span>
            <div className="absolute right-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </div>
          </button>
        </form>
      ) : (
        <form className="space-y-[16px]" onSubmit={handleForgot}>
          <div className="flex bg-white border border-[#d4d4d4] rounded-[3px] overflow-hidden h-[44px]">
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="flex-grow px-3 bg-transparent text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none"
            />
            <div className="bg-[#e4e4e4] w-[44px] border-l border-[#d4d4d4] flex items-center justify-center flex-shrink-0">
              <FaUser className="text-[#333] text-[17px]" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008de4] hover:bg-[#007cc7] text-white font-medium py-[11px] px-4 rounded-[3px] flex items-center justify-center relative transition-colors shadow-sm text-[16px] disabled:opacity-50"
          >
            <span>{loading ? 'Processing...' : 'Submit'}</span>
          </button>
        </form>
      )}

      <div className="mt-5 text-center text-[15px] font-bold text-black pt-2 flex flex-col items-center w-full">
        {/* Forgot Password */}
        {view === 'login' ? (
          <div className="mb-2 font-normal w-full text-right">
            <button type="button" onClick={() => setView('forgot')} className="text-[14px] text-[#0056b3] hover:underline">Forgot Password?</button>
          </div>
        ) : (
          <div className="mb-2 font-normal w-full text-right">
            <button type="button" onClick={() => setView('login')} className="text-[14px] text-[#0056b3] hover:underline">Back to Login</button>
          </div>
        )}

        {/* Register link */}
        <div className="mb-[10px] text-[15px]">
          Don't have User? <Link to="/register" className="text-[#0056b3] hover:underline font-bold">Register here</Link>
        </div>

        {/* reCAPTCHA */}
        <p className="text-[11px] font-normal text-[#5b5b5b] max-w-[280px] mt-1.5 leading-tight">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="text-[#0056b3] hover:underline">Privacy Policy</a> and{' '}
          <a href="#" className="text-[#0056b3] hover:underline">Terms of Service</a> apply.
        </p>

        {/* Download APK */}
        <div className="mt-3">
          <a href="#" className="flex items-center justify-center gap-1.5 text-[#0056b3] font-[600] text-[14px] hover:underline tracking-wide">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.523 15.341c0 .77-.625 1.395-1.396 1.395-.77 0-1.395-.625-1.395-1.395s.625-1.395 1.395-1.395c.77 0 1.396.625 1.396 1.395zm-6.198-1.395c.77 0 1.395.625 1.395 1.395s-.625 1.395-1.395 1.395-1.395-.625-1.395-1.395.625-1.395 1.395-1.395zm4.95-2.218 1.774-3.081-1.22-.704-1.651 2.865c-.723-.29-1.494-.444-2.288-.444s-1.565.154-2.288.444l-1.651-2.865-1.22.704 1.774 3.081c-.914.457-1.383.76-1.921 1.218-.77 0-1.395.625-1.395 1.395v.001h11.166v-.001c0-.77-.625-1.395-1.396-1.395-.538-.458-1.007-.76-1.921-1.218zm-6.602 9.423v-9.169h11.166v9.169H9.673zm6.048-4.298H14.326V16.108h1.395v1.395zm-6.048 0H8.279V16.108h1.395v1.395z"/>
            </svg>
            Download APK
          </a>
        </div>
      </div>
    </div>
  );
}
