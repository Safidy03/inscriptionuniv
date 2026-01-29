import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfilEtudiant() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Mon Profil</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={60} color="#003366" />
        </View>
        
        <Text style={styles.userName}>RAKOTO Jean</Text>
        <Text style={styles.userMail}>student@eni.mg</Text>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Téléphone</Text>
            <Text style={styles.infoValue}>+261 34 00 000 00</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Adresse</Text>
            <Text style={styles.infoValue}>Fianarantsoa, Madagascar</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
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
  content: { alignItems: 'center', padding: 25 },
  avatarCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 5, marginBottom: 20 },
  userName: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50' },
  userMail: { fontSize: 14, color: '#7f8c8d', marginBottom: 30 },
  infoList: { width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 2 },
  infoItem: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f1f1f1', paddingBottom: 10 },
  infoLabel: { fontSize: 12, color: '#95a5a6', textTransform: 'uppercase' },
  infoValue: { fontSize: 16, color: '#2c3e50', fontWeight: '500', marginTop: 5 },
  logoutBtn: { marginTop: 40, padding: 15 },
  logoutText: { color: '#e74c3c', fontWeight: 'bold', fontSize: 16 }
});