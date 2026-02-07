import { GlobalStyles } from "@/constants/styles/global";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DefaultCamera, { type DefaultCameraRef } from "../components/default-camera";

export default function ContrastPage() {
  const cameraRef = useRef<DefaultCameraRef>(null);
  const [contrast, setContrast] = useState(0);
  const contrastRef = useRef(0);
  const isFocused = useIsFocused();

  const handleContrastChange = useCallback((delta: number) => {
    if (!cameraRef.current) return;
    const next = cameraRef.current.setContrast(contrastRef.current + delta);
    if (next === contrastRef.current) return;
    contrastRef.current = next;
    setContrast(next);
  }, []);

  const handleReset = useCallback(() => {
    if (!cameraRef.current) return;
    const next = cameraRef.current.setContrast(0);
    contrastRef.current = next;
    setContrast(next);
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <DefaultCamera ref={cameraRef} isActive={isFocused} />
      <View style={styles.controls}>
        <Text style={styles.label}>Contrast: {contrast.toFixed(2)}</Text>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={() => handleContrastChange(-0.2)}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleContrastChange(0.2)}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#3a3f47",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

