import React, { useState } from 'react';
import './sytle/HomePage.css';
import LoginPage from './froms/LoginPage';
import FromConnection from './froms/FromConnection';
import TeacherAdmissionFrom from './froms/TeacherAdmission';
import StudentAdmissionForm from './froms/StudentAdmision'

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  

  return (
    <div className="login-container">
      <div className="left-panel">
        <div className="e-learning-box">
          <FromConnection 
  onTeacherClick={() => setShowModal(true)} 
  onStudentClick={() => setShowModal1(true)} 
/>
          <div className="manual-buttons">
            <button>Website Manual</button>
            <button>Mobile Manual</button>
          </div>
        </div>
      </div>
      <div className="right-panel">
        <LoginPage />
      </div>

      {/* Modal for Teacher Admission */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>✖</button>
            <TeacherAdmissionFrom />
          </div>
        </div>
      )}
      {showModal1 && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal1(false)}>✖</button>
            <StudentAdmissionForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
