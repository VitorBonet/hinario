'use client'

import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { uuid } from "uuidv4";

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const Toast = createContext<ToastData>({} as ToastData);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id= uuid();

    const toast = {
      id,
      type,
      title,
      description,
    }

    setMessages((oldMessages) => [...oldMessages, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <Toast.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </Toast.Provider>
  );
}

function useToast(): ToastData {
  const context = useContext(Toast);

  if (!context) {
    throw new Error('useToast must e used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };