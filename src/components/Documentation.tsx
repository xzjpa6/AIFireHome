import React from 'react';
import './Documentation.css';

interface DocumentationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Documentation: React.FC<DocumentationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="documentation-overlay">
      <div className="documentation-modal">
        <div className="documentation-header">
          <h2>项目文档</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        <div className="documentation-content">
          <div className="doc-section">
            <h1>AIFireHome</h1>
            <p className="doc-description">
              一个现代化的AI副业助手平台，帮助用户发现技能、规划副业、识别风险，并提供微信社群支持。
            </p>
          </div>

          <div className="doc-section">
            <h2>🌟 功能特性</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <h4>智能技能发现</h4>
                <p>通过AI算法分析用户技能和兴趣，推荐最适合的副业方向</p>
              </div>
              <div className="feature-item">
                <h4>个性化规划</h4>
                <p>根据用户情况制定详细的副业发展计划和时间表</p>
              </div>
              <div className="feature-item">
                <h4>风险评估</h4>
                <p>智能评估副业项目的风险等级，提供风险缓解建议</p>
              </div>
              <div className="feature-item">
                <h4>社群支持</h4>
                <p>连接微信社群，获得同行经验和资源分享</p>
              </div>
            </div>
          </div>

          <div className="doc-section">
            <h2>快速开始</h2>
            <div className="code-block">
              <pre><code>{`# 克隆项目
git clone https://github.com/your-username/AIFireHome.git

# 进入项目目录
cd AIFireHome

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build`}</code></pre>
            </div>
          </div>

          <div className="doc-section">
            <h2>📁 项目结构</h2>
            <div className="file-tree">
              <div className="tree-item">📁 src/</div>
              <div className="tree-item indent-1">📁 components/ - React组件</div>
              <div className="tree-item indent-1">📁 contexts/ - React上下文</div>
              <div className="tree-item indent-1">📁 hooks/ - 自定义Hook</div>
              <div className="tree-item indent-1">📁 utils/ - 工具函数</div>
              <div className="tree-item indent-1">📁 types/ - TypeScript类型定义</div>
              <div className="tree-item">📄 apple.css - 主样式文件</div>
              <div className="tree-item">📄 README.md - 项目文档</div>
            </div>
          </div>

          <div className="doc-section">
            <h2>🛠️ 技术栈</h2>
            <div className="tech-stack">
              <div className="tech-category">
                <h4>前端框架</h4>
                <div className="tech-tags">
                  <span className="tech-tag">React 18</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">Vite</span>
                </div>
              </div>
              <div className="tech-category">
                <h4>状态管理</h4>
                <div className="tech-tags">
                  <span className="tech-tag">React Context</span>
                  <span className="tech-tag">useReducer</span>
                </div>
              </div>
              <div className="tech-category">
                <h4>样式方案</h4>
                <div className="tech-tags">
                  <span className="tech-tag">CSS Variables</span>
                  <span className="tech-tag">Flexbox</span>
                  <span className="tech-tag">Grid</span>
                </div>
              </div>
              <div className="tech-category">
                <h4>开发工具</h4>
                <div className="tech-tags">
                  <span className="tech-tag">ESLint</span>
                  <span className="tech-tag">Prettier</span>
                  <span className="tech-tag">Husky</span>
                </div>
              </div>
            </div>
          </div>

          <div className="doc-section">
            <h2>🎨 设计系统</h2>
            <div className="design-system">
              <div className="color-palette">
                <h4>主要颜色</h4>
                <div className="color-grid">
                  <div className="color-item">
                    <div className="color-preview apple-blue"></div>
                    <span>--apple-blue: #007aff</span>
                  </div>
                  <div className="color-item">
                    <div className="color-preview apple-green"></div>
                    <span>--apple-green: #34c759</span>
                  </div>
                  <div className="color-item">
                    <div className="color-preview apple-orange"></div>
                    <span>--apple-orange: #ff9500</span>
                  </div>
                  <div className="color-item">
                    <div className="color-preview apple-red"></div>
                    <span>--apple-red: #ff3b30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="doc-section">
            <h2>📱 响应式设计</h2>
            <p>项目采用移动优先的响应式设计策略，支持多种设备尺寸：</p>
            <ul>
              <li><strong>移动端：</strong> ≤ 768px</li>
              <li><strong>平板端：</strong> 769px - 1024px</li>
              <li><strong>桌面端：</strong> ≥ 1025px</li>
            </ul>
          </div>

          <div className="doc-section">
            <h2>🔧 开发规范</h2>
            <div className="development-rules">
              <div className="rule-item">
                <h4>代码规范</h4>
                <p>使用ESLint和Prettier确保代码质量，遵循React和TypeScript最佳实践</p>
              </div>
              <div className="rule-item">
                <h4>提交规范</h4>
                <p>使用语义化提交信息，如：feat: 添加新功能，fix: 修复bug</p>
              </div>
              <div className="rule-item">
                <h4>组件设计</h4>
                <p>遵循单一职责原则，保持组件简洁可复用</p>
              </div>
            </div>
          </div>

          <div className="doc-section">
            <h2>🤝 贡献指南</h2>
            <p>欢迎贡献代码！请遵循以下步骤：</p>
            <ol>
              <li>Fork本项目</li>
              <li>创建功能分支 (git checkout -b feature/AmazingFeature)</li>
              <li>提交更改 (git commit -m 'Add some AmazingFeature')</li>
              <li>推送到分支 (git push origin feature/AmazingFeature)</li>
              <li>打开Pull Request</li>
            </ol>
          </div>

          <div className="doc-section">
            <h2>📄 许可证</h2>
            <p>本项目采用MIT许可证 - 查看 <a href="#license" className="license-link">LICENSE</a> 文件了解详情。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;