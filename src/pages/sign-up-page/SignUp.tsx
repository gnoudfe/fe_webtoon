import React from "react";
import styles from "./styles.module.scss";
import SignupForm from "@/components/ui/register-form";
const SignUp = () => {
  return (
    <div className={styles.login_page}>
      <SignupForm />
    </div>
  );
};

export default SignUp;
