<template>
  <v-container>
    <v-row>
      <v-card>
        <v-card-title>Add new route</v-card-title>
        <v-btn @click="openAddRouteModal"></v-btn>
      </v-card>
      <Route
          v-for="route in  routes"
          :key="route.id"
          :route="route"
          @openModal="openModal"
      />
    </v-row>
    <AddRouteModal @refetchRoutes="fetchAllRoutes" :vehicle-types="vehicleTypes" :routeStatuses="routeStatuses"
                   v-model="isModalOpen" :route="currentRoute"/>
  </v-container>
</template>

<script>
import Route from "../components/routes/Route";
import AddRouteModal from "../components/routes/AddRouteModal";
import {routesAPI, vehiclesAPI} from "../api/api";

export default {
  components: {AddRouteModal, Route},
  data: () => ({
    routes: [],
    currentRoute: {},
    routeStatuses: [],
    vehicleTypes: [],
    isModalOpen: false
  }),
  mounted() {
    this.fetchAllRoutes()
    this.fetchRouteStatuses()
    this.fetchVehicleTypes()
  },
  methods: {
    openModal(route) {
      this.currentRoute = route;
      this.isModalOpen = true;
    },
    openAddRouteModal() {
      this.currentRoute = {};
      this.isModalOpen = true;
    },
    async fetchAllRoutes() {
      this.routes = await routesAPI.getAllRoutes()
    },
    async fetchRouteStatuses() {
      this.routeStatuses = await routesAPI.getRouteStatuses()
    },
    async fetchVehicleTypes() {
      this.vehicleTypes = await vehiclesAPI.getVehicleTypes();
    }
  }
}
</script>

<style scoped>

</style>