// require('dotenv').config()
import axios from 'axios'

// const api = axios.create({
//     // baseURL: 'https://cchen.nucat.gatech.edu/api',
//     baseURL: 'http://localhost:3000/api',  // backend running on 3000
// })
const api = axios

export const insertEvent = payload => api.post(`/api/event`, payload)
export const getAllEvents = () => api.get(`/api/events`)
export const updateEventById = (id, payload) => api.put(`/api/event/${id}`, payload)
export const deleteEventById = id => api.delete(`/api/event/${id}`)
export const getEventById = id => api.get(`/api/event/${id}`)

// export const insertInfo = payload => api.post(`/info`, payload)
export const getAllInfos = () => api.get(`/api/infos`)
// export const updateInfoById = (id, payload) => api.put(`/info/${id}`, payload)
// export const deleteInfoById = id => api.delete(`/info/${id}`)
export const getInfoById = id => api.get(`/api/info/${id}`)

// export const insertCandidate = payload => api.post(`/candidate`, payload)
export const getAllCandidates = () => api.get(`/api/candidates`)
// export const updateCandidateById = (id, payload) => api.put(`/candidate/${id}`, payload)
// export const deleteCandidateById = id => api.delete(`/candidate/${id}`)
export const getCandidateById = id => api.get(`/api/candidate/${id}`)

const apis = {
    insertEvent,
    getAllEvents,
    // updateEventById,    // TODO
    // deleteEventById,    // TODO
    getEventById,

    // insertInfo,
    getAllInfos,
    // updateInfoById,
    // deleteInfoById,
    getInfoById,

    // insertCandidate,
    getAllCandidates,
    // updateCandidateById,
    // deleteCandidateById,
    getCandidateById,
}

export default apis