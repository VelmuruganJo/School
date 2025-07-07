import React, { useState } from 'react';
import './Style/ForgotPassword.css';

function TeacherForgotPassword({ onClose }) {
  const [email, setEmail] = useState('');
  const [teacherData, setTeacherData] = useState(null);

  const fetchTeacherInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/teacher-by-email?email=${email}`);
      if (!response.ok) {
        throw new Error('Teacher not found or unauthorized');
      }
      const data = await response.json();
      setTeacherData(data);
      // alert(`Fetched Admin info for ${data.firstName}`);
    } catch (error) {
      console.error('Failed to fetch Teacher data:', error);
      alert('Teacher not found or error retrieving data.');
    }
  };

  const handleReset = () => {
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }
    fetchTeacherInfo();
  };

  return (
    <div className="forgot-container">
      <h2 className='forget-title'>Admin Forgot Password</h2>
      <label htmlFor="" className='forget-lable'> Email : </label>
      <input
        type="email"
        placeholder="Enter registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="forgot-input"
      />

      {teacherData && (
        <div className="student-info">
          <p><strong>User Name:</strong>{teacherData.email}</p>
          <p><strong>Password:</strong>{teacherData.lastName} {/* TEMP */}</p>
        </div>
      )}

      <div className="forgot-actions">
        <button onClick={handleReset} className="forgot-submit">Get Password</button>
        <button onClick={onClose} className="forgot-cancel">Close</button>
      </div>
    </div>
  );
}

export default TeacherForgotPassword;
