export default {
  props: {
    position: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      google: this.$parent.google,
      map: this.$parent.map,
      marker: null,
    };
  },
  watch: {
    position: {
      handler(coords) {
        this.marker.setPosition(coords);
      },
      deep: true,
    },
  },
  mounted() {
    const { Marker } = this.google.maps;
    this.marker = new Marker({
      position: this.position,
    });
    this.marker.setMap(this.map);
  },
  render: () => null,
};
