import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { TAuthState, TUser } from '../types/TAuth';

type TAuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<TAuthProviderProps> = ({ children }) => {

    //state to track auth
    const [authState, setAuthState] = useState<TAuthState>(() => {

    //store use in  localstorage
    const storedUser = localStorage.getItem('user');

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      isAuthenticated: !!storedUser,
    };});

    //for login page
  const login = useCallback((email: string, password: string): boolean => {

    const users: TUser[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setAuthState({ user, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }

    return false;
  }, []);

  //for sign up page
  const signup = useCallback((email: string, password: string): boolean => {

    const users: TUser[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u) => u.email === email)) {
      return false;
    }

    const newUser: TUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setAuthState({ user: newUser, isAuthenticated: true });
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  }, []);

  const contextValue = useMemo(() => ({
      user: authState.user, isAuthenticated: authState.isAuthenticated,login, signup,  logout, }),
    [authState, login, signup, logout] );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};