// app/+not-found.tsx
import { View, Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>404 - Page Not Found</Text>
    </View>
  );
}
