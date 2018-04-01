<style lang="stylus" scoped>
.content-container {
  position relative
  margin 0 auto
  width 100%
  max-width 960px
  top 5rem
  &::after {
    display table
    content ""
    clear both  
  }
}
</style>

<template>
  <div>
    <v-header></v-header>
    <main class="content-container" ref="container">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import VHeader from '~/components/home/header'

export default {
  components: {
    VHeader
  }
}
</script>

