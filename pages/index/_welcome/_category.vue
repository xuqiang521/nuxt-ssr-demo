<template>
  <div>{{ a }}</div>
</template>

<script>
export default {
  asyncData ({ params, error }) {
    return {
      a: params.category
    }
  }
}
</script>
