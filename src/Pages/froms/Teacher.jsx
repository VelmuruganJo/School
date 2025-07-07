import { useState, useEffect } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { postData } from '../../server/server';
import './Style/style.css';

function TeacherForm() {
  const [teacher, setTeacher] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const existingteacher = location.state?.teacher;
  console.log("Received teacher data:", teacher);

    useEffect(() => {
      if (existingteacher) {  
        setTeacher(existingteacher);
      }
    }, [existingteacher]);
  
  const handleChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, endpoint, data) => {
    e.preventDefault();
    console.log(data)
      const cleanData = { ...data };
  if (cleanData.teacherId) {
    delete cleanData.teacherId;
  }
    try {
      await postData(endpoint, data);
      alert('Submitted successfully!');
      navigate('/Jovel-admin/SchoolTeachers');

    } catch {
      alert('Error submitting form');
    }
  };

  const fields = [
    // { name: 'teacherId', label: 'Teacher ID', placeholder: 'Enter Teacher ID', type: 'text' },
    { name: 'firstName', label: 'First Name', placeholder: 'Enter First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name', type: 'text' },
    { name: 'gender', label: 'Gender', placeholder: 'Select Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
    { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'YYYY-MM-DD', type: 'date' },
    { name: 'email', label: 'Email', placeholder: 'Enter Email Address', type: 'email' },
    { name: 'mobileNumber', label: 'Mobile Number', placeholder: 'Enter Mobile Number', type: 'tel' },
    // { name: 'address', label: 'Address', placeholder: 'Enter Address', type: 'text' },
    { name: 'qualification', label: 'Qualification', placeholder: 'Enter Qualification', type: 'text' },
    // { name: 'experienceYears', label: 'Experience Years', placeholder: 'Enter Years of Experience', type: 'number' },
    { name: 'subject', label: 'Subject Specialization', placeholder: 'Enter Subject Specialization', type: 'text' },
    { name: 'joiningDate', label: 'Joining Date', placeholder: 'YYYY-MM-DD', type: 'date' },
    { name: 'status', label: 'Status', placeholder: 'Enter Status (Active/Inactive)', type: 'text' },
  ];

  return (
    <div className="admission-container">
      <h2 className="form-title">Teacher Form</h2>
      <form className="admission-form" onSubmit={(e) => handleSubmit(e, '/teachers', teacher)}>
        {fields.map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name} className="form-label">{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                className="form-input"
                value={teacher[field.name] || ''}
                onChange={(e) => handleChange(e, setTeacher)}
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                className="form-input"
                placeholder={field.placeholder}
                value={teacher[field.name] || ''}
                onChange={(e) => handleChange(e, setTeacher)}
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default TeacherForm;
