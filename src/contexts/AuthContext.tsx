import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { loginUser, registerUser, validateToken, validateEmail, validatePassword, validateUsername, validateConfirmPassword } from '../services/auth';

interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  validateForm: (formData: any, isLogin: boolean) => { isValid: boolean; errors: Record<string, string> };
  showLoginModal: () => void;
  hideLoginModal: () => void;
  showRegisterModal: () => void;
  hideRegisterModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    showLoginModal: false,
    showRegisterModal: false
  });

  // 初始化时检查本地存储的token
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          const response = await validateToken(token);
          if (response.success && response.user) {
            setAuthState(prev => ({
              ...prev,
              user: response.user || null,
              token: token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            }));
          } else {
            localStorage.removeItem('auth_token');
            setAuthState(prev => ({
              ...prev,
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null
            }));
          }
        } catch (error) {
          localStorage.removeItem('auth_token');
          setAuthState(prev => ({
            ...prev,
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: '认证失败'
          }));
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await loginUser(credentials);
      
      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token);
        setAuthState(prev => ({
          ...prev,
          user: response.user || null,
          token: response.token || null,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }));
        return true;
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || '登录失败'
        }));
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: '网络错误，请稍后重试'
      }));
      return false;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await registerUser(credentials);
      
      if (response.success && response.user && response.token) {
        localStorage.setItem('auth_token', response.token);
        setAuthState(prev => ({
          ...prev,
          user: response.user || null,
          token: response.token || null,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }));
        return true;
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || '注册失败'
        }));
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: '网络错误，请稍后重试'
      }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setAuthState(prev => ({
      ...prev,
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    }));
  };

  const validateForm = (formData: any, isLogin: boolean): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!isLogin) {
      // 注册表单验证
      const usernameError = validateUsername(formData.username || '');
      if (usernameError) errors.username = usernameError;
    }

    const emailError = validateEmail(formData.email || '');
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(formData.password || '');
    if (passwordError) errors.password = passwordError;

    if (!isLogin) {
      const confirmPasswordError = validateConfirmPassword(formData.password || '', formData.confirmPassword || '');
      if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  // 模态框控制函数
  const showLoginModal = () => {
    setAuthState(prev => ({ ...prev, showLoginModal: true, showRegisterModal: false }));
  };

  const hideLoginModal = () => {
    setAuthState(prev => ({ ...prev, showLoginModal: false }));
  };

  const showRegisterModal = () => {
    setAuthState(prev => ({ ...prev, showRegisterModal: true, showLoginModal: false }));
  };

  const hideRegisterModal = () => {
    setAuthState(prev => ({ ...prev, showRegisterModal: false }));
  };

  const value: AuthContextType = {
    authState,
    login,
    register,
    logout,
    validateForm,
    showLoginModal,
    hideLoginModal,
    showRegisterModal,
    hideRegisterModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};