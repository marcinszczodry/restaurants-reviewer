<template>
  <div>
    <div class="map"></div>
  </div>
</template>

<script>
import Initializer from 'google-maps-api-loader';

export default {
  name: 'GoogleMapLoader',
  data() {
    return {
      API_KEY: 'AIzaSyD1QsK0TVMn_SWdk0k1K5oLR_DS0_6Cbqo',
      google: null,
      map: null,
    };
  },
  mounted() {
    Initializer({
      apiKey: this.API_KEY,
    }).then((google) => {
      this.google = google;
      this.initialize();
    });
  },
  methods: {
    initialize() {
      const container = this.$el.querySelector('.map');
      const { Map } = this.google.maps;
      this.map = new Map(container);
    },
  },
};
</script>

<style scoped>
  .map {
    height: 100%;
    width: 100%;
  }
</style>
