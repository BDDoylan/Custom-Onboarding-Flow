import React, { useState } from 'react';
import useUserState from '@/store/userStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Birthdate = () => {
  const { userData, updateUserData } = useUserState();
  const [selectedDate, setSelectedDate] = useState<Date | null>(userData.birthdate ? new Date(userData.birthdate) : null);

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    updateUserData({ birthdate: date ? date.toISOString() : '' });
  };

  return (
    <div className='bg-accent-500 shadow-md rounded w-[400px] p-4'>
      <h2 className="text-primary-500 text-2xl font-bold mb-4 text-center">Birthdate</h2>

      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        placeholderText="Select your birthdate"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default Birthdate;
