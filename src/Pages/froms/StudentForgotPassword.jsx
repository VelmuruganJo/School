import React, { useState } from 'react';
import './Style/ForgotPassword.css';

function StudentForgotPassword({ onClose }) {
  const [email, setEmail] = useState('');
  const [studentData, setStudentData] = useState(null);

  const fetchStudentInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/student-by-email?email=${email}`);
      if (!response.ok) {
        throw new Error('Student not found or unauthorized');
      }
      const data = await response.json();
      setStudentData(data);
      // alert(`Fetched student info for ${data.firstName}`);
    } catch (error) {
      console.error('Failed to fetch student data:', error);
      alert('Student not found or error retrieving data.');
    }
  };

  const handleReset = () => {
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }
    fetchStudentInfo();
  };

  return (
    <div className="forgot-container">
      <h2 className='forget-title'>Student Forgot Password</h2>
      <label htmlFor="" className='forget-lable'> Email : </label>
      <input
        type="email"
        placeholder="Enter registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="forgot-input"
      />

      {studentData && (
        <div className="student-info">
          <p><strong>User Name:</strong> {studentData.email}</p>
          <p><strong>Password:</strong> {studentData.lastName} {/* TEMP */}</p>
        </div>
      )}

      <div className="forgot-actions">
        <button onClick={handleReset} className="forgot-submit">Get Password</button>
        <button onClick={onClose} className="forgot-cancel">Close</button>
      </div>
    </div>
  );
}

export default StudentForgotPassword;
