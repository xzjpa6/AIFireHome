import React from 'react'
import AppleButton from './AppleButton'
import { useClipboard } from '../hooks/useClipboard'

interface CopyWeChatButtonProps {
  wechatId?: string
  variant?: 'primary' | 'secondary'
  className?: string
  children?: React.ReactNode
}

const CopyWeChatButton: React.FC<CopyWeChatButtonProps> = ({
  wechatId,
  variant = 'primary',
  className = '',
  children,
}) => {
  const { copied, error, copy } = useClipboard()
  const id = wechatId || (import.meta as any).env?.VITE_WECHAT_ID || 'AIPMAndy'

  const handleClick = () => {
    copy(id)
  }

  return (
    <div className={className}>
      <AppleButton variant={variant} onClick={handleClick}>
        {children || `复制微信号 ${id}`}
      </AppleButton>
      {copied && (
        <div style={{ marginTop: 12 }}>
          <div className="notification">
            <div className="notification-content">
              <div className="notification-icon">✓</div>
              <div className="notification-message">微信号已复制：{id}，添加好友备注"副业互助"即可入群</div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div style={{ marginTop: 12 }}>
          <div className="notification">
            <div className="notification-content">
              <div className="notification-icon">⚠️</div>
              <div className="notification-message">复制失败，请手动添加微信号：{id}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CopyWeChatButton