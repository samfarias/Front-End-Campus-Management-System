/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  constructor(props){
    super(props);
    this.state = {// Local component state to track redirection and error messages
      redirect: false,
      redirectId: null,
      error: null
    };
  }

  componentDidMount() {
    this.props.fetchAllCampuses();
  }

  handleSubmit = async (formData) => {//handles submittion of new student form
    try {
      const gpa = parseFloat(formData.gpa);//valid gpa input 
      if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
        this.setState({ error: "GPA must be a number between 0 and 4.0" });
        return;
      }

      const student = {//build student object for submission 
        ...formData,
        gpa,
        imageUrl: formData.imageUrl || null,
        campusId: formData.campusId ? parseInt(formData.campusId) : null
      };

      const newStudent = await this.props.addStudent(student);//dispatch action to add student to database
      if (newStudent && newStudent.id) {//redirect on success
        this.setState({
          redirect: true,
          redirectId: newStudent.id,
          error: null
        });
      } else {
        this.setState({ error: "Something went wrong. Try again." });
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: "Server error. Try again." });
    }
  };

  render() {
    if (this.state.redirect) {// Redirect to the new student's individual page
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        {this.state.error && (
          <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
            {this.state.error}
          </div>
        )}
        <NewStudentView
          onSubmit={this.handleSubmit}
          allCampuses={this.props.allCampuses}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  allCampuses: state.allCampuses
});

const mapDispatch = (dispatch) => ({
  addStudent: (student) => dispatch(addStudentThunk(student)),
  fetchAllCampuses: () => dispatch(fetchAllCampusesThunk())
});

export default connect(mapState, mapDispatch)(NewStudentContainer);