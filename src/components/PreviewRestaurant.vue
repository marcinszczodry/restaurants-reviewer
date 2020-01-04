<template>
  <div>
    <button
      @click="$emit('close-preview')"
    >
      Go back
    </button>
    <h2>{{ details.name }}</h2>
    <table>
      <tr>
        <td>Rating</td>
        <td>{{ details.rating }}</td>
      </tr>
      <tr>
        <td>Number of votes</td>
        <td>{{ details.ratingCount }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PreviewRestaurant',
  props: {
    details: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style scoped>
</style>
