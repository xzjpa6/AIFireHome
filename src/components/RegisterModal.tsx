import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';
import AppleButton from './AppleButton';



const RegisterModal: React.FC = () => {
  const { register, authState, validateForm, hideRegisterModal, showLoginModal } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authState.showRegisterModal) return null;

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
    const validation = validateForm(formData, false);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await register(formData);
      if (success) {
        hideRegisterModal();
        // 重置表单
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        setErrors({});
      }
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      hideRegisterModal();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>注册</h2>
          <button className="modal-close" onClick={hideRegisterModal}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="请输入用户名"
              className={errors.username ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

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
              placeholder="请输入密码（至少6位）"
              className={errors.password ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">确认密码</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="请再次输入密码"
              className={errors.confirmPassword ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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
            {isSubmitting ? '注册中...' : '注册'}
          </AppleButton>

          <div className="auth-links">
            <span className="auth-switch">
              已有账号？
              <button
                type="button"
                className="auth-switch-button"
                onClick={() => {
                  hideRegisterModal();
                  showLoginModal();
                }}
                disabled={isSubmitting}
              >
                立即登录
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;