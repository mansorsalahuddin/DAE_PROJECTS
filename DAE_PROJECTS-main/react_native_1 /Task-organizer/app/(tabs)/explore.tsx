import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
interface Post {
  id: number;
  title: string;
  body: string;
}

type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
};

const ExploreScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Explore">>();
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const maxRetries = 3;
    let attempt = 0;

    const attemptFetch = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json.slice(0, 5)); // Limit to 5 items
      } catch (error) {
        let errorMessage = "Failed to fetch data. Please try again later.";
        if (error instanceof TypeError) {
          errorMessage =
            "Network error. Please check your internet connection.";
        } else if (error instanceof SyntaxError) {
          errorMessage =
            "Invalid response from server. Please try again later.";
        }
        console.error("Error fetching data:", error);
        console.log("Setting error state:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    while (attempt < maxRetries) {
      await attemptFetch();
      if (!error) {
        break;
      }
      attempt++;
      console.log(`Retry attempt ${attempt}...`);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Discover new tasks and features here!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />

      {loading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }: { item: Post }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
