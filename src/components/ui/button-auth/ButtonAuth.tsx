import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
interface ButtonAuthProps {
  title: string;
  link?: string;
}
const ButtonAuth = ({ title, link }: ButtonAuthProps) => {
  if (link) {
    return (
      <Link href={link} className={styles.auth_form_container_btn}>
        <span className={styles.auth_form_container_btn_text}>{title}</span>
      </Link>
    );
  }
  return (
    <button className={styles.auth_form_container_btn}>
      <span className={styles.auth_form_container_btn_text}>{title}</span>
    </button>
  );
};

export default ButtonAuth;
