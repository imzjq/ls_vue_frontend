
<template>
  <!-- eslint-disable vue/require-component-is-->
  <component v-bind="linkProps(to)" @click="testClick(to)" >
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils'

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    isExternalLink(routePath) {
      return isExternal(routePath)
    },

    testClick(url) {
      sessionStorage.setItem('defaultActive', JSON.stringify(url))
      // 通过时间戳实现菜单刷新
      this.$router.push({
        path: url,
        query: {
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    },
    linkProps(url) {
      return {
        is: 'div'
      }
    }

    // linkProps(url) {
    //   if (this.isExternalLink(url)) {
    //     return {
    //       is: 'a',
    //       href: url,
    //       target: '_blank',
    //       rel: 'noopener'
    //     }
    //   }
    //   return {
    //     is: 'router-link',
    //     to: url
    //   }
    // }
  }
}
</script>
