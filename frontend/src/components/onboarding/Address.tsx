import React from 'react';
import useUserState from '@/store/userStore';

const Address = () => {
  const { userData, updateUserData } = useUserState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData({ [e.target.name]: e.target.value });
  };

  return (
    <div className='bg-accent-500 shadow-md rounded w-[500px] p-4'>
      <h2 className="text-primary-500 text-2xl font-bold mb-4 text-center">Address</h2>

      <input
        type="text"
        name="streetAddress"
        placeholder="Street Address"
        value={userData.streetAddress || ''}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={userData.city || ''}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={userData.state || ''}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <input
        type="text"
        name="zipCode"
        placeholder="Zip Code"
        value={userData.zipCode || ''}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default Address;
