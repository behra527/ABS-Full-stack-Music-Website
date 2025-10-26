import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
      <footer className="py-8 px-6 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  About
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  For the Record
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Communities</h3>
            <ul>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  For Artists
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Developers
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Advertising
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Investors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Useful Links</h3>
            <ul>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Support
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Free Mobile App
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">ABS Plans</h3>
            <ul>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Premium Individual
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Premium Duo
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Premium Family
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">
                  Premium Student
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end items-center mt-8">
          
          <Link to="#" className="hover:underline mr-6">
            <FaInstagram />
          </Link>
          <Link to="#" className="hover:underline mr-6">
            <FaTwitter />
          </Link>
          <Link to="#" className="hover:underline">
            <FaFacebook />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
