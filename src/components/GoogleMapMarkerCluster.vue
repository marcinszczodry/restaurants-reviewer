<template>
  <div>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'GoogleMapMarkerCluster',
  data() {
    return {
      google: this.$parent.google,
      map: this.$parent.map,
      markers: [],
    };
  },
  mounted() {
    this.markers = this.getMarkers();
  },
  methods: {
    getMarkers() {
      return this.$children.map((m) => m.marker);
    },
  },
  render: () => null,
};
</script>
