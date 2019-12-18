<template>
  <div class="modal">
    <div class="header">
      <h2>Add new restaurant</h2>
      <button
        @click="$emit('modal-close')"
        class="close"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewRestaurantModal',
};
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 400px;
    padding: 20px;
    border-radius: 20px;
    background: white;
    box-shadow: 10px 10px 83px 20px rgba(0,0,0,0.46);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dotted grey;
  }
  .close {
    height: min-content;
  }
</style>
