import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PagePaiement() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const validerPaiement = (methode: string) => {
    setIsProcessing(true);
    // Simulation de délai de transaction bancaire
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert("Succès", `Votre paiement par ${methode} a été enregistré. Un reçu vous sera envoyé.`);
      router.back();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Frais d'inscription</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.amountCard}>
          <Text style={styles.label}>Montant à régler</Text>
          <Text style={styles.amountText}>50 000 Ar</Text>
        </View>

        <Text style={styles.sectionTitle}>Choisir un mode de paiement</Text>
        
        <TouchableOpacity 
          style={styles.payOption} 
          disabled={isProcessing}
          onPress={() => validerPaiement("Mobile Money")}
        >
          <Ionicons name="phone-portrait-outline" size={30} color="#e67e22" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Mobile Money</Text>
            <Text style={styles.optionSub}>Mvola, Orange Money, Airtel Money</Text>
          </View>
          {isProcessing ? <ActivityIndicator color="#003366" /> : <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.payOption} 
          disabled={isProcessing}
          onPress={() => validerPaiement("Virement Bancaire")}
        >
          <Ionicons name="business-outline" size={30} color="#2980b9" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Virement Bancaire</Text>
            <Text style={styles.optionSub}>BOA, BNI, BMOI, Société Générale</Text>
          </View>
          {isProcessing ? <ActivityIndicator color="#003366" /> : <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />}
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#7f8c8d" />
          <Text style={styles.infoText}>
            Le traitement de votre dossier débutera dès réception de la confirmation de paiement.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, color: '#003366', fontWeight: 'bold' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003366', marginRight: 40 },
  content: { padding: 25 },
  amountCard: { backgroundColor: '#003366', padding: 30, borderRadius: 25, alignItems: 'center', marginBottom: 30 },
  label: { color: '#bdc3c7', fontSize: 14 },
  amountText: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginTop: 5 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 20 },
  payOption: { backgroundColor: '#fff', padding: 20, borderRadius: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 15, elevation: 2 },
  optionText: { flex: 1, marginLeft: 15 },
  optionTitle: { fontSize: 16, fontWeight: 'bold', color: '#34495e' },
  optionSub: { fontSize: 12, color: '#95a5a6' },
  infoBox: { flexDirection: 'row', marginTop: 20, paddingHorizontal: 10 },
  infoText: { marginLeft: 10, fontSize: 12, color: '#7f8c8d', flex: 1, lineHeight: 18 }
});