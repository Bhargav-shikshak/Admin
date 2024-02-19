
import React, { Component } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import "./teachermatch.css";

class Greens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherData: null,
      selectedTeacher: null,
      displayDetails: false,
      displayPopup: false,
      registrationStatus: null,
    };
  }

  componentDidMount() {
    const teachersRef = ref(getDatabase(), "teachers");

    onValue(teachersRef, (snapshot) => {
      this.setState({ teacherData: snapshot.val() });
    });
  }

  handleDropdownChange = (event) => {
    this.setState({ selectedTeacher: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ displayDetails: true });
  };

  handleRegisterClick = () => {
    const registerforteacherRef = ref(getDatabase(), "registerforteacher");

    const teacherId = this.state.selectedTeacher;
    onValue(registerforteacherRef.child(teacherId), (snapshot) => {
      const registrationData = snapshot.val();
      if (registrationData && registrationData.Status === "accepted" && registrationData.TeacherId === teacherId) {
        this.setState({ registrationStatus: "accepted" });
      } else {
        this.setState({ registrationStatus: null });
      }

      this.setState({ displayPopup: true });
    });
  };

  closePopup = () => {
    this.setState({ displayPopup: false });
  };

  render() {
    const { teacherData, selectedTeacher, displayDetails, displayPopup, registrationStatus } = this.state;

    return (
      <div className="greens-container">
        <div className="greens">
          <center><h1 className="title">TEACHERS PAGE</h1></center>
          <div>
            <center><h2>Teacher Data:</h2></center>  
            <div style={{ padding: '20px' }}>
              
              <select
                id="teacherDropdown"
                onChange={this.handleDropdownChange}
                value={selectedTeacher || ""}
              >
                <option value="" disabled>Select a teacher</option>
                {teacherData &&
                  Object.entries(teacherData).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.address}
                    </option>
                  ))}
              </select>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>

            {displayDetails && selectedTeacher && teacherData && (
               <div className="greens">
    <div className="details-column">
    <label htmlFor="teacherDropdown">Select a Teacher:</label>
      <h3>{teacherData[selectedTeacher].teacherName}</h3>
      <p><strong>Teacher ID:</strong> {teacherData[selectedTeacher].teacherId}</p>
      <p><strong>Email:</strong> {teacherData[selectedTeacher].email}</p>
      <p><strong>Phone:</strong> {teacherData[selectedTeacher].phone}</p>
      <p><strong>Qualification:</strong> {teacherData[selectedTeacher].qualification}</p>
      <p><strong>Address:</strong> {teacherData[selectedTeacher].address}</p>
      <p><strong>City:</strong> {teacherData[selectedTeacher].city}</p>
      <p><strong>State:</strong> {teacherData[selectedTeacher].state}</p>
      <p><strong>Pincode:</strong> {teacherData[selectedTeacher].pincode}</p>
      <p><strong>Subjects:</strong>{" "}
        {Object.entries(teacherData[selectedTeacher].subjects)
          .filter(([subject, isChecked]) => isChecked)
          .map(([subject]) => subject)
          .join(", ")}
      </p>
    </div>
    <div className="details-column">
      <img
        src={teacherData[selectedTeacher].image}
        alt={`Teacher ${teacherData[selectedTeacher].teacherName}`}
      />
    </div>
  </div>
            )}

            {displayPopup && registrationStatus === "accepted" && (
              <div className="popup">
                <h3>Matched Teacher Data:</h3>
                <p>
                  <strong>Teacher ID:</strong> {teacherData[selectedTeacher].teacherId}
                </p>
                <p>
                  <strong>Email:</strong> {teacherData[selectedTeacher].email}
                </p>
                {/* Include other details you want to display */}
                <button onClick={this.closePopup}>Close</button>

                <div className="details-column">
    <center><h1 className="title">TEACHERS PAGE</h1></center>
  </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}

export default Greens;
