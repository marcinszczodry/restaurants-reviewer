<script>
import marker from '@/mixins/marker';
// eslint-disable-next-line import/extensions
import ICON_USER from '../assets/icons/iconUser.svg?data';

export default {
  name: 'GoogleMapAnchor',
  mixins: [marker],
  props: {
    range: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      icon: ICON_USER,
      circle: null,
    };
  },
  methods: {
    initializeCircle() {
      const { Circle } = this.google.maps;
      return new Circle({
        strokeColor: '#0057FF',
        strokeOpacity: 0.8,
        strokeWeight: 0.5,
        fillColor: '#0057FF',
        fillOpacity: 0.18,
        map: this.map,
        center: this.position,
        radius: this.range,
      });
    },
    appendCircle(circleInstance) {
      circleInstance.setMap(this.map);
    },
    removeCircle(circleInstance) {
      circleInstance.setMap(null);
    },
    createCircle() {
      this.circle = this.initializeCircle();
      this.appendCircle(this.circle);
    },
    swapCircle() {
      this.removeCircle(this.circle);
      this.createCircle();
    },
  },
};
</script>
