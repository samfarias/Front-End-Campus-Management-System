/*==================================================
// src/components/views/EditCampusView.js
// The Views component is responsible for rendering the edit campus page.
// It displays a form with existing campus data and handles submission.
==================================================*/

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// Custom styles using Material UI's makeStyles
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

// Component to edit a single campus's info
const EditCampusView = ({ campus, onSubmit }) => {
  const classes = useStyles();

  // State to manage form fields
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Populate initial data when campus loads
  useEffect(() => {
    if (campus) {
      setFormData({
        name: campus.name || "",
        address: campus.address || "",
        description: campus.description || "",
        imageUrl: campus.imageUrl || "",
      });
    }
  }, [campus]);

  // Real-time validation logic
  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Campus name is required.";
        break;
      case "address":
        if (!value.trim()) error = "Campus address is required.";
        break;
      default:
        break;
    }

    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      const error = validate(key, val);
      if (error) validationErrors[key] = error;
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  // Form UI rendering
  return (
    <div>
      <h1>Edit Campus</h1>
      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
          <Typography style={{
          fontWeight: 700,
          fontFamily: "'Merriweather', serif",
          fontSize: "22px",
          color: "#ffffff",
            }} > Update Campus Info
          </Typography>
          </div>

          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.formField}
              label="Campus Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className={classes.errorText}>{errors.name}</div>}

            <TextField
              className={classes.formField}
              label="Address"
              name="address"
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {errors.address && <div className={classes.errorText}>{errors.address}</div>}

            <TextField
              className={classes.formField}
              label="Description"
              name="description"
              variant="outlined"
              multiline
              minRows={4}
              value={formData.description}
              onChange={handleChange}
              helperText="Provide a description of the campus"
            />

            <TextField
              className={classes.formField}
              label="Image URL"
              name="imageUrl"
              variant="outlined"
              value={formData.imageUrl}
              onChange={handleChange}
              helperText="Optional: Enter campus image URL"
            />

            <div className={classes.buttonContainer}>
              <Button variant="contained" color="primary" type="submit">
                Update Campus
              </Button>
              <Button component={Link} to={`/campus/${campus.id}`} variant="contained">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCampusView;