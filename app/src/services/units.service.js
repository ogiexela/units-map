import axios from 'axios'

// const API_BASE_URL = 'http://localhost:3001'
const API_BASE_URL = '/api'

const fetchUnits = (page, limit, filter) => axios
      .get(`${API_BASE_URL}/units`, { params: { page, limit, filter } })
      .then((response) => response.data)

const updatePropertyInterest = (id, value) => axios
    .patch(`${API_BASE_URL}/units/${id}`, { interest: value })
    .then((response) => response.data)

export const UnitsService = {
    fetchUnits,
    updatePropertyInterest
}
