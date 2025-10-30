// 导出所有类型定义
export * from './liveroom'
export * from './components'

/**
 * 通用响应接口
 */
export interface ApiResponse<T = any> {
  /** 状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
  /** 是否成功 */
  success: boolean
}

/**
 * 分页参数接口
 */
export interface PaginationParams {
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
}

/**
 * 分页响应接口
 */
export interface PaginationResponse<T = any> {
  /** 数据列表 */
  list: T[]
  /** 总数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页数量 */
  pageSize: number
  /** 总页数 */
  totalPages: number
}

/**
 * 颜色配置
 */
export interface ColorConfig {
  /** 主色调 */
  primary: string
  /** 次要色调 */
  secondary: string
  /** 成功色 */
  success: string
  /** 警告色 */
  warning: string
  /** 错误色 */
  error: string
  /** 信息色 */
  info: string
}

/**
 * 动画配置
 */
export interface AnimationConfig {
  /** 动画持续时间（毫秒） */
  duration: number
  /** 动画延迟（毫秒） */
  delay: number
  /** 动画缓动函数 */
  easing: string
}

/**
 * 组件Props基础接口
 */
export interface BaseComponentProps {
  /** 组件类名 */
  class?: string
  /** 组件样式 */
  style?: Record<string, any>
  /** 是否禁用 */
  disabled?: boolean
  /** 是否加载中 */
  loading?: boolean
}