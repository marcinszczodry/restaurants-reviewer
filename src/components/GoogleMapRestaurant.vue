<script>
import marker from '@/mixins/marker';

export default {
  name: 'GoogleMapRestaurant',
  mixins: [marker],
  data() {
    return {
    };
  },
  mounted() {
    this.google.maps.event.addListener(this.marker, 'click', () => {
      this.$emit('restaurant-clicked', this.restaurantDetails);
    });
  },
};
</script>
