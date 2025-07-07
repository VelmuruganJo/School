import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sytle/SchoolStudent.css';

function NewStudents() {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/student-admission');
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  const handleSelectStudent = async (student) => {
    try {
      await axios.delete(`http://localhost:8080/api/student-admission/${student.studentId}`);
      setStudents(prev => prev.filter(s => s.studentId !== student.studentId));
      navigate('/Jovel-admin/studentfrom', { state: { student } });
    } catch (error) {
      console.error('Failed to delete student:', error);
      alert('Error deleting student.');
    }
  };

  // 🔍 Get unique class list
  const classList = ['All', ...new Set(students.map(s => s.standard))];

  // 🧹 Filter students based on selected class
  const filteredStudents = selectedClass === 'All'
    ? students
    : students.filter(s => s.standard === selectedClass);

  return (
    <div>
      <h2>Students List</h2>

      {/* 🧭 Class Filter */}
      <div className="class-filter">
        {/* <strong>View by Class: </strong> */}
        {classList.map((cls, index) => (
          <button
            key={index}
            onClick={() => setSelectedClass(cls)}
            className={cls === selectedClass ? 'active-class' : ''}
            style={{ margin: '0 8px', padding: '2px 3px' }}
          >
            {cls}
          </button>
        ))}
      </div>

      <div className="students-container">
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
              <th>Option</th>
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
                <td>
                  <button onClick={() => handleSelectStudent(s)}>OK</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewStudents;
