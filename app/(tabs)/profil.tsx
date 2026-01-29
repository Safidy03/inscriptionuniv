import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { listeBacheliersRef, users } from '../../store'; // On importe les données

export default function ProfilEtudiant() {
  const router = useRouter();
  const { user } = useLocalSearchParams(); // Récupère le pseudo de la session

  // 1. On trouve l'utilisateur connecté
  const currentUser = users.find(u => u.username === user);
  
  // 2. On récupère ses infos officielles liées à son numéro de BACC
  const infosBacc = listeBacheliersRef.find(b => b.numBacc === currentUser?.numBacc);

  return (
    <ScrollView style={styles.container}>
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
        
        {/* Affichage du nom réel venant du fichier Excel */}
        <Text style={styles.userName}>{infosBacc?.nom || currentUser?.username}</Text>
        <Text style={styles.userMail}>{currentUser?.username}@eni.mg</Text>

        <View style={styles.infoList}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Information Académique</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Numéro de BACC</Text>
            <Text style={styles.infoValue}>{currentUser?.numBacc || "Non renseigné"}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Série du BACC</Text>
            <Text style={styles.infoValue}>{infosBacc?.serie || "N/A"}</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Contact</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Téléphone</Text>
            <Text style={styles.infoValue}>{currentUser?.telephone || "Non renseigné"}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Adresse</Text>
            <Text style={styles.infoValue}>{currentUser?.adresse || "Fianarantsoa, Madagascar"}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
          <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f9' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', elevation: 2 },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, color: '#003366', fontWeight: 'bold' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003366', marginRight: 40 },
  content: { alignItems: 'center', padding: 25 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 3, marginBottom: 15 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50' },
  userMail: { fontSize: 14, color: '#7f8c8d', marginBottom: 25 },
  infoList: { width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 1 },
  sectionHeader: { marginTop: 10, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#003366', paddingLeft: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#003366', textTransform: 'uppercase' },
  infoItem: { marginBottom: 15, paddingBottom: 5 },
  infoLabel: { fontSize: 11, color: '#95a5a6' },
  infoValue: { fontSize: 16, color: '#2c3e50', fontWeight: '500', marginTop: 2 },
  logoutBtn: { marginTop: 30, flexDirection: 'row', alignItems: 'center', padding: 10 },
  logoutText: { color: '#e74c3c', fontWeight: 'bold', fontSize: 16, marginLeft: 8 }
});