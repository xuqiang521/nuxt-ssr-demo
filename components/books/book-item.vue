<template>
  <div class="item">
    <div class="poster">
      <img :src="item.img">
    </div>
    <div class="info">
      <title-row :title="item.title"></title-row>
      <div class="desc">{{ item.desc }}</div>
      <div class="author">
        <div class="author-info">
          <a class="user" href="/books" target="_blank">
            <img class="avatar" :src="item.userData.avatarLarge">
            <span>{{ item.userData.username }}</span>
          </a>
        </div>
        <div class="author-desc">{{ item.profile }}</div>
      </div>
      <div class="other">
        <div class="price">￥{{ item.price }}</div>
        <div class="messages">
          <span class="message">{{ item.lastSectionCount }}小节</span>
          <span class="message read-duration">阅读时长{{ Math.floor(item.contentSize/60/item.lastSectionCount) }}分</span>
          <span class="message">{{ item.buyCount }}人已购买</span>
        </div>
      </div>
    </div>
    <div class="m-aside">
      <div class="price">
        ￥{{ item.price }}
      </div>
    </div>
  </div>
</template>

<script>
import TitleRow from '@/components/home/title-row'

export default {
  name: 'BookItem',
  components: {
    TitleRow
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="stylus" scoped>
.item {
  display flex
  padding 25px
  box-sizing border-box
  background-color #fff
  position relative
  cursor pointer
  &:not(:last-child) {
    border-bottom 1px solid #e6e8e8
  }
  &:hover {
    background-color #f7f9f9
  }
}
.poster {
  width 100px
  height 140px
  flex-shrink 0
  box-shadow 3px 4px 12px 0 rgba(0,0,0,.2)
  overflow hidden
  background-color #ccc
  img {
    width 100%
    height 100%
  }
}
.info {
  position relative
  -webkit-box-flex 1
  flex-grow 1
  overflow hidden
  box-sizing border-box
  font-size 14px
  color #2e3135
  padding-left 22px
  .desc {
    margin-top 5px
    line-height 20px
    height 20px
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp 1
    -webkit-box-orient vertical
    color #71777c
  }
  .title-row {
    white-space normal
  }
  .author, .author .author-info {
    display flex
    align-items center
  }
  .author {
    margin-top 6px
    overflow hidden
    white-space nowrap
    .author-info {
      flex-shrink 0
    }
    .avatar {
      display inline-block
      width 26px
      height 26px
      border-radius 50%
      margin-right 8px
      background-position 50%
      background-size cover
      background-repeat no-repeat
      background-color #eee
    }
    .user {
      display inline-flex
      align-items center
      color #000
    }
    .author-desc {
      margin 0 10px
      color #71777c
      -webkit-box-flex 1
      flex-grow 1
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    }
  }
  .other {
    margin-top 6px
    display flex
    align-items center
    .price {
      color #ed7b11
      font-size 18px
      margin-right 20px
    }
    span.message {
      opacity .6
      font-size 13px
      color #71777c
      &:not(:last-child)::after {
        content "\B7"
        color #71777c
        margin-left 5px
        margin-right 5px
      }
    }
  }
}
.m-aside {
  margin-left 10px
  flex-shrink 0
  align-self center
  display none
  position relative
  z-index 3
  .price {
    height 30px
    line-height 30px
    padding-left 15px
    padding-right 15px
    border-radius 15px
    background-color #f0f7ff
    font-size 14px
    font-weight 500
    text-align center
    color #07f
  }
}
@media (max-width 700px) {
  .item {
    border-bottom none
    padding 16px 14px
    .poster {
      width 52px
      height 72px
    }
    .info {
      padding-left 16px
      .author-desc,
      .desc,
      .author .avatar,
      .other .price {
        display none
      }
    }
    .other {
      -webkit-box-direction normal
      flex-direction column
      -webkit-box-align start
      align-items flex-start
      .read-duration {
        display none
      }
    }
  }
  .m-aside {
    display block
  }
}
</style>
