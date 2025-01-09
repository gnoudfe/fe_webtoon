interface ValidationErrors {
  username?: string;
  password?: string;
}

interface ValidationParams {
  username: string;
  password: string;
}

export const validateForm = ({
  username,
  password,
}: ValidationParams): ValidationErrors => {
  const errors: ValidationErrors = {};

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

  //   // Kiểm tra confirmPassword nếu cần
  //   if (confirmPassword !== undefined) {
  //     if (!confirmPassword) {
  //       errors.confirmPassword = "Confirm Password is required.";
  //     } else if (confirmPassword !== password) {
  //       errors.confirmPassword = "Passwords do not match.";
  //     }
  //   }

  return errors;
};
