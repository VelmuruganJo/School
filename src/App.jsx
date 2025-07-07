import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/homepage';
import DashboardLayout from './Pages/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import TeacherAdmissionFrom from './Pages/froms/TeacherAdmission';
import StudentAdmissionForm from './Pages/froms/StudentAdmision';
import StudentDashboardLayout from './Students/StudentDashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="teacherAdmission" element={<TeacherAdmissionFrom />} />
        <Route path="studentAdmissiom" element={<StudentAdmissionForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="Jovel-admin/*" element={
            <ProtectedRoute allowedRoles={['TEACHER']}>
              <DashboardLayout />
            </ProtectedRoute>}/>
        <Route path='Jovel-student/*' element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentDashboardLayout />
          </ProtectedRoute>
        }></Route>
      </Routes>
    </Router>
  );
}

export default App;
