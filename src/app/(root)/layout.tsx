import Footer from "@/components/app/footer";
import Header from "@/components/app/header";
import Sidebar from "@/components/app/sidebar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="layout_root">
        <Sidebar />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
