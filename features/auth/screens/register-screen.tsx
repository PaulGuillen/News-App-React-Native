import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function RegisterScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#1E2A24" />
            <Text style={styles.backText}>Volver</Text>
          </Pressable>

          <View style={styles.header}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
              contentFit="contain"
            />
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>
              Completa tus datos para empezar a leer tus noticias.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre completo</Text>
              <TextInput
                autoCapitalize="words"
                placeholder="Tu nombre"
                placeholderTextColor="#7B8794"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Crea tu usuario"
                placeholderTextColor="#7B8794"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="correo@ejemplo.com"
                placeholderTextColor="#7B8794"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{"Contrase\u00f1a"}</Text>
              <TextInput
                placeholder={"Crea una contrase\u00f1a"}
                placeholderTextColor="#7B8794"
                secureTextEntry
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{"Confirmar contrase\u00f1a"}</Text>
              <TextInput
                placeholder={"Repite tu contrase\u00f1a"}
                placeholderTextColor="#7B8794"
                secureTextEntry
                style={styles.input}
              />
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={() => router.replace("/login")}
            >
              <Text style={styles.primaryButtonText}>Crear cuenta</Text>
            </Pressable>
          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginCopy}>{"\u00bfYa tienes cuenta?"}</Text>
            <Pressable onPress={() => router.replace("/login")}>
              <Text style={styles.loginLink}> Iniciar sesión</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F8F6",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 4,
    marginBottom: 22,
  },
  backText: {
    color: "#1E2A24",
    fontSize: 15,
    fontWeight: "700",
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    width: 84,
    height: 84,
    marginBottom: 18,
  },
  title: {
    color: "#1E2A24",
    fontSize: 31,
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
    gap: 16,
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
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 54,
    borderRadius: 8,
    backgroundColor: "#EF6351",
    marginTop: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  loginRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 26,
  },
  loginCopy: {
    color: "#5F6F67",
    fontSize: 15,
  },
  loginLink: {
    color: "#0F8B8D",
    fontSize: 15,
    fontWeight: "800",
  },
});
