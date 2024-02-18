import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const db = getDatabase();

    const teachersRef = ref(db, "teachers");
    const unsubscribe = onValue(teachersRef, (snapshot) => {
      const teachersData = snapshot.val();
      const teachersArray = [];
      for (const key in teachersData) {
        if (teachersData.hasOwnProperty(key)) {
          const teacher = teachersData[key];
          teachersArray.push({
            ...teacher,
            uid: key,
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

  const handleFieldChange = (e, index, field) => {
    const updatedTeachers = [...teachers];
    updatedTeachers[index][field] = e.target.value;
    setTeachers(updatedTeachers);
    // Update the database with the modified data
    updateDatabase(updatedTeachers[index]);
  };

  const updateDatabase = (teacher) => {
    const db = getDatabase();
    set(ref(db, `teachers/${teacher.uid}`), teacher);
  };

  return (
    <div>
      <h1>Teachers List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Additional Note</th>
            <th>Address</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Qualification</th>
            <th>State</th>
            <th>Subject</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={teacher.teacherName}
                  onChange={(e) => handleFieldChange(e, index, "teacherName")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.email}
                  onChange={(e) => handleFieldChange(e, index, "email")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.phone}
                  onChange={(e) => handleFieldChange(e, index, "phone")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.additionalNote}
                  onChange={(e) => handleFieldChange(e, index, "additionalNote")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.address}
                  onChange={(e) => handleFieldChange(e, index, "address")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.city}
                  onChange={(e) => handleFieldChange(e, index, "city")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.pincode}
                  onChange={(e) => handleFieldChange(e, index, "pincode")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.qualification}
                  onChange={(e) => handleFieldChange(e, index, "qualification")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.state}
                  onChange={(e) => handleFieldChange(e, index, "state")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.subject}
                  onChange={(e) => handleFieldChange(e, index, "subject")}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={teacher.image}
                  onChange={(e) => handleFieldChange(e, index, "image")}
                />
                {teacher.image && <img src={teacher.image} alt={teacher.teacherName} />}
              </td>
              {/* Render other fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeachersList;
