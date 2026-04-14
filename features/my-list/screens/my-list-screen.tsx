import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function MyListScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Mi lista</ThemedText>
      <ThemedText>Aqui veras tus noticias guardadas.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 24,
  },
});
