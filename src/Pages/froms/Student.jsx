import { useState, useEffect } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { postData } from '../../server/server';
import './Style/style.css';

function StudentForm() {
  const [student, setStudent] = useState({});
  const location = useLocation();
  const existingStudent = location.state?.student;
  const navigate = useNavigate();
  console.log("Received student data:", student);


  useEffect(() => {
    if (existingStudent) {
      setStudent(existingStudent);
    }
  }, [existingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student)


    try {
      await postData('/students', student);
      alert('Submitted successfully!');
      navigate('/Jovel-admin/SchoolStudents');
    } catch {
      alert('Error submitting form');
    }
  };

  const fields = [
      // { name: 'studentId', label: 'Student ID', placeholder: 'Enter Student ID', type: 'text' },
    { name: 'firstName', label: 'First Name', placeholder: 'Enter First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name', type: 'text' },
    { name: 'gender', label: 'Gender', placeholder: 'Select Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
    { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'YYYY-MM-DD', type: 'date' },
    { name: 'email', label: 'Email', placeholder: 'Enter Email', type: 'email' },
    { name: 'mobileNumber', label: 'Mobile Number', placeholder: 'Enter Mobile Number', type: 'tel' },
    // { name: 'address', label: 'Address', placeholder: 'Enter Address', type: 'text' },
    { name: 'standard', label: 'Class Enrolled', placeholder: 'Enter Class Enrolled', type: 'text' },
    // { name: 'student_Id', label: 'Roll Number', placeholder: 'Enter Roll Number', type: 'text' },
    { name: 'admissionDate', label: 'Admission Date', placeholder: 'YYYY-MM-DD', type: 'date' },
    // { name: 'guardianName', label: 'Guardian Name', placeholder: 'Enter Guardian Name', type: 'text' },
    // { name: 'guardianContact', label: 'Guardian Contact', placeholder: 'Enter Guardian Contact', type: 'tel' },
    { name: 'status', label: 'Status', placeholder: 'Enter Status (Active/Inactive)', type: 'text' },
  ];

  return (
    <div className="admission-container">
      <h2 className="form-title">Student Form</h2>
      <form className="admission-form" onSubmit={(e) =>handleSubmit(e)}>
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={student[field.name] || ''}
                className="form-input"
                onChange={(e)=>handleChange (e,setStudent)}
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={student[field.name] || ''}
                placeholder={field.placeholder}
                className="form-input"
                onChange={(e) => handleChange(e, setStudent)}
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default StudentForm;
