/*==================================================
src/components/views/NewCampusView.js
The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new campus page.
================================================== */
import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

const NewCampusView = (props) => {//new campusview component
  const { 
    handleChange, 
    handleSubmit,
    errors,
    values
  } = props;
  
  const classes = useStyles();

  return (
    <div>
      <h1>New Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 700, fontFamily: "'Merriweather', serif", fontSize: "22px", color: "#ffffff", }}>
              Add a Campus
            </Typography>
          </div>
          <form style={{ textAlign: 'left' }} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              className={classes.formField}
              label="Campus Name"
              name="name"
              variant="outlined"
              value={values.name}
              onChange={(e) => handleChange(e)}
              error={!!errors.name}
              helperText={errors.name}
              required
            />

            <TextField
              className={classes.formField}
              label="Campus Address"
              name="address"
              variant="outlined"
              value={values.address}
              onChange={(e) => handleChange(e)}
              error={!!errors.address}
              helperText={errors.address}
              required
            />

            <TextField
              className={classes.formField}
              label="Description"
              name="description"
              variant="outlined"
              multiline
              rows={4}
              value={values.description}
              onChange={(e) => handleChange(e)}
              error={!!errors.description}
              helperText={errors.description}
              required
            />

            <TextField
              className={classes.formField}
              label="Image URL"
              name="imageUrl"
              variant="outlined"
              value={values.imageUrl}
              onChange={(e) => handleChange(e)}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl || "Enter a URL for the campus image"}
            />

            <div className={classes.buttonContainer}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <Button component={Link} to="/campuses" variant="contained">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCampusView;