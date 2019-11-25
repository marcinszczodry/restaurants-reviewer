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
    };
  },
  render: () => null,
};
</script>
