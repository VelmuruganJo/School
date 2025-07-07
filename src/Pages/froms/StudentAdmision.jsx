import { useState } from 'react';
import { postData } from '../../server/server';
import './Style/Admission.css';

function StudentAdmissionForm() {
  const [studentAdmission, setStudentAdmission] = useState({});

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, endpoint, data) => {
    e.preventDefault();
    try {
      await postData(endpoint, data);
      alert('Submitted successfully!');
      setStudentAdmission({});
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
    { name: 'email', label: 'Email', placeholder: 'Enter Email', type: 'email' },
    { name: 'mobileNumber', label: 'Mobile Number', placeholder: 'Enter Mobile Number', type: 'tel' },
    // { name: 'address', label: 'Address', placeholder: 'Enter Address', type: 'text' },
    { name: 'standard', label: 'Class Applied', placeholder: 'Enter Class Applied', type: 'select', options: ['Class I', 'Class II', 'Class III','Class IV', 'Class V', 'Class VI','Class VII', 'Class VIII', 'Class IX','Class X'] },
    // { name: 'previousSchool', label: 'Previous School', placeholder: 'Enter Previous School Name', type: 'text' },
    // { name: 'guardianName', label: 'Guardian Name', placeholder: 'Enter Guardian Name', type: 'text' },
    // { name: 'guardianContact', label: 'Guardian Contact', placeholder: 'Enter Guardian Contact', type: 'tel' },
    // { name: 'status', label: 'Admission Status', placeholder: 'Enter Admission Status', type: 'text' },
  ];

  return (
    <div className="admissions-container">
      <h2 className="forms-title">Student Admission Form</h2>
      <form className="admissions-form" onSubmit={(e) => handleSubmit(e, '/student-admission', studentAdmission)}>
        {fields.map((field) => (
          <div className="forms-group" key={field.name}>
            <label htmlFor={field.name} className="forms-label">{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                className="forms-input"
                value={studentAdmission[field.name] || ''}
                onChange={(e) => handleChange(e, setStudentAdmission)}
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
                placeholder={field.placeholder}
                className="forms-input"
                value={studentAdmission[field.name] || ''}
                onChange={(e) => handleChange(e, setStudentAdmission)}
              />
            )}
          </div>
        ))}
        <button type="submit" className="submit-btns">Submit</button>
      </form>
    </div>
  );
}

export default StudentAdmissionForm;
