// eslint-disable-next-line import/extensions
import ICON_RESTAURANT from '@/assets/icons/iconPizza.svg?data';

export default {
  props: {
    position: {
      type: Object,
      required: true,
    },
    restaurantDetails: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      google: this.$parent.google,
      map: this.$parent.map,
      marker: null,
      icon: ICON_RESTAURANT,
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
      icon: this.icon,
    });
    if (!this.isParentClusterer()) this.marker.setMap(this.map);
  },
  destroyed() {
    if (!this.isParentClusterer()) this.marker.setMap(null);
  },
  methods: {
    isParentClusterer() {
      return this.$parent.$options.name === 'GoogleMapMarkerCluster';
    },
  },
  render: () => null,
};
