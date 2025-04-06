'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-pink-400 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" alt="MedOptima Logo" width={40} height={40} />
        <span className="text-lg font-bold tracking-wide">MedOptima</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-1 px-3 py-2 hover:bg-neutral-800 rounded-md transition"
        >
          <span className="text-sm">Menu</span>
          <ChevronDown size={16} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-md shadow-lg z-50">
            <Link href="/" className="block px-4 py-2 hover:bg-pink-400 hover:shadow-[0_0_10px_#00f0ff50] focus:outline-none focus:ring-2 focus:ring-pink-400 transition transform hover:scale-105 duration-200">Home</Link>
            <Link href="/input" className="block px-4 py-2 hover:bg-pink-400 hover:shadow-[0_0_10px_#00f0ff50] focus:outline-none focus:ring-2 focus:ring-pink-400 transition transform hover:scale-105 duration-200">Get Estimate</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;