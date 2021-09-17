<template>
  <v-dialog
      v-model="isModalOpen"
      max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Vehicle: {{ vehicle.model }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    required
                    :rules="textRules"
                    label="Model *"
                    v-model="model"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    required
                    :rules="textRules"
                    label="Plate number *"
                    v-model="plate_number"
                    hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    :rules="textRules"
                    label="Mileage in km. *"
                    v-model="mileage"
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
                    :rules="textRules"
                    label="Purchase date *"
                    v-model="purchase_date"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-select
                    :rules="selectRules"
                    :items="statuses"
                    v-model="status"
                    label="Status *"
                    required
                ></v-select>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-select
                    :rules="selectRules"
                    :items="types"
                    v-model="type"
                    label="Type *"
                    required
                ></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn
            color="red darken-1"
            text
            @click="deleteVehicle"
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
            @click="updateVehicle"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {vehiclesAPI} from "../../api/api";

export default {
  props: {
    vehicle: {
      type: Object,
      require: true
    },
    value: {
      type: Boolean,
      default: false
    },
    vehicleStatuses: {
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
    plate_number: null,
    model: null,
    type: null,
    purchase_date: null,
    mileage: null,
    status: null,
    statuses: [],
    types: [],
    textRules: [
      v => v && v.length >= 1 || "Field is required",
        v => v && v.length <= 14 || "Field should contain less than 14 symbols"
    ],
    selectRules: [
      v => v && v > 0 || "Field is required"
    ]

  }),
  methods: {
    async updateVehicle() {
      if (this.$refs.form.validate()){
        const vehicleObj = {
          id: this.id,
          plate_number: this.plate_number,
          model: this.model,
          type: this.type,
          purchase_date: this.purchase_date,
          mileage: this.mileage,
          status: this.status,
        };
        if (this.id) {
          await vehiclesAPI.updateVehicle(vehicleObj)
        } else {
          await vehiclesAPI.addVehicle(vehicleObj)
        }
        this.refetchVehicles()
        this.isModalOpen = false
      }
    },
    async deleteVehicle() {
      await vehiclesAPI.deleteVehicle(this.id)
      this.refetchVehicles()
      this.isModalOpen = false
    },
    refetchVehicles() {
      this.$emit('refetchVehicles')
    }
  },
  watch: {
    vehicle(newValue) {
      this.plate_number = newValue.plate_number;
      this.id = newValue.id;
      this.model = newValue.model;
      this.type = newValue.type;
      this.purchase_date = newValue.purchase_date;
      this.mileage = newValue.mileage;
      this.status = newValue.status;
    },
    vehicleStatuses(newValue) {
      this.statuses = newValue.map(status => ({text: status.status, value: status.id}))
    },
    vehicleTypes(newValue) {
      this.types = newValue.map(type => ({text: type.type, value: type.id}));
    },
    value(newValue) {
      this.isModalOpen = newValue;
    }
    , plate_number(newValue) {
      this.plate_number = newValue;
    }
    , model(newValue) {
      this.model = newValue;
    }
    , type(newValue) {
      this.type = newValue;
    }
    , purchase_date(newValue) {
      this.purchase_date = newValue;
    }
    , mileage(newValue) {
      this.mileage = newValue;
    }
    , status(newValue) {
      this.status = newValue;
    },
    isModalOpen(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style scoped>

</style>