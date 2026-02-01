import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { changerMotDePasse } from "../../../store"; // Ajuste le chemin selon ta structure

// Password Input Component
const PasswordInput = ({
  label,
  value,
  onChangeText,
  showPassword,
  setShowPassword,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  error?: string;
  placeholder: string;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.passwordInputWrapper}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.eyeButton}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          size={22}
          color="#7f8c8d"
        />
      </TouchableOpacity>
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

export default function ChangePassword() {
  const router = useRouter();
  const { user } = useLocalSearchParams();
  const currentUsername = user ? String(user) : "";

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    // Reset errors
    setErrors({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Vérifier qu'un utilisateur est connecté
    if (!currentUsername) {
      Alert.alert("Erreur", "Aucun utilisateur connecté.");
      return;
    }

    let hasError = false;
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    // Validation de l'ancien mot de passe
    if (!oldPassword) {
      newErrors.oldPassword = "Veuillez entrer votre ancien mot de passe";
      hasError = true;
    }

    // Validation du nouveau mot de passe
    if (!newPassword) {
      newErrors.newPassword = "Veuillez entrer un nouveau mot de passe";
      hasError = true;
    } else if (newPassword === oldPassword) {
      newErrors.newPassword =
        "Le nouveau mot de passe doit être différent de l'ancien";
      hasError = true;
    }

    // Validation de la confirmation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
      hasError = true;
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Appeler la fonction du store
    const result = await changerMotDePasse(
      currentUsername,
      oldPassword,
      newPassword,
    );

    if (result.success) {
      // Réinitialiser les champs
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      Alert.alert("Succès", result.msg, [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } else {
      // Afficher l'erreur appropriée
      if (result.msg.includes("ancien mot de passe")) {
        setErrors({
          oldPassword: result.msg,
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        Alert.alert("Erreur", result.msg);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier le mot de passe</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Security Icon */}
        <View style={styles.iconSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="lock-closed" size={40} color="#003366" />
          </View>
          <Text style={styles.iconText}>
            Choisissez un mot de passe fort et unique
          </Text>
          {currentUsername ? (
            <Text style={styles.userInfo}>Utilisateur : {currentUsername}</Text>
          ) : null}
        </View>

        {/* Password Inputs */}
        <View style={styles.section}>
          <PasswordInput
            label="Ancien mot de passe"
            value={oldPassword}
            onChangeText={setOldPassword}
            showPassword={showOldPassword}
            setShowPassword={setShowOldPassword}
            error={errors.oldPassword}
            placeholder="Entrez votre ancien mot de passe"
          />
          <TouchableOpacity onPress={() => router.push("/(tabs)/forgotPwd")}>
            <Text style={styles.forgotPwdText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <PasswordInput
            label="Nouveau mot de passe"
            value={newPassword}
            onChangeText={setNewPassword}
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
            error={errors.newPassword}
            placeholder="Entrez votre nouveau mot de passe"
          />

          <PasswordInput
            label="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            error={errors.confirmPassword}
            placeholder="Confirmez votre nouveau mot de passe"
          />
        </View>

        {/* Security Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.tipItem}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#003366"
            />
            <Text style={styles.tipText}>
              Ne réutilisez pas un mot de passe déjà utilisé ailleurs
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#003366"
            />
            <Text style={styles.tipText}>
              Évitez les informations personnelles évidentes
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="#003366"
            />
            <Text style={styles.tipText}>
              Utilisez un gestionnaire de mots de passe pour plus de sécurité
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={styles.changeButton}
          onPress={handleChangePassword}
        >
          <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
          <Text style={styles.changeButtonText}>Modifier le mot de passe</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  scrollView: {
    flex: 1,
  },

  // Icon Section
  iconSection: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e8f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  iconText: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
  userInfo: {
    fontSize: 12,
    color: "#003366",
    marginTop: 8,
    fontWeight: "600",
  },

  // Form Section
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "600",
    marginBottom: 8,
  },
  passwordInputWrapper: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 12,
    padding: 15,
    paddingRight: 50,
    fontSize: 16,
    color: "#2c3e50",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    padding: 5,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },

  // Tips Section
  tipsSection: {
    backgroundColor: "#fff7e6",
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#f39c12",
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: "#7f8c8d",
    lineHeight: 20,
  },

  // Bottom Section
  bottomSpacer: {
    height: 100,
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  changeButton: {
    backgroundColor: "#003366",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  changeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPwdText: {
    marginLeft: 240,
    color: "#000000ff",
  },
});
