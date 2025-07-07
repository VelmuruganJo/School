import { NavLink } from 'react-router-dom';
import './sytle/Menubar.css';
import { useNavigate } from 'react-router-dom'; 

function Menubar() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/');
  };

  const displayName = username
  ? username.split('@')[0].split('.')[0].charAt(0).toUpperCase() + username.split('@')[0].split('.')[0].slice(1)
  : '';
  return (
    <div className="container">

      <h2 className="logo fw-bold">VJ</h2>
      <span className="School-name">Jovel School</span>
      <span className="School-name">{displayName}</span>
      <span>
      <button className="btn btn-success logout-button" onClick={handleLogout}>Logout</button>
      </span> 
      
      <ul className="list-group">
        <li><NavLink to="/Jovel-admin/dashboard" className="mover">🏠 Dashboard</NavLink></li>
        <li><NavLink to="/Jovel-admin/Attendance" className="mover">👨‍🎓 Attendance</NavLink></li>
        <li><NavLink to="/Jovel-admin/SchoolStudents" className="mover">👨‍🎓 Students</NavLink></li>
        <li><NavLink to="/Jovel-admin/SchoolTeachers" className="mover">👩‍🏫 Teachers</NavLink></li>
        <li><NavLink to="/Jovel-admin/NewTeachers" className="mover">👨‍🎓  New Teachers</NavLink></li>
        <li><NavLink to="/Jovel-admin/NewStudents" className="mover">👩‍🏫 New Students</NavLink></li>
        {/* <li><NavLink to="/Jovel-admin/NewStudents" className="mover">👩‍🏫 New Students</NavLink></li> */}
        {/* <li><NavLink to="/Jovel-admin/NewStudents" className="mover">👩‍🏫 New Students</NavLink></li> */}
      </ul>
    </div>  
  );
}

export default Menubar;
