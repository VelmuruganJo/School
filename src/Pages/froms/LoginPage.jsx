import './Style/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import TeacherForgotPassword from './TeacherForgotPassword';
import StudentForgotPassword from './StudentForgotPassword';
import logo from'./img/logo.png';

function LoginPage() {
  const navigate = useNavigate();
  const [StudentForgotModal, setStudentForgotModal] = useState(false);
  const [TeacherForgotModal, setTeacherForgotModal] = useState(false);


  const [adminUser, setAdminUser] = useState({ username: '', password: '' });
  const [studentUser, setStudentUser] = useState({ username: '', password: '' });

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', adminUser);
      console.log("Admin login response:", response.data);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', adminUser.username);
        localStorage.setItem('role', response.data.role);

        if (response.data.role === 'TEACHER') {
          navigate('/Jovel-admin/dashboard');
        } else {
          alert('Access denied: Not a teacher');
        }
      }
    } catch (error) {
      console.error('Admin Login Failed:', error);
      alert('Login Failed: ' + (error.response?.data || 'Unknown Error'));
    }
  };

  const handleStudentLogin = async () => {
    
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', studentUser);
      console.log("Student login response:", response.data);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', studentUser.username);
        localStorage.setItem('role', response.data.role);

        if (response.data.role === 'STUDENT') {
          navigate('Jovel-student/student-home');
        } else {
          alert('Access denied: Not a student');
        }
      }
    } catch (error) {
      console.error('Student Login Failed:', error);
      alert('Login Failed: ' + (error.response?.data || 'Unknown Error'));
    }
  };

  return (
    <div className='login-full'>
      <div className="jovel-header">
  <h1 className="jovel-name">
    <img className="jovel-logo" src={logo} alt="vel" />
    JoVel International School
  </h1>
</div>


    <div className="loginpage-container">
      {/* Admin Login */}
      <div className="loginpage-left-panel">
        <div className="loginpage-box">
          <h3 className="loginpage-heading">Admin Login</h3>
          <input
            className="loginpage-input"
            type="text"
            placeholder="User ID"
            onChange={(e) => setAdminUser({ ...adminUser, username: e.target.value })}
          />
          <input
            className="loginpage-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setAdminUser({ ...adminUser, password: e.target.value })}
          />
          <div className="loginpage-options">
            <label className="loginpage-label">
              <input type="checkbox" />
              Remember Me
            </label>
            <a className="loginpage-link" href="#" onClick={(e) => {
  e.preventDefault();
  setTeacherForgotModal(true);
}}>Forgot Password?</a>

          </div>
          <button className="loginpage-button" onClick={handleAdminLogin}>Login</button>
        </div>
      </div>
      {TeacherForgotModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <TeacherForgotPassword onClose={() => setTeacherForgotModal(false)} />
    </div>
  </div>
)}

      {/* Student Login */}
      <div className="loginpage-right-panel">
        <div className="loginpage-box">
          <h3 className="loginpage-heading">Student Login</h3>
          <input
            className="loginpage-input"
            type="text"
            placeholder="User ID"
            onChange={(e) => setStudentUser({ ...studentUser, username: e.target.value })}
          />
          <input
            className="loginpage-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setStudentUser({ ...studentUser, password: e.target.value })}
          />
          <div className="loginpage-options">
            <label className="loginpage-label">
              <input type="checkbox" />
              Remember Me
            </label>
            <a className="loginpage-link" href="#" onClick={(e) => {
  e.preventDefault();
  setStudentForgotModal(true);
}}>Forgot Password?</a>
          </div>
          <button className="loginpage-button" onClick={handleStudentLogin}>Login</button>
        </div>
      </div>
      {StudentForgotModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <StudentForgotPassword onClose={() => setStudentForgotModal(false)} />
    </div>
  </div>
)}

      <div className="loginpage-footer">
        <p>📞 +91-9698999873 | 📧 info@jovel.com</p>
        <hr />
        <p>School Code: JOVEL2021</p>
      </div>
    </div>
            </div>
  );
}

export default LoginPage;
