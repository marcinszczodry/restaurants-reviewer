<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseRightPane',
};
</script>

<style scoped>
  div {
    position: fixed;
    top: 0;
    right: 0;
    padding: 30px;
    height: 100vh;
    overflow-y: auto;
    width: 320px;
    background: white;
  }
</style>
