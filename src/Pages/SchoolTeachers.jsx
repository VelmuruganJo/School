import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sytle/SchoolStudent.css'; // Optional CSS

function TeachersAdmissionFrom() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/teachers');
      setTeachers(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  return (
    <div className="students-container ">
      <h2>All Teacher Admissions</h2>
      <table className="table1">
        <thead>
          <tr>
            <th>Admission ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Qualification</th>
            <th>Subject Applied</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.teacherId}>
              <td>TEAVJ0{t.teacherId}</td>
              <td>{t.firstName} {t.lastName}</td>
              <td>{t.gender}</td>
              <td>{t.dateOfBirth}</td>
              <td>{t.email}</td>
              <td>{t.mobileNumber}</td>
              <td>{t.qualification}</td>
              <td>{t.subject}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeachersAdmissionFrom;
