// 全局类型声明文件

declare global {
  /**
   * 全局窗口对象扩展
   */
  interface Window {
    // 可以在这里添加全局窗口对象的扩展
  }

  /**
   * 环境变量类型声明
   */
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      NUXT_PUBLIC_API_BASE?: string
      NUXT_PUBLIC_APP_NAME?: string
    }
  }
}

/**
 * Vue组件实例类型扩展
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // 可以在这里添加Vue组件实例的全局属性
  }
}

/**
 * CSS模块类型声明
 */
declare module '*.css' {
  const content: string
  export default content
}

/**
 * 图片资源类型声明
 */
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

/**
 * JSON文件类型声明
 */
declare module '*.json' {
  const value: any
  export default value
}

export {}