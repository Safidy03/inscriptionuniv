import { Ionicons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  demanderResetPasswordParEmail,
  resetPasswordAvecCode,
} from "../../store";

export default function ForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Email, 2: Code, 3: New Password
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); // Récupéré après validation email
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Étape 1: Demander le code via email
  const handleRequestCode = async () => {
    setErrors({
      username: "",
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    });

    if (!email.trim()) {
      setErrors({ ...errors, email: "Veuillez entrer votre email" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: "Veuillez entrer un email valide" });
      return;
    }

    setLoading(true);

    const result = await demanderResetPasswordParEmail(email);

    setLoading(false);

    if (result.success && result.username && result.code) {
      // Sauvegarder le username pour les étapes suivantes
      setUsername(result.username);

      // Vérifier si l'app mail est disponible
      const isAvailable = await MailComposer.isAvailableAsync();

      if (isAvailable) {
        // Envoyer l'email avec le code
        await MailComposer.composeAsync({
          recipients: [email],
          subject: "Réinitialisation de mot de passe - ENI",
          body: `
Bonjour ${result.username},

Vous avez demandé la réinitialisation de votre mot de passe.

Votre code de vérification est : ${result.code}

Ce code expirera dans 15 minutes.

Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.

Cordialement,
L'équipe ENI
          `,
        });

        Alert.alert(
          "Code envoyé",
          `Un code de réinitialisation a été envoyé à ${email}. Vérifiez votre boîte mail.`,
          [{ text: "OK", onPress: () => setStep(2) }],
        );
      } else {
        // Si l'app mail n'est pas disponible, afficher le code directement
        Alert.alert(
          "Code de réinitialisation",
          `Votre code est : ${result.code}\n\nCe code expirera dans 15 minutes.`,
          [{ text: "OK", onPress: () => setStep(2) }],
        );
      }
    } else {
      Alert.alert("Erreur", result.msg);
    }
  };

  // Étape 2: Vérifier le code et passer à l'étape 3
  const handleVerifyCode = () => {
    setErrors({
      username: "",
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    });

    if (!code.trim()) {
      setErrors({ ...errors, code: "Veuillez entrer le code reçu" });
      return;
    }

    if (code.length !== 6) {
      setErrors({ ...errors, code: "Le code doit contenir 6 chiffres" });
      return;
    }

    setStep(3);
  };

  // Étape 3: Réinitialiser le mot de passe
  const handleResetPassword = async () => {
    setErrors({
      username: "",
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    });

    let hasError = false;
    const newErrors = {
      username: "",
      email: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!newPassword) {
      newErrors.newPassword = "Veuillez entrer un nouveau mot de passe";
      hasError = true;
    }

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

    setLoading(true);

    const result = await resetPasswordAvecCode(username, code, newPassword);

    setLoading(false);

    if (result.success) {
      Alert.alert("Succès", result.msg, [
        {
          text: "Se connecter",
          onPress: () => router.replace("/"),
        },
      ]);
    } else {
      Alert.alert("Erreur", result.msg);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Mot de passe oublié</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Icon */}
            <View style={styles.iconSection}>
              <View style={styles.iconCircle}>
                <Ionicons name="key-outline" size={40} color="#003366" />
              </View>
              <Text style={styles.iconText}>
                Réinitialisez votre mot de passe en 3 étapes
              </Text>
            </View>

            {/* Progress Steps */}
            <View style={styles.stepsContainer}>
              <StepIndicator number={1} active={step >= 1} label="Email" />
              <View
                style={[styles.stepLine, step >= 2 && styles.stepLineActive]}
              />
              <StepIndicator number={2} active={step >= 2} label="Code" />
              <View
                style={[styles.stepLine, step >= 3 && styles.stepLineActive]}
              />
              <StepIndicator
                number={3}
                active={step >= 3}
                label="Nouveau MDP"
              />
            </View>

            {/* Step 1: Email */}
            {step === 1 && (
              <View style={styles.section}>
                <Text style={styles.stepTitle}>Entrez votre email</Text>
                <Text style={styles.stepDescription}>
                  Un code de vérification sera envoyé à l'adresse email de votre
                  compte
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Adresse email</Text>
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="exemple@gmail.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="done"
                    autoComplete="email"
                  />
                  {errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleRequestCode}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.submitButtonText}>
                        Recevoir le code
                      </Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* Step 2: Verification Code */}
            {step === 2 && (
              <View style={styles.section}>
                <Text style={styles.stepTitle}>
                  Entrez le code de vérification
                </Text>
                <Text style={styles.stepDescription}>
                  Un code à 6 chiffres a été envoyé à {email}
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Code de vérification</Text>
                  <TextInput
                    style={[styles.input, errors.code && styles.inputError]}
                    value={code}
                    onChangeText={setCode}
                    placeholder="000000"
                    keyboardType="number-pad"
                    maxLength={6}
                    returnKeyType="done"
                  />
                  {errors.code ? (
                    <Text style={styles.errorText}>{errors.code}</Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={styles.linkButton}
                  onPress={handleRequestCode}
                >
                  <Text style={styles.linkButtonText}>Renvoyer le code</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleVerifyCode}
                >
                  <Text style={styles.submitButtonText}>Vérifier le code</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <View style={styles.section}>
                <Text style={styles.stepTitle}>Nouveau mot de passe</Text>
                <Text style={styles.stepDescription}>
                  Choisissez un mot de passe sécurisé
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Nouveau mot de passe</Text>
                  <View style={styles.passwordInputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        errors.newPassword && styles.inputError,
                      ]}
                      value={newPassword}
                      onChangeText={setNewPassword}
                      placeholder="Entrez votre nouveau mot de passe"
                      secureTextEntry={!showNewPassword}
                      autoCapitalize="none"
                      returnKeyType="next"
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowNewPassword(!showNewPassword)}
                    >
                      <Ionicons
                        name={
                          showNewPassword ? "eye-outline" : "eye-off-outline"
                        }
                        size={22}
                        color="#7f8c8d"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.newPassword ? (
                    <Text style={styles.errorText}>{errors.newPassword}</Text>
                  ) : null}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    Confirmer le mot de passe
                  </Text>
                  <View style={styles.passwordInputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        errors.confirmPassword && styles.inputError,
                      ]}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      placeholder="Confirmez votre mot de passe"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      returnKeyType="done"
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Ionicons
                        name={
                          showConfirmPassword
                            ? "eye-outline"
                            : "eye-off-outline"
                        }
                        size={22}
                        color="#7f8c8d"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword ? (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.submitButtonText}>
                        Réinitialiser le mot de passe
                      </Text>
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.bottomSpacer} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

