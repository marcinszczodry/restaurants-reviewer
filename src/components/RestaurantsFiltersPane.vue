<template>
  <div class="filters">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'RestaurantsFiltersPane',
};
</script>

<style lang="scss" scoped>
  .filters {
    display: flex;
    box-sizing: border-box;
    position: fixed;
    top:0;
    left: 0;
    width: calc(100vw - 320px);
    background: white;
    padding: 20px;
  }

  .filters > * {
    padding: 0 20px;
    border-right: 1px solid grey;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
      border-right: none;
    }
  }
</style>
