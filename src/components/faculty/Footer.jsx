import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b1f4d] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-300">
      <p>© 2025 AISC OJT Portal. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Use</a>
        <a href="#" className="hover:text-white">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;