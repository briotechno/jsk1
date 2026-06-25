import React, { useState } from 'react';
import { authController } from '../../controller';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      showToast('All fields are required', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    try {
      setLoading(true);
      const res = await authController.changePassword({
        loginToken: user.loginToken,
        oldpassword: oldPassword,
        newpassword: newPassword
      });

      if (res && res.error === '0') {
        showToast(res.message || 'Password changed successfully', 'success');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast(res?.message || 'Failed to change password', 'error');
      }
    } catch (err) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col mx-1.5 mt-4 overflow-hidden rounded-none shadow-[0_0_5px_#a4a4a4] bg-white min-h-[150px]">
      <div className="bg-[#005a78] text-white px-4 py-2 font-normal text-[20px] flex items-center gap-2 h-[41px]">
        Change Password
      </div>
      
      <div className="p-6">
        <form className="max-w-[400px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[14px] font-bold text-gray-800 mb-1">
              Current Password:
            </label>
            <input
              type="password"
              placeholder="Enter Current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 h-[38px] px-3 outline-none text-[14px] text-gray-700 focus:border-[#0088cc] rounded-none placeholder:text-gray-400 placeholder:italic"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[14px] font-bold text-gray-800 mb-1">
              New Password:
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 h-[38px] px-3 outline-none text-[14px] text-gray-700 focus:border-[#0088cc] rounded-none placeholder:text-gray-400 placeholder:italic"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[14px] font-bold text-gray-800 mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 h-[38px] px-3 outline-none text-[14px] text-gray-700 focus:border-[#0088cc] rounded-none placeholder:text-gray-400 placeholder:italic"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#0088cc] text-white px-6 w-full md:w-auto h-[38px] flex items-center justify-center rounded-none font-semibold text-[14px] transition-colors uppercase whitespace-nowrap ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
