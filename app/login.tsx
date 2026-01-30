import { ThemedText } from "@/components/themed-text";
import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Formik } from "formik";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginScreen() {
  const { login } = useAuth();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const handleLogin = async (
    values: { username: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      await login(values);
    } catch (error: any) {
      const msg =
        error.response?.data?.detail || "Please check your credentials";
      Alert.alert("Login Failed", msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        colors={[theme.background, theme.card]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, shadowColor: theme.text },
          ]}
        >
          <View style={styles.header}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.primary + "20" },
              ]}
            >
              <Ionicons
                name="shield-checkmark"
                size={40}
                color={theme.primary}
              />
            </View>
            <ThemedText type="title" style={styles.title}>
              Welcome Back
            </ThemedText>
            <ThemedText
              style={[styles.subtitle, { color: theme.textSecondary }]}
            >
              Sign in to access your dashboard
            </ThemedText>
          </View>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <ThemedText
                    style={[styles.label, { color: theme.textSecondary }]}
                  >
                    Username
                  </ThemedText>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        borderColor:
                          touched.username && errors.username
                            ? theme.error
                            : theme.border,
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={theme.icon}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: theme.text }]}
                      placeholder="Enter username"
                      placeholderTextColor={theme.icon}
                      value={values.username}
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      autoCapitalize="none"
                    />
                  </View>
                  {touched.username && errors.username && (
                    <ThemedText style={{ color: theme.error, fontSize: 12 }}>
                      {errors.username}
                    </ThemedText>
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <ThemedText
                    style={[styles.label, { color: theme.textSecondary }]}
                  >
                    Password
                  </ThemedText>
                  <View
                    style={[
                      styles.inputContainer,
                      {
                        borderColor:
                          touched.password && errors.password
                            ? theme.error
                            : theme.border,
                        backgroundColor: theme.background,
                      },
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={theme.icon}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: theme.text }]}
                      placeholder="Enter password"
                      placeholderTextColor={theme.icon}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry
                    />
                  </View>
                  {touched.password && errors.password && (
                    <ThemedText style={{ color: theme.error, fontSize: 12 }}>
                      {errors.password}
                    </ThemedText>
                  )}
                </View>

                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    {
                      backgroundColor: theme.primary,
                      shadowColor: theme.primary,
                    },
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ThemedText style={styles.loginButtonText}>
                      Sign In
                    </ThemedText>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: Spacing.l,
  },
  card: {
    borderRadius: BorderRadius.l,
    padding: Spacing.xl,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.round,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.m,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: "bold",
    marginBottom: Spacing.s,
  },
  subtitle: {
    fontSize: Typography.sizes.s,
    textAlign: "center",
  },
  form: {
    gap: Spacing.l,
  },
  inputGroup: {
    gap: Spacing.s,
  },
  label: {
    fontSize: Typography.sizes.s,
    fontWeight: "600",
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: BorderRadius.xl,
    height: 56,
    paddingHorizontal: Spacing.m,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.m,
    height: "100%",
  },
  loginButton: {
    height: 56,
    borderRadius: BorderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.s,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: Typography.sizes.m,
    fontWeight: "bold",
  },
});
