<template>
  <div class="container-view welcome-view">
    <div class="feed welcome_feed">
      <nav class="category-nav">
        <h5>热门文章</h5>
        <div class="more" @click="handleMore">查看更多</div>
        <ul class="nav-list">
          <li v-for="(category, index) in categories" :key="index" class="nav-item">
            <nuxt-link :to="category.router">{{ category.title }}</nuxt-link>
          </li>
        </ul>
      </nav>
      <button class="to-top-btn" title="回到顶部" @click="goTop">
        <v-icon name="android-arrow-dropup" size="16"></v-icon>
      </button>
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      categories: [
        { router: { name: 'index' }, title: '推荐' },
        { router: { path: '/welcome/frontend' }, title: '前端' },
        { router: { path: '/welcome/android' }, title: 'Android' },
        { router: { path: '/welcome/backend' }, title: '后端' },
        { router: { path: '/welcome/ai' }, title: '人工智能' },
        { router: { path: '/welcome/ios' }, title: 'iOS' },
        { router: { path: '/welcome/freebie' }, title: '工具资源' },
        { router: { path: '/welcome/article' }, title: '阅读' }
      ],
      showTopBtn: false
    }
  },
  head () {
    return {
      title: '首页',
      meta: [
        { hid: 'home custom title', name: 'home', content: 'home custom title description' }
      ]
    }
  },
  computed: {
    ...mapState({
      counter: state => state.counter
    })
  },
  methods: {
    ...mapMutations([
      'INCREMENT'
    ]),
    clickFn () {
      this.INCREMENT()
    },
    goTop () {
      document.documentElement.scrollTop = 0
    },
    handleMore () {
      this.$message({
        message: 'sorry，暂未完成此功能哟 ~',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="stylus">
.container-view {
  margin-top 1.767rem
  display flex
  align-items flex-start
  .welcome_feed {
    overflow hidden
    -webkit-box-flex 1
    flex-grow 1  
  }
}
.category-nav {
  background-color #fff
  padding 1.5rem 2rem
  display flex
  -webkit-box-pack justify
  justify-content space-between
  border-bottom 1px solid #f6f6f6
  h5 {
    margin 0
    font-size 16px
    font-weight 500
  }
  .more {
    display none  
  }
  .nav-list {
    display flex
    -webkit-box-align baseline
    align-items baseline
    li.nav-item{
      &:hover {
        color #007fff  
      }
      &:not(:last-child) {
        margin-right 20px
      }
    }
    .nav-item {
      font-size 14px
      color #90979c
      padding 0 !important
      height initial !important
      line-height initial !important
      .nuxt-link-exact-active {
        color #007fff  
      } 
    }
  }
}

.to-top-btn {
  position fixed
  right 2rem
  bottom 3rem
  z-index 1000
  padding: 0
  width 3.33rem
  height 3.33rem
  line-height 1
  color #909090
  background-color #fff
  border 1px solid #f1f1f1
  border-radius 50%
  box-shadow 0 0 5px rgba(0,0,0,.05)
  cursor pointer
  display none
  transition all 0.2s
}
.to-top-btn.show {
  display block
}

@media (max-width 600px) {
  .category-nav {
    .more {
      display block
    } 
    .nav-list {
      display none  
    } 
  }
}
</style>
