import React from 'react';
import Button from './Button';
import Image from 'next/image';


const Landing = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
        src="/stock.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50" />
        <div className="relative flex flex-col items-center gap-7 text-center z-11">
            <div>
                <Image
                    src="/logo.png"
                    alt="MedOptima Logo"
                    width={700}
                    height={500}
                />
            </div>
            <p className="-mt-5 text-xl font-extrabold text-white z-11">Smart Coverage. Simplified</p>
            <Button title="Get Started" link="/input" />
      </div>
    </div>
  );
};

export default Landing;