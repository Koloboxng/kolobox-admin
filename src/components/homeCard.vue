
<template>
  <v-card color="grey darken-2" height="160px">
    <v-card-title primary-title>
      <div>
        <div class="headline white--text">{{title}}</div>
        <span class="white--text">{{number}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: [String, Number],
      required: true,
      default: 0,
    },
  },
};
</script>
