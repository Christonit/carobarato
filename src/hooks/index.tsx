import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../utils/constants";
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

const useDeviceSize = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceSize: null,
    windowWidth: 0,
  });

  const checkDeviceSize = () => {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    let newSize: string;

    if (screenWidth < BREAKPOINTS.sm) {
      newSize = "xs";
    } else if (screenWidth < BREAKPOINTS.md) {
      newSize = "sm";
    } else if (screenWidth < BREAKPOINTS.lg) {
      newSize = "md";
    } else if (screenWidth < BREAKPOINTS.xl) {
      newSize = "lg";
    } else if (screenWidth < BREAKPOINTS.xxl) {
      newSize = "xl";
    } else {
      newSize = "xxl";
    }

    setDeviceInfo({
      deviceSize: newSize,
      windowWidth: screenWidth,
    });
  };

  // useEffect(() => {
  //   setDeviceInfo({
  //     ...deviceInfo,
  //     windowWidth:
  //       window.innerWidth ||
  //       document.documentElement.clientWidth ||
  //       document.body.clientWidth,
  //   });
  // }, [deviceInfo]);

  useEffect(() => {
    checkDeviceSize();

    const handleResize = () => {
      checkDeviceSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return deviceInfo;
};

export default useDeviceSize;
