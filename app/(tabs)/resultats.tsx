import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PageResultats() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Résultats Officiels</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.resultCard}>
          <Ionicons name="time-outline" size={60} color="#f39c12" />
          <Text style={styles.mainStatus}>Publication Prochaine</Text>
          <Text style={styles.subStatus}>Les délibérations sont en cours.</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.infoLabel}>Concours :</Text>
          <Text style={styles.infoValue}>Licence 1 - Informatique</Text>
          
          <Text style={[styles.infoLabel, {marginTop: 15}]}>Date prévue :</Text>
          <Text style={styles.infoValue}>Vendredi 24 Octobre 2024</Text>
        </View>

        <TouchableOpacity style={styles.notifyBtn}>
          <Text style={styles.notifyText}>M'avertir par SMS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, color: '#003366', fontWeight: 'bold' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003366', marginRight: 40 },
  content: { flex: 1, justifyContent: 'center', padding: 25 },
  resultCard: { backgroundColor: '#fff', padding: 40, borderRadius: 30, alignItems: 'center', elevation: 5 },
  mainStatus: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginTop: 20 },
  subStatus: { color: '#7f8c8d', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#eee', width: '100%', marginVertical: 30 },
  infoLabel: { fontSize: 12, color: '#95a5a6', textTransform: 'uppercase' },
  infoValue: { fontSize: 16, fontWeight: 'bold', color: '#003366', marginTop: 5 },
  notifyBtn: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#003366', padding: 18, borderRadius: 15, marginTop: 30, alignItems: 'center' },
  notifyText: { color: '#003366', fontWeight: 'bold' }
});