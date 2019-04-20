<template>
  <div class="repos-page">
    开源库页面
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: '开源库',
      meta: [
        { hid: 'repos custom title', name: 'repos', content: 'repos custom title description' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.repos-page {
  font-size 20px
  margin-top 1.767rem
  text-align center
}
</style>
