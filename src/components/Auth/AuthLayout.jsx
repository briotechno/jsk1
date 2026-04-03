import { Outlet, useLocation, Link } from 'react-router-dom';
import { FaHeadphones, FaFacebookF, FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '../../assets/logo.png';

export default function AuthLayout() {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-[40px] px-4 font-sans relative overflow-hidden" style={{ background: 'linear-gradient(#0088cc, #035273)' }}>
      
      {/* Background layer */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(#0088cc, #035273)' }}></div>

      {/* Main Content Area */}
      <div className="z-10 w-full mb-16" style={{ width: '350px', maxWidth: '100%' }}>
        <div className="flex justify-center mb-[15px]">
          <Link to="/">
            <img src={logo} alt="JSK1 Logo" className="h-[90px] object-contain cursor-pointer transition-transform hover:scale-105" />
          </Link>
        </div>
        
        <div className="bg-white text-black w-full p-[20px] relative" style={{ borderRadius: '4px', boxShadow: '0 0 5px 0 rgba(255,255,255,1)' }}>
          <Outlet />
        </div>
      </div>

      {/* Footer - Hides on Register Page */}
      {!isRegisterPage && (
        <footer className="fixed bottom-0 left-0 w-full border-t border-[#0d74b8] flex items-center justify-between px-4 py-3 z-20" style={{ background: 'linear-gradient(#0088cc, #035273)' }}>
          {/* Left Side: Support Icon & Links */}
          <div className="flex items-center gap-4 text-[13px] font-bold text-white relative">
            {/* Support Icon */}
            <div className="absolute bottom-[-10px] left-0 bg-[#009bf0] rounded-full p-3 shadow-[0_4px_10px_rgba(0,0,0,0.3)] text-white cursor-pointer hover:bg-blue-500 transition-colors z-30 flex items-center justify-center">
              <FaHeadphones className="w-6 h-6" />
            </div>
            
            <div className="ml-[65px] flex items-center gap-4">
              <span className="cursor-pointer hover:underline">Terms and Conditions</span>
              <span className="cursor-pointer hover:underline">Responsible Gaming</span>
            </div>
          </div>

          {/* Center: Contact Info */}
          <div className="text-center text-white leading-tight font-sans hidden md:block">
            <div className="text-[16px] font-bold">24X7 Support</div>
            <div className="text-[14px]">+573247587074</div>
          </div>

          {/* Right Side: Social Media Icons */}
          <div className="flex items-center gap-2">
            <a href="#" className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90">
              <FaFacebookF className="text-[16px]" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white hover:opacity-90">
              <FaInstagram className="text-[16px]" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center text-white hover:opacity-90">
              <FaTelegramPlane className="text-[16px] -ml-0.5" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:opacity-90">
              <FaXTwitter className="text-[15px]" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90">
              <FaWhatsapp className="text-[18px]" />
            </a>
          </div>
        </footer>
      )}
    </div>
  );
}
