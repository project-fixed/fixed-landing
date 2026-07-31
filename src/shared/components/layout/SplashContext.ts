'use client';

import { createContext, useContext } from 'react';

const SplashContext = createContext(true);

export function useSplashDone() {
  return useContext(SplashContext);
}

export default SplashContext;
