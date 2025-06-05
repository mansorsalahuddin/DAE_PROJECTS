import React from "react";
import { View, Text, StyleSheet } from "react-native";

type LayoutProps = {
  title: string;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    padding: 20,
    backgroundColor: "#6200ea",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 15,
  },
});

export default Layout;
