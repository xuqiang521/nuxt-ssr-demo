<style lang="stylus" scoped>
.entry-list {
  width 100%
  background #fff
}
</style>

<template>
  <ul class="entry-list" ref="entry">
    <list-item v-for="(item, index) in entries" :key="index" :item="item">
      <meta-row :item="item"></meta-row>
      <title-row :title="item.title"></title-row>
      <action-row :item="item"></action-row>
    </list-item>
  </ul>
</template>

<script>
import ListItem from '~/components/home/list-item'
import TitleRow from '~/components/home/title-row'
import MetaRow from '~/components/home/meta-row'
import ActionRow from '~/components/home/action-row'

const getData = (store, params, self) => {
  let category = ''
  switch (params.category) {
    case 'frontend':
      category = '5562b415e4b00c57d9b94ac8'
      break
    case 'android':
      category = '5562b410e4b00c57d9b94a92'
      break
    case 'backend':
      category = '5562b419e4b00c57d9b94ae2'
      break
    case 'ai':
      category = '57be7c18128fe1005fa902de'
      break
    case 'ios':
      category = '5562b405e4b00c57d9b94a41'
      break
    case 'freebie':
      category = '5562b422e4b00c57d9b94b53'
      break
    case 'article':
      category = '5562b428e4b00c57d9b94b9d'
      break
    default:
      break
  }
  let param = {
    category: category,
    ab: 'welcome_3',
    src: 'web'
  }
  return new Promise(resolve => {
    store.dispatch('entries', param).then(res => {
      if (self) {
        const { d, m, s } = res
        if (s === 1) {
          self.entries.push(...d.entrylist)
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
    MetaRow,
    ActionRow
  },
  data () {
    return {
      scrollStatus: true,
      entries: []
    }
  },
  async asyncData ({ store, params }) {
    let res = await getData(store, params)
    return {
      entries: res.d.entrylist
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
        // 滚动到一定高度，重新加载数据
        if ($el.scrollTop + clienHeight > containerHeight - 10 && this.scrollStatus) {
          getData(this.$store, this.$route.params, this).then(res => {
            resolve(res)
          })
        }
      })
    }
  }
}
</script>
