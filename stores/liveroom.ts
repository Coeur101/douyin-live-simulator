import { defineStore } from 'pinia'
import type { 
  LikeEffect, 
  GiftEffect, 
  LiveConfig, 
  LikeEffectType,
  LiveroomState 
} from '~/types'

// 评论项类型
export interface CommentItem {
  id: string
  username: string
  content: string
  timestamp: number
  userAvatar: string
  level?: string
}

export const useLiveroomStore = defineStore('liveroom', {
  state: () => ({
    // 直播间配置
    config: {
      streamerName: '美丽主播',
      onlineCount: 1234,
      likeIntensity: 5, // 每秒5个点赞
      giftEnabled: true
    } as Omit<LiveConfig, 'danmakuIntensity' | 'aiDanmaku'>,
    
    // 实时数据
    comments: [] as CommentItem[], // 替换弹幕为评论
    likeEffects: [] as LikeEffect[],
    giftEffects: [] as GiftEffect[],
    
    // 控制状态
    isLive: false,
    likeTimer: null as NodeJS.Timeout | null,
    
    // 预设评论池
    commentPool: [
      '主播好美啊！',
      '666666',
      '这个妆容太好看了',
      '主播唱歌真好听',
      '爱了爱了',
      '太可爱了吧',
      '主播加油！',
      '这个直播间氛围好棒',
      '主播笑起来真甜',
      '今天状态很好呢',
      '支持主播！',
      '这个衣服好看',
      '主播辛苦了',
      '期待下次直播',
      '主播最棒了！'
    ],
    
    // 用户名池
    usernamePool: [
      '小可爱123', '阳光男孩', '甜甜圈', '星空下的梦', '温柔的风',
      '快乐小鸟', '彩虹糖', '月亮船', '小确幸', '暖阳',
      '蓝天白云', '花开富贵', '笑容满面', '开心果', '小幸运',
      '美好时光', '清风徐来', '阳光灿烂', '温暖如春', '甜蜜蜜'
    ]
  }),

  actions: {
    // 更新配置
    updateConfig(newConfig: Partial<Omit<LiveConfig, 'danmakuIntensity' | 'aiDanmaku'>>) {
      this.config = { ...this.config, ...newConfig }
    },

    // 开始直播
    startLive() {
      this.isLive = true
      this.startLikeGeneration()
    },

    // 停止直播
    stopLive() {
      this.isLive = false
      if (this.likeTimer) {
        clearInterval(this.likeTimer)
        this.likeTimer = null
      }
    },

    // 开始点赞生成
    startLikeGeneration() {
      if (this.likeTimer) clearInterval(this.likeTimer)
      
      this.likeTimer = setInterval(() => {
        this.generateLike()
      }, 1000 / this.config.likeIntensity)
    },

    // 生成点赞特效
    generateLike() {
      const likeTypes: LikeEffectType[] = ['heart', 'note', 'star', 'flower']
      const randomType = likeTypes[Math.floor(Math.random() * likeTypes.length)]
      
      const like: LikeEffect = {
        id: Date.now().toString() + Math.random(),
        type: randomType as LikeEffectType,
        x: Math.random() * 100,
        y: Math.random() * 100,
        timestamp: Date.now()
      }
      
      this.likeEffects.push(like)
      
      // 3秒后移除
      setTimeout(() => {
        const index = this.likeEffects.findIndex(l => l.id === like.id)
        if (index > -1) {
          this.likeEffects.splice(index, 1)
        }
      }, 3000)
    },

    // 发送礼物
    sendGift(giftName: string, giftIcon: string, value: number, sender: string) {
      const gift: GiftEffect = {
        id: Date.now().toString() + Math.random(),
        giftName,
        giftIcon,
        value,
        sender,
        timestamp: Date.now()
      }
      
      this.giftEffects.push(gift)
      
      // 5秒后移除
      setTimeout(() => {
        const index = this.giftEffects.findIndex(g => g.id === gift.id)
        if (index > -1) {
          this.giftEffects.splice(index, 1)
        }
      }, 5000)
    },

    // 添加评论 - 支持两种方式：传入完整对象或分别传入参数
    addComment(commentOrContent: CommentItem | string, username: string = '观众', userAvatar: string = '/avatars/default.jpg', level?: string) {
      let comment: CommentItem
      
      if (typeof commentOrContent === 'string') {
        // 传入字符串内容的方式
        comment = {
          id: Date.now().toString() + Math.random(),
          username,
          content: commentOrContent,
          timestamp: Date.now(),
          userAvatar,
          level: level || `Lv.${Math.floor(Math.random() * 50) + 1}`
        }
      } else {
        // 传入完整对象的方式
        comment = commentOrContent
      }
      
      this.comments.push(comment)
      
      // 保持最多50条评论
      if (this.comments.length > 50) {
        this.comments.shift()
      }
    },

    // 生成随机评论
    generateRandomComment() {
      const randomComment = this.commentPool[Math.floor(Math.random() * this.commentPool.length)]
      const randomUsername = this.usernamePool[Math.floor(Math.random() * this.usernamePool.length)]
      const randomAvatar = `/avatars/user${Math.floor(Math.random() * 10) + 1}.jpg`
      const randomLevel = `Lv.${Math.floor(Math.random() * 50) + 1}`
      this.addComment(randomComment as unknown as CommentItem , randomUsername, randomAvatar, randomLevel)
    }
  }
})