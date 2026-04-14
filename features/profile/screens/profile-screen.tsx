import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Perfil</ThemedText>
      <ThemedText>Configura tu cuenta y preferencias.</ThemedText>
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
