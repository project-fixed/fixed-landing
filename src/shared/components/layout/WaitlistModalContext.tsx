'use client';

import React, { createContext, useContext, useState } from 'react';

interface WaitlistModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const WaitlistModalContext = createContext<
  WaitlistModalContextType | undefined
>(undefined);

export const WaitlistModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <WaitlistModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </WaitlistModalContext.Provider>
  );
};

export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext);
  if (!context) {
    throw new Error(
      'useWaitlistModal must be used within a WaitlistModalProvider',
    );
  }
  return context;
}
