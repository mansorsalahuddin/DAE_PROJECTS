// app/tabs/explore.tsx
import { View, Text } from "react-native";
import QRCodeGenerator from "../../components/QRCodeGenerator";

export default function ExploreScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Explore Screen</Text>
      <QRCodeGenerator value="https://new-url.com" />
    </View>
  );
}
