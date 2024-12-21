import axios from 'axios'



// creates an instance of axios named API.
// configure common options baseURL and headers for all HTTP requests made with this API instance
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
})


// add the following headers to each outgoing HTTP request
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})


const AUTH_PATH = '/api/auth'
const DOCTOR_PATH = '/api/doctor'
const PATIENT_PATH = '/api/patient'



// Authentication API calls: API.get('/endpoint')
export const authAPI = {
  registerUser: (userInfo) => API.post(`${AUTH_PATH}/register`, userInfo),
  loginUser : (userInfo) => API.post(`${AUTH_PATH}/login`, userInfo),
  verifyEmail : (userInfo) => API.get(`${AUTH_PATH}/${userInfo.role}/${userInfo.id}/verify/${userInfo.token}`),

}

// Doctor-related API calls
export const doctorAPI = {
  fetchDoctors: () => API.get(`${DOCTOR_PATH}/fetchDoctors`),
  fetchDoctor: (doctorID) => API.get(`${DOCTOR_PATH}/fetchDoctor/${doctorID}`),
  updateDoctor: (loggedInUser) => API.patch(`${DOCTOR_PATH}/updateDoctor/${loggedInUser._id}`, loggedInUser),
  deleteDoctor: (doctorID) => API.delete(`${DOCTOR_PATH}/deleteDoctor/${doctorID}`),
  submitReview: (doctorID, reviewData) => API.post(`${DOCTOR_PATH}/${doctorID}/review`, reviewData), 
  searchDoctors: (doctorName) => API.get(`${DOCTOR_PATH}/search?doctorName=${doctorName}`), 

}

export const patientAPI = {
  deletePatient: (patientID) => API.delete(`${PATIENT_PATH}/deletePatient/${patientID}`),
  
}