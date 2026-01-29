import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

// CORRECTION DE L'IMPORT (Remonter de 2 niveaux pour trouver store.ts)
import { users } from '../../store';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Nettoyage des espaces pour éviter les erreurs de frappe
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    const foundUser = users.find(
      (u) => u.username.toLowerCase() === cleanUser.toLowerCase() && u.password === cleanPass
    );

    if (foundUser) {
      if (foundUser.role === 'admin') {
        router.replace('/(tabs)/dashadmin');
      } else {
        // Redirection vers le dashboard étudiant avec les paramètres nécessaires
        router.replace({ 
          pathname: '/(tabs)/dashetudiant', 
          params: { user: foundUser.username } 
        });
      }
    } else {
      Alert.alert(
        "Accès Refusé", 
        "Identifiant ou mot de passe incorrect. Assurez-vous d'avoir créé un compte bachelier valide.",
        [{ text: "Réessayer" }]
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="school" size={50} color="#fff" />
            </View>
            <Text style={styles.logoText}>ENI-UF</Text>
            <Text style={styles.tagline}>Concours d'Entrée Universitaire</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Nom d'utilisateur" 
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Mot de passe" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>SE CONNECTER</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.registerLink} 
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerText}>
                Nouveau bachelier ? <Text style={styles.linkBold}>Créer un compte</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            © 2026 ENI Fianarantsoa • Système de validation sécurisé
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  inner: { flex: 1, justifyContent: 'center', padding: 25 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#003366', justifyContent: 'center', alignItems: 'center', marginBottom: 15, elevation: 5 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#003366', letterSpacing: 2 },
  tagline: { fontSize: 14, color: '#666', marginTop: 5, fontWeight: '500' },
  formCard: { backgroundColor: '#fff', borderRadius: 25, padding: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 8 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: 12, marginBottom: 15, paddingHorizontal: 15, borderWidth: 1, borderColor: '#e1e4e8' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#333' },
  loginButton: { backgroundColor: '#003366', borderRadius: 12, paddingVertical: 18, alignItems: 'center', marginTop: 10, shadowColor: '#003366', shadowOpacity: 0.3, shadowRadius: 5, elevation: 3 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerText: { color: '#666', fontSize: 14 },
  linkBold: { fontWeight: 'bold', color: '#003366' },
  footerText: { textAlign: 'center', color: '#999', fontSize: 12, marginTop: 40 }
});