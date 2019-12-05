<template>
  <div class="minmax">
    <div>
      min rating: {{ minValue }} {{ +minValue === 1 ? 'star' : 'stars' }}<br />
      <label>
        <input
          v-model="minValue"
          type="range"
          :min="1"
          :max="maxValue"
          @click="$emit('min', minValue)"
        />
      </label>
    </div>
    <div>
      max rating: {{ maxValue }} {{ +maxValue === 1 ? 'star' : 'stars' }}<br />
      <label>
        <input
          v-model="maxValue"
          type="range"
          :min="minValue"
          :max="5"
          @click="$emit('max', maxValue)"
        />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterByRating',
  props: {
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
      minValue: this.min,
      maxValue: this.max,
    };
  },
};
</script>

<style lang="scss" scoped>
  .minmax {
    display: inline-flex;
    >:first-child:not(:last-child) {
      margin-right: 20px;
    }
  }
</style>
