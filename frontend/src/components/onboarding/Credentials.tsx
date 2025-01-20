import React from 'react';
import useUserState from '@/store/userStore';

const Credentials = () => {
  const { userData, updateUserData } = useUserState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUserData({ [e.target.name]: e.target.value });
  };

  return (
    <div className='bg-accent-500 shadow-md rounded w-[400px] p-4'>
      <h2 className="text-primary-500 text-2xl font-bold mb-4 text-center">Credentials</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email || ''}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password || ''}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default Credentials;
