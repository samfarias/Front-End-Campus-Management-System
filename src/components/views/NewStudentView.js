/*==================================================
// src/components/views/NewStudentView.js
The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { useState } from "react";

// Create styling for the input form
const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    margin: "30px auto",
    padding: "30px 40px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  },
  formTitle: {
    backgroundColor: "#2E3A59",
    marginBottom: "25px",
    textAlign: "center",
    borderRadius: "10px 10px 0 0",
    padding: "15px",
  },
  formField: {
    marginBottom: "20px",
    width: "100%",
  },
  buttonContainer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
  },
  errorText: {
    color: "red",
    fontSize: "0.85rem",
    marginTop: "-8px",
    marginBottom: "10px",
  },
}));

const NewStudentView = ({ onSubmit, allCampuses }) => {//new student view component
  const classes = useStyles();

  const [formData, setFormData] = useState({//state for form fields
    firstName: "",
    lastName: "",
    email: "",
    gpa: "",
    imageUrl: "",
    campusId: "",
  });

  const [errors, setErrors] = useState({});//state for input validation errors

  const validate = (name, value) => {//validates individual input field
    let error = "";
    if (["firstName", "lastName"].includes(name) && !value.trim()) {
      error = "This field is required.";
    } else if (name === "email") {
      if (!value.trim()) error = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format.";
    } else if (name === "gpa") {
      const gpa = parseFloat(value);
      if (value && (isNaN(gpa) || gpa < 0 || gpa > 4)) {
        error = "GPA must be between 0.0 and 4.0.";
      }
    }
    return error;
  };

  const handleChange = (e) => {//updates data and triggers
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validate(name, value);
    setErrors((prev) => {
      const updated = { ...prev };
      if (error) updated[name] = error;
      else delete updated[name];
      return updated;
    });
  };

  const handleSubmit = (e) => {//validates all fields on submit 
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validate(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData); // submit validated data 
  };

  return (
    <div>
      <h1>Add Student View</h1>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{ fontWeight: 700, fontFamily: "'Merriweather', serif", fontSize: "22px", color: "#ffffff",}}>
              Add Student
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField className={classes.formField} label="First Name" name="firstName" variant="outlined" onChange={handleChange} />
            {errors.firstName && <div className={classes.errorText}>{errors.firstName}</div>}

            <TextField className={classes.formField} label="Last Name" name="lastName" variant="outlined" onChange={handleChange} />
            {errors.lastName && <div className={classes.errorText}>{errors.lastName}</div>}

            <TextField className={classes.formField} label="Email" name="email" variant="outlined" type="email" onChange={handleChange} />
            {errors.email && <div className={classes.errorText}>{errors.email}</div>}

            <TextField
              className={classes.formField}
              label="GPA"
              name="gpa"
              variant="outlined"
              type="number"
              inputProps={{ step: "0.1", min: "0", max: "4.0" }}
              onChange={handleChange}
              helperText="Enter a value between 0.0 and 4.0"
            />
            {errors.gpa && <div className={classes.errorText}>{errors.gpa}</div>}

            <TextField
              className={classes.formField}
              label="Image URL"
              name="imageUrl"
              variant="outlined"
              onChange={handleChange}
              helperText="Optional: Enter image URL"
            />

            <FormControl variant="outlined" className={classes.formField}>
              <InputLabel id="campus-select-label">Campus</InputLabel>
              <Select
                labelId="campus-select-label"
                id="campus-select"
                name="campusId"
                value={formData.campusId}
                onChange={handleChange}
                label="Campus"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {allCampuses &&
                  allCampuses.map((campus) => (
                    <MenuItem key={campus.id} value={campus.id}>
                      {campus.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>Select a campus (optional)</FormHelperText>
            </FormControl>

            <div className={classes.buttonContainer}>
              <Button variant="contained" color="primary" type="submit" disabled={Object.keys(errors).length > 0}>
                Submit
              </Button>
              <Button component={Link} to="/students" variant="contained">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStudentView;