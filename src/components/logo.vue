<template>
  <div class="logo">
    <img src="@/assets/logo.png" />
    <span :class="dark ? 'dark' : ''">细胞识别系统</span>
  </div>
</template>

<script>
export default {
  props: {
    dark: Boolean
  }
}
</script>

<style lang="less" scoped>
.logo {
  cursor: default;

  height: 100%;

  display: flex;
  align-items: center;
  img {
    height: 100%;
    margin-right: 0.25rem;
  }
  span {
    font-size: 1.25rem;
    font-weight: 700;
  }
}
.dark {
  color: #fff;
}
</style>
