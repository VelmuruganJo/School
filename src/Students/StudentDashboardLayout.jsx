import { Routes, Route } from 'react-router-dom';

import Menubar from './Menubar';
import StudentDashboard from './StudentDashboard';
import StudentTimetable from './StudentTimetable';
import StudentAttendance from './StudentAttendance';

function StudentDashboardLayout() {
  return (
    <div style={{ display: 'flex' }}>
      
      <div style={{ width: 280 ,position:'fixed'}}>
        <Menubar />
      </div>

      <div style={{ flex: 1, padding: '20px' ,marginLeft:280}}>
        <Routes>
          <Route path="student-dashboard" element={<StudentDashboard   />} />
          <Route path="time-table" element={<StudentTimetable />} />
          <Route path="Attendance" element={<StudentAttendance />} />
          {/* <Route path="NewTeachers" element={<NewTeachers />} /> */}
          {/* <Route path="NewStudents" element={<NewStudents />} /> */}
          {/* <Route path="users" element={<FromConnection />} /> */}
          {/* <Route path="studentfrom" element={<StudentFrom />} /> */}
          {/* <Route path="teachersfrom" element={<TeacherFrom />} /> */}
          {/* <Route path='Jovel-student/student-home' element={<StudentDashboard/>}/> */}
        </Routes>
      </div>
    </div>
  );
}

export default StudentDashboardLayout;
