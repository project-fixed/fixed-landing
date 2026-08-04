'use client';

import React, { createContext, useContext, useState } from 'react';
import { ScreenConfetti } from '@/shared/components/widgets/ScreenConfetti';

export interface WaitlistSuccessState {
  isRegistered: boolean;
  isDuplicate: boolean;
  isLocal: boolean;
  registeredUserNumber: number | null;
}

interface WaitlistModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  successState: WaitlistSuccessState | null;
  setSuccessState: (state: WaitlistSuccessState | null) => void;
}

const WaitlistModalContext = createContext<
  WaitlistModalContextType | undefined
>(undefined);

export const WaitlistModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [successState, setSuccessState] = useState<WaitlistSuccessState | null>(
    null,
  );

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <WaitlistModalContext.Provider
      value={{ isOpen, openModal, closeModal, successState, setSuccessState }}
    >
      {children}
      {successState?.isRegistered && !successState.isDuplicate && (
        <ScreenConfetti />
      )}
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
