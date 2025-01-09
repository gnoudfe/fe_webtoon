import React from "react";
import styles from "./styles.module.scss";

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string; // Thêm prop value để nhận giá trị từ parent component
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Hàm xử lý thay đổi giá trị
}

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={styles.auth_form_input}
    />
  );
};

export default InputField;
