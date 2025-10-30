import type { BaseComponentProps } from './index'

/**
 * 弹幕层组件Props
 */
export interface DanmakuLayerProps extends BaseComponentProps {
  /** 最大显示弹幕数量 */
  maxCount?: number
  /** 弹幕滚动速度 */
  scrollSpeed?: number
}

/**
 * 点赞特效组件Props
 */
export interface LikeEffectsProps extends BaseComponentProps {
  /** 特效持续时间（毫秒） */
  duration?: number
  /** 最大同时显示特效数量 */
  maxEffects?: number
}

/**
 * 礼物特效组件Props
 */
export interface GiftEffectsProps extends BaseComponentProps {
  /** 特效显示位置 */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  /** 特效持续时间（毫秒） */
  duration?: number
}

/**
 * 直播控制面板组件Props
 */
export interface LiveControlsProps extends BaseComponentProps {
  /** 是否显示管理按钮 */
  showAdminButton?: boolean
  /** 是否显示分享按钮 */
  showShareButton?: boolean
}

/**
 * 按钮组件Props
 */
export interface ButtonProps extends BaseComponentProps {
  /** 按钮类型 */
  type?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large'
  /** 是否为圆形按钮 */
  round?: boolean
  /** 是否为幽灵按钮 */
  ghost?: boolean
  /** 点击事件 */
  onClick?: () => void
}

/**
 * 输入框组件Props
 */
export interface InputProps extends BaseComponentProps {
  /** 输入框类型 */
  type?: 'text' | 'password' | 'email' | 'number' | 'url' | 'tel'
  /** 占位符文本 */
  placeholder?: string
  /** 输入框值 */
  modelValue?: string | number
  /** 最大长度 */
  maxLength?: number
  /** 是否只读 */
  readonly?: boolean
  /** 输入事件 */
  onInput?: (value: string | number) => void
  /** 变化事件 */
  onChange?: (value: string | number) => void
}

/**
 * 模态框组件Props
 */
export interface ModalProps extends BaseComponentProps {
  /** 是否显示 */
  visible?: boolean
  /** 标题 */
  title?: string
  /** 宽度 */
  width?: string | number
  /** 是否可以通过点击遮罩关闭 */
  maskClosable?: boolean
  /** 关闭事件 */
  onClose?: () => void
}

/**
 * 通知组件Props
 */
export interface NotificationProps {
  /** 通知类型 */
  type?: 'success' | 'warning' | 'error' | 'info'
  /** 标题 */
  title?: string
  /** 内容 */
  message: string
  /** 持续时间（毫秒），0表示不自动关闭 */
  duration?: number
  /** 是否显示关闭按钮 */
  closable?: boolean
  /** 关闭回调 */
  onClose?: () => void
}