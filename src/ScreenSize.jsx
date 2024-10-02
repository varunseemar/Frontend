import React, { createContext, useState, useEffect } from 'react';
export const ScreenSize = createContext();

export const ScreenSizeProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(()=>{
    const handleResize = ()=>{
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('mobile', handleResize);
    return () => window.removeEventListener('mobile', handleResize);
  },[]);

  return (
    <ScreenSize.Provider value={isMobile}>
      {children}
    </ScreenSize.Provider>
  );
};