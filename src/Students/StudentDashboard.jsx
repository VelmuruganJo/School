import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/StudentDashboard.css';

function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'STUDENT') {
      navigate('/');
    } else {
      fetchStudentInfo(token);
    }
  });

  const fetchStudentInfo = async (token) => {
    try {
      const email = localStorage.getItem('username');
      const response = await fetch(`http://localhost:8080/api/student-by-email?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Student not found or unauthorized');
      }

      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error('Failed to fetch student data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="student-dashboard">
      <div className="student-header">
        <h1>Welcome, {studentData?.firstName ?? ''} {studentData?.lastName ?? ''}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {studentData && (
        <div className="student-info-card">
          <h3>Student Information</h3>
          <p><strong>ID:</strong> STUVJ0{studentData.studentId}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Class:</strong> {studentData.standard}</p>
          <p><strong>Date of Birth:</strong> {studentData.dateOfBirth}</p>
          <p><strong>Mobile:</strong> {studentData.mobileNumber}</p>
          <p><strong>Gender:</strong> {studentData.gender}</p>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
