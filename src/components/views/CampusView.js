/*==================================================
// src/components/views/campusView.js
The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
// Import react and react-router-dom necessary libraries
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCampusThunk } from "../../store/thunks";

// Take in props data to construct the component
const CampusView = (props) => { // props is an object containing campus data
  const { campus } = props;
  const dispatch = useDispatch(); // Redux dispatch function to send actions to the store
  const history = useHistory(); // React Router history function to programmatically check history between routes
  
  // Handle deleting a campus
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this campus?")) {
      dispatch(deleteCampusThunk(campus.id)); // Call the delete thunk with the campus ID
      history.push("/campuses"); // Redirect to the campuses page
    }
  };

  // Render a single Campus view with list of its students
  return (
    <div>
  <h1>{campus.name}</h1>
  <p>{campus.address}</p>
  <p>{campus.description}</p>

  {/* Edit Campus Button */}
  <Link to={`/campus/${campus.id}/edit`}>
        <button>Edit</button>
  </Link>

  {/* Manage Campus Button */}
  <Link to="/students">
          <button>Manage Students</button>
  </Link>

  {/* Delete Campus Button */}
  <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
        Delete Campus
      </button>

  {/* Display List of Students */}
  {campus.students && campus.students.length ? (
    campus.students.map((student) => ( // student is an object containing student data
      <div key={student.id}>
        {/* Link into the Single Student page */}
        <Link to={`/student/${student.id}`}>
          <h2>{student.firstName} {student.lastName}</h2>
        </Link>
      </div>
    ))
  ) : (
    <p>This campus currently has no students enrolled.</p>
  )}
</div>
  );
};

// Export the component for use in other parts of the application
export default CampusView;