import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <div>detail page {slug}</div>;
};

export default page;
