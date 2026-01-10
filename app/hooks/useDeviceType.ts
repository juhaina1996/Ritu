"use client";

import { useState, useEffect } from 'react';

export interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      
      setDeviceType({
        isMobile: width < 992,
        isTablet: width >= 992 && width < 992,
        isDesktop: width >= 992,
      });
    };

    // Check on initial load
    checkDeviceType();

    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceType);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return deviceType;
};