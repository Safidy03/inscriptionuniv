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

// IMPORTATION DU STORE DYNAMIQUE
import { users } from '../../store';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState(''); // Changé email en username
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // RECHERCHE DYNAMIQUE DANS LE STORE
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      if (foundUser.role === 'admin') {
        router.replace('/(tabs)/dashadmin');
      } else {
        // On envoie le nom de l'utilisateur au dashboard pour l'afficher
        router.replace({ 
          pathname: '/(tabs)/dashetudiant', 
          params: { user: foundUser.username } 
        });
      }
    } else {
      Alert.alert(
        "Erreur d'authentification", 
        "Identifiant ou mot de passe incorrect.",
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
            <Text style={styles.logoText}>U-F</Text>
            <Text style={styles.tagline}>Gestion des Concours</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Identifiant (ex: admin)" 
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

            {/* NOUVEAU BOUTON : CRÉER UN COMPTE */}
            <TouchableOpacity 
              style={styles.registerLink} 
              onPress={() => router.push('/register')}
            >
              <Text style={styles.registerText}>
                Nouveau ? <Text style={{fontWeight: 'bold', color: '#003366'}}>Créer un compte</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>Version 1.1 - École Nationale d'Informatique</Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  inner: { flex: 1, justifyContent: 'center', padding: 25 },
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#003366', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#003366', letterSpacing: 2 },
  tagline: { fontSize: 14, color: '#666', marginTop: 5 },
  formCard: { backgroundColor: '#fff', borderRadius: 20, padding: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  inputGroup: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: 12, marginBottom: 15, paddingHorizontal: 15, borderWidth: 1, borderColor: '#e1e4e8' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#333' },
  loginButton: { backgroundColor: '#003366', borderRadius: 12, paddingVertical: 18, alignItems: 'center', marginTop: 10 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  registerLink: { marginTop: 20, alignItems: 'center' },
  registerText: { color: '#666', fontSize: 14 },
  footerText: { textAlign: 'center', color: '#999', fontSize: 12, marginTop: 40 }
});