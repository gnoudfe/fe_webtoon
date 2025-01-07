import Header from "@/components/app/header";
import React from "react";

const layoutDeatail = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header /> {children}
    </>
  );
};

export default layoutDeatail;
