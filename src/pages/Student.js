import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import './student.css';
const StudentsList = () => {
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    const db = getDatabase();

    const studentsRef = ref(db, 'students');
    const unsubscribe = onValue(studentsRef, (snapshot) => {
      const studentsData = snapshot.val();
      const studentsArray = [];
      for (const key in studentsData) {
        if (studentsData.hasOwnProperty(key)) {
          const student = studentsData[key];
          studentsArray.push(student);
        }
      }
      setStudents(studentsArray);
    });

    return () => {
      // Unsubscribe from database changes when component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div>
     <center><h1>Students List</h1></center>
      <table className="student-details">
        <thead>
          <tr>
          <th>Image</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>CGPA Percentage</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>College</th>
            <th>Parent Name</th>
            <th>Alternate Phone</th>
            <th>Class Requirement</th>
            <th>Selected Subject</th>
            <th>UID</th>
            <th>Password</th>
            
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
               <td>{student.image && <img src={student.image} alt={student.studentName} style={{ width: '100px', height: '70px' }}/>}</td>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.age}</td>
              <td>{student.studentClass}</td>
              <td>{student.cgpaPercentage}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.city}</td>
              <td>{student.state}</td>
              <td>{student.address}</td>
              <td>{student.pincode}</td>
              <td>{student.college}</td>
              <td>{student.parentName}</td>
              <td>{student.alternatePhone}</td>
              <td>{student.classRequirement}</td>
              <td>{student.selectedSubject}</td>
              <td>{student.uid}</td>
              <td>{student.password}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
