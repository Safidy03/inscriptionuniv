import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// LIAISON AVEC LE STORE
import { listeBacheliersRef, listeCandidats, users } from '../../store';

interface Candidat {
  id: number;
  nom: string;
  serie: string;
  numBacc: string;
  statut: string;
}

export default function DashboardEtudiant() {
  const router = useRouter();
  const { user } = useLocalSearchParams(); // On récupère le pseudo passé au login
  
  const [monDossier, setMonDossier] = useState<Candidat | null>(null);

  useEffect(() => {
    // 1. Trouver l'utilisateur connecté dans le store
    const currentUser = users.find(u => u.username === user);
    
    if (currentUser) {
      // 2. Chercher ses infos bachelier (importées via Excel)
      const baccInfo = listeBacheliersRef.find(b => b.numBacc === currentUser.numBacc);
      
      // 3. Chercher s'il a déjà un dossier de candidature
      const dossierExistant = (listeCandidats as Candidat[]).find(c => c.numBacc === currentUser.numBacc);

      if (dossierExistant) {
        setMonDossier(dossierExistant);
      } else if (baccInfo) {
        // Si pas encore de dossier, on affiche les infos de base du BACC
        setMonDossier({
          id: 0,
          nom: baccInfo.nom,
          serie: baccInfo.serie,
          numBacc: baccInfo.numBacc,
          statut: "Non Inscrit"
        });
      }
    }
  }, [user]);

  const statut = monDossier ? monDossier.statut : "AUCUNE INSCRIPTION";
  const estValide = statut === "Validé";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Bonjour, {monDossier?.nom || user}</Text>
            <Text style={styles.idText}>
              BACC: {monDossier?.numBacc} • Série {monDossier?.serie}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Ma Candidature au Concours</Text>
        <View style={[styles.statusCard, estValide && styles.cardValid]}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusLabel}>Statut du dossier</Text>
            <View style={[styles.badge, { 
                backgroundColor: statut === "Validé" ? '#27ae60' : (statut === "Refusé" ? '#e74c3c' : '#f39c12') 
            }]}>
              <Text style={styles.badgeText}>{statut.toUpperCase()}</Text>
            </View>
          </View>
          
          <Text style={styles.statusUpdate}>
            {statut === "Validé" 
              ? "✅ Dossier conforme. Vous pouvez payer les frais." 
              : (statut === "Non Inscrit" ? "👉 Cliquez sur 'S'inscrire' pour commencer." : "⏳ Vérification administrative en cours...")}
          </Text>
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => router.push({ pathname: '/concours', params: { user } })}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#3498db20' }]}>
              <Ionicons name="school-outline" size={28} color="#3498db" />
            </View>
            <Text style={styles.menuLabel}>S'inscrire au Concours</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !estValide && {opacity: 0.5}]} 
            onPress={() => estValide ? router.push('/paiement') : null}
          >
            <View style={[styles.iconCircle, { backgroundColor: estValide ? '#27ae6020' : '#eee' }]}>
              <Ionicons name="card-outline" size={28} color={estValide ? '#27ae60' : "#95a5a6"} />
            </View>
            <Text style={styles.menuLabel}>Droit d'examen</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/resultats')}>
            <View style={[styles.iconCircle, { backgroundColor: '#9b59b620' }]}>
              <Ionicons name="ribbon-outline" size={28} color="#9b59b6" />
            </View>
            <Text style={styles.menuLabel}>Résultats</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/profil')}>
            <View style={[styles.iconCircle, { backgroundColor: '#f1c40f20' }]}>
              <Ionicons name="person-outline" size={28} color="#f1c40f" />
            </View>
            <Text style={styles.menuLabel}>Mon Profil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f9' },
  header: { backgroundColor: '#003366', paddingTop: 60, paddingBottom: 30, paddingHorizontal: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  idText: { color: '#aab7b8', fontSize: 13, marginTop: 4 },
  logoutBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 10 },
  statusSection: { padding: 25 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  statusCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 3 },
  cardValid: { borderLeftWidth: 5, borderLeftColor: '#27ae60' },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusLabel: { fontSize: 14, color: '#7f8c8d' },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  statusUpdate: { fontSize: 13, color: '#34495e', marginTop: 12, fontWeight: '500' },
  gridContainer: { paddingHorizontal: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  menuItem: { backgroundColor: '#fff', width: '47%', padding: 20, borderRadius: 20, alignItems: 'center', elevation: 2 },
  iconCircle: { width: 55, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  menuLabel: { fontSize: 12, fontWeight: 'bold', color: '#34495e', textAlign: 'center' }
});