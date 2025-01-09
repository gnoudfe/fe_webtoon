import React from "react";
import styles from "./styles.module.scss";
interface ButtonAuthProps {
  title: string;
}
const ButtonAuth = ({ title }: ButtonAuthProps) => {
  return <button className={styles.auth_form_container_btn}>{title}</button>;
};

export default ButtonAuth;
