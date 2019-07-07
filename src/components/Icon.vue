<template lang="pug">
  span(v-bind="$attrs" v-on="$listeners")
    template(v-if="mode==='svg'")
      svg.icon(aria-hidden="true")
        use(:xlink:href="`#icon-${type}`")
    template(v-else)
      i.icon.iconfont(:class="type")
</template>

<script>
export default {
  name: 'Icon',
  props: {
    mode: {
      type: String,
      default: 'svg' // icon | svg
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

