import React from 'react';
import './style/StudentTimetable.css';

function StudentTimetable() {
  // Mock subject data
  const subjects = [
    { code: 'MATH101', name: 'Mathematics', teacher: 'Mr. Raj' },
    { code: 'ENG102', name: 'English', teacher: 'Ms. Priya' },
    { code: 'SCI103', name: 'Science', teacher: 'Dr. Meena' },
    { code: 'CS104', name: 'Computer Science', teacher: 'Mr. Karan' },
    { code: 'PE105', name: 'Physical Education', teacher: 'Ms. Swetha' },
  ];

  // Mock timetable data
  const timetable = [
    {
      day: 'Monday',
      periods: ['Math', 'English', 'Science', 'Math', 'P.E.'],
    },
    {
      day: 'Tuesday',
      periods: ['Science', 'English', 'Math', 'Computer', 'Library'],
    },
    {
      day: 'Wednesday',
      periods: ['Computer', 'Math', 'Science', 'English', 'Art'],
    },
    {
      day: 'Thursday',
      periods: ['English', 'Computer', 'Math', 'Science', 'Sports'],
    },
    {
      day: 'Friday',
      periods: ['Math', 'English', 'Science', 'Library', 'Games'],
    },
  ];

  return (
    <div className="student-timetable-container">
      <h2>Subjects</h2>
      <table className="subjects-table">
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Teacher</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s, index) => (
            <tr key={index}>
              <td>{s.code}</td>
              <td>{s.name}</td>
              <td>{s.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Weekly Timetable</h2>
      <table className="timetable-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Period 1</th>
            <th>Period 2</th>
            <th>Period 3</th>
            <th>Period 4</th>
            <th>Period 5</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((day, index) => (
            <tr key={index}>
              <td>{day.day}</td>
              {day.periods.map((p, i) => (
                <td key={i}>{p}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTimetable;
