import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    let zoom = null
    
    const initZoom = () => {
      // 清理之前的 zoom 实例
      if (zoom) {
        zoom.detach()
      }
      
      // 使用 nextTick 确保 DOM 元素已经渲染
      nextTick(() => {
        zoom = mediumZoom('.main img:not(.no-zoom)', {
          background: 'rgba(0, 0, 0, 0.8)',
          margin: 40,
          scrollOffset: 60,
          container: {
            top: 60,
            bottom: 60
          }
        })
      })
    }
    
    onMounted(() => {
      initZoom()
    })
    
    watch(
      () => route.path,
      () => {
        // 页面切换时重新初始化
        setTimeout(() => {
          initZoom()
        }, 100)
      }
    )
  }
}
