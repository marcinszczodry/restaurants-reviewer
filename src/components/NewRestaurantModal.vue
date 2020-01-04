<template>
  <div class="modal">
    <div class="header">
      <h2>Add new restaurant</h2>
      <button
        class="close"
        @click="$emit('modal-close')"
      >
        Cancel
      </button>
    </div>
    <div class="content">
      <p v-if="!location">
        Click on the map, to select restaurant's location
      </p>
      <p
        v-if="location"
      >
        Latitude: {{ latLng.lat | round }} |
        Longitude: {{ latLng.lng | round }}
      </p>
      <input
        v-if="location"
        v-model="name"
        type="text"
        placeholder="Restaurant's name"
      />
    </div>
    <div class="footer">
      <button
        :disabled="!location || !name"
        @click="$emit('add-restaurant', {
          name,
          geometry: {
            location,
          },
          rating: 1,
          ratingCount: 0,
        })"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewRestaurantModal',
  filters: {
    round(n) {
      return Math.round(n * 10000) / 10000;
    },
  },
  props: {
    googleInstance: {
      type: Object,
      required: true,
    },
    mapInstance: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      eventInstance: this.googleInstance.maps.event,
      latLng: null,
      name: null,
    };
  },
  computed: {
    location() {
      return this.latLng;
    },
  },
  mounted() {
    this.eventInstance.addListener(this.mapInstance, 'click', (e) => this.setLocation(e));
  },
  beforeDestroy() {
    this.removeClickListener();
  },
  methods: {
    setLocation(e) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      this.latLng = { lat, lng };
    },
    removeClickListener() {
      this.eventInstance.clearListeners(this.mapInstance, 'click');
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 400px;
    padding: 20px;
    border-radius: 20px;
    background: white;
    box-shadow: 10px 10px 83px 20px rgba(0,0,0,0.46);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .close {
    height: min-content;
  }
  .header, .content {
    border-bottom: 1px dotted grey;
  }
  .content > input {
    margin-bottom: 20px;
  }
  .footer {
    padding-top: 20px;
  }
</style>
