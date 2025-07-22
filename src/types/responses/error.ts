export type AuthErrorResponse = {
  status: number;
  message: string;
  type?: string;
};

export type ValidationErrorResponse = {
  status: number;
  message: string;
  errors: Record<string, string[]>;
};
