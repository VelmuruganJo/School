import { NavLink } from 'react-router-dom';
import './Style/connection.css';


function FromConnection({ onTeacherClick, onStudentClick }) {
  return (
    <div className="container-from">
      <ul className="list-group">
        <li><button className="from-list" onClick={onTeacherClick}> Teacher Admission From </button></li>
        <li><button className="from-list" onClick={onStudentClick}>Student Admission From</button></li>
      </ul>
    </div>
  );
}

export default FromConnection;
