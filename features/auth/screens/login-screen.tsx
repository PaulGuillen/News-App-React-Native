import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function LoginScreen() {
  const router = useRouter();
  const [rememberUser, setRememberUser] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>
            Ingresa para leer las noticias que importan.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Usuario</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Tu usuario"
              placeholderTextColor="#7B8794"
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>{"Contrase\u00f1a"}</Text>
            <TextInput
              placeholder={"Tu contrase\u00f1a"}
              placeholderTextColor="#7B8794"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.optionsRow}>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: rememberUser }}
              onPress={() => setRememberUser((value) => !value)}
              style={styles.checkboxRow}
            >
              <View
                style={[
                  styles.checkbox,
                  rememberUser && styles.checkboxChecked,
                ]}
              >
                {rememberUser ? (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                ) : null}
              </View>
              <Text style={styles.optionText}>Recordar usuario</Text>
            </Pressable>

            <Pressable onPress={() => {}}>
              <Text style={styles.forgotText}>
                {"\u00bfOlvidaste tu contrase\u00f1a?"}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.loginButton}
            onPress={() => router.replace("/(tabs)")}
          >
            <Text style={styles.loginButtonText}>Ingresar</Text>
          </Pressable>
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerCopy}>{"\u00bfNo tienes cuenta?"}</Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}> Registrarse</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F8F6",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 34,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 22,
  },
  title: {
    color: "#1E2A24",
    fontSize: 32,
    fontWeight: "800",
  },
  subtitle: {
    color: "#5F6F67",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    textAlign: "center",
  },
  form: {
    gap: 18,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    color: "#1E2A24",
    fontSize: 15,
    fontWeight: "700",
  },
  input: {
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#D5E2DD",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    color: "#1E2A24",
    fontSize: 16,
    paddingHorizontal: 16,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  checkboxRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#AEBBCD",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    borderColor: "#EF6351",
    backgroundColor: "#EF6351",
  },
  optionText: {
    color: "#38524A",
    fontSize: 14,
  },
  forgotText: {
    color: "#0F8B8D",
    fontSize: 14,
    fontWeight: "700",
  },
  loginButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    borderRadius: 8,
    backgroundColor: "#EF6351",
    marginTop: 6,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  registerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },
  registerCopy: {
    color: "#5F6F67",
    fontSize: 15,
  },
  registerLink: {
    color: "#0F8B8D",
    fontSize: 15,
    fontWeight: "800",
  },
});
