<template>
  <ul ref="entry" class="entry-list">
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

let first = 10
const getData = (store, self) => {
  const params = {
    operationName: '',
    query: '',
    variables: {
      first: first,
      after: '',
      order: 'POPULAR'
    },
    extensions: {
      query: {
        id: '21207e9ddb1de777adeaca7a2fb38030'
      }
    }
  }
  return new Promise(resolve => {
    store.dispatch('recommend', params).then(res => {
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
    MetaRow
  },
  data () {
    return {
      scrollStatus: true,
      recommends: []
    }
  },
  async asyncData ({ store, error }) {
    const { edges } = await getData(store, this)
    return {
      recommends: edges.map(item => { return item.node })
      // recommends: [
      //   {
      //     category: {name: "前端", id: "5562b415e4b00c57d9b94ac8"},
      //     commentsCount: 5,
      //     content: "hello~亲爱的观众老爷们大家好~最近一直沉迷于 GraphQL 的应用实践，正好公司黑客马拉松临近，就拉上了两位小伙伴，结合实际的业务场景，把 GraphQL 作为中间层的解决方案提上去~项目完成度还算不错，对 GraphQL 也有了更深入的理解，在此记下整个过程的收获。 …",
      //     createdAt: "2019-04-20T01:54:20.218Z",
      //     eventInfo: null,
      //     hot: false,
      //     hotIndex: 925.1856,
      //     id: "5cba7bcc6fb9a068b367911e",
      //     lastCommentTime: "2019-04-20T13:14:50.097Z",
      //     likeCount: 29,
      //     original: true,
      //     originalUrl: "https://juejin.im/post/5cad64316fb9a068aa4b82c2",
      //     rankIndex: 26.631819256332,
      //     screenshot: "https://user-gold-cdn.xitu.io/2019/4/20/16a38723d6bef1d2?w=1564&h=647&f=png&s=528857",
      //     summaryInfo: null,
      //     tags: [{id: "555e9a77e4b00c57d9955d64", title: "Node.js"}, {id: "55cc4fb960b28da5fc3b791b", title: "GraphQL"}],
      //     title: "基于 GraphQL 实践的一点思考",
      //     type: "post",
      //     updatedAt: "2019-04-20T07:12:46.215Z",
      //     user: {id: "584a7760128fe1006c7b17f9", role: "editor", avatarHd: null, username: 'sea_ljf'},
      //     viewerHasLiked: false
      //   }
      // ]
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
          getData(this.$store, this).then(res => {
            this.recommends = res.edges.map(item => { return item.node })
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
