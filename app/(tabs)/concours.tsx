import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConsulterConcours() {
  const router = useRouter();

  const concours = [
    { id: 1, titre: "Concours d'Entrée L1", date: "15 Octobre 2024", lieu: "Fianarantsoa" },
    { id: 2, titre: "Master Professionnel", date: "02 Novembre 2024", lieu: "Antananarivo" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Concours Disponibles</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {concours.map((item) => (
          <View key={item.id} style={styles.concoursCard}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.concoursTitle}>{item.titre}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color="#7f8c8d" />
              <Text style={styles.locationText}>{item.lieu}</Text>
            </View>
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>S'inscrire maintenant</Text>
            </TouchableOpacity>
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
  concoursCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, marginBottom: 20, elevation: 3 },
  dateBadge: { backgroundColor: '#e1f5fe', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginBottom: 10 },
  dateText: { color: '#003366', fontSize: 12, fontWeight: 'bold' },
  concoursTitle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginBottom: 5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  locationText: { marginLeft: 5, color: '#7f8c8d' },
  applyBtn: { backgroundColor: '#003366', padding: 12, borderRadius: 10, alignItems: 'center' },
  applyBtnText: { color: '#fff', fontWeight: 'bold' }
});