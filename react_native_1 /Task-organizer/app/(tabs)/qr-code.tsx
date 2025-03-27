import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import QRCodeGenerator from "../../components/QRCodeGenerator";

const QRCodeScreen = () => {
  const [text, setText] = useState("");
  const [qrCode, setQRCode] = useState<string | null>(null);

  const generateQRCode = () => {
    setQRCode(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text to generate QR Code"
        value={text}
        onChangeText={setText}
      />
      <Button title="Generate QR Code" onPress={generateQRCode} />
      {qrCode && <QRCodeGenerator text={qrCode} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default QRCodeScreen;
