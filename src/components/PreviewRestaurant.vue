<template>
  <div>
    <button
      @click="$emit('close-preview')"
    >
      Go back
    </button>
    <h2>{{ details.name }}</h2>
    <img
      :src="streetViewUrl"
      :alt="`The front view of ${details.name}`"
    />
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
  data() {
    return {
      streetViewUrl: `https://maps.googleapis.com/maps/api/streetview?size=260x100&location=${this.details.geometry.location.lat()},${this.details.geometry.location.lng()}&heading=60&pitch=-0.76&key=AIzaSyD1QsK0TVMn_SWdk0k1K5oLR_DS0_6Cbqo`,
    };
  },
};
</script>

<style scoped>
</style>
