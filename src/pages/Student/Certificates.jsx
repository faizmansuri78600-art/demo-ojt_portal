import React from "react";
import Sidebar from "../../components/common/SSidebar"; // update to YOUR real Sidebar's path
import Header from "../../components/common/SHeader";   // update to YOUR real Topbar's path
import Certificates from "../../components/Student/Certificates";

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-[#eef1f8]">
      {/* Must match the label used in navItems: "Certificates" */}
      <Sidebar activePage="Certificates" />

      <div className="flex min-h-screen min-w-0 flex-col lg:ml-64">
        <Header />

        {/* Page title — added directly here */}
        <div className="px-8 pt-7">
          <h1 className="text-[28px] font-extrabold text-slate-900">Certificates</h1>
        </div>

        <Certificates />
      </div>
    </div>
  );
}