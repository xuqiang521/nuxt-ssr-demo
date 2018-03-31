<template>
  <div>
    <v-header></v-header>
    <div class="content-container">
      <nuxt/>
    </div>
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

