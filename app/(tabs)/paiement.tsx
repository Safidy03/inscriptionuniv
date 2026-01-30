import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Candidat, chargerTout, listeCandidats, users, validerPaiementStore } from '../../store';

export default function PaiementEtudiant() {
  const router = useRouter();
  const { user } = useLocalSearchParams();
  
  const [loading, setLoading] = useState(true);
  const [dossiersPayables, setDossiersPayables] = useState<Candidat[]>([]);
  const [selectedDossier, setSelectedDossier] = useState<Candidat | null>(null);
  const [reference, setReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadDossiers = async () => {
      await chargerTout();
      const currentUser = users.find(u => u.username === user);
      if (currentUser) {
        // On ne peut payer que les dossiers "Validés" et pas encore "Payés"
        const payables = listeCandidats.filter(
          c => c.numBacc === currentUser.numBacc && c.statut === "Validé" && !c.paye
        );
        setDossiersPayables(payables);
        if (payables.length > 0) setSelectedDossier(payables[0]);
      }
      setLoading(false);
    };
    loadDossiers();
  }, [user]);

  const handlePaiement = async () => {
    if (!selectedDossier || reference.trim().length < 5) {
      Alert.alert("Erreur", "Veuillez sélectionner un concours et entrer une référence valide.");
      return;
    }

    setIsSubmitting(true);
    // On utilise l'ID unique du dossier pour valider le paiement
    const success = await validerPaiementStore(selectedDossier.id, reference);
    
    setTimeout(() => {
      setIsSubmitting(false);
      if (success) {
        Alert.alert("Succès", "Votre référence a été soumise. Elle sera vérifiée par l'administration.");
        router.back();
      }
    }, 1500);
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#27ae60" /></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#003366" /></TouchableOpacity>
        <Text style={styles.pageTitle}>Règlement des frais</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#2980b9" />
          <Text style={styles.infoText}>Frais de concours : 50 000 Ar par filière.</Text>
        </View>

        <Text style={styles.label}>1. Choisir le concours à régler</Text>
        {dossiersPayables.length === 0 ? (
          <Text style={styles.noDossier}>Aucun dossier validé en attente de paiement.</Text>
        ) : (
          dossiersPayables.map((d) => (
            <TouchableOpacity 
              key={d.id} 
              style={[styles.dossierOption, selectedDossier?.id === d.id && styles.dossierSelected]}
              onPress={() => setSelectedDossier(d)}
            >
              <Ionicons 
                name={selectedDossier?.id === d.id ? "radio-button-on" : "radio-button-off"} 
                size={20} color={selectedDossier?.id === d.id ? "#27ae60" : "#bdc3c7"} 
              />
              <Text style={styles.dossierText}>{d.filiere}</Text>
            </TouchableOpacity>
          ))
        )}

        <Text style={[styles.label, { marginTop: 25 }]}>2. Référence de transaction</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ex: MV123456789" 
          value={reference}
          onChangeText={setReference}
          autoCapitalize="characters"
        />

        <TouchableOpacity 
          style={[styles.payBtn, (dossiersPayables.length === 0 || isSubmitting) && { opacity: 0.5 }]} 
          onPress={handlePaiement}
          disabled={dossiersPayables.length === 0 || isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.payBtnText}>Valider le paiement</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topBar: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' },
  pageTitle: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginLeft: 15 },
  content: { padding: 25 },
  infoBox: { flexDirection: 'row', backgroundColor: '#3498db15', padding: 15, borderRadius: 10, marginBottom: 25, alignItems: 'center' },
  infoText: { color: '#2980b9', fontSize: 13, marginLeft: 10, fontWeight: '500' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#2c3e50', marginBottom: 12 },
  dossierOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  dossierSelected: { borderColor: '#27ae60', backgroundColor: '#27ae6005' },
  dossierText: { marginLeft: 10, fontSize: 15, color: '#34495e' },
  noDossier: { color: '#e74c3c', fontStyle: 'italic', textAlign: 'center', marginTop: 10 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 30 },
  payBtn: { backgroundColor: '#27ae60', padding: 18, borderRadius: 15, alignItems: 'center', elevation: 3 },
  payBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});