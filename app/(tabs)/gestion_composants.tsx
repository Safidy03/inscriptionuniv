import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function GestionComposants() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Simulation d'une liste de matières (Composants)
  const [composants, setComposants] = useState([
    { id: 1, nom: "Mathématiques", coeff: "3", icone: "calculator" },
    { id: 2, nom: "Algorithmique", coeff: "5", icone: "code-slash" },
    { id: 3, nom: "Anglais", coeff: "2", icone: "language" },
    { id: 4, nom: "Culture Générale", coeff: "1", icone: "globe" },
  ]);

  const updateCoeff = (id: number, val: string) => {
    const newComposants = composants.map(c => 
      c.id === id ? { ...c, coeff: val } : c
    );
    setComposants(newComposants);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      Alert.alert("Succès", "La configuration des coefficients a été mise à jour sur le serveur.");
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Barre de retour */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Configuration</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Coefficients des épreuves</Text>
        <Text style={styles.subTitle}>Modifiez les pondérations pour le calcul automatique des moyennes.</Text>

        {composants.map((item) => (
          <View key={item.id} style={styles.compCard}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icone as any} size={24} color="#003366" />
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.compName}>{item.nom}</Text>
              <Text style={styles.compLabel}>Coefficient actuel</Text>
            </View>
            <TextInput
              style={styles.coeffInput}
              keyboardType="numeric"
              value={item.coeff}
              onChangeText={(val) => updateCoeff(item.id, val)}
              maxLength={1}
            />
          </View>
        ))}

        <TouchableOpacity 
          style={[styles.saveBtn, isSaving && { opacity: 0.7 }]} 
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="save-outline" size={20} color="#fff" style={{marginRight: 10}} />
              <Text style={styles.saveBtnText}>ENREGISTRER LES MODIFICATIONS</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.warningBox}>
          <Ionicons name="alert-circle-outline" size={20} color="#7f8c8d" />
          <Text style={styles.warningText}>
            Ces modifications impacteront immédiatement le calcul des résultats pour tous les candidats inscrits.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, color: '#003366', fontWeight: 'bold' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003366', marginRight: 40 },
  content: { padding: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
  subTitle: { fontSize: 13, color: '#7f8c8d', marginTop: 5, marginBottom: 25 },
  compCard: { backgroundColor: '#fff', padding: 15, borderRadius: 18, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2 },
  iconBox: { width: 50, height: 50, borderRadius: 12, backgroundColor: '#f0f4f8', justifyContent: 'center', alignItems: 'center' },
  infoBox: { flex: 1, marginLeft: 15 },
  compName: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  compLabel: { fontSize: 12, color: '#95a5a6', marginTop: 2 },
  coeffInput: { backgroundColor: '#f8f9fa', width: 45, height: 45, borderRadius: 10, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003366', borderWidth: 1, borderColor: '#e1e4e8' },
  saveBtn: { backgroundColor: '#003366', padding: 18, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, elevation: 4 },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  warningBox: { flexDirection: 'row', marginTop: 30, paddingHorizontal: 10 },
  warningText: { marginLeft: 10, fontSize: 12, color: '#7f8c8d', flex: 1, fontStyle: 'italic' }
});