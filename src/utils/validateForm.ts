interface ValidationErrors {
  fullname?: string;
  username?: string;
  password?: string;
  newPassword?: string;
}

interface ValidationParams {
  fullname?: string;
  username?: string;
  password?: string;
  isLogin?: boolean;
  newPassword?: string;
  isChangePassword?: boolean;
}

export const validateForm = ({
  fullname,
  username,
  password,
  isLogin = false,
  isChangePassword = false,
  newPassword,
}: ValidationParams): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!isChangePassword) {
    if (!isLogin) {
      // Kiểm tra fullname
      if (!fullname) {
        errors.fullname = "Fullname is required.";
      }
    }
    // Kiểm tra username
    if (!username) {
      errors.username = "Username is required.";
    }

    // Kiểm tra password
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
  } else {
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    if (!newPassword) {
      errors.newPassword = "New password is required.";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters.";
    }
  }

  return errors;
};
