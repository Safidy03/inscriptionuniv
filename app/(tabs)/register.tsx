import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
import { registerUser } from "../../store";

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    numBacc: "",
    telephone: "",
    adresse: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!form.username || !form.password || !form.numBacc) {
      Alert.alert("Erreur", "Veuillez remplir les champs obligatoires (*)");
      return;
    }

    if (form.password.length < 6) {
      Alert.alert(
        "Erreur",
        "Le mot de passe doit contenir au moins 6 caractères.",
      );
      return;
    }

    if (form.password !== confirmPassword) {
      Alert.alert(
        "Erreur",
        "La confirmation du mot de passe ne correspond pas.",
      );
      return;
    }

    const res = await registerUser(
      form.username,
      form.password,
      form.numBacc,
      form.telephone,
      form.adresse,
    );

    if (res.success) {
      Alert.alert("Succès", res.msg);
      router.replace("/");
    } else {
      Alert.alert("Erreur", res.msg);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>
          Inscrivez-vous pour accéder au concours ENI
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Ionicons name="person-outline" size={20} color="#003366" />
          <TextInput
            style={styles.input}
            placeholder="Nom d'utilisateur *"
            onChangeText={(t) => setForm({ ...form, username: t })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="card-outline" size={20} color="#003366" />
          <TextInput
            style={styles.input}
            placeholder="Numéro de BACC *"
            keyboardType="numeric"
            onChangeText={(t) => setForm({ ...form, numBacc: t })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="call-outline" size={20} color="#003366" />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            keyboardType="phone-pad"
            onChangeText={(t) => setForm({ ...form, telephone: t })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="location-outline" size={20} color="#003366" />
          <TextInput
            style={styles.input}
            placeholder="Adresse"
            onChangeText={(t) => setForm({ ...form, adresse: t })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={20} color="#003366" />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe *"
            secureTextEntry={!showPassword}
            onChangeText={(t) => setForm({ ...form, password: t })}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={20} color="#003366" />
          <TextInput
            style={styles.input}
            placeholder="Confirmation du mot de passe *"
            secureTextEntry={!showConfirmPassword}
            onChangeText={(t) => setConfirmPassword(t)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
          <Text style={styles.btnText}>S'INSCRIRE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 40, paddingTop: 60, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", color: "#003366" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center", marginTop: 10 },
  form: { paddingHorizontal: 30 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 20,
    paddingBottom: 5,
  },
  input: { flex: 1, marginLeft: 10, height: 40 },
  btn: {
    backgroundColor: "#003366",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  eyeIcon: {
    padding: 5,
  },
});
