<template>
  <ul>
    <li
      v-for="res in list"
      :key="res.id"
      @click="$emit('restaurant-clicked', res)"
    >
      <p
        v-if="res.rating"
        class="res__rating"
      >
        {{ res.rating }} ({{ res.ratingCount }})
      </p>
      <h2 class="res__name">
        {{ res.name }}
      </h2>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RestaurantsList',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
  ul {
    list-style: none;
  }
  li {
    border-bottom: 1px solid grey;
  }
</style>
