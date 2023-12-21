import axios from "axios"

// getAllPatient 
export const getAllPatientApi = async ()=>{
    return await axios.get('http://localhost:4000/api/users')
}

// post patient 
export const postPatientApi = async ()=>{
    return await axios.post(`http://localhost:4000/api/users`)
}

// delete patient 
export const deletePatientApi = async (id)=>{
    return await axios.delete(`http://localhost:4000/api/users/${id}`)
}

// Edit patient
export const updatePatientApi = async (id,patientData)=>{
    return await axios.put(`http://localhost:4000/api/users/${id}`,patientData)
}
// Add patient
export const addPatientApi = async (patientData)=>{
return await axios.post(`http://localhost:4000/api/users`,patientData)
}