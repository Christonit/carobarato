import { useState, useEffect } from "react";

interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

interface DeviceInfo {
  deviceSize: string | null;
  windowWidth: number;
}

const useDeviceSize = (breakpoints: Breakpoints): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceSize: null,
    windowWidth:
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
  });

  const checkDeviceSize = () => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    let newSize: string;

    if (screenWidth < breakpoints.sm) {
      newSize = "xs";
    } else if (screenWidth < breakpoints.md) {
      newSize = "sm";
    } else if (screenWidth < breakpoints.lg) {
      newSize = "md";
    } else if (screenWidth < breakpoints.xl) {
      newSize = "lg";
    } else if (screenWidth < breakpoints.xxl) {
      newSize = "xl";
    } else {
      newSize = "xxl";
    }

    setDeviceInfo({
      deviceSize: newSize,
      windowWidth: screenWidth,
    });
  };

  useEffect(() => {
    checkDeviceSize();

    const handleResize = () => {
      checkDeviceSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoints]);

  return deviceInfo;
};

export default useDeviceSize;
