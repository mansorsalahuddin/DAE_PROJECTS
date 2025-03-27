import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface QRCodeGeneratorProps {
  text: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <QRCode value={text} size={200} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default QRCodeGenerator;
