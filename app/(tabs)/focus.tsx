import { GlobalStyles } from "@/constants/styles/global";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DefaultCamera, { type DefaultCameraRef } from "../components/default-camera";

export default function FocusPage() {
  const cameraRef = useRef<DefaultCameraRef>(null);
  const isFocused = useIsFocused();

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
      <DefaultCamera ref={cameraRef} isActive={isFocused} />
      <Pressable style={StyleSheet.absoluteFill} onPress={handleFocus}>
        <View style={styles.hintContainer}>
          <Text style={styles.hint}>Tap to focus</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hintContainer: {
    position: "absolute",
    bottom: 32,
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
