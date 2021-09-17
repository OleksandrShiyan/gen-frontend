import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/api/'
})

export const routesAPI = {
    getAllRoutes() {
        return instance.get(`routes`).then(response => response.data.routes)
    },
    getRouteStatuses() {
        return instance.get('routes/status').then(response => response.data.routeStatuses)
    },
    createRoute(routeObj) {
        return instance.post('routes', routeObj).then(response => response.data)
    },
    updateRoute(routeObj) {
        return instance.put('routes', routeObj).then(response => response.data)
    },
    deleteRoute(id) {
        return instance.delete('routes/' + id).then(response => response.data)
    }
}

export const vehiclesAPI = {
    getAllVehicles() {
        return instance.get('vehicles').then(response => response.data.vehicles)
    },
    getVehicle(id) {
        return instance.get('vehicles/' + id).then(response => response.data.vehicle)
    },
    getVehiclesByTypeStatus(type, status) {
        return instance.get(`vehicles/typestatus/${type}/${status}`).then(response => response.data.vehicles)
    },
    getVehicleTypes() {
        return instance.get('vehicles/type').then(response => response.data.vehicleTypes)
    },
    getVehicleStatuses() {
        return instance.get('vehicles/status').then(response => response.data.vehicleStatuses)
    },
    addVehicle(vehicleObj) {
        return instance.post('vehicles', vehicleObj).then(response => response.data)
    },
    updateVehicle(vehicleObj) {
        return instance.put(`vehicles`, vehicleObj).then(response => response.data)
    },
    deleteVehicle(id) {
        return instance.delete('vehicles/' + id).then(response => response.data)
    }

}