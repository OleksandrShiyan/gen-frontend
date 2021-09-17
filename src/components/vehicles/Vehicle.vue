<template>
  <v-col cols="4">
    <v-card min-height="150px" @click="openModal">
      <v-card-title>{{ `Model: ${vehicle.model}` }}</v-card-title>
      <v-card-text>
        {{ `Plate number:${vehicle.plate_number} Purchase date:${vehicle.purchase_date}` }}
        {{ `Mileage:${vehicle.mileage} km.  Type:${vehicle.type}` }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    vehicle: {
      type: Object,
      require: true
    }
  },
  methods: {
    openModal() {
      this.$emit('openModal', this.vehicle)
    }
  }
}
</script>

<style scoped>

</style>