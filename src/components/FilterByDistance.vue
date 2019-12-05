<template>
  <div>
    <div>
      <label>
        {{ min }}
        <input
          v-model="rangeValue"
          type="range"
          :min="min"
          :max="max"
        />
      </label>
      {{ max }}
    </div>
    <button @click="$emit('rangeChange', rangeValue)">
      Search within ({{ rangeValue }}) meters
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterByDistance',
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rangeValue: this.value,
    };
  },
};
</script>

<style scoped>
</style>
