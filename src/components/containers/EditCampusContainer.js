/*==================================================
// src/components/containers/EditCampusContainer.js
//
// The Container component fetches campus data and passes it
// to the EditCampusView for rendering and updates.
==================================================*/

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import EditCampusView from "../views/EditCampusView";

const EditCampusContainer = () => {
  // Get the campus ID from the URL params
  const { id } = useParams();
  
  // Initialize dispatch and history hooks
  const dispatch = useDispatch();
  const history = useHistory();
  
  // Get the campus data from Redux store
  const campus = useSelector((state) => state.campus);
  
  // Fetch the campus data when component mounts
  useEffect(() => {
    dispatch(fetchCampusThunk(id));
  }, [dispatch, id]);
  
  // Handle form submission
  const handleSubmit = async (updatedData) => {
    // Merge the updated form data with the campus ID
    const updatedCampus = { ...updatedData, id };
    
    // Dispatch the action to update the campus in database and Redux store
    await dispatch(editCampusThunk(updatedCampus));
    
    // Navigate back to the campus detail page after successful update
    history.push(`/campus/${id}`);
  };
  
  // Render the view component with necessary props
  return (
    <EditCampusView 
      campus={campus}
      onSubmit={handleSubmit}
    />
  );
};

export default EditCampusContainer;