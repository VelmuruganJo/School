import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sytle/SchoolStudent.css';

function NewTeachers() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/teacher-admission');
      setTeachers(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };
  const handleSelectTeacher = async (teacher) => {
    try {
      await axios.delete(`http://localhost:8080/api/teacher-admission/${teacher.teacherId}`);
      setTeachers(prev => prev.filter(s => s.teacherId !== teacher.teacherId));
      navigate('/Jovel-admin/teachersfrom', { state: { teacher } });
    } catch (error) {
      console.error('Failed to delete teacher:', error);
      alert('Error deleting teacher.');
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
              <td>{t.teacherId}</td>
              <td>{t.firstName} {t.lastName}</td>
              <td>{t.gender}</td>
              <td>{t.dateOfBirth}</td>
              <td>{t.email}</td>
              <td>{t.mobileNumber}</td>
              <td>{t.qualification}</td>
              <td>{t.subject}</td>
              <td><button onClick={() => handleSelectTeacher(t)}>OK</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewTeachers;
