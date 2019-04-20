<template>
  <div class="info-row meta-row">
    <ul class="meta-list">
      <li v-show="item.hot && !showCategory" class="item hot">热</li>
      <li v-show="item.hot && !showCategory" class="item recommended">荐</li>
      <li v-show="item.type === 'post' && !showCategory" class="item post">专栏</li>
      <li v-show="showCategory && item.category" class="item category">
        <span :class="['category-title', item.category && item.category.title]">{{ item.category && item.category.name }}</span>
      </li>
      <li class="item username clickable">{{ item.user.username }}</li>
      <li class="item time">{{ item.createdAt | format }}</li>
      <li class="item">{{ item.tags.map(tag => { return tag.title }).join('/') }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MetaRow',
  filters: {
    format (v) {
      const timeDistance = (new Date().getTime() - new Date(v).getTime()) / 1000
      if ((timeDistance / 60) < 1) {
        return `1分钟前`
      } else if ((timeDistance / 60) < 60) {
        return `${Math.floor((timeDistance / 60))}分钟前`
      } else if ((timeDistance / 60 / 60) < 24) {
        return `${Math.floor((timeDistance / 60 / 60))}小时前`
      } else if ((timeDistance / 60 / 60 / 24) < 30) {
        return `${Math.floor((timeDistance / 60 / 60 / 24))}天前`
      } else if ((timeDistance / 60 / 60 / 24 / 30) < 12) {
        return `${Math.floor((timeDistance / 60 / 60 / 24 / 30))}月前`
      } else {
        return `${Math.floor((timeDistance / 60 / 60 / 24 / 30 / 12))}年前`
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    showCategory: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.meta-row {
  font-size 1rem
  color #8f969c  
}
.meta-list {
  display flex
  align-items baseline
  white-space nowrap
  .item {
    .category-title {
      display inline-block
      margin-right 1.2rem
      padding .38rem 0
      min-width 4.5rem
      text-align center
      line-height 1
      color #fff
      background-color #c69f42
      border-radius 2px
    }
    .category-title.article {
      background-color #abbb79
    }
    .category-title.android {
      background-color #42c67d
    }
    .category-title.frontend {
      background-color #56c4e1
    }
    .category-title.ai {
      background-color #e8596b
    }
    .category-title.backend {
      background-color #857dea
    }
    .category-title.ios {
      background-color #ff955b
    }
    .category-title.freebie {
      background-color #606b9e
    }
    .category-title.design {
      background-color #f2c400
    }
    .category-title.product {
      background-color #a08563
    }
  }
  .item.username {
    display flex
    align-items baseline
    &:hover {
      color #007fff
    }
  }
  .item.hot, .item.recommended, .item.post, .item.username, .item.time {
    &::after {
      content "\B7"
      margin 0 .4em
      color #8f969c
    }  
  }
  .item.hot {
    color red
  }
  .item.recommended {
    color #f70
  }
  .item.post {
    color #b71ed7
  }
}
</style>
