<style lang="stylus" scoped>
.v-increment {
  margin 30px 0
}
</style>

<template>
  <div class="section">

  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo'
import VHeader from '~/components/home/header'
import { mapState } from 'vuex'

export default {
  components: {
    AppLogo,
    VHeader
  },
  data () {
    return {
      title: 'Nuxt Custom Title'
    }
  },
  head () {
    return {
      title: '首页',
      meta: [
        { hid: 'home custom title', name: 'home', content: 'home custom title description' }
      ]
    }
  },
  async asyncData ({ store, error }) {
    let [ res, jj ] = await Promise.all([
      store.dispatch('home'),
      store.dispatch('banner')
    ]).catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
    console.log(jj)
    return {
      testMsg: res.base
    }
  },
  computed: {
    ...mapState({
      counter: state => state.counter
    })
  },
  methods: {
    clickFn () {
      this.$store.commit('INCREMENT')
    }
  }
}
</script>
