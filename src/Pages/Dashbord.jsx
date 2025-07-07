import './sytle/Dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUtensils,
  FaSearch,
} from 'react-icons/fa';
import SchoolCalendar from './calender';

function Dashboard() {
  const username = localStorage.getItem('username');

  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [studentRes, teacherRes, studentList, teacherList] = await Promise.all([
        axios.get('http://localhost:8080/api/student-count'),
        axios.get('http://localhost:8080/api/teachers-count'),
        axios.get('http://localhost:8080/api/students'),
        axios.get('http://localhost:8080/api/teachers'),
      ]);

      setStudentCount(studentRes.data);
      setTeacherCount(teacherRes.data);
      setStudents(studentList.data);
      setTeachers(teacherList.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // 🔍 Filter logic for students & teachers
  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = teachers.filter((teacher) =>
    `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

   const displayName = username
  ? username.split('@')[0].split('.')[0].charAt(0).toUpperCase() + username.split('@')[0].split('.')[0].slice(1)
  : '';

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <h2>Welcome, {displayName}!</h2>
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="searching-icon" />
            <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>
            {/* Search Results Dropdown */}
            {searchTerm && (
              <div className="search-dropdown">
                <strong>Search Results: Students</strong>
                <ul>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((s) => (
                      <li key={s.studentId}>{s.firstName} {s.lastName} — {s.standard}</li>))) : (<li>No results</li>)}
                </ul>
                <strong>Search Results: Teachers</strong>
                <ul>
                  {filteredTeachers.length>0?(
                    filteredTeachers.map((t) =>(
                      <li key={t.teacherId}>{t.firstName} {t.lastName} — {t.subject}</li>))):(<li>No results</li>)}
                </ul>
              </div>)}
      </div>
    </div>
      {/* Dashboard Stats */}
      <div className="dashboard-cards">
        <div className="cards students">
          <FaUserGraduate className="icon" />
          <div>
            <p>Students</p>
            <h2>{studentCount}</h2>
          </div>
        </div>

        <div className="cards teachers">
          <FaChalkboardTeacher className="icon" />
          <div>
            <p>Teachers</p>
            <h2>{teacherCount}</h2>
          </div>
        </div>

        <div className="cards events">
          <FaCalendarAlt className="icon" />
          <div>
            <p>Events</p>
            <h2>40</h2>
          </div>
        </div>

        <div className="cards foods">
          <FaUtensils className="icon" />
          <div>
            <p>Foods</p>
            <h2>32k</h2>
          </div>
        </div>
      </div>

      <div className="calender-page">
        <SchoolCalendar />
      </div>
    </div>
  );
}

export default Dashboard;
