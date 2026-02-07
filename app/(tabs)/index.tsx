import { GlobalStyles } from "@/constants/styles/global";
import { View } from "react-native";
import DefaultCamera from "../components/default-camera";

export default function Index() {
  return (
    <View style={GlobalStyles.container}>
      <DefaultCamera />
    </View>
  );
}
