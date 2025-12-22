/*==================================================
// src/components/views/AllStudentsView.js
The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
// Import react and necessary libraries
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Take in props data to construct the component
const AllStudentsView = ({ students, deleteStudent }) => {
  // If there are no students yet, show a prompt
  if (!students.length) {
    return (
      <div>
        <p>There are no students.</p>
        <Link to="/newstudent"> {/* Link to your "Add Student" form */}
          <button>Add New Student</button>
        </Link>
      </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>All Students</h1>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-item">
            {/* Link into the Single Student page */}
            <Link to={`/student/${student.id}`}>
            <img
              src={student.imageUrl || "/default-student.png"}
              alt={`${student.firstName} ${student.lastName}`}
              width="120"
              height="120"
              style={{ borderRadius: "50%", objectFit: "cover", marginBottom: "10px" }}
            />
            <h3>{student.firstName} {student.lastName}</h3>
            </Link>
            {/* Delete student button */}
            <button onClick={() => deleteStudent(student.id)}>
              Delete
            </button>

            {/* Edit student link */}
            <Link to={`/student/${student.id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
        ))}
      </div>


      <br />
      {/* Link to your "Add Student" form */}
      <Link to="/newstudent">
        <button>Add New Student</button>
      </Link>
      <br />
      <br />
    </div>
  );
};

// Validate data type of the props passed to component.
AllStudentsView.propTypes = {
  students: PropTypes.array.isRequired, // Array of student objects
  deleteStudent: PropTypes.func.isRequired, // Function to delete a student
};

// Export the component for use in other parts of the application
export default AllStudentsView;