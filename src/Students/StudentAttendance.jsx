import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sytle/SchoolStudent.css'

function StudentAttendance() {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState(null);
  const [status, setStatus] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!token || role !== 'STUDENT') {
      navigate('/');
    } else {
      fetchStudentInfo();
    }
  }),[];

  const fetchStudentInfo = async () => {
    try {
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
      fetchAttendance(data.studentId);
    } catch (error) {
      console.error('Failed to fetch Student data:', error);
    }
  };

  const fetchAttendance = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/student-attendance/${id}`);
      setAttendanceList(res.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const markAttendance = async () => {
    if (!status || !studentData) return alert('Select a status and ensure student is loaded');

    try {
      await axios.post('http://localhost:8080/api/student-attendance', {
        studentId: studentData.studentId,
        date: new Date().toISOString().split('T')[0],
        status,
      });
      fetchAttendance(studentData.studentId);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const fetchByDateRange = async () => {
    if (!startDate || !endDate || !studentData) return alert('Select dates and ensure student is loaded');

    try {
      const res = await axios.get(`http://localhost:8080/api/student-attendance/range/${studentData.studentId}`, {
        params: { start: startDate, end: endDate },
      });
      setAttendanceList(res.data);
    } catch (error) {
      console.error('Error fetching by range:', error);
    }
  };

  if (!studentData) {
    return <div>Loading student data...</div>;
  }
  const isMarkedToday = attendanceList.some(a => a.date === new Date().toISOString().split('T')[0]);


  return (
    <div className="attendance-container">
      <h2>student Attendance</h2>
      <h4>student ID: TEAVJ0{studentData.studentId}</h4>

      <div className="mark-section">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>
        <button onClick={markAttendance} disabled={isMarkedToday}>
  {isMarkedToday ? "Already Marked" : "Mark Attendance"}
</button>
      </div>

      <div className="filter-section">
        <label>From: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
        <label>To: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></label>
        <button onClick={fetchByDateRange}>Filter</button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.map((a, index) => (
            <tr key={index}>
              <td>{a.date}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendance;
