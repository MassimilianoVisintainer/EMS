import axios from "axios";

const REST_API_BASE_URL = "http://51.20.79.155:8080/api/employees";

export const listEmployees = () => {
    return  axios.get(REST_API_BASE_URL);
}

export const createEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL, employee);
}

export const getEmployeeById = (id) => {
    return axios.get(`${REST_API_BASE_URL}/${id}`);
}

export const updateEmployee = (id, employeeUpdated) => {
    return axios.put(`${REST_API_BASE_URL}/${id}`, employeeUpdated);
}

export const deleteEmployee = (id) => {
    return axios.delete(`${REST_API_BASE_URL}/${id}`);
}

