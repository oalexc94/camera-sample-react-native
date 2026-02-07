import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import type { PhysicalCameraDeviceType } from "react-native-vision-camera";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import NoCameraDevice from "./no-camera-device";
import RequestCameraPermission from "./request-camera-permission";

type DefaultCameraProps = {
  isActive?: boolean;
  physicalDevices?: PhysicalCameraDeviceType[];
};

export type DefaultCameraRef = {
  getCamera: () => Camera | null;
  setContrast: (value: number) => number;
  getContrast: () => number;
  setExposure: (value: number) => number;
  getExposure: () => number;
};

const DefaultCamera = forwardRef<DefaultCameraRef, DefaultCameraProps>(function DefaultCamera(
  { isActive = true, physicalDevices },
  ref
) {
  const baseDevice = useCameraDevice("back");
  const filteredDevice = useCameraDevice("back", { physicalDevices });
  const device = filteredDevice ?? baseDevice;
  const { hasPermission } = useCameraPermission();
  const [exposure, setExposure] = useState(0);
  const exposureRef = useRef(0);
  const cameraRef = useRef<Camera>(null);

  const clampExposure = useCallback(
    (value: number) => {
      if (!device) return value;
      return Math.min(device.maxExposure, Math.max(device.minExposure, value));
    },
    [device]
  );

  useEffect(() => {
    const clamped = clampExposure(exposureRef.current);
    exposureRef.current = clamped;
    setExposure(clamped);
  }, [clampExposure]);

  useImperativeHandle(
    ref,
    () => ({
      getCamera: () => cameraRef.current,
      setContrast: (value: number) => {
        const clamped = clampExposure(value);
        exposureRef.current = clamped;
        setExposure(clamped);
        return clamped;
      },
      getContrast: () => exposureRef.current,
      setExposure: (value: number) => {
        const clamped = clampExposure(value);
        exposureRef.current = clamped;
        setExposure(clamped);
        return clamped;
      },
      getExposure: () => exposureRef.current,
    }),
    [clampExposure]
  );

  if (!hasPermission) return <RequestCameraPermission />;
  if (device == null) return <NoCameraDevice />;

  return (
    <Camera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      isActive={isActive}
      device={device}
      exposure={exposure}
    />
  );
});

export default DefaultCamera;
