"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import ButtonAuth from "../button-auth";
import { validateForm } from "@/utils/validateForm";
import InputField from "../input";
import { useLoginMutation, useVerifyUser } from "@/services/queries/useAuth";
import { HttpStatusCode } from "@/constant/httpStatusCode.enum";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/stores/state";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const { setIsLoggedIn, setUserData } = useGlobalStore();
  const { refetch } = useVerifyUser();
  const loginMutation = useLoginMutation();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (responseMessage) {
      setResponseMessage("");
    }
    const validationErrors = validateForm({
      username,
      password,
      isLogin: true,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        const response = await loginMutation.mutateAsync({
          username,
          password: btoa(password),
        });
        if (response.status === HttpStatusCode.Ok) {
          setIsLoggedIn(true);
          setUserData(response.data);
          refetch();
          router.push("/");
        } else {
          setResponseMessage(response.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.auth_form}>
      <div className={styles.auth_form_cover}></div>
      <form className={styles.auth_form_container} onSubmit={handleSubmit}>
        <div className={styles.auth_form_container_inner}>
          <h2 className={styles.auth_form_container_inner_title}>Login</h2>
          <div className={styles.auth_form_container_input}>
            <InputField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
            {responseMessage && (
              <p className={styles.error}>{responseMessage}</p>
            )}
          </div>
          <p className={styles.auth_form_container_inner_sign_up}>
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </p>
          <ButtonAuth title={isLoading ? "Loading..." : "Login"} />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
