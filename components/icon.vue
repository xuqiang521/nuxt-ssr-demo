<template>
  <i :class="['icon', `ion-${name}`]" :style="getStyle">
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 14
    },
    fontUnit: {
      type: String,
      validator (val) {
        return ['px', 'rem', 'em', '%', 'pt', 'pc', 'in', 'cm', 'mm', 'ex', 'vw', 'vh'].indexOf(val) > -1
      },
      default: 'px'
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    getStyle () {
      const style = {}
      this.size && (style.fontSize = this.size + this.fontUnit)
      this.color && (style.color = this.color)
      return style
    }
  }
}
</script>
