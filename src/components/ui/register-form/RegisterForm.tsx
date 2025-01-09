"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import InputField from "../input";
import ButtonAuth from "../button-auth";
import { validateForm } from "@/utils/validateForm";
import { useRegisterMutation } from "@/services/queries/useAuth";
import { HttpStatusCode } from "@/constant/httpStatusCode.enum";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  // Khởi tạo state cho username, password và confirm password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const router = useRouter();

  const registerMutation = useRegisterMutation();

  // Hàm xử lý thay đổi giá trị input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm({ username, password });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsLoading(true);
        const response = await registerMutation.mutateAsync({
          username,
          password,
        });
        if (response.status === HttpStatusCode.Created) {
          router.push("/login");
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
      <form className={styles.auth_form_container} onSubmit={handleSubmit}>
        <div className={styles.auth_form_container_inner}>
          <h2 className={styles.auth_form_container_inner_title}>Sign Up</h2>
          <div className={styles.auth_form_container_input}>
            {/* Tạo two-way binding với state */}
            <InputField
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <p className={styles.auth_form_container_inner_sign_up}>
            Already have an account? <Link href="/login">Sign in</Link>
          </p>
          <ButtonAuth title={isLoading ? "Loading..." : "Sign Up"} />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
