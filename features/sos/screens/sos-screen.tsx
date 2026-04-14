import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function SosScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">S.O.S</ThemedText>
      <ThemedText>Seccion de emergencias.</ThemedText>
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
