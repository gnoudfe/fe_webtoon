"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Avatar } from "@/components/ui/avatar";
import {
  useChangePasswordMutation,
  useVerifyUser,
} from "@/services/queries/useAuth";
import { LogOutIcon, SaveAll } from "lucide-react";
import InputField from "@/components/ui/input";
import { validateForm } from "@/utils/validateForm";
const SettingPageSc = () => {
  const [password, setPassword] = React.useState("");
  const [newPassword, SetNewPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const changePasswordMutation = useChangePasswordMutation();
  const [errors, setErrors] = React.useState<{
    password?: string;
    newPassword?: string;
  }>({});
  const { data: user, isLoading } = useVerifyUser();
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (response) {
      setResponse("");
    }
    const validationErrors = validateForm({
      password,
      newPassword,
      isChangePassword: true,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const oldPasswordBase64 = btoa(password);
        const newPasswordBase64 = btoa(newPassword);
        const response = await changePasswordMutation.mutateAsync({
          oldPassword: oldPasswordBase64,
          newPassword: newPasswordBase64,
        });
        if (response.status === "success") {
          alert(response.message);
          setPassword("");
          SetNewPassword("");
        } else {
          setResponse(response.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  if (isLoading) return null;
  return (
    <div className={styles.setting_page}>
      <div className={styles.setting_page_container}>
        <div className={styles.setting_page_container_infor}>
          <h1 className={styles.setting_page_container_infor_title}>Account</h1>
          <p className={styles.setting_page_container_infor_description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className={styles.setting_page_container_inner}>
          <div className={styles.setting_page_container_avatar}>
            <Avatar userData={user?.data} size="xl" />
            <div className={styles.setting_page_container_avatar_infor}>
              <h3 className={styles.setting_page_container_avatar_infor_name}>
                Profile Picture
              </h3>
              <p
                className={
                  styles.setting_page_container_avatar_infor_description
                }
              >
                JPEG, PNG and GID under 2MB
              </p>
            </div>
          </div>
          <label
            htmlFor="upload-avatar"
            className={styles.setting_page_container_inner_btn}
          >
            <span>Upload new avatar</span>
            <input type="file" name="upload-avatar" id="upload-avatar" />
          </label>
        </div>

        <div className={styles.setting_page_lists_container}>
          <h3 className={styles.setting_page_lists_container_title}>
            Your Name
          </h3>
          <div className={styles.setting_page_lists}>
            <div className={styles.setting_page_lists_input_container}>
              <label
                htmlFor="fullname"
                className={styles.setting_page_lists_label}
              >
                Fullname
              </label>
              <InputField
                type="text"
                placeholder="Full name"
                value={user?.data.fullname}
                id="fullname"
                readOnly={true}
              />
            </div>
            <div className={styles.setting_page_lists_input_container}>
              <label
                htmlFor="username"
                className={styles.setting_page_lists_label}
              >
                Username
              </label>
              <InputField
                type="text"
                placeholder="User name"
                value={user?.data.username}
                id="username"
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleChangePassword}>
          <div className={styles.setting_page_lists_container}>
            <h3 className={styles.setting_page_lists_container_title}>
              Change your password
            </h3>
            <div className={styles.setting_page_lists}>
              <div className={styles.setting_page_lists_input_container}>
                <label
                  htmlFor="password"
                  className={styles.setting_page_lists_label}
                >
                  Current password
                </label>
                <InputField
                  type="password"
                  placeholder="Current Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
                {errors.password && password && (
                  <p className={styles.error}>{errors.password}</p>
                )}
                {response && password && newPassword && <p className={styles.error}>{response}</p>}
              </div>
              <div className={styles.setting_page_lists_input_container}>
                <label
                  htmlFor="new-password"
                  className={styles.setting_page_lists_label}
                >
                  New password
                </label>
                <InputField
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => SetNewPassword(e.target.value)}
                  id="new-password"
                />
                {errors.newPassword && newPassword && (
                  <p className={styles.error}>{errors.newPassword}</p>
                )}
              </div>
            </div>
            {password && newPassword && (
              <button
                className={`${styles.setting_page_lists_button} ${
                  password && newPassword
                    ? styles.setting_page_lists_button_active
                    : ""
                }`}
              >
                {loading ? (
                  <>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <SaveAll color="#fff" width={22} height={22} />
                    <span>Save</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className={styles.setting_page_lists_bottom}>
          <div className={styles.setting_page_lists_bottom_text}>
            <h3> Security account</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
          </div>
          <button className={styles.setting_page_lists_bottom_button}>
            <LogOutIcon />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPageSc;