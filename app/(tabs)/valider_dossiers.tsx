import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ValiderDossiers() {
  const router = useRouter();

  const candidats = [
    { id: 1, nom: "RAZAFY Jean", serie: "S", mention: "Bien" },
    { id: 2, nom: "ANDRIA Marie", serie: "L", mention: "Assez Bien" },
    { id: 3, nom: "RABE Luc", serie: "S", mention: "Très Bien" },
  ];

  const handleAction = (nom: string, action: string) => {
    Alert.alert("Action effectuée", `Le dossier de ${nom} a été ${action}.`);
  };

  return (
    <View style={styles.container}>
      {/* Barre de retour */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Validation</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.infoText}>{candidats.length} dossiers en attente de vérification</Text>
        
        {candidats.map((c) => (
          <View key={c.id} style={styles.candidatCard}>
            <View>
              <Text style={styles.candName}>{c.nom}</Text>
              <Text style={styles.candDetails}>BACC Série {c.serie} • Mention {c.mention}</Text>
            </View>
            <View style={styles.actionGroup}>
              <TouchableOpacity onPress={() => handleAction(c.nom, "validé")} style={[styles.miniBtn, {backgroundColor: '#27ae60'}]}>
                <Ionicons name="checkmark" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAction(c.nom, "refusé")} style={[styles.miniBtn, {backgroundColor: '#e74c3c'}]}>
                <Ionicons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  scrollContent: { padding: 20 },
  infoText: { marginBottom: 20, color: '#7f8c8d', fontWeight: '500' },
  candidatCard: { backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  candName: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  candDetails: { fontSize: 12, color: '#95a5a6', marginTop: 3 },
  actionGroup: { flexDirection: 'row' },
  miniBtn: { width: 35, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 8 }
});