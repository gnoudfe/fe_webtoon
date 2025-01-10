import React from "react";
import styles from "./styles.module.scss";
import LoginForm from "@/components/ui/login-form";
const Login = () => {
  return (
    <div className={styles.login_page}>
      <LoginForm />
    </div>
  );
};

export default Login;
