'use client';

import React, { useState, useEffect } from 'react';

const Data = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'api/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: UserData[] = await response.json();
        setUserData(data);
      } catch (e: unknown) {
        let errorMessage = 'Could not fetch user data. Please try again later.';
        if (e instanceof Error) {
          console.error("Could not fetch user data", e.message);
          errorMessage += ` Details: ${e.message}`;
        } else {
          console.error("Could not fetch user data", e);
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="mt-20">Loading user data...</div>;
  }

  if (error) {
    return <div className="mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className='text-3xl font-bold text-primary-500 text-center mt-8'>All Users</h1>
          <p className='text-1xl font-bold text-primary-500 text-center mb-4'>A list of all the users in your account.</p>
        </div>
      </div>

      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Address</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">City</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">State</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Zip Code</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Birthdate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">About Me</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Step</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Created At</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Updated At</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.streetAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.city}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.state}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.zipCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.birthdate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className='w-60 block truncate whitespace-nowrap overflow-hidden'>{user.aboutMe}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.stepNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
