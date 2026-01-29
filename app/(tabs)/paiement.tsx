import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PagePaiement() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePay = (method: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Paiement Confirmé", `Votre transaction via ${method} a été validée par la banque.`, [
        { text: "Voir mon statut", onPress: () => router.replace({ pathname: '/(tabs)/dashetudiant', params: { paye: 'true' } }) }
      ]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Règlement</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.price}>50 000 Ar</Text>
        <Text style={styles.subtitle}>Droit d'inscription ENI 2024</Text>
        
        <TouchableOpacity style={styles.method} onPress={() => handlePay("Mvola")}>
          <Ionicons name="phone-portrait" size={24} color="#003366" />
          <Text style={styles.methodText}>Payer par Mobile Money</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.method} onPress={() => handlePay("Banque")}>
          <Ionicons name="card" size={24} color="#003366" />
          <Text style={styles.methodText}>Virement Bancaire</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#003366" style={{marginTop: 20}} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, color: '#003366', fontWeight: 'bold' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003366', marginRight: 45 },
  card: { margin: 25, backgroundColor: '#fff', padding: 30, borderRadius: 25, elevation: 5, alignItems: 'center' },
  price: { fontSize: 35, fontWeight: 'bold', color: '#003366' },
  subtitle: { color: '#7f8c8d', marginVertical: 10 },
  method: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#f0f4f8', padding: 18, borderRadius: 15, marginTop: 15 },
  methodText: { marginLeft: 15, fontWeight: '600', color: '#34495e' }
});