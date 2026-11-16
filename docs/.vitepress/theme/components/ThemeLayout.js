import { defineComponent, h, nextTick, provide } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

/* Tema değişirken yeni tema, düğmenin olduğu noktadan yuvarlak bir dalga gibi yayılır. */
export default function themeLayout(slots) {
  return defineComponent({
    setup() {
      const { isDark } = useData()
      provide('toggle-appearance', async (event) => {
        const next = !isDark.value
        const still = matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!document.startViewTransition || still) { isDark.value = next; return }
        const x = event?.clientX ?? innerWidth - 40
        const y = event?.clientY ?? 30
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
        const transition = document.startViewTransition(async () => { isDark.value = next; await nextTick() })
        await transition.ready
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 700, easing: 'cubic-bezier(.22, 1, .36, 1)', pseudoElement: '::view-transition-new(root)' }
        )
      })
      return () => h(DefaultTheme.Layout, null, slots)
    }
  })
}
