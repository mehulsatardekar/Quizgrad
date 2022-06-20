type SignupType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupErrorType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type { SignupType, SignupErrorType };
