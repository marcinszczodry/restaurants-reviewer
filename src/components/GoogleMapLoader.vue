<template>
  <div></div>
</template>

<script>
import Initializer from 'google-maps-api-loader';

export default {
  name: 'GoogleMapLoader',
  data() {
    return {
      API_KEY: 'AIzaSyD1QsK0TVMn_SWdk0k1K5oLR_DS0_6Cbqo',
      google: null,
    };
  },
  mounted() {
    Initializer({
      apiKey: this.API_KEY,
    }).then((google) => {
      this.google = google;
    });
  },
};
</script>

<style scoped>
</style>
