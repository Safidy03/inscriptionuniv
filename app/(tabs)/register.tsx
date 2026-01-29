import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registerUser } from '../../store'; // Importation depuis la racine

export default function Register() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (!user || !pass) {
      Alert.alert("Erreur", "Remplissez tous les champs");
      return;
    }
    const success = registerUser(user, pass);
    if (success) {
      Alert.alert("Succès", "Compte créé ! Connectez-vous.");
      router.replace('/'); // Retour au login
    } else {
      Alert.alert("Erreur", "Ce nom d'utilisateur est déjà pris.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput style={styles.input} placeholder="Nom d'utilisateur" onChangeText={setUser} />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry onChangeText={setPass} />
      
      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15 },
  btn: { backgroundColor: '#003366', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  link: { marginTop: 20, textAlign: 'center', color: '#003366' }
});