import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sytle/SchoolStudent.css';

function SchoolStudentsCount() {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('All');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  // Generate class list
  const classList = [...new Set(students.map((s) => s.standard))];
  const allClassList = [...classList, 'All'];

  // Calculate count per class
  const classCounts = {};
  classList.forEach((cls) => {
    classCounts[cls] = students.filter((s) => s.standard === cls).length;
  });
  classCounts['All'] = students.length;

  // Filtered students for selected class
  const filteredStudents = selectedClass === 'All'
    ? students
    : students.filter((s) => s.standard === selectedClass);

  return (
    <div className="students-container">
      <h2>Students Class Count Summary</h2>

      {/* Class Count Table */}
      <table className="table1" style={{ marginBottom: '30px' }}>
        <thead>
          <tr>
            <th>Class</th>
            {allClassList.map((cls, index) => (
              <th key={index}>{cls}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Students</td>
            {allClassList.map((cls, index) => (
              <td key={index}>{classCounts[cls]}</td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Filter Buttons */}
      <div className="class-filter">
        {/* <strong>View Students by Class: </strong> */}
        {['All', ...classList].map((cls, index) => (
          <button
            key={index}
            onClick={() => setSelectedClass(cls)}
            className={cls === selectedClass ? 'active-class' : ''}
            style={{ margin: '3px', padding: '3px 4px' }}
          >
            {cls}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
        Showing {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} in {selectedClass === 'All' ? 'all classes' : selectedClass}
      </div>

      {/* Student List Table */}
      <table className="table1">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Class</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => (
            <tr key={s.studentId}>
              <td>STUVJ0{s.studentId}</td>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.gender}</td>
              <td>{s.standard}</td>
              <td>{s.dateOfBirth}</td>
              <td>{s.email}</td>
              <td>{s.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchoolStudentsCount;
