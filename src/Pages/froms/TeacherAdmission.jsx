import { useState } from 'react';
import { postData } from '../../server/server';
import './Style/Admission.css';

function TeacherAdmissionFrom() {
  const [teacherAdmission, setTeacherAdmission] = useState({});

  const handleChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, endpoint, data) => {
    e.preventDefault();
    try {
      await postData(endpoint, data);
      alert('Submitted successfully!');
      setTeacherAdmission({});
    } catch {
      alert('Error submitting form');
    }
  };

  const fields = [
    // { name: 'admissionId', label: 'Admission ID', placeholder: 'Enter Admission ID', type: 'text' },
    { name: 'firstName', label: 'First Name', placeholder: 'Enter First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', placeholder: 'Enter Last Name', type: 'text' },
    { name: 'gender', label: 'Gender', placeholder: 'Select Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
    { name: 'dateOfBirth', label: 'Date of Birth', placeholder: 'YYYY-MM-DD', type: 'date' },
    { name: 'email', label: 'Email', placeholder: 'Enter Email Address', type: 'email' },
    { name: 'mobileNumber', label: 'Mobile Number', placeholder: 'Enter Mobile Number', type: 'tel' },
    // { name: 'address', label: 'Address', placeholder: 'Enter Address', type: 'text' },
    { name: 'qualification', label: 'Qualification', placeholder: 'Enter Qualification', type: 'text' },
    // { name: 'experienceYears', label: 'Experience Years', placeholder: 'Enter Years of Experience', type: 'number' },
    { name: 'subject', label: 'Subject Applied', placeholder: 'Enter Subject Applied For', type: 'text' },
    // { name: 'applicationDate', label: 'Application Date', placeholder: 'YYYY-MM-DD', type: 'date' },
    // { name: 'status', label: 'Status', placeholder: 'Enter Status', type: 'text' },
  ];

  return (
    <div className="admissions-container">
      <h2 className="forms-title">Teacher Admission Form</h2>
      <form className="admissions-form" onSubmit={(e) => handleSubmit(e, '/teacher-admission', teacherAdmission)}>
        {fields.map((field) => (
          <div className="forms-group" key={field.name}>
            <label htmlFor={field.name} className="forms-label">{field.label}</label>

            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                className="forms-input"
                value={teacherAdmission[field.name] || ''}
                onChange={(e) => handleChange(e, setTeacherAdmission)}
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
                className="forms-input"
                placeholder={field.placeholder}
                value={teacherAdmission[field.name] || ''}
                onChange={(e) => handleChange(e, setTeacherAdmission)}
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-btns">Submit</button>
      </form>
    </div>
  );
}

export default TeacherAdmissionFrom;
