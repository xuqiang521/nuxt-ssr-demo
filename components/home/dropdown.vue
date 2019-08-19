<template>
  <div v-clickoutside="hide" class="drop-down">
    <div class="phone-show-menu" @click="handleMenuClick">
      <span>{{ title }}</span>
      <v-icon name="arrow-down-b"></v-icon>
    </div>
    <ul 
      class="phone-hide" 
      :class="{
        'show': show
      }">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="nav-item link-item"
        @click="handleItemClick(item.title)">
        <nuxt-link :to="{ name: item.name }">{{ item.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Clickoutside from '@/utils/dom/clickoutside'

export default {
  name: 'VDropdown',
  directives: { Clickoutside },
  data () {
    return {
      show: false,
      title: '首页',
      items: [
        { name: 'index', title: '首页' },
        { name: 'books', title: '小册' },
        { name: 'repos', title: '开源库' },
        { name: 'events-all', title: '活动' }
      ]
    }
  },
  computed: {
    ...mapState({
      isPhone: state => state.isPhone
    })
  },
  methods: {
    handleMenuClick () {
      this.show = !this.show
    },
    handleItemClick (title) {
      this.show = false
      this.title = title
    },
    hide () {
      this.show = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.drop-down {
  // display flex
  // align-items center
  // justify-content center
  // padding 0 2rem
  // font-size 1.3rem
  // color #007fff
  .phone-show-menu {
    display none
  }
  span {
    margin-right .5rem 
  }
  .phone-hide {
    display flex
    .nuxt-link-exact-active {
      color #007fff
    }
  }
}
@media (max-width 980px) {
  .drop-down {
    .phone-show-menu {
      height 5rem
      display flex
      align-items center
      font-size 1.33rem
      color #007fff
      justify-content center
      padding 0 2rem
    }
    .phone-hide {
      display none
      background-color #fff
      box-shadow 0 1px 2px 0 rgba(0,0,0,.1)
      border 1px solid hsla(217,5%,71%,.45)
      border-radius 4px
      font-size 1.2rem
    }
    .phone-hide.show {
      display block  
    }
  }
}
</style>
