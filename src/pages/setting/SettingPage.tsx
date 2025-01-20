/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Avatar } from "@/components/ui/avatar";
import {
  useChangeAvatarMutation,
  useChangePasswordMutation,
  useLogoutMutation,
  useVerifyUser,
} from "@/services/queries/useAuth";
import { HomeIcon, LogOutIcon, SaveAll } from "lucide-react";
import InputField from "@/components/ui/input";
import { validateForm } from "@/utils/validateForm";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalStore } from "@/stores/state";
const SettingPageSc = () => {
  const [password, setPassword] = React.useState("");
  const [newPassword, SetNewPassword] = React.useState("");
  const [isAvatarSaved, setIsAvatarSaved] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [resAvatarMessage, setResAvatarMessage] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const changePasswordMutation = useChangePasswordMutation();
  const router = useRouter();
  const [errors, setErrors] = React.useState<{
    password?: string;
    newPassword?: string;
  }>({});
  const { isLoggedIn } = useGlobalStore();
  const { data: user, isLoading } = useVerifyUser();
  const queryClient = useQueryClient();
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

  const logoutMutation = useLogoutMutation();
  const handleLogout = async () => {
    try {
      const response = await logoutMutation.mutateAsync();
      if (response.status === "success") {
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsAvatarSaved(false);
    }
  };

  const changeAvatarMutation = useChangeAvatarMutation();

  const handleChangeAvatar = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await changeAvatarMutation.mutateAsync(formData);
      if (response.status === "success") {
        alert("Avatar updated successfully!");
        setIsAvatarSaved(true);
        queryClient.invalidateQueries({ queryKey: ["verifyUser"] });
      } else {
        setResAvatarMessage(response.message);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };
  if (!isLoggedIn) return router.push("/login");
  if (isLoading) return null;
  return (
    <div className={styles.setting_page}>
      <div className={styles.setting_page_container}>
        <Link href={"/"} className={styles.setting_page_home}>
          <HomeIcon color="#fff" />
        </Link>
        <div className={styles.setting_page_container_infor}>
          <h1 className={styles.setting_page_container_infor_title}>Account</h1>
          <p className={styles.setting_page_container_infor_description}>
            Update your account settings
          </p>
        </div>

        <div className={styles.setting_page_container_outer}>
          <div className={styles.setting_page_container_inner}>
            <div className={styles.setting_page_container_avatar}>
              <Avatar
                userData={user?.data}
                size="xl"
                previewImage={previewImage}
              />
              <div className={styles.setting_page_container_avatar_infor}>
                <h3 className={styles.setting_page_container_avatar_infor_name}>
                  Profile Picture
                </h3>
                <p
                  className={
                    styles.setting_page_container_avatar_infor_description
                  }
                >
                  JPEG, PNG, Webp and GIF under 2MB
                </p>
              </div>
              {resAvatarMessage && (
                <span className={styles.error_avatar}>{resAvatarMessage}</span>
              )}
            </div>
            <label
              htmlFor="upload-avatar"
              className={styles.setting_page_container_inner_btn}
            >
              <span>Upload new avatar</span>
              <input
                type="file"
                onChange={handleImageUpload}
                name="upload-avatar"
                id="upload-avatar"
              />
            </label>
          </div>
          {previewImage && !isAvatarSaved && (
            <button
              className={`${styles.setting_page_lists_button}`}
              onClick={handleChangeAvatar}
            >
              {changeAvatarMutation.isPending ? (
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
                {response && password && newPassword && (
                  <p className={styles.error}>{response}</p>
                )}
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
              <button className={`${styles.setting_page_lists_button}`}>
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
            <p> Your account is secure</p>
          </div>
          <button
            className={styles.setting_page_lists_bottom_button}
            onClick={handleLogout}
          >
            <LogOutIcon />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPageSc;
