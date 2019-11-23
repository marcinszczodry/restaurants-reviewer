<template>
  <div>
    <google-map
      :center="mapCenter"
      :zoom="mapZoom"
    />
  </div>
</template>

<style lang="scss">
</style>

<script>
import GoogleMap from '@/components/GoogleMap.vue';

export default {
  components: {
    GoogleMap,
  },
  data() {
    return {
      map: {
        // by default fallback to england's coordinates
        center: { lat: 52.3555, lng: -1.1743 },
        zoom: 7,
      },
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
};
</script>
