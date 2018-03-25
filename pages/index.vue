<style lang="stylus" scoped>
.v-increment {
  margin 30px 0
}
</style>

<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        nuxt-ssr
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
    <div class="v-increment">
      <el-button @click="clickFn">increment</el-button>
      {{ counter }}
    </div>
    <p>{{ testMsg.name }}</p>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo'
import { mapState } from 'vuex'

export default {
  components: {
    AppLogo
  },
  data () {
    return {
      title: 'Nuxt Custom Title'
    }
  },
  head () {
    return {
      title: this.title,
      // 为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，
      // 利用 hid 键为meta标签配一个唯一的标识编号
      meta: [
        { hid: 'test custom title', name: 'test', content: 'test custom title description' }
      ]
    }
  },
  async asyncData ({ store, error }) {
    let [ res ] = await Promise.all([
      store.dispatch('home')
    ]).catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
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
