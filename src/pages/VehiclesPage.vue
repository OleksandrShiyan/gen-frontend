<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card @click="openAddVehicleModal" height="150px">
          <v-card-title >Add new vehicle</v-card-title>
        </v-card>
      </v-col>
      <Vehicle
          v-for="vehicle in  vehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
          @openModal="openModal"
      />
    </v-row>
    <AddVehicleModal @refetchVehicles="fetchAllVehicles" :vehicle-types="types" :vehicle-statuses="statuses"
                     v-model="isModalOpen" :vehicle="currentVehicle"/>
  </v-container>
</template>

<script>
import Vehicle from "../components/vehicles/Vehicle";
import AddVehicleModal from "../components/vehicles/AddVehicleModal";
import {vehiclesAPI} from "../api/api";

export default {
  components: {AddVehicleModal, Vehicle},
  data: () => ({
    vehicles: [],
    types: [],
    statuses: [],
    currentVehicle: {},
    isModalOpen: false
  }),
  mounted() {
    this.fetchAllVehicles();
    this.fetchVehicleStatus();
    this.fetchVehicleType();
  },
  methods: {
    openModal(vehicle) {
      this.currentVehicle = vehicle;
      this.isModalOpen = true;
    },
    openAddVehicleModal() {
      this.currentVehicle = {};
      this.isModalOpen = true;
    },
    async fetchAllVehicles() {
      this.vehicles = await vehiclesAPI.getAllVehicles()
    },
    async fetchVehicleStatus() {
      this.statuses = await vehiclesAPI.getVehicleStatuses()
    },
    async fetchVehicleType() {
      this.types = await vehiclesAPI.getVehicleTypes()
    }
  }
}
</script>

<style scoped>

</style>