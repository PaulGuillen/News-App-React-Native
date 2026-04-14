import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from '../features/auth/navigation/AuthNavigator';
import { NewsNavigator } from '../features/news/navigation/NewsNavigator';
import { useAppSelector, useAppDispatch } from '../shared/hooks';
import { checkAuthAction } from '../features/auth/presentation/state/authSlice';
import { Colors } from '../theme';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, initialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (!initialized) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={NewsNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
