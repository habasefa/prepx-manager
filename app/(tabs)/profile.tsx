import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout, isLoading } = useAuth();
  const colorScheme = useColorScheme() ?? "light";

  if (!user) return null;

  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: string;
    label: string;
    value: string | null;
  }) => (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <IconSymbol
          name={icon as any}
          size={20}
          color={Colors[colorScheme].icon}
        />
      </View>
      <View style={styles.rowContent}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        <ThemedText style={styles.value}>{value || "N/A"}</ThemedText>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: Colors[colorScheme].tint },
            ]}
          >
            <ThemedText style={styles.avatarText}>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </ThemedText>
          </View>
          <ThemedText type="title" style={styles.name}>
            {user.name}
          </ThemedText>
          <ThemedText style={styles.role}>
            {user.user_type.toUpperCase()}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <InfoRow icon="phone.fill" label="Phone" value={user.phone} />
          <InfoRow icon="location.fill" label="Region" value={user.region} />
          <InfoRow icon="person.2.fill" label="School" value={user.school} />
          <InfoRow icon="graduationcap.fill" label="Grade" value={user.grade} />
        </ThemedView>

        <TouchableOpacity
          style={[styles.logoutButton, { borderColor: "#ef4444" }]}
          onPress={logout}
          disabled={isLoading}
        >
          <ThemedText style={{ color: "#ef4444", fontWeight: "bold" }}>
            {isLoading ? "Logging out..." : "Log Out"}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "transparent",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  name: {
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    opacity: 0.6,
    letterSpacing: 1,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 20,
    // Add subtle shadow or border depending on theme, utilizing ThemedView default
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  rowContent: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
});
