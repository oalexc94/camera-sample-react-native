import { GlobalStyles } from "@/constants/styles/global";
import { useIsFocused } from "@react-navigation/native";
import { View } from "react-native";
import DefaultCamera from "../components/default-camera";

export default function Index() {
  const isFocused = useIsFocused();
  return (
    <View style={GlobalStyles.container}>
      <DefaultCamera isActive={isFocused} />
    </View>
  );
}
