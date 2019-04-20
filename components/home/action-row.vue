<template>
  <div class="info-row action-row">
    <ul class="action-list">
      <li class="item like clickable" @click="handleLike">
        <p class="title-box">
          <img src="@/assets/img/like.svg">
          <span class="count">{{ item.likeCount }}</span>
        </p>
      </li>
      <li class="item comment clickable" @click="handleComment">
        <p class="title-box">
          <img src="@/assets/img/comment.svg">
          <span class="count">{{ item.commentsCount }}</span>
        </p>
      </li>
      <li class="item share clickable hover" title="分享" @click="handleShare">
        <p class="title-box">
          <img src="@/assets/img/share.svg">
        </p>
      </li>
      <li class="item collect clickable hover" title="收藏" @click="handleCollect">
        <p class="title-box">
          <img src="@/assets/img/collect.svg">
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ActionRow',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleLike (e) {
      this.sorry(e)
    },
    handleComment (e) {
      this.sorry(e)
    },
    handleShare (e) {
      this.sorry(e)
    },
    handleCollect (e) {
      this.sorry(e)
    },
    sorry (e) {
      e.stopPropagation()
      e.preventDefault()
      this.$message({
        message: 'sorry，暂未完成此功能哟 ~',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-item:hover {
  .action-list .item.share,
  .action-list .item.collect {
    visibility visible
  }
}
.action-list {
  display inline-flex
  white-space nowrap
  > .item {
    display flex
    align-items center
    justify-content center
    position relative
    padding 0 .8rem
    height 2rem
    font-size 1.083rem
    line-height 1
    white-space nowrap
    color #b2bac2
    border-radius 1px
    border 1px solid #edeeef
    .title-box {
      display flex
      align-items center
      padding 0 .8rem
      height 100%
    }
    .count {
      margin-left .2em
      font-weight 700
    }
  }
  > .item.clickable:hover {
    background #f7f8fa
  }
  > .item.like {
    padding 0
  }
  > .item.comment {
    margin-left -1px
    padding 0
  }
  > .item.share {
    margin-left .8rem
    padding 0
    visibility hidden
  }
  > .item.collect {
    margin-left -1px
    padding 0
    visibility hidden
  }
}
@media (max-width 600px) {
  .action-list {
    > .item {
      height 1.5rem
      font-size 1rem
    }
  }
}
</style>
