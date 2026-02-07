import { Button, View } from "react-native";
import { useCameraPermission } from "react-native-vision-camera";

export default function RequestCameraPermission() {
  const { hasPermission, requestPermission } = useCameraPermission();

  return (
    <>
      <View>
        <Button title="Request Camera Permission" onPress={requestPermission} />
      </View>
    </>
  );
}
