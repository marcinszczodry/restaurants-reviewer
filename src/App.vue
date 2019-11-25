<template>
  <div>
    <google-map
      :center="userGeolocation ? userGeolocation : mapCenter"
      :zoom="mapZoom"
      @map-init="handleMapInit"
    >
      <google-map-anchor
        v-if="userGeolocation"
        :position="userGeolocation"
      />
    </google-map>
  </div>
</template>

<style lang="scss">
</style>

<script>
import GoogleMap from '@/components/GoogleMap.vue';
import GoogleMapAnchor from '@/components/GoogleMapAnchor.vue';

export default {
  components: {
    GoogleMapAnchor,
    GoogleMap,
  },
  data() {
    return {
      google: null,
      googleMap: null,
      map: {
        // by default fallback to england's coordinates
        center: { lat: 52.3555, lng: -1.1743 },
        zoom: 7,
      },
      status: {
        userGeolocationFinished: false,
        mapInitialized: false,
      },
      userGeolocation: null,
    };
  },
  computed: {
    mapCenter() {
      return this.map.center;
    },
    mapZoom() {
      return this.map.zoom;
    },
  },
  watch: {
    userGeolocation(coords) {
      this.map.zoom = 16;
      this.map.center = coords;
      if (this.googleMap) this.fetchRestaurants();
    },
    status: {
      handler({ mapInitialized }) {
        if (this.userGeolocation && mapInitialized) this.fetchRestaurants();
      },
      deep: true,
    },
  },
  async created() {
    this.userGeolocation = await this.getUserPosition();
  },
  methods: {
    handleMapInit({ google, map }) {
      this.google = google;
      this.googleMap = map;
      this.status.mapInitialized = true;
    },
    async getUserPosition() {
      let location = null;
      let message = null;
      const { geolocation } = navigator;
      try {
        if (!geolocation) return new Error('Looks like your browser does not support geolocation.');
        if (geolocation) {
          location = await new Promise((resolve, reject) => {
            const success = ({ latitude, longitude }) => {
              const coordinates = { lat: latitude, lng: longitude };
              resolve(coordinates);
            };
            const failure = (error) => {
              if (error === 1) message = 'Looks like you didn\'t let us use your location. Please enter it manually.';
              if (error === 2) message = 'We\'re having troubles to get your location. Please check your connection.';
              if (error === 3) message = 'It\'s taken to much time to obtain your location. Please enter it manually.';
              reject(message);
            };
            geolocation.getCurrentPosition(
              (pos) => success(pos.coords),
              (err) => failure(err.code),
            );
          });
        }
      } catch (error) {
        // eslint-disable-next-line
        console.warn(error);
      }
      this.status.userGeolocationFinished = true;
      return location;
    },
    async fetchRestaurants() {
      // fetch
    },
  },
};
</script>
