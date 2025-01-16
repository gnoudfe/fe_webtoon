import Header from "@/components/app/header";
import React from "react";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="layout_root">{children}</main>
    </>
  );
};

export default MainLayout;
