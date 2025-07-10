import { createContext } from 'react';
import type { TAuthContext } from '../types/TAuth';

export const AuthContext = createContext<TAuthContext | undefined>(undefined);