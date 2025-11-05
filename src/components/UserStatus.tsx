import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AppleButton from './AppleButton';

const UserStatus: React.FC = () => {
  const { authState, logout, showLoginModal } = useAuth();

  if (authState.isAuthenticated && authState.user) {
    const email = authState.user.email;
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
            {email.charAt(0).toUpperCase()}
          </div>
          <div className="text-sm">
            <div className="font-medium">{email}</div>
          </div>
        </div>
        <AppleButton
          onClick={logout}
          variant="secondary"
          className="text-sm"
        >
          退出
        </AppleButton>
      </div>
    );
  }

  return (
    <AppleButton
      onClick={showLoginModal}
      variant="primary"
      className="text-sm"
    >
      登录
    </AppleButton>
  );
};

export default UserStatus;