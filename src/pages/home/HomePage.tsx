import React from "react";
import styles from "./styles.module.scss";

// async function getAritsts() {
//   const res = await fetch("http://localhost:5000/api/get-artists");
//   return res.json();
// }

const HomePage = async () => {
  // const data = await getAritsts();
  // console.log("data", data);
  return <div className={styles.home_page}>heh</div>;
};

export default HomePage;
