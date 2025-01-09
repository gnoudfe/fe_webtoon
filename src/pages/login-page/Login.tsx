import React from "react";
import styles from "./styles.module.scss";
import LoginForm from "@/components/ui/login-form";
const Login = () => {
  return (
    <div className={styles.login_page}>
      <div className={styles.login_page_bg}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/023/192/562/small_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg"
          alt=""
        />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
