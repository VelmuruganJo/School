import { Routes, Route } from 'react-router-dom';

import Menubar from './Menubar';
import Dashboard from './Dashbord';
import SchoolStudents from './SchoolStudents';
import SchoolTeachers from './SchoolTeachers'
import NewTeachers from './NewTeachers';
import NewStudents from './NewStudents'
import FromConnection from './froms/FromConnection';
import TeacherFrom from './froms/Teacher';
import StudentFrom from './froms/Student';
import StudentDashboard from '../Students/StudentDashboard';
import TeacherAttendance from './froms/TeacherAttendance';

function DashboardLayout() {
  return (
    <div style={{ display: 'flex' }}>
      
      <div style={{ width: 280 }}>
        <Menubar />
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Attendance" element={<TeacherAttendance />} />
          <Route path="SchoolStudents" element={<SchoolStudents />} />
          <Route path="SchoolTeachers" element={<SchoolTeachers />} />
          <Route path="NewTeachers" element={<NewTeachers />} />
          <Route path="NewStudents" element={<NewStudents />} />
          <Route path="users" element={<FromConnection />} />
          <Route path="studentfrom" element={<StudentFrom />} />
          <Route path="teachersfrom" element={<TeacherFrom />} />
          <Route path='Jovel-student/student-home' element={<StudentDashboard/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
