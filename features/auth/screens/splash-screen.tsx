import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

export function SplashScreen() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(0.75)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 70,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      router.replace("/login");
    }, 2400);

    return () => clearTimeout(timeout);
  }, [opacity, router, scale, translateY]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity, transform: [{ scale }, { translateY }] },
        ]}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          contentFit="contain"
        />
      </Animated.View>
      <Animated.View
        style={[styles.copy, { opacity, transform: [{ translateY }] }]}
      >
        <Text style={styles.title}>News App</Text>
        <Text style={styles.subtitle}>
          {"Tu resumen del d\u00eda empieza aqu\u00ed"}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#123C35",
    padding: 24,
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 148,
    height: 148,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 12,
  },
  logo: {
    width: 106,
    height: 106,
  },
  copy: {
    alignItems: "center",
    marginTop: 28,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },
  subtitle: {
    color: "#D8F1EA",
    fontSize: 16,
    marginTop: 8,
  },
});
