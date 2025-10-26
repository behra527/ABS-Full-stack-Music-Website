import React from 'react';

function Navbar() {
  return (
    <div className="bg-gray-900 text-white p-6 mb-6 flex justify-end items-center border  rounded-3xl ">
      <div className="flex space-x-4 ">
        <button className="b1 bg-white text-gray-900 font-bold py-2 px-4 rounded-full border ">Sign up</button>
        <button className="b2 bg-transparent text-white font-bold py-2 px-4 border  rounded-full">Login</button>
      </div>
    </div>
  );
}

export default Navbar;
