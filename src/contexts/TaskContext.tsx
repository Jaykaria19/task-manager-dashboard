import { createContext } from 'react';
import type { TTaskContext } from '../types/TTask';

export const TaskContext = createContext<TTaskContext | undefined>(undefined);