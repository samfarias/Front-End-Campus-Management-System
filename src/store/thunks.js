/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from './actions/actionCreators';  // Import Action Creators ("ac" keyword Action Creator)
const axios = require('axios'); // Import axios for API calls

// Automatically choose base URL: local OR production
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://full-stack-crud-application-server-back.onrender.com/api"
    : "/api";


//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "campuses" data from database
    const res = await axios.get(`${API_BASE}/campuses`);  
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllCampuses(res.data));
  }
  // Handle error
  catch(err) {
    console.error('Error fetching campuses:', err);
  }
};

// Add Campus
// THUNK CREATOR:
export const addCampusThunk = (campus) => async (dispatch) => {  // The THUNK
  try {
    // API "post" call to add "campus" object's data to database
    const res = await axios.post(`${API_BASE}/campuses`, campus);  
    // Call Action Creator to return Action object (type + payload with new campus data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addCampus(res.data));
    return res.data; 
  } 
  // Handle error
  catch(err) {
    console.error('Error adding campus:', err);
    throw err; // Re-throw the error so we can handle it in the component
  }
};

// Delete Campus
// THUNK CREATOR:
export const deleteCampusThunk = campusId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete campus (based on "campusId") from database
    await axios.delete(`${API_BASE}/campuses/${campusId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteCampus(campusId));
  }
  // Handle error
  catch(err) {
    console.error('Error deleting campus:', err);
  }
};

// Edit Campus
// THUNK CREATOR:
export const editCampusThunk = (campus) => async (dispatch) => {
  try {
    // Send PUT and pull the updated record from response.data
    const response = await axios.put(`${API_BASE}/campuses/${campus.id}`, campus);
    const updated = response.data;

    // Dispatch only the updated campus object (not the full response)
    dispatch(ac.editCampus(updated));

    // Return updated if you need to chain promises
    return updated;
  } 
  // Handle error
  catch (err) {
    console.error('Error editing campus:', err);
  }
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get a campus data (based on "id") from database
    const res = await axios.get(`${API_BASE}/campuses/${id}`);  
    dispatch(ac.fetchCampus(res.data));
  } 
  // Handle error
  catch(err) {
    console.error('Error fetching campus:', err);
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "students" data from database
    const res = await axios.get(`${API_BASE}/students`);  
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllStudents(res.data));  
  } 
  // Handle error
  catch(err) {
    console.error('Error fetching students:', err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {  // The THUNK
  try {
    // API "post" call to add "student" object's data to database
    const res = await axios.post(`${API_BASE}/students`, student);  
    // Call Action Creator to return Action object (type + payload with new students data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addStudent(res.data));
    return res.data; 
  } 
  // Handle error
  catch(err) {
    console.error('Error adding student:', err);
    throw err; // Re-throw the error so we can handle it in the component
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = studentId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete student (based on "studentID") from database
    await axios.delete(`${API_BASE}/students/${studentId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteStudent(studentId));
  }
  // Handle error
  catch(err) {
    console.error('Error deleting student:', err);
  }
};

// Edit Student
// THUNK CREATOR:
export const editStudentThunk = (student) => async (dispatch) => {
  try {
    // 1. Send PUT and pull the updated record from response.data
    const response = await axios.put(`${API_BASE}/students/${student.id}`, student);
    const updated = response.data;

    // 2. Dispatch only the updated student object (not the full response)
    dispatch(ac.editStudent(updated));

    // Return updated if you need to chain promises
    return updated;
  } 
  // Handle error
  catch (err) {
    console.error('Error editing student:', err);
  }
};

// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = id => async dispatch => {  // The THUNK
  try {
    // API "get" call to get a specific student (based on "id") data from database
    const res = await axios.get(`${API_BASE}/students/${id}`);  
    // Call Action Creator to return Action object (type + payload with student data)
    // Then dispatch the Action object to Reducer to display student data 
    dispatch(ac.fetchStudent(res.data));
  } 
  // Handle error
  catch(err) {
    console.error('Error fetching student:', err);
  }
};
