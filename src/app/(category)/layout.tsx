import Header from "@/components/app/header";
import React from "react";

const CategryPageStoryLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Header />
      <main className="layout_root">{children}</main>
    </>
  );
};

export default CategryPageStoryLayout;
