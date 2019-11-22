<template>
  <div>
    <div class="map"></div>
    <template v-if="!!google && !!map">
      <slot />
    </template>
  </div>
</template>

<script>
import Initializer from 'google-maps-api-loader';

export default {
  name: 'GoogleMap',
  data() {
    return {
      API_KEY: 'AIzaSyD1QsK0TVMn_SWdk0k1K5oLR_DS0_6Cbqo',
      google: null,
      map: null,
    };
  },
  created() {
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

<style>
  .map {
    height: 100vh;
    width: 100%;
  }
</style>
