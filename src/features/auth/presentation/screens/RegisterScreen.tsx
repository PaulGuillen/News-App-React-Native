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
import { isValidEmail, isValidPassword, isNotEmpty } from '../../../../shared/utils/validators';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type RegisterNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavigationProp>();
  const { register, loading, error, dismissError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error, [{ text: 'OK', onPress: dismissError }]);
    }
  }, [error, dismissError]);

  const validate = (): boolean => {
    let valid = true;
    if (!isNotEmpty(name)) { setNameError('Name is required'); valid = false; } else { setNameError(''); }
    if (!isValidEmail(email)) { setEmailError('Please enter a valid email'); valid = false; } else { setEmailError(''); }
    if (!isValidPassword(password)) { setPasswordError('Password must be at least 8 characters with uppercase, lowercase, and a number'); valid = false; } else { setPasswordError(''); }
    if (password !== confirmPassword) { setConfirmPasswordError('Passwords do not match'); valid = false; } else { setConfirmPasswordError(''); }
    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    await register(email.trim(), password, name.trim());
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join NewsApp today</Text>
          </View>

          <View style={styles.form}>
            <Input label="Full Name" placeholder="John Doe" value={name} onChangeText={setName} error={nameError} containerStyle={styles.input} />
            <Input label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" error={emailError} containerStyle={styles.input} />
            <Input label="Password" placeholder="At least 6 characters" value={password} onChangeText={setPassword} secureTextEntry error={passwordError} containerStyle={styles.input} />
            <Input label="Confirm Password" placeholder="Repeat your password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry error={confirmPasswordError} containerStyle={styles.input} />

            <Button title="Create Account" onPress={handleRegister} loading={loading} style={styles.registerButton} />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}>Sign In</Text>
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
  header: { paddingTop: Spacing.lg, paddingBottom: Spacing.xl },
  backButton: { marginBottom: Spacing.lg },
  backText: { ...Typography.body, color: Colors.primary },
  title: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { ...Typography.body, color: Colors.textSecondary },
  form: { flex: 1 },
  input: { marginBottom: Spacing.sm },
  registerButton: { marginTop: Spacing.md, marginBottom: Spacing.lg },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { ...Typography.body, color: Colors.textSecondary },
  footerLink: { ...Typography.body, color: Colors.primary, fontWeight: '600' },
});
