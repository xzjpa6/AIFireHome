import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';
import AppleButton from './AppleButton';



const LoginModal: React.FC = () => {
  const { login, authState, validateForm, hideLoginModal, showRegisterModal } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authState.showLoginModal) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    const validation = validateForm(formData, true);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await login(formData);
      if (success) {
        hideLoginModal();
        // 重置表单
        setFormData({ email: '', password: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      hideLoginModal();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>登录</h2>
          <button className="modal-close" onClick={hideLoginModal}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">邮箱地址</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="请输入邮箱地址"
              className={errors.email ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="请输入密码"
              className={errors.password ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {authState.error && (
            <div className="auth-error">
              {authState.error}
            </div>
          )}

          <AppleButton
            type="submit"
            variant="primary"
            className="auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '登录中...' : '登录'}
          </AppleButton>

          <AppleButton
            type="button"
            variant="secondary"
            className="auth-demo"
            onClick={() => {
              setFormData({ email: 'demo@example.com', password: 'demo123' });
              // 自动触发登录
              setTimeout(() => {
                const form = document.querySelector('.auth-form') as HTMLFormElement;
                if (form) {
                  const event = new Event('submit', { bubbles: true, cancelable: true });
                  form.dispatchEvent(event);
                }
              }, 100);
            }}
            disabled={isSubmitting}
          >
            体验账户一键登录
          </AppleButton>

          <div className="auth-links">
            <a href="#forgot-password" className="auth-link">忘记密码？</a>
            <span className="auth-switch">
              还没有账号？
              <button
                type="button"
                className="auth-switch-button"
                onClick={() => {
                  hideLoginModal();
                  showRegisterModal();
                }}
                disabled={isSubmitting}
              >
                立即注册
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;