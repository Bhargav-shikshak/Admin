import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

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
      <h1>Students List</h1>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <p>Address: {student.address}</p>
            <p>Age: {student.age}</p>
            <p>Alternate Phone: {student.alternatePhone}</p>
            <p>CGPA Percentage: {student.cgpaPercentage}</p>
            <p>City: {student.city}</p>
            <p>Class Requirement: {student.classRequirement}</p>
            <p>College: {student.college}</p>
            <p>Email: {student.email}</p>
            <p>Parent Name: {student.parentName}</p>
            <p>Password: {student.password}</p>
            <p>Phone: {student.phone}</p>
            <p>Pincode: {student.pincode}</p>
            <p>Selected Subject: {student.selectedSubject}</p>
            <p>State: {student.state}</p>
            <p>Student Class: {student.studentClass}</p>
            <p>Student ID: {student.studentId}</p>
            <p>Student Name: {student.studentName}</p>
            <p>UID: {student.uid}</p>
            {student.image && <img src={student.image} alt={student.studentName} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
