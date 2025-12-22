/*==================================================
// src/components/containers/EditStudentContainer.js
//
// The Container component fetches student data and passes it
// to the EditStudentView for rendering and updates.
==================================================*/

import React, { useEffect } from "react"; // Import React and useEffect hook
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for dispatching actions and accessing state
import { useParams, useHistory } from "react-router-dom";  // Import Redux thunk functions for fetching and editing a student
import { fetchStudentThunk, editStudentThunk, fetchAllCampusesThunk } from "../../store/thunks"; // Import the presentational view component (the form UI)
import EditStudentView from '../views/EditStudentView'; // Import the presentational view component (the form UI)


// This is the container component that connects Redux logic to the EditStudentView
const EditStudentContainer = () => {
  // useParams gives access to route parameters; we extract the student ID from the URL
  const { id } = useParams();

  // useDispatch gives us a way to dispatch Redux actions (thunks in this case)
  const dispatch = useDispatch();

  // useHistory allows for navigation after a successful form submission
  const history = useHistory();

  // useSelector allows us to get the student data from the Redux state
  const student = useSelector((state) => state.student);
  const allCampuses = useSelector((state) => state.allCampuses);
  // Fetch the student's data when the component mounts or the ID changes
  useEffect(() => {
    dispatch(fetchStudentThunk(id));
    dispatch(fetchAllCampusesThunk());
  }, [dispatch, id]);

  // Handle the form submission from the EditStudentView
  const handleSubmit = async (updatedData) => {
    // Merge the updated form data with the student ID (since the form doesn't include it)
    const updatedStudent = { ...updatedData, id };

    // Dispatch the editStudentThunk to update the student in the database and Redux store
    await dispatch(editStudentThunk(updatedStudent));

    // After the update is successful, navigate back to the student's individual view
    history.push(`/student/${id}`);
  };

  // Render the presentational form component and pass down the student data and submit handler
  return (
    <EditStudentView
      student={student}           // Data to pre-fill the form
      allCampuses={allCampuses}
      onSubmit={handleSubmit}     // Function to call when the form is submitted
    />
  );
};

// Export the container so it can be used in routing (App.js)
export default EditStudentContainer;
