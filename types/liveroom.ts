/**
 * 弹幕项目接口
 */
export interface DanmakuItem {
  /** 唯一标识符 */
  id: string
  /** 弹幕内容 */
  content?: string
  /** 用户名 */
  username?: string
  /** 用户头像URL */
  avatar?: string
  /** 弹幕颜色 */
  color?: string
  /** 时间戳 */
  timestamp?: number
}

/**
 * 点赞特效类型
 */
export type LikeEffectType = 'heart' | 'note' | 'star' | 'flower'

/**
 * 点赞特效接口
 */
export interface LikeEffect {
  /** 唯一标识符 */
  id: string
  /** X坐标位置（百分比） */
  x: number
  /** Y坐标位置（百分比） */
  y: number
  /** 特效类型 */
  type: LikeEffectType
  /** 时间戳 */
  timestamp: number
}

/**
 * 礼物特效接口
 */
export interface GiftEffect {
  /** 唯一标识符 */
  id: string
  /** 礼物名称 */
  giftName: string
  /** 礼物图标 */
  giftIcon: string
  /** 礼物价值 */
  value: number
  /** 发送者 */
  sender: string
  /** 时间戳 */
  timestamp: number
}

/**
 * 直播间配置接口（简化版，移除弹幕相关配置）
 */
export interface LiveConfig {
  /** 主播名称 */
  streamerName: string
  /** 在线人数 */
  onlineCount: number
  /** 点赞强度（每秒点赞数） */
  likeIntensity: number
  /** 是否启用礼物 */
  giftEnabled: boolean
}

/**
 * 直播间状态接口（简化版，移除弹幕相关状态）
 */
export interface LiveroomState {
  /** 配置 */
  config: LiveConfig
  /** 评论列表 */
  comments: any[]
  /** 点赞特效列表 */
  likeEffects: LikeEffect[]
  /** 礼物特效列表 */
  giftEffects: GiftEffect[]
  /** 是否正在直播 */
  isLive: boolean
  /** 点赞定时器 */
  likeTimer: NodeJS.Timeout | null
  /** 评论池 */
  commentPool: string[]
  /** 用户名池 */
  usernamePool: string[]
}

/**
 * 礼物项目接口
 */
export interface GiftItem {
  /** 礼物名称 */
  name: string
  /** 礼物图标 */
  icon: string
  /** 礼物价值 */
  value: number
}