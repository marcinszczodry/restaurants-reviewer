<template>
  <div>
    <slot />
  </div>
</template>
<script>
import MarkerClusterer from '@google/markerclusterer';
// eslint-disable-next-line import/extensions
import ICON_CIRCLE from '@/assets/icons/iconCircle.svg?data';

export default {
  name: 'GoogleMapMarkerCluster',
  data() {
    return {
      google: this.$parent.google,
      map: this.$parent.map,
      markers: [],
      clusterer: null,
    };
  },
  updated() {
    this.clusterer.clearMarkers();
    this.markers = this.getMarkers();
    this.clusterer.addMarkers(this.markers);
  },
  mounted() {
    this.markers = this.getMarkers();
    this.clusterer = new MarkerClusterer(
      this.map,
      this.markers,
      {
        styles: [{
          url: ICON_CIRCLE,
          height: 20,
          width: 20,
          // anchor: [22],
          textColor: '#fff',
          textSize: 12,
        }],
      },
    );
  },
  methods: {
    getMarkers() {
      return this.$children.map((m) => m.marker);
    },
  },
  render: () => null,
};
</script>
