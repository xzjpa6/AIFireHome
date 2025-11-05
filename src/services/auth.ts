import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

// 模拟后端API调用

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    username: 'demo_user',
    password: 'demo123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// 登录API
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await delay(1000); // 模拟网络延迟
  
  const user = mockUsers.find(u => u.email === credentials.email);
  
  if (!user) {
    return {
      success: false,
      message: '用户不存在'
    };
  }
  
  if (user.password !== credentials.password) {
    return {
      success: false,
      message: '密码错误'
    };
  }
  
  // 生成模拟token
  const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
  
  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    },
    token
  };
};

// 注册API
export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  await delay(1200); // 模拟网络延迟
  
  // 检查邮箱是否已存在
  const existingUser = mockUsers.find(u => u.email === credentials.email);
  if (existingUser) {
    return {
      success: false,
      message: '该邮箱已被注册'
    };
  }
  
  // 检查用户名是否已存在
  const existingUsername = mockUsers.find(u => u.username === credentials.username);
  if (existingUsername) {
    return {
      success: false,
      message: '用户名已被使用'
    };
  }
  
  // 创建新用户
  const newUser = {
    id: String(mockUsers.length + 1),
    email: credentials.email,
    username: credentials.username,
    password: credentials.password,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.username}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  
  // 生成模拟token
  const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));
  
  return {
    success: true,
    user: {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    },
    token
  };
};

// 验证token
export const validateToken = async (token: string): Promise<AuthResponse> => {
  await delay(500);
  
  try {
    const decoded = JSON.parse(atob(token));
    const user = mockUsers.find(u => u.id === decoded.userId);
    
    if (!user) {
      return {
        success: false,
        message: 'Token无效'
      };
    }
    
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    };
  } catch (error) {
    return {
      success: false,
      message: 'Token格式错误'
    };
  }
};

// 表单验证函数
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return '请输入邮箱地址';
  if (!emailRegex.test(email)) return '请输入有效的邮箱地址';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return '请输入密码';
  if (password.length < 6) return '密码长度至少为6位';
  if (password.length > 20) return '密码长度不能超过20位';
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return '请输入用户名';
  if (username.length < 3) return '用户名长度至少为3位';
  if (username.length > 20) return '用户名长度不能超过20位';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return '用户名只能包含字母、数字和下划线';
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return '请确认密码';
  if (password !== confirmPassword) return '两次输入的密码不一致';
  return null;
};