<style lang="stylus" scoped>
.books-page {
  font-size 20px
  margin-top 1.767rem
  text-align center
}
</style>

<template>
  <div class="books-page">
    books
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: '小册',
      meta: [
        { hid: 'books custom title', name: 'books', content: 'books custom title description' }
      ]
    }
  }
}
</script>

