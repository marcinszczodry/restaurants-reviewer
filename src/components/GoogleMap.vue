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
  props: {
    center: {
      type: Object,
      required: true,
      validator: (obj) => {
        const { lat, lng } = obj;
        const hasKeys = ['lat', 'lng'].every((key) => key in obj);
        const areLatLngNumbers = typeof (lat) === 'number' && typeof (lng) === 'number';
        const isLatInRange = lat >= -90 && lat <= 90;
        const isLngInRange = lng >= -180 && lng <= 180;
        return hasKeys && areLatLngNumbers && isLatInRange && isLngInRange;
      },
    },
    zoom: {
      type: Number,
      required: false,
      default: 6,
      validator: (value) => Number.isInteger(value) && value >= 0 && value < 18,
    },
  },
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
      const options = {
        center: this.center,
        zoom: this.zoom,
      };
      this.map = new Map(container, options);
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
