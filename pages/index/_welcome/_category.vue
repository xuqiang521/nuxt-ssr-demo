<template>
  <ul ref="entry" class="entry-list">
    <list-item v-for="item in entries" :key="item.id" :item="item">
      <meta-row :item="item"></meta-row>
      <title-row :title="item.title"></title-row>
      <action-row :item="item"></action-row>
    </list-item>
  </ul>
</template>

<script>
import ListItem from '@/components/home/list-item'
import TitleRow from '@/components/home/title-row'
import MetaRow from '@/components/home/meta-row'
import ActionRow from '@/components/home/action-row'

let first = 10
const getData = (store, params, self) => {
  let category = ''
  console.log(params)
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
  const param = {
    operationName: '',
    query: '',
    variables: {
      first: first,
      after: '',
      category: category,
      order: 'POPULAR',
      tags: []
    },
    extensions: {
      query: {
        id: '653b587c5c7c8a00ddf67fc66f989d42'
      }
    }
  }
  return new Promise(resolve => {
    store.dispatch('recommend', param).then(res => {
      const { items } = res.data.articleFeed
      resolve(items)
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
    const { edges } = await getData(store, params)
    return {
      entries: edges.map(item => { return item.node })
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
          this.getFullPageData()
        })
      }
    },
    handleScroll () {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(this.loadMoreData, 300)
    },
    loadMoreData () {
      return new Promise((resolve) => {
        const $el = document.documentElement
        const $entry = this.$refs.entry
        const clienHeight = $el.clientHeight
        const style = window.getComputedStyle ? window.getComputedStyle($entry, null) : null || $entry.currentStyle
        const containerHeight = ~~style.height.split('px')[0] + 140
        // 设置【返回顶部】显示隐藏
        document.querySelector('.to-top-btn').classList[$el.scrollTop > 120 ? 'add' : 'remove']('show')
        // 滚动到一定高度，重新加载数据
        if ($el.scrollTop + clienHeight > containerHeight - 10 && this.scrollStatus) {
          first += 10
          getData(this.$store, this.$route.params, this).then(res => {
            this.entries = res.edges.map(item => { return item.node })
            resolve(res)
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.entry-list {
  width 100%
  background #fff
}
</style>
