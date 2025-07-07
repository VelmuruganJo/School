import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style/Attendance.css'

function TeacherAttendance() {
  const navigate = useNavigate();

  const [teacherData, setTeacherData] = useState(null);
  const [status, setStatus] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const token = localStorage.getItem('token');
  const email = localStorage.getItem('username');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!token || role !== 'TEACHER') {
      navigate('/');
    } else {
      fetchTeacherInfo();
    }
  });

  const fetchTeacherInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/teacher-by-email?email=${email}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Teacher not found or unauthorized');
      }
      const data = await response.json();
      setTeacherData(data);
      fetchAttendance(data.teacherId); // ✅ fetch attendance after teacher is loaded
    } catch (error) {
      console.error('Failed to fetch Teacher data:', error);
    }
  };

  const fetchAttendance = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/teacher-attendance/${id}`);
      setAttendanceList(res.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const markAttendance = async () => {
    if (!status || !teacherData) return alert('Select a status and ensure teacher is loaded');

    try {
      await axios.post('http://localhost:8080/api/teacher-attendance', {
        teacherId: teacherData.teacherId,
        date: new Date().toISOString().split('T')[0],
        status,
      });
      fetchAttendance(teacherData.teacherId);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  const fetchByDateRange = async () => {
    if (!startDate || !endDate || !teacherData) return alert('Select dates and ensure teacher is loaded');

    try {
      const res = await axios.get(`http://localhost:8080/api/teacher-attendance/range/${teacherData.teacherId}`, {
        params: { start: startDate, end: endDate },
      });
      setAttendanceList(res.data);
    } catch (error) {
      console.error('Error fetching by range:', error);
    }
  };

  if (!teacherData) {
    return <div>Loading teacher data...</div>;
  }
  const isMarkedToday = attendanceList.some(a => a.date === new Date().toISOString().split('T')[0]);


  return (
    <div className="attendance-container">
      <h2>Teacher Attendance</h2>
      <h4>Teacher ID: TEAVJ0{teacherData.teacherId}</h4>

      <div className="mark-section">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>
        <button onClick={markAttendance} disabled={isMarkedToday}>
            {isMarkedToday ? "Already Marked" : "Mark Attendance"}</button>
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
</table>

<div className="attendance-table-body-scroll">
  <table className="attendance-table inner-table">
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
    </div>
  );
}

export default TeacherAttendance;
