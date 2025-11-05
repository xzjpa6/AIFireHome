# AIFireHome 

AIFireHome一个现代化的AI副业助手平台，帮助用户发现技能、规划副业、识别风险，并提供微信社群支持。

## 🌟 功能特性

### 核心功能模块
- **🏠 首页** - 展示平台核心功能和价值主张
- **🔍 技能挖掘** - 智能分析个人技能，推荐适合的副业方向
- **📊 副业规划** - 制定详细的副业发展计划和时间表
- **👥 抱团互助** - 提供副业交流群，分享经验和资源

### 技术特色
- **现代化UI设计** - 采用苹果官网风格设计，视觉效果优雅
- **响应式布局** - 完美适配各种设备尺寸
- **流畅动画** - 页面过渡动画和交互效果
- **TypeScript支持** - 类型安全，开发体验更佳
- **模块化架构** - 清晰的代码结构，易于维护和扩展

## 🚀 快速开始

### 环境要求
- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run dev
```
访问 http://localhost:5173 查看应用

### 生产环境构建
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 🏗️ 技术栈

### 前端技术
- **React 18** - 现代化的前端框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vite** - 快速的构建工具
- **React Router** - 客户端路由管理
- **CSS3** - 现代化的样式技术

### 部署和托管
- **Netlify** - 现代化的静态网站托管平台
- **Serverless Functions** - 无服务器函数支持

### 开发工具
- **ESLint** - 代码质量检查
- **TypeScript Compiler** - 类型检查和编译

## 📁 项目结构

```
AIFireHome/
├── public/                    # 静态资源
├── src/
│   ├── components/            # 可复用组件
│   │   ├── Skeleton.tsx      # 骨架屏组件
│   │   └── Skeleton.css      # 骨架屏样式
│   ├── App.tsx               # 主应用组件
│   ├── index.css             # 全局样式
│   └── main.tsx              # 应用入口
├── netlify/
│   └── functions/            # Netlify无服务器函数
│       ├── chat-completions.js  # AI对话API
│       └── models.js           # AI模型管理
├── .env.example              # 环境变量示例
├── package.json              # 项目依赖配置
├── tsconfig.json             # TypeScript配置
├── vite.config.ts            # Vite构建配置
└── netlify.toml              # Netlify部署配置
```

## 🎨 设计系统

### 苹果官网风格特色
- **毛玻璃效果** - 使用 `backdrop-filter` 实现优雅的毛玻璃质感
- **渐变背景** - 现代化的渐变色彩搭配
- **圆角设计** - 柔和的圆角边框，提升视觉体验
- **阴影效果** - 层次分明的阴影设计
- **动画过渡** - 流畅的悬停和点击动画

### 色彩方案
- **主色调** - 蓝色渐变系
- **辅助色** - 紫色、橙色、绿色渐变
- **背景色** - 浅色渐变背景
- **文字色** - 深色文字确保可读性

## 🔧 配置说明

### 环境变量原则
- 客户端不存放任何第三方 API 密钥
- 所有外部 API 密钥仅存在于 Netlify Functions 的函数环境变量中
- 示例：`DEEPSEEK_API_KEY` 在 Netlify 仪表盘的 `Site settings → Environment variables` 配置

### 客户端环境变量
复制 `.env.example` 为 `.env` 并仅配置非敏感变量：
```bash
# 微信社群配置（客户端可用）
VITE_WECHAT_ID=AIPMAndy

# 应用信息（非敏感）
VITE_APP_NAME=AIFireHome
VITE_APP_VERSION=1.0.0
```

### Netlify 部署与函数密钥
1. 连接 GitHub 仓库到 Netlify
2. 配置构建命令：`npm run build`
3. 配置发布目录：`dist`
4. 在 `Site settings → Environment variables` 设置函数环境变量：
   - `DEEPSEEK_API_KEY=<你的密钥>`（仅函数可见）
5. 函数通过 `process.env.DEEPSEEK_API_KEY` 调用外部 API，客户端统一调用 `/api/*` 路径：
   - `/api/models` 用于模型检查
   - `/api/chat/completions` 用于 AI 生成

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 开发规范
- 使用TypeScript进行开发
- 遵循ESLint代码规范
- 保持组件的单一职责原则
- 添加适当的注释和文档

### 提交规范
- 使用清晰的提交信息
- 小步快跑，频繁提交
- 修复bug时注明问题来源

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件
