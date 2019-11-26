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
    };
  },
};
</script>
