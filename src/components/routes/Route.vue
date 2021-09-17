<template>
  <v-col cols="4">
    <v-card @click="openModal" min-height="200px">
      <v-card-title>{{ `From: ${route.start_city} To: ${route.end_city}` }}</v-card-title>
      <v-card-text>
        {{ `Distance:${route.distance}km. Derapture date:${route.departure_date}` }}
        {{ `Expected revenue:${route.expected_revenue}$  Status:${route.route_status.status}` }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      required: true
    }
  },
  methods: {
    openModal() {
      this.$emit('openModal', this.route)
    }
  }
}
</script>

<style scoped>

</style>