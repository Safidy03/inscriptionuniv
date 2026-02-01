import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BachelierRef,
  chargerTout,
  listeBacheliersRef,
  modifierProfilUser,
  users,
} from "../../../store";

export default function PersonalInfo() {
  const router = useRouter();
  const { user } = useLocalSearchParams();

  const [infosBacc, setInfosBacc] = useState<BachelierRef | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [currentUsername, setCurrentUsername] = useState(user as string);

  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState<
    "username" | "email" | "telephone" | "adresse" | ""
  >("" as const);
  const [editValue, setEditValue] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        await chargerTout();
        const foundUser = users.find((u) => u.username === currentUsername);
        if (foundUser) {
          setUserData(foundUser);

          const foundBacc = listeBacheliersRef.find(
            (b) => b.numBacc === foundUser.numBacc,
          );
          if (foundBacc) setInfosBacc(foundBacc);
        }
      };
      loadData();
    }, [currentUsername]),
  );

  const handleEdit = (
    field: "username" | "email" | "telephone" | "adresse",
    currentValue: string,
  ) => {
    setEditField(field);
    setEditValue(currentValue || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!userData || !editField) return;

    // Validation du pseudo
    if (editField === "username") {
      if (editValue.length < 3) {
        Alert.alert("Erreur", "Le pseudo doit contenir au moins 3 caractères");
        return;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(editValue)) {
        Alert.alert(
          "Erreur",
          "Le pseudo ne peut contenir que des lettres, chiffres et underscore",
        );
        return;
      }
    }

    // Validation de l'email
    if (editField === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editValue)) {
        Alert.alert("Erreur", "Veuillez entrer une adresse email valide");
        return;
      }
    }

    // Validation du téléphone
    if (editField === "telephone") {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(editValue.replace(/\s/g, ""))) {
        Alert.alert(
          "Erreur",
          "Veuillez entrer un numéro de téléphone valide (10 chiffres)",
        );
        return;
      }
    }

    const newTelephone =
      editField === "telephone" ? editValue : userData.telephone;
    const newAdresse = editField === "adresse" ? editValue : userData.adresse;
    const newEmail = editField === "email" ? editValue : userData.email;
    const newUsername =
      editField === "username" ? editValue : userData.username;

    const result = await modifierProfilUser(
      userData.username,
      newTelephone,
      newAdresse,
      newEmail,
      newUsername,
    );

    if (result.success) {
      setUserData({
        ...userData,
        username: newUsername,
        telephone: newTelephone,
        adresse: newAdresse,
        email: newEmail,
      });

      // Si le pseudo a changé, on met à jour l'état local
      if (editField === "username") {
        setCurrentUsername(newUsername);
      }

      Alert.alert("Succès", result.msg);
      setIsEditing(false);
      setEditField("");
      setEditValue("");
    } else {
      Alert.alert("Erreur", result.msg || "Échec de la mise à jour");
    }
  };

  const fieldLabel: Record<string, string> = {
    username: "Pseudo",
    telephone: "Téléphone",
    adresse: "Adresse",
    email: "Email",
  };

  const InfoItem = ({
    icon,
    label,
    value,
    fieldName,
    editable = true,
  }: {
    icon: any;
    label: string;
    value: string;
    fieldName: "telephone" | "adresse" | "username" | "email";
    editable?: boolean;
  }) => (
    <View style={styles.infoItem}>
      <View style={styles.infoLeft}>
        <View style={styles.infoIconContainer}>
          <Ionicons name={icon} size={20} color="#003366" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value || "Non renseigné"}</Text>
        </View>
      </View>

      {editable && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            handleEdit(
              fieldName as "username" | "email" | "telephone" | "adresse",
              value,
            )
          }
        >
          <Ionicons name="create-outline" size={20} color="#003366" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Informations personnelles</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {String(currentUsername).charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Infos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>INFORMATIONS DE BASE</Text>

          <View style={styles.infoGroup}>
            <InfoItem
              icon="at-outline"
              label="Pseudo"
              value={currentUsername}
              fieldName="username"
              editable={true} // ← CHANGÉ À TRUE
            />

            <InfoItem
              icon="mail-outline"
              label="Email"
              // value={userData?.email || `${currentUsername}@gmail.com`}
              value={userData?.email || ""}
              fieldName="email"
              editable={true}
            />

            <InfoItem
              icon="location-outline"
              label="Adresse"
              value={userData?.adresse || ""}
              fieldName="adresse"
            />

            <InfoItem
              icon="call-outline"
              label="Téléphone"
              value={userData?.telephone || ""}
              fieldName="telephone"
            />
          </View>
        </View>

        {/* Section Bachelier */}
        {infosBacc && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INFORMATIONS BACCALAURÉAT</Text>
            <View style={styles.infoGroup}>
              <InfoItem
                icon="school-outline"
                label="Numéro BACC"
                value={infosBacc.numBacc}
                fieldName="username"
                editable={false}
              />
              <InfoItem
                icon="person-outline"
                label="Nom complet"
                value={infosBacc.nom}
                fieldName="username"
                editable={false}
              />
              <InfoItem
                icon="ribbon-outline"
                label="Série"
                value={infosBacc.serie}
                fieldName="username"
                editable={false}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Modal d'édition */}
      <Modal visible={isEditing} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Modifier {fieldLabel[editField]}
            </Text>

            {editField === "username" && (
              <Text style={styles.warningText}>
                ⚠️ Attention : Le changement de pseudo affectera votre connexion
              </Text>
            )}

            <TextInput
              style={styles.input}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Entrer ${fieldLabel[editField]}`}
              keyboardType={
                editField === "email"
                  ? "email-address"
                  : editField === "telephone"
                    ? "phone-pad"
                    : "default"
              }
              autoCapitalize={
                editField === "email" || editField === "username"
                  ? "none"
                  : "sentences"
              }
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setIsEditing(false);
                  setEditValue("");
                }}
              >
                <Text style={styles.cancelBtnText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Enregistrer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },

  header: {
    backgroundColor: "#003366",
    padding: 30,
    paddingTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  avatarSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#003366",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: { color: "#fff", fontSize: 36, fontWeight: "bold" },

  section: { padding: 20 },
  sectionTitle: {
    fontSize: 12,
    color: "#95a5a6",
    marginBottom: 10,
    fontWeight: "600",
  },

  infoGroup: { backgroundColor: "#fff", borderRadius: 12 },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#e8f4f8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: "#95a5a6", marginBottom: 2 },
  infoValue: { fontSize: 16, fontWeight: "500", color: "#2c3e50" },
  editButton: { padding: 6 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 35,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
  },
  warningText: {
    fontSize: 13,
    color: "#e67e22",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff3cd",
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  modalActions: { flexDirection: "row", gap: 12 },
  cancelBtn: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ecf0f1",
    alignItems: "center",
    borderRadius: 12,
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7f8c8d",
  },
  saveBtn: {
    flex: 1,
    padding: 16,
    backgroundColor: "#003366",
    alignItems: "center",
    borderRadius: 12,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
