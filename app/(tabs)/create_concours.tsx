import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ajouterConcours, listeConcours, supprimerConcours } from '../../store';

export default function CreateConcours() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [, setUpdate] = useState(0); // Pour forcer le rafraîchissement
  const router = useRouter();

  const handleCreer = () => {
    if (!titre || !description || !date) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    ajouterConcours({ titre, description, dateLimite: date });
    setTitre(''); setDescription(''); setDate('');
    setUpdate(prev => prev + 1);
    Alert.alert("Succès", "Concours ajouté !");
  };

  const handleSupprimer = (id: number) => {
    Alert.alert("Suppression", "Voulez-vous supprimer ce concours ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Supprimer", style: "destructive", onPress: () => {
          supprimerConcours(id);
          setUpdate(prev => prev + 1);
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Gestion des Concours</Text>
      
      {/* Formulaire */}
      <View style={styles.formCard}>
        <TextInput style={styles.input} value={titre} onChangeText={setTitre} placeholder="Nom du concours" />
        <TextInput style={[styles.input, {height: 80}]} value={description} onChangeText={setDescription} placeholder="Description" multiline />
        <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Date limite (JJ/MM/AAAA)" />
        <TouchableOpacity style={styles.btn} onPress={handleCreer}>
          <Text style={styles.btnText}>Ajouter le concours</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Concours publiés</Text>
      
      {/* Liste de suppression */}
      {listeConcours.map((c) => (
        <View key={c.id} style={styles.concoursItem}>
          <View style={{flex: 1}}>
            <Text style={styles.concoursTitre}>{c.titre}</Text>
            <Text style={{fontSize: 12, color: '#666'}}>{c.dateLimite}</Text>
          </View>
          <TouchableOpacity onPress={() => handleSupprimer(c.id)}>
            <Ionicons name="trash-outline" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f7f6' },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#003366', marginBottom: 20 },
  formCard: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 3, marginBottom: 30 },
  input: { backgroundColor: '#f9f9f9', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  btn: { backgroundColor: '#003366', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  concoursItem: { backgroundColor: '#fff', padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  concoursTitre: { fontWeight: 'bold', fontSize: 16 }
});