import { GlobalStyles } from "@/constants/styles/global";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DefaultCamera, { type DefaultCameraRef } from "../components/default-camera";

export default function ExposurePage() {
	const cameraRef = useRef<DefaultCameraRef>(null);
	const [exposure, setExposure] = useState(0);
	const exposureRef = useRef(0);
	const isFocused = useIsFocused();

	const handleExposureChange = useCallback((delta: number) => {
		if (!cameraRef.current) return;
		const next = cameraRef.current.setExposure(exposureRef.current + delta);
		if (next === exposureRef.current) return;
		exposureRef.current = next;
		setExposure(next);
	}, []);

	const handleReset = useCallback(() => {
		if (!cameraRef.current) return;
		const next = cameraRef.current.setExposure(0);
		exposureRef.current = next;
		setExposure(next);
	}, []);

	return (
		<View style={GlobalStyles.container}>
			<DefaultCamera ref={cameraRef} isActive={isFocused} />
			<View style={styles.controls}>
				<Text style={styles.label}>Exposure: {exposure.toFixed(2)}</Text>
				<View style={styles.buttons}>
					<Pressable style={styles.button} onPress={() => handleExposureChange(-0.2)}>
						<Text style={styles.buttonText}>-</Text>
					</Pressable>
					<Pressable style={styles.button} onPress={handleReset}>
						<Text style={styles.buttonText}>Reset</Text>
					</Pressable>
					<Pressable style={styles.button} onPress={() => handleExposureChange(0.2)}>
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
