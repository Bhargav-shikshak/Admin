import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

const App = () => {
  const [teachersCount, setTeachersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    // Reference to the "teachers" collection in Firebase Realtime Database
    const teachersRef = ref(getDatabase(), 'teachers');

    // Listen for changes in the number of entries in the "teachers" collection
    const teachersUnsubscribe = onValue(teachersRef, (snapshot) => {
      // Get the number of entries in the "teachers" collection
      const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
      // Update the state with the count
      setTeachersCount(count);
    });

    // Reference to the "students" collection in Firebase Realtime Database
    const studentsRef = ref(getDatabase(), 'students');

    // Listen for changes in the number of entries in the "students" collection
    const studentsUnsubscribe = onValue(studentsRef, (snapshot) => {
      // Get the number of entries in the "students" collection
      const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
      // Update the state with the count
      setStudentsCount(count);
    });

    // Clean up the subscriptions when the component unmounts
    return () => {
      teachersUnsubscribe();
      studentsUnsubscribe();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
    <h1 style={{ padding: '20px', textAlign: 'center' }}>Admin Dashboard</h1>
    
    <div style={{ 
      backgroundColor: 'lightgray', 
      padding: '20px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding box shadow
      borderRadius: '8px', // Adding border radius
      marginBottom: '20px' // Adding some margin at the bottom for spacing
    }}>
      <h2>Student</h2>
      <p>Number of entries in the "students" collection: {studentsCount}</p>
    </div>

    <div style={{ 
      backgroundColor: 'lightgray', 
      padding: '20px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adding box shadow
      borderRadius: '8px', // Adding border radius
      marginBottom: '20px' // Adding some margin at the bottom for spacing
    }}>
      <h2>Teacher</h2>
      <p>Number of entries in the "teachers" collection: {teachersCount}</p>
    </div>
  </div>
  );
};

export default App;