// Composant Step Indicator
const StepIndicator = ({
  number,
  active,
  label,
}: {
  number: number;
  active: boolean;
  label: string;
}) => (
  <View style={styles.stepIndicator}>
    <View style={[styles.stepCircle, active && styles.stepCircleActive]}>
      <Text style={[styles.stepNumber, active && styles.stepNumberActive]}>
        {number}
      </Text>
    </View>
    <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  innerContainer: {
    flex: 1,
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
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

  // Steps Progress
  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  stepIndicator: {
    alignItems: "center",
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  stepCircleActive: {
    backgroundColor: "#003366",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#95a5a6",
  },
  stepNumberActive: {
    color: "#fff",
  },
  stepLabel: {
    fontSize: 11,
    color: "#95a5a6",
  },
  stepLabelActive: {
    color: "#003366",
    fontWeight: "600",
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: "#ecf0f1",
    marginHorizontal: 5,
  },
  stepLineActive: {
    backgroundColor: "#003366",
  },

  // Form Section
  section: {
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 25,
    lineHeight: 20,
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
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#2c3e50",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  passwordInputWrapper: {
    position: "relative",
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

  // Buttons
  submitButton: {
    backgroundColor: "#003366",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 10,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    alignItems: "center",
    paddingVertical: 10,
  },
  linkButtonText: {
    color: "#003366",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  bottomSpacer: {
    height: 50,
  },
});
