<style lang="stylus" scoped>
.entry-list {
  width 100%
  background #fff
}
</style>

<template>
  <ul class="entry-list" ref="entry">
    <list-item v-for="(item, index) in recommends" :key="index" :item="item">
      <title-row :title="item.title"></title-row>
      <meta-row :item="item" :show-category="true"></meta-row>
    </list-item>
  </ul>
</template>

<script>
import ListItem from '~/components/home/list-item'
import TitleRow from '~/components/home/title-row'
import MetaRow from '~/components/home/meta-row'
const getData = (store, self) => {
  let params = {
    suid: 'aemu3ZqVijiqQj2QEFiB',
    ab: 'welcome_3',
    src: 'web'
  }
  return new Promise(resolve => {
    store.dispatch('recommend', params).then(res => {
      if (self) {
        const { d, m, s } = res
        if (s === 1) {
          self.recommends.push(...d)
        } else {
          self.$message({
            message: m,
            type: 'warning'
          })
        }
        self.scrollStatus = true
      }
      resolve(res)
    })
  })
}

export default {
  scrollToTop: true,
  components: {
    ListItem,
    TitleRow,
    MetaRow
  },
  data () {
    return {
      scrollStatus: true,
      recommends: []
    }
  },
  async asyncData ({ store, error }) {
    let res = await getData(store)
    return {
      recommends: res.d
    }
  },
  mounted () {
    this.getFullPageData()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getFullPageData () {
      if (document.body.offsetHeight < window.innerHeight) {
        this.loadMoreData().then(res => {
          if (res.s === 1) {
            this.getFullPageData()
          }
        })
      }
    },
    handleScroll () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(this.loadMoreData, 300)
    },
    loadMoreData () {
      return new Promise((resolve) => {
        let $el = document.documentElement
        let $entry = this.$refs.entry
        let clienHeight = $el.clientHeight
        let style = window.getComputedStyle ? window.getComputedStyle($entry, null) : null || $entry.currentStyle
        let containerHeight = ~~style.height.split('px')[0] + 140
        // 设置【返回顶部】显示隐藏
        document.querySelector('.to-top-btn').classList[$el.scrollTop > 120 ? 'add' : 'remove']('show')
        // console.log(containerHeight, $el.scrollTop + clienHeight, clienHeight)
        // 滚动到一定高度，重新加载数据
        if ($el.scrollTop + clienHeight > containerHeight - 10 && this.scrollStatus) {
          getData(this.$store, this).then(res => {
            resolve(res)
          })
        }
      })
    }
  }
}
</script>
