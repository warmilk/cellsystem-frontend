<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getItem, setItem } from '@/utils/storage'

export default {
  created() {
    getItem('state') &&
      this.$store.replaceState(
        Object.assign(this.$store.state, JSON.parse(getItem('state')))
      )

    window.addEventListener('beforeunload', () => {
      setItem('state', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less" scoped>
</style>
