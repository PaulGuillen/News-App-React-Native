import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const homeTabIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="house.fill" color={color} />
);

const countriesTabIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="globe.americas.fill" color={color} />
);

const sosTabIcon = ({ focused }: { focused: boolean }) => {
  const circleStateStyle = focused
    ? styles.sosCircleActive
    : styles.sosCircleInactive;
  const labelStateStyle = focused ? styles.sosCustomLabelActive : undefined;

  return (
    <View style={styles.sosWrap}>
      <View style={[styles.sosCircle, circleStateStyle]}>
        <IconSymbol size={28} name="cross.case.fill" color="#FFFFFF" />
      </View>
      <Text style={[styles.sosCustomLabel, labelStateStyle]}>{"S.O.S"}</Text>
    </View>
  );
};

const myListTabIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="list.bullet" color={color} />
);

const profileTabIcon = ({ color }: { color: string }) => (
  <IconSymbol size={28} name="person.fill" color={color} />
);

export function TabLayoutScreen() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: homeTabIcon,
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: "Paises",
          tabBarIcon: countriesTabIcon,
        }}
      />
      <Tabs.Screen
        name="sos/index"
        options={{
          title: "S.O.S",
          tabBarIcon: sosTabIcon,
          tabBarIconStyle: styles.sosIcon,
          tabBarLabel: () => null,
          tabBarActiveTintColor: "#0A7EA4",
        }}
      />
      <Tabs.Screen
        name="my-list/index"
        options={{
          title: "Mi lista",
          tabBarIcon: myListTabIcon,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Perfil",
          tabBarIcon: profileTabIcon,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 78,
    paddingTop: 8,
    paddingBottom: 10,
  },
  sosIcon: {
    marginTop: -28,
  },
  sosWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  sosCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  sosCircleActive: {
    backgroundColor: "#0A7EA4",
  },
  sosCircleInactive: {
    backgroundColor: "#4F8CA1",
  },
  sosCustomLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "#8893A7",
  },
  sosCustomLabelActive: {
    color: "#0A7EA4",
  },
});
