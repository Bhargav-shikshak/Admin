import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, remove } from "firebase/database";
import './Studentrequest.css';
function DisplayTeacherData() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const teachersRef = ref(db, 'registerforteacher');

      onValue(teachersRef, (snapshot) => {
        const teachersData = snapshot.val();
        if (teachersData) {
          const teachersArray = Object.keys(teachersData).map((uid) => ({
            uid,
            ...teachersData[uid],
          }));
          setTeachers(teachersArray);
        }
      });
    };

    fetchData();
  }, []);

  const handleUpdateStatus = (uid) => {
    const db = getDatabase();
    const teacherRef = ref(db, `registerforteacher/${uid}`);

    update(teacherRef, {
      Status: 'accepted', // Update to the desired status value
    });
  };

  const handleDeleteTeacher = (uid) => {
    const db = getDatabase();
    const teacherRef = ref(db, `registerforteacher/${uid}`);

    remove(teacherRef);
  };

  return (
    <div>
     <center><h1>Teacher Data</h1></center>
     <table className="student-table">
        <thead>
          <tr>
            <th>Student id</th>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.uid}>
              <td>{teacher.StudentId}</td>
              <td>{teacher.uid}</td>
              <td>{teacher.Name}</td>
              <td>{teacher.Location}</td>
              <td>{teacher.Contact}</td>
              <td>{teacher.Status}</td>
              <td>
              <button onClick={() => handleUpdateStatus(teacher.uid)} style={{ backgroundColor: 'blue', color: 'white', width:'100%' }}>Accept</button>

              </td>
              <td>
              <button onClick={() => handleDeleteTeacher(teacher.uid)} style={{ backgroundColor: 'blue', color: 'white' }}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTeacherData;
