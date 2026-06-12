import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import theme from '../../theme/theme';
import Button from '../../components/common/Button';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginScreen = ({ navigation }) => {
  const [userType, setUserType] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const userTypes = [
    { id: 'admin', label: 'Admin', icon: 'shield' },
    { id: 'rider', label: 'Rider', icon: 'bicycle' },
    { id: 'customer', label: 'Customer', icon: 'person' },
    { id: 'vendor', label: 'Vendor', icon: 'storefront' },
  ];

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login:', { ...values, userType });
      // Navigate based on user type
      navigation.reset({
        index: 0,
        routes: [{ name: userType === 'admin' ? 'AdminApp' : userType === 'rider' ? 'RiderApp' : userType === 'customer' ? 'CustomerApp' : 'VendorApp' }],
      });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logo}>
            <Ionicons name="rocket" size={48} color={theme.colors.primary} />
          </View>
          <Text style={styles.appName}>QuickDispatch</Text>
          <Text style={styles.tagline}>Fast. Reliable. Logistics</Text>
        </View>

        {/* User Type Selection */}
        <View style={styles.userTypeSection}>
          <Text style={styles.userTypeLabel}>I am a:</Text>
          <View style={styles.userTypeGrid}>
            {userTypes.map(type => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.userTypeButton,
                  userType === type.id && styles.userTypeButtonActive,
                ]}
                onPress={() => setUserType(type.id)}
              >
                <Ionicons
                  name={type.icon}
                  size={24}
                  color={userType === type.id ? theme.colors.primary : theme.colors.textSecondary}
                />
                <Text
                  style={[
                    styles.userTypeText,
                    userType === type.id && styles.userTypeTextActive,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Login Form */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formSection}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail"
                    size={20}
                    color={theme.colors.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="email-address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    editable={!loading}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color={theme.colors.textSecondary}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry={!showPassword}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.optionsRow}>
                <View style={styles.rememberMe}>
                  <TouchableOpacity style={styles.checkbox}>
                    <Ionicons name="checkbox" size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.rememberText}>Remember me</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotLink}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <Button
                title={loading ? 'Logging in...' : 'Login'}
                onPress={handleSubmit}
                variant="primary"
                size="large"
                fullWidth
                loading={loading}
                disabled={loading}
              />

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>

        {/* Social Login */}
        <View style={styles.socialSection}>
          <View style={styles.divider} />
          <Text style={styles.socialLabel}>Or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={24} color={theme.colors.error} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color={theme.colors.info} />
          </TouchableOpacity>
        </View>

        {/* Terms & Privacy */}
        <View style={styles.footerText}>
          <Text style={styles.termsText}>
            By logging in, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  appName: {
    fontSize: theme.typography.h2,
    fontWeight: '700',
    color: theme.colors.text,
  },
  tagline: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  userTypeSection: {
    marginBottom: theme.spacing.xl,
  },
  userTypeLabel: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  userTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
  userTypeButton: {
    width: '23%',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
  },
  userTypeButtonActive: {
    backgroundColor: theme.colors.primary + '15',
    borderColor: theme.colors.primary,
  },
  userTypeText: {
    fontSize: theme.typography.small,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  userTypeTextActive: {
    color: theme.colors.primary,
  },
  formSection: {
    marginBottom: theme.spacing.xl,
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputIcon: {
    marginRight: theme.spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.small,
    marginTop: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  rememberText: {
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
  forgotLink: {
    fontSize: theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  signupText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
  },
  signupLink: {
    fontSize: theme.typography.body,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  socialSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  socialLabel: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: theme.typography.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
