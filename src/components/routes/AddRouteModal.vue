<template>
  <v-dialog
      v-model="isModalOpen"
      max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Route: {{ route.start_city }} --> {{ route.end_city }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  label="Start city *"
                  v-model="start_city"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  label="End city *"
                  v-model="end_city"
                  required
                  hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  label="Expected revenue in $ *"
                  v-model="expected_revenue"
                  hint="example of persistent helper text"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  label="Departure date *"
                  v-model="departure_date"
                  required
              ></v-text-field>
            </v-col>
            <v-col cols="12"
                   sm="6"
                   md="4">
              <v-text-field
                  label="Completion date"
                  v-model="completion_date"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  label="Distance in km. *"
                  v-model="distance"
                  required
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="4"
            >
              <v-select
                  :items="statuses"
                  v-model="status"
                  label="Status *"
                  required
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                sm="4"
            >
              <v-select
                  :items="types"
                  v-model="requested_vehicle_type"
                  label="Required vehicle type *"
                  required
              ></v-select>
            </v-col>
            <v-col
                v-if="+status !== 2"
                cols="12"
                sm="4"
            >
              <v-select
                  :items="availableVehicles"
                  v-model="vehicle_id"
                  label="Vehicle"
              ></v-select>
            </v-col>
            <v-col
                v-else
                cols="12"
                sm="4"
            >
              <v-select
                  disabled
                  :items="availableVehicles"
                  v-model="vehicle_id"
                  label="Vehicle"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="red darken-1"
            text
            @click="deleteRoute"
        >
          Delete
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="isModalOpen = false"
        >
          Close
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="updateRoute"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {routesAPI, vehiclesAPI} from "../../api/api";

export default {
  props: {
    route: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    routeStatuses: {
      type: Array,
      required: true
    },
    vehicleTypes: {
      type: Array,
      required: true
    }
  },
  created() {
    this.isModalOpen = value;
  },
  data: () => ({
    isModalOpen: false,
    id: null,
    start_city: null,
    end_city: null,
    distance: null,
    departure_date: null,
    requested_vehicle_type: null,
    expected_revenue: null,
    vehicle_id: null,
    status: null,
    completion_date: null,
    statuses: [],
    types: [],
    availableVehicles: []
  }),
  methods: {
    async updateRoute() {
      const routeObj = {
        id: this.id,
        start_city: this.start_city,
        end_city: this.end_city,
        distance: this.distance,
        departure_date: this.departure_date,
        requested_vehicle_type: this.requested_vehicle_type,
        expected_revenue: this.expected_revenue,
        vehicle_id: this.vehicle_id,
        status: this.status,
        completion_date: this.completion_date,
      };
      if (this.id) {
        await routesAPI.updateRoute(routeObj);
      } else {
        await routesAPI.createRoute(routeObj);
      }
      this.refetchRoutes();
      this.isModalOpen = false;
    },
    async deleteRoute() {
      await routesAPI.deleteRoute(this.id);
      this.refetchRoutes();
      this.isModalOpen = false;
    },
    refetchRoutes() {
      this.$emit('refetchRoutes');
    }
  },
  watch: {
    route(newValue) {
      this.start_city = newValue.start_city;
      this.id = newValue.id;
      this.end_city = newValue.end_city;
      this.distance = newValue.distance;
      this.departure_date = newValue.departure_date;
      this.requested_vehicle_type = newValue.vehicle_type?.id;
      this.expected_revenue = newValue.expected_revenue;
      this.vehicle_id = newValue.vehicle_id;
      this.status = newValue.route_status?.id;
      this.completion_date = newValue.completion_date;
    },
    routeStatuses(newValue) {
      this.statuses = newValue.map(status => ({text: status.status, value: status.id}))
    },
    vehicleTypes(newValue) {
      this.types = newValue.map(type => ({text: type.type, value: type.id}));
    },
    value(newValue) {
      this.isModalOpen = newValue;
    }
    , start_city(newValue) {
      this.start_city = newValue;
    }
    , end_city(newValue) {
      this.end_city = newValue;
    }
    , distance(newValue) {
      this.distance = newValue;
    }
    , departure_time(newValue) {
      this.departure_time = newValue;
    }
    , async requested_vehicle_type(newValue) {
      const availableVehicles = await vehiclesAPI.getVehiclesByTypeStatus(newValue, 1);
      this.availableVehicles = availableVehicles.map(vehicle => ({text: vehicle.model, value: vehicle.id}))
      this.requested_vehicle_type = newValue;
    }
    , expected_revenue(newValue) {
      this.expected_revenue = newValue;
    }
    , vehicle_id(newValue) {
      this.vehicle_id = newValue;
    }
    , async status(newValue) {
      if (+this.status === 2 && this.vehicle_id) {
        const vehicle = await vehiclesAPI.getVehicle(this.vehicle_id)
        this.availableVehicles = [{value: vehicle.id, text: vehicle.model}]
      }
      this.status = newValue;
    }
    , completion_date(newValue) {
      this.completion_date = newValue;
    },
    isModalOpen(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style scoped>

</style>