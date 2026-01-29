import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router'; // Ajout de useLocalSearchParams
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Importation depuis la racine
import { ajouterCandidat, listeConcours } from '../../store';

export default function InscriptionConcours() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // On pré-remplit le nom si l'utilisateur est passé par le login
  const [nom, setNom] = useState(params.user ? String(params.user) : '');
  const [serie, setSerie] = useState('');
  const [numBacc, setNumBacc] = useState('');
  const [concoursChoisi, setConcoursChoisi] = useState('');

  const handleInscription = () => {
    // Vérification stricte
    if (!nom || !serie || !numBacc || !concoursChoisi) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs et choisir un concours.");
      return;
    }

    // ENVOI AU STORE (C'est ici que la magie opère pour l'admin)
    ajouterCandidat(nom, serie, numBacc, concoursChoisi);
    
    Alert.alert(
      "Succès", 
      `Votre candidature pour le concours ${concoursChoisi} a été envoyée !`,
      [{ text: "OK", onPress: () => router.replace({ pathname: '/(tabs)/dashetudiant', params: { user: nom } }) }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Formulaire d'Inscription</Text>

      <Text style={styles.label}>Votre Nom</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nom Complet" 
        value={nom} 
        onChangeText={setNom} 
      />

      <Text style={styles.label}>Série du Baccalauréat</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ex: S, L, OSE, Technique" 
        value={serie} 
        onChangeText={setSerie} 
      />

      <Text style={styles.label}>Numéro Matricule</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Numéro matricule Bacc" 
        value={numBacc} 
        onChangeText={setNumBacc} 
        keyboardType="numeric"
      />

      <Text style={styles.label}>Concours visé</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={concoursChoisi}
          onValueChange={(itemValue) => setConcoursChoisi(itemValue)}
        >
          <Picker.Item label="Sélectionnez un concours..." value="" />
          {listeConcours.map((c) => (
            <Picker.Item key={c.id} label={c.titre} value={c.titre} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleInscription}>
        <Text style={styles.btnText}>VALIDER MA CANDIDATURE</Text>
      </TouchableOpacity>
      
      <View style={{ height: 40 }} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 25, color: '#003366', textAlign: 'center' },
  label: { marginBottom: 8, fontWeight: '600', color: '#444' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 20, backgroundColor: '#fcfcfc' },
  pickerContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, marginBottom: 30, backgroundColor: '#f9f9f9', overflow: 'hidden' },
  btn: { backgroundColor: '#003366', padding: 18, borderRadius: 12, alignItems: 'center', elevation: 2 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});