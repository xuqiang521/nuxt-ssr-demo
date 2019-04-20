<template>
  <div 
    class="search-from"
    :class="{
      'focus': focused
    }">
    <input
      v-model="currentValue"
      class="search-input"
      :type="type"
      :placeholder="placeholder"
      :maxlength="~~maxlength"
      @keyup.enter="search"
      @change="handleChange"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur">
    <img v-show="type === 'search'" class="search-icon" :src="searchImg" alt="搜索">
  </div>
</template>

<script>
export default {
  name: 'VInput',
  props: {
    type: {
      type: String,
      default: 'search'
    },
    placeholder: {
      type: String,
      default: '搜索掘金'
    },
    maxlength: {
      type: [Number, String],
      default: 20
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentValue: this.value,
      focused: false,
      searchImg: require('@/assets/img/search.svg')
    }
  },
  watch: {
    focused (val) {
      if (val) {
        this.searchImg = require('@/assets/img/active-search.svg')
      } else {
        this.searchImg = require('@/assets/img/search.svg')
      }
    }
  },
  methods: {
    search () {
      this.$emit('search', this.currentValue)
    },
    handleChange () {
      this.$emit('change', this.currentValue)
    },
    handleInput () {
      this.$emit('input', this.currentValue)
    },
    handleFocus (event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleBlur (event) {
      this.focused = false
      this.$emit('blur', event)
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-from {
  display flex
  align-items center
  -webkit-box-pack justify
  -ms-flex-pack justify
  justify-content space-between
  border 1px solid hsla(0, 0%, 59%, .2)
  border-radius 2px
  background-color rgba(227, 231, 236, .2)
  .search-input {
    border none
    width 10rem
    padding .6rem 1rem
    box-shadow none
    outline none
    font-size 1.1rem
    color #666
    background-color transparent
  }
  .search-icon {
    padding 0 .5rem
    cursor pointer  
  }
}
.search-from.focus {
  background #fff
  border 1px solid #007fff  
}
</style>
