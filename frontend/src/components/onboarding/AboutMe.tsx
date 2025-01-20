import React from 'react';
import useUserState from '@/store/userStore';

const AboutMe = () => {
  const { userData, updateUserData } = useUserState();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateUserData({ [e.target.name]: e.target.value });
  };

  return (
    <div className='bg-accent-500 shadow-md rounded w-[400px] p-4'>
      <h2 className="text-primary-500 text-2xl font-bold mb-4 text-center">About Me</h2>

      <textarea
        name="aboutMe"
        placeholder="Tell us about yourself"
        value={userData.aboutMe || ''}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 h-[193px] text-gray-700 leading-tight resize-none focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default AboutMe;
