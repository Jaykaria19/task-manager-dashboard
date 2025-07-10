export type TUser = {
  email: string;
  password: string;
};

export type TAuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
};

export type TAuthContext = {
  user: TUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
};