'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: any;
}

interface CustomDropdownProps {
  options: Option[];
  value: any;
  onChange: (value: any) => void;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  className = '',
  onClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef} onClick={onClick}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full bg-neutral-800 hover:bg-neutral-700 border border-black text-left px-4 py-2 rounded-md text-white hover:border-pink-400 hover:shadow-[0_0_10px_#00f0ff50] focus:outline-none focus:ring-2 focus:ring-pink-400 transition transform hover:scale-105 duration-200"
      >
        {options.find(o => o.value === value)?.label || 'Please Select'}
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-neutral-900 border border-black rounded-md max-h-60 overflow-y-auto">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 text-white cursor-pointer hover:bg-pink-400 hover:shadow-[0_0_10px_#00f0ff50] transition transform hover:scale-103 duration-200 ease-in-out border-b border-black last:border-none"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;