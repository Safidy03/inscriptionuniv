import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// LIAISON AVEC LE STORE
import { listeCandidats } from '../../store';

// --- 1. AJOUT DE L'INTERFACE (C'est ce qui tue les traits rouges) ---
interface Candidat {
  id: number;
  nom: string;
  serie: string;
  numBacc: string;
  statut: string;
}

export default function DashboardEtudiant() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // --- 2. TYPAGE DE L'ÉTAT ---
  // On dit à TypeScript que c'est soit un objet Candidat, soit null
  const [monDossier, setMonDossier] = useState<Candidat | null>(null);

  useEffect(() => {
    // On force le type avec (listeCandidats as Candidat[])
    const dossier = (listeCandidats as Candidat[]).find(c => c.nom === "RAZAFY Jean");
    setMonDossier(dossier || null);
  }, [params]);

  // --- 3. LOGIQUE SÉCURISÉE ---
  const statut = monDossier ? monDossier.statut : "AUCUNE INSCRIPTION";
  const estValide = statut === "Validé";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            {/* Plus de rouge ici car TS sait que monDossier peut avoir un .nom */}
            <Text style={styles.welcomeText}>Bonjour, {monDossier ? monDossier.nom : "Étudiant"}</Text>
            <Text style={styles.idText}>ID: 24-UF-001 • Terminale {monDossier ? monDossier.serie : ""}</Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/')}>
            <Ionicons name="log-out-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Ma Candidature</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusLabel}>Statut administratif</Text>
            <View style={[styles.badge, { 
                backgroundColor: statut === "Validé" ? '#27ae60' : (statut === "Refusé" ? '#e74c3c' : '#f39c12') 
            }]}>
              <Text style={styles.badgeText}>{statut.toUpperCase()}</Text>
            </View>
          </View>
          
          <Text style={styles.statusUpdate}>
            {estValide 
              ? "✅ Votre dossier est conforme. Vous pouvez payer." 
              : (statut === "Refusé" ? "❌ Dossier rejeté. Contactez le support." : "⏳ En attente de vérification par l'admin...")}
          </Text>
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/concours')}>
            <View style={[styles.iconCircle, { backgroundColor: '#00336615' }]}><Ionicons name="search-outline" size={28} color="#003366" /></View>
            <Text style={styles.menuLabel}>Consulter Concours</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, !estValide && {opacity: 0.4}]} 
            onPress={() => estValide ? router.push({ pathname: '/(tabs)/paiement', params: { inscrit: 'true' } }) : null}
          >
            <View style={[styles.iconCircle, { backgroundColor: estValide ? '#27ae6020' : '#00336615' }]}>
                <Ionicons name="card-outline" size={28} color={estValide ? '#27ae60' : "#003366"} />
            </View>
            <Text style={[styles.menuLabel, estValide && {color: '#27ae60', fontWeight: 'bold'}]}>Effectuer Paiement</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.row}>
            <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/(tabs)/resultats')}>
                <View style={[styles.iconCircle, { backgroundColor: '#00336615' }]}><Ionicons name="ribbon-outline" size={28} color="#003366" /></View>
                <Text style={styles.menuLabel}>Mes Résultats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
                <View style={[styles.iconCircle, { backgroundColor: '#00336615' }]}><Ionicons name="person-outline" size={28} color="#003366" /></View>
                <Text style={styles.menuLabel}>Mon Profil</Text>
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#003366', paddingTop: 60, paddingBottom: 30, paddingHorizontal: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  idText: { color: '#bdc3c7', fontSize: 13 },
  statusSection: { padding: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2c3e50', marginBottom: 15 },
  statusCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 4 },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusLabel: { fontSize: 15, color: '#7f8c8d' },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  statusUpdate: { fontSize: 12, color: '#bdc3c7', marginTop: 10, fontStyle: 'italic' },
  gridContainer: { paddingHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  menuItem: { backgroundColor: '#fff', width: '47%', padding: 20, borderRadius: 25, alignItems: 'center', elevation: 3 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  menuLabel: { fontSize: 12, fontWeight: '600', color: '#34495e', textAlign: 'center' }
});