import { GlobalStyles } from "@/constants/styles/global";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { PhysicalCameraDeviceType } from "react-native-vision-camera";
import DefaultCamera, { type DefaultCameraRef } from "../components/default-camera";

export default function FramePage() {
  const isFocused = useIsFocused();
  const cameraRef = useRef<DefaultCameraRef>(null);
  const [isCloseUp, setIsCloseUp] = useState(false);

  const physicalDevices = useMemo<PhysicalCameraDeviceType[]>(
    () => (isCloseUp ? ["ultra-wide-angle-camera"] : ["wide-angle-camera"]),
    [isCloseUp]
  );

  const handleToggle = useCallback(() => {
    setIsCloseUp((current) => !current);
  }, []);

  const handleFocus = useCallback(async (event: { nativeEvent: { locationX: number; locationY: number } }) => {
    const camera = cameraRef.current?.getCamera();
    if (!camera) return;
    const { locationX, locationY } = event.nativeEvent;
    try {
      await camera.focus({ x: locationX, y: locationY });
    } catch {
      // Ignore focus errors
    }
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <DefaultCamera ref={cameraRef} isActive={isFocused} physicalDevices={physicalDevices} />
      <Pressable style={StyleSheet.absoluteFill} onPress={handleFocus}>
        <View style={styles.hintContainer}>
          <Text style={styles.hint}>Tap to focus</Text>
        </View>
      </Pressable>
      <View style={styles.controls}>
        <Text style={styles.label}>Mode: {isCloseUp ? "Close-up (Ultra-wide)" : "Standard (Wide)"}</Text>
        <Pressable style={styles.button} onPress={handleToggle}>
          <Text style={styles.buttonText}>{isCloseUp ? "Use wide" : "Use ultra-wide"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: "absolute",
    bottom: 32,
    left: 16,
    right: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#3a3f47",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  hintContainer: {
    position: "absolute",
    bottom: 100,
    left: 16,
    right: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  hint: {
    color: "#fff",
    textAlign: "center",
  },
});
