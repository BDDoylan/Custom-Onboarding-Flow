'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary-300 p-4 absolute w-full h-16">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
            <Image
            src="https://cdn.prod.website-files.com/64ac3a433180d94638a63ead/64acc00e5f8b28a1f8b430a9_Logo-Zealthy-Black.svg"
            alt="Zealthy Logo"
            priority
            width={200}
            height={100}
          />
        </Link>

        <div className="flex space-x-4">
          <Link href="/" className="text-accent-500 hover:text-primary-500 font-bold text-lg">
            Onboard
          </Link>

          <Link href="/admin" className="text-accent-500 hover:text-primary-500 font-bold text-lg">
            Admin
          </Link>

          <Link href="/data" className="text-accent-500 hover:text-primary-700 font-bold text-lg">
            Data
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
