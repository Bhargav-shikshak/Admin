import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  
  useEffect(() => {
    const db = getDatabase();

    const teachersRef = ref(db, 'teachers');
    const unsubscribe = onValue(teachersRef, (snapshot) => {
      const teachersData = snapshot.val();
      const teachersArray = [];
      for (const key in teachersData) {
        if (teachersData.hasOwnProperty(key)) {
          const teacher = teachersData[key];
          teachersArray.push({
            additionalNote: teacher.additionalNote,
            address: teacher.address,
            city: teacher.city,
            email: teacher.email,
            image: teacher.image,
            phone: teacher.phone,
            pincode: teacher.pincode,
            qualification: teacher.qualification,
            state: teacher.state,
            subject: teacher.subject,
            teacherName: teacher.teacherName,
            uid: teacher.uid
          });
        }
      }
      setTeachers(teachersArray);
    });

    return () => {
      // Unsubscribe from database changes when component unmounts
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Teachers List</h1>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>
            <p>Name: {teacher.teacherName}</p>
            <p>Email: {teacher.email}</p>
            <p>Phone: {teacher.phone}</p>
            <p>Additional Note: {teacher.additionalNote}</p>
            <p>Address: {teacher.address}</p>
            <p>City: {teacher.city}</p>
            <p>Pincode: {teacher.pincode}</p>
            <p>Qualification: {teacher.qualification}</p>
            <p>State: {teacher.state}</p>
            <p>Subject: {teacher.subject}</p>
            {teacher.image && <img src={teacher.image} alt={teacher.teacherName} />}
            {/* Render other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersList;
