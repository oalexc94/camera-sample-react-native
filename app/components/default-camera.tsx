import { StyleSheet } from "react-native";
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
} from "react-native-vision-camera";
import NoCameraDevice from "./no-camera-device";
import RequestCameraPermission from "./request-camera-permission";

export default function DefaultCamera() {
  const device = useCameraDevice("back");
  const { hasPermission } = useCameraPermission();

  if (!hasPermission) return <RequestCameraPermission />;
  if (device == null) return <NoCameraDevice />;

  return (
    <Camera style={StyleSheet.absoluteFill} isActive={true} device={device} />
  );
}
