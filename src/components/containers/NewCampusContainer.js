/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      // Form values
      name: '',
      address: '',
      description: '',
      imageUrl: '',
      // Form errors
      errors: {
        name: '',
        address: '',
        description: '',
        imageUrl: ''
      },
      // Redirect after submission
      redirect: false,
      redirectId: null,
      // General error
      submitError: null
    };
  }

  // Validate form fields
  validateField = (name, value) => {
    let errors = { ...this.state.errors };
    
    switch (name) {
      case 'name':
        errors.name = 
          value.trim().length === 0
            ? 'Campus name is required'
            : value.trim().length < 2
              ? 'Campus name must be at least 2 characters'
              : '';
        break;
      case 'address':
        errors.address = 
          value.trim().length === 0
            ? 'Address is required'
            : '';
        break;
      case 'description':
        errors.description = 
          value.trim().length === 0
            ? 'Description is required'
            : '';
        break;
      case 'imageUrl':
        if (value.trim().length > 0) {
          try {
            new URL(value);
            errors.imageUrl = '';
          } catch (error) {
            errors.imageUrl = 'Please enter a valid URL';
          }
        } else {
          errors.imageUrl = '';
        }
        break;
      default:
        break;
    }

    return errors;
  };

  // Validate entire form
  validateForm = () => {
    let valid = true;
    const fields = ['name', 'address', 'description'];
    
    // Check required fields
    fields.forEach(field => {
      if (this.state[field].trim().length === 0) {
        const errors = this.validateField(field, this.state[field]);
        this.setState({ errors });
        valid = false;
      }
    });

    // Check imageUrl if it's not empty
    if (this.state.imageUrl.trim().length > 0) {
      try {
        new URL(this.state.imageUrl);
      } catch (error) {
        const errors = this.validateField('imageUrl', this.state.imageUrl);
        this.setState({ errors });
        valid = false;
      }
    }

    return valid;
  };

  // Capture input data when it is entered
  handleChange = event => {
    const { name, value } = event.target;
    
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: this.validateField(name, value)[name]
      }
    }));
  };

  // Take action after user clicks the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit

    if (!this.validateForm()) {
      return;
    }

    try {
      // Create a new campus object
      const campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl || undefined // Only include if provided
      };
      
      // Add new campus to database
      let newCampus = await this.props.addCampus(campus);

      // Update state, and trigger redirect to the new campus page
      this.setState({
        name: '',
        address: '',
        description: '',
        imageUrl: '',
        redirect: true,
        redirectId: newCampus.id,
        submitError: null
      });
    } catch (err) {
      this.setState({
        submitError: 'An error occurred while adding the campus. Please try again.'
      });
      console.error(err);
    }
  };

  // Unmount when the component is being removed from the DOM
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    // Redirect to new campus's page after submit
    if (this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>);
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        {this.state.submitError && (
          <div style={{color: 'red', textAlign: 'center', marginBottom: '20px'}}>
            {this.state.submitError}
          </div>
        )}
        <NewCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          values={{
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            imageUrl: this.state.imageUrl
          }}
        />
      </div>
    );
  }
}


const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus))
  };
};


export default connect(null, mapDispatch)(NewCampusContainer);