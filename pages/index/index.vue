<style lang="stylus" scoped>
.entry-list {
  width 100%
  background #fff  
  > .item {
    &:not(:last-child) {
      border-bottom 1px solid rgba(178, 186, 194, .15)
    }
    .entry {
      &:hover {
        background-color rgba(0, 0, 0, .01)
      }
    }
  }
}
.content-box, .info-box {
  display flex
}
.content-box {
  align-items center
  padding 1.167rem 2rem
  min-height 5.75rem
}
.info-box {
  flex 1 1 auto
  flex-direction column
  justify-content center
  min-width 0
}
.title-row {
  margin .5rem 0 .8rem
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
}
.title {
  font-size 1.4rem
  font-weight 600
  line-height 1.2
  color #2e3135
  cursor pointer
  &:hover {
    text-decoration underline
    color #909090
  }
}
.meta-row {
  font-size 1rem
  color #8f969c  
}
.meta-list {
  display flex
  align-items baseline
  white-space nowrap
  .item {
    &:nth-of-type(2), &:nth-of-type(3) {
      &::after {
        content "\B7"
        margin 0 .4em
        color #8f969c
      }  
    }
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
    .username {
      display flex
      align-items baseline
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
}
.thumb {
  flex 0 0 auto
  width 8.9rem
  height 5.75rem
  margin-left 2rem
  background-color #000
  border-radius 2px
  img {
    width 100%
    height 100%
  } 
}

@media (max-width 600px) {
  .title {
    font-size 1.2rem
  }
  .thumb {
    display none  
  }
}
</style>

<template>
  <ul class="entry-list" ref="entry">
    <li class="item" v-for="(item, index) in recommends" :key="index">
      <div class="entry">
        <a :href="'http://118.25.109.133:81/entry/' + item.objectId" target="_blank" class="entry-link">
          <div class="content-box">
            <div class="info-box">
              <div class="info-row title-row">
                <span class="title">{{ item.title }}</span>
              </div>
              <div class="info-row meta-row">
                <ul class="meta-list">
                  <li class="item category">
                    <span :class="['category-title', item.category.title]">{{ item.category.name }}</span>
                  </li>
                  <li class="item username clickable">{{ item.user.username }}</li>
                  <li class="item">{{ item.createdAt | format }}</li>
                  <li class="item">{{ item.viewsCount }} 次阅读</li>
                </ul>
              </div>
            </div>
            <div class="thumb" v-show="item.screenshot">
              <img :src="item.screenshot">
            </div>
          </div>
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
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
  data () {
    return {
      scrollStatus: true,
      recommends: []
    }
  },
  filters: {
    format (v) {
      let timeDistance = (new Date().getTime() - new Date(v).getTime()) / 1000
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
        this.loadMoreData().then(() => {
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
        let $el = document.documentElement
        let $entry = this.$refs.entry
        let clienHeight = $el.clientHeight
        let containerHeight = ~~(window.getComputedStyle($entry, null).getPropertyValue('height').split('px')[0]) + 140
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
