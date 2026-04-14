import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../../../../shared/components/ScreenContainer';
import { Input } from '../../../../shared/components/Input';
import { Button } from '../../../../shared/components/Button';
import { Colors, Typography, Spacing } from '../../../../theme';
import { useAuth } from '../hooks/useAuth';
import { isValidEmail, isValidPassword } from '../../../../shared/utils/validators';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, loading, error, dismissError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [{ text: 'OK', onPress: dismissError }]);
    }
  }, [error, dismissError]);

  const validate = (): boolean => {
    let valid = true;
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 8 characters and include uppercase, lowercase, and a number');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    await login(email.trim(), password);
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.logo}>📰</Text>
            <Text style={styles.title}>NewsApp</Text>
            <Text style={styles.subtitle}>Stay informed, stay ahead</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>Welcome back</Text>
            <Text style={styles.formSubtitle}>Sign in to your account</Text>

            <Input
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={emailError}
              containerStyle={styles.input}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={passwordError}
              containerStyle={styles.input}
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.footerLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: Spacing.lg },
  header: { alignItems: 'center', paddingTop: Spacing.xxl, paddingBottom: Spacing.xl },
  logo: { fontSize: 72, marginBottom: Spacing.sm },
  title: { ...Typography.h1, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { ...Typography.body, color: Colors.textSecondary },
  form: { flex: 1 },
  formTitle: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.xs },
  formSubtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: Spacing.lg },
  input: { marginBottom: Spacing.sm },
  loginButton: { marginTop: Spacing.md, marginBottom: Spacing.lg },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { ...Typography.body, color: Colors.textSecondary },
  footerLink: { ...Typography.body, color: Colors.primary, fontWeight: '600' },
});
