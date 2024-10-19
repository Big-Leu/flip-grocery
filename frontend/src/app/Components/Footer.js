import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto">
        <p className="text-center">© 2024 Grocery Store. All Rights Reserved.</p>
        <div className="text-center mt-4">
          <a href="#" className="mx-2">Privacy Policy</a>
          <a href="#" className="mx-2">Terms of Service</a>
          <a href="#" className="mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
