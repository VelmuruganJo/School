import { NavLink } from 'react-router-dom';
import './Style/Menubar.css';
// import { useNavigate } from 'react-router-dom'; 

function Menubar() {
  // const username = localStorage.getItem('username');
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem('token'); 
  //   navigate('/');
  // };
  return (
    <div className="container">

      <h2 className="logo fw-bold">VJ</h2>
      <span className="School-name">Jovel School</span>
      {/* <span className="School-name">{username}</span> */}
      {/* <span>
      <button className="btn btn-success logout-button" onClick={handleLogout}>Logout</button>
      </span> */}
      
      <ul className="list-group">
        <li><NavLink to="/Jovel-student/student-dashboard" className="mover">🏠 Dashboard</NavLink></li>
        <li><NavLink to="/Jovel-student/time-table" className="mover">👨‍🎓 TimeTable</NavLink></li>
        <li><NavLink to="/Jovel-student/Attendance" className="mover">👩‍🏫 Attendance</NavLink></li>
        {/* <li><NavLink to="/Jovel-student/NewTeachers" className="mover">👨‍🎓  New Teachers</NavLink></li> */}
        {/* <li><NavLink to="/Jovel-student/NewStudents" className="mover">👩‍🏫 New Students</NavLink></li> */}
      </ul>
    </div>
  );
}

export default Menubar;
