import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BachelierRef,
  chargerTout,
  listeBacheliersRef,
  users,
} from "../../store";

export default function ProfilEtudiant() {
  const router = useRouter();
  const { user } = useLocalSearchParams();

  const [infosBacc, setInfosBacc] = useState<BachelierRef | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      await chargerTout();
      const foundUser = users.find((u) => u.username === user);
      if (foundUser) {
        setUserData(foundUser);
        const foundBacc = listeBacheliersRef.find(
          (b) => b.numBacc === foundUser.numBacc,
        );
        if (foundBacc) setInfosBacc(foundBacc);
      }
    };
    loadData();
  }, [user]);

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showBadge,
    badgeText,
    danger,
  }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View
        style={[styles.iconContainer, danger && styles.iconContainerDanger]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={danger ? "#e74c3c" : "#003366"}
        />
      </View>
      <View style={styles.menuContent}>
        <Text style={[styles.menuTitle, danger && styles.menuTitleDanger]}>
          {title}
        </Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showBadge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      )}
      {!danger && <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header avec gradient */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Card Profil Principal */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={50} color="#fff" />
          </View>
          <View style={styles.statusBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#27ae60" />
          </View>
        </View>
        <Text style={styles.userName}>{infosBacc?.nom || user}</Text>
        <Text style={styles.userEmail}>{user}@eni.mg</Text>
        <View style={styles.userBadge}>
          <Ionicons
            name={
              userData?.role === "admin"
                ? "shield-checkmark-outline"
                : "school-outline"
            }
            size={14}
            color="#003366"
          />
          <Text style={styles.badgeLabel}>
            {userData?.role === "admin"
              ? "Administrateur"
              : userData?.role === "student"
                ? `Bachelier ${new Date().getFullYear()}`
                : "Utilisateur"}
          </Text>
        </View>
      </View>

      {/* Section Informations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          INFORMATIONS DU COMPTE ET SECURITE
        </Text>
        <View style={styles.menuGroup}>
          <MenuItem
            icon="person-outline"
            title="Informations personnelles"
            subtitle={`Pseudo, ${infosBacc?.nom || "Adresse"}`}
            onPress={() =>
              Alert.alert(
                "Info",
                "Navigation vers les informations personnelles",
              )
            }
          />
          <MenuItem
            icon="lock-closed-outline"
            title="Mot de passe"
            subtitle="Modifier votre mot de passe"
            onPress={() =>
              Alert.alert(
                "Sécurité",
                "Navigation vers changement de mot de passe",
              )
            }
          />
        </View>
      </View>

      {/* Section Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUPPORT & INFORMATIONS</Text>
        <View style={styles.menuGroup}>
          <MenuItem
            icon="help-circle-outline"
            title="Centre d'aide"
            subtitle="FAQ et assistance"
            onPress={() => Alert.alert("Aide", "Navigation vers centre d'aide")}
          />
          <MenuItem
            icon="chatbubble-ellipses-outline"
            title="Contactez-nous"
            subtitle="Envoyez-nous un message"
            onPress={() => Alert.alert("Contact", "Navigation vers contact")}
          />
          <MenuItem
            icon="star-outline"
            title="Évaluer l'application"
            subtitle="Partagez votre expérience"
            onPress={() =>
              Alert.alert("Évaluation", "Merci pour votre feedback!")
            }
          />
        </View>
      </View>

      {/* Section Légal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LÉGAL</Text>
        <View style={styles.menuGroup}>
          <MenuItem
            icon="document-text-outline"
            title="Conditions d'utilisation"
            onPress={() => Alert.alert("Légal", "Navigation vers CGU")}
          />
          <MenuItem
            icon="shield-outline"
            title="Politique de confidentialité"
            onPress={() => Alert.alert("Légal", "Navigation vers politique")}
          />
          <MenuItem
            icon="information-circle-outline"
            title="À propos de l'application"
            subtitle="Version 1.0.0"
            onPress={() =>
              Alert.alert("À propos", "ENI-UF © 2026\nVersion 1.0.0")
            }
          />
        </View>
      </View>

      {/* Bouton Déconnexion */}
      <View style={styles.section}>
        <View style={styles.menuGroup}>
          <MenuItem
            icon="log-out-outline"
            title="Se déconnecter"
            onPress={handleLogout}
            danger
          />
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        © 2026 ENI Fianarantsoa{"\n"}
        Système de gestion des concours
      </Text>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#003366",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  placeholder: {
    width: 40,
  },

  // Profile Card
  profileCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#003366",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  statusBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 2,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 15,
  },
  userBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f4f8",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  badgeLabel: {
    fontSize: 13,
    color: "#003366",
    fontWeight: "600",
  },

  // Sections
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#95a5a6",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 5,
  },
  menuGroup: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  // Menu Items
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e8f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconContainerDanger: {
    backgroundColor: "#fee",
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 2,
  },
  menuTitleDanger: {
    color: "#e74c3c",
  },
  menuSubtitle: {
    fontSize: 13,
    color: "#95a5a6",
  },
  badge: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },

  // Footer
  footer: {
    textAlign: "center",
    color: "#bdc3c7",
    fontSize: 12,
    marginTop: 30,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: 40,
  },
});
