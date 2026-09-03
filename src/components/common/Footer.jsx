import { Link } from "react-router-dom";
import {
  // Facebook,
  // Instagram,
  // Linkedin,
  // Youtube,
} from "lucide-react";

import logo from "../../assets/aisc-logo.png";

function Footer() {
  return (
    <footer className="bg-[#06245f] text-white">

      <div className="mx-auto max-w-[1250px] px-6 py-5 sm:px-8">

        <div className="grid items-center gap-6 md:grid-cols-[1.5fr_1fr_1fr]">

          {/* College */}
          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="AISC Logo"
              className="h-12 w-12 object-contain"
            />

            <div>
              <h3 className="text-[12px] font-bold">
                Abeda Inamdar Senior College
              </h3>

              <p className="mt-1 text-[9px] text-blue-100">
                of Arts, Science & Commerce (Autonomous)
              </p>

              <p className="mt-1 max-w-[300px] text-[8px] leading-3 text-blue-200">
                Empowering students with practical experience and building
                a stronger future.
              </p>
            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-2 text-[11px] font-bold">
              Quick Links
            </h3>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1">

              <Link
                to="/"
                className="text-[9px] text-blue-100 hover:text-white"
              >
                About OJT
              </Link>

              <Link
                to="/"
                className="text-[9px] text-blue-100 hover:text-white"
              >
                OJT Guidelines
              </Link>

              <Link
                to="/"
                className="text-[9px] text-blue-100 hover:text-white"
              >
                Important Documents
              </Link>

              <Link
                to="/"
                className="text-[9px] text-blue-100 hover:text-white"
              >
                FAQ
              </Link>

              <Link
                to="/"
                className="text-[9px] text-blue-100 hover:text-white"
              >
                Contact Us
              </Link>

            </div>
          </div>

          {/* Social */}
          <div>

            <h3 className="mb-2 text-[11px] font-bold">
              Follow Us
            </h3>

            <div className="flex gap-2">

              <SocialIcon icon={<Facebook size={15} />} />

              <SocialIcon icon={<Instagram size={15} />} />

              <SocialIcon icon={<Linkedin size={15} />} />

              <SocialIcon icon={<Youtube size={15} />} />

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-4 flex flex-col gap-2 border-t border-white/15 pt-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[8px] text-blue-200">
            © 2025 Abeda Inamdar Senior College. All rights reserved.
          </p>

          <div className="flex gap-3 text-[8px] text-blue-200">
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Terms & Conditions</span>
          </div>

        </div>

      </div>
    </footer>
  );
}

function SocialIcon({ icon }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-blue-500"
    >
      {icon}
    </button>
  );
}

export default Footer;