import React from "react";
import FacultyHeader from "./FacultyHeader";
import FacultySidebar from "./FacultySidebar";
import Footer from "./Footer";

const FacultyLayout = ({ children, activeItem, onNavigate }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <div className="shrink-0 sticky top-0 z-30">
        <FacultyHeader />
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="sticky top-0 h-full shrink-0 overflow-y-auto">
          <FacultySidebar
            activeItem={activeItem}
          />
        </div>

        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      <div className="shrink-0 sticky bottom-0 z-30">
        <Footer />
      </div>
    </div>
  );
};

export default FacultyLayout;