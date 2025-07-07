// SchoolCalendar.jsx
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './sytle/CalendarStyle.css';
import { useState } from 'react';

function SchoolCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="box">
      <h3>School Calendar</h3>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}

export default SchoolCalendar;
