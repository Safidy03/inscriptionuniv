import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// LIAISON AVEC LE STORE
import { Candidat, chargerTout, listeBacheliersRef, listeCandidats, users } from '../../store';

export default function DashboardEtudiant() {
  const router = useRouter();
  const { user } = useLocalSearchParams(); 
  
  const [mesInscriptions, setMesInscriptions] = useState<Candidat[]>([]);
  const [infoBaccBase, setInfoBaccBase] = useState<{numBacc: string, serie: string, nom: string} | null>(null);

  useEffect(() => {
    const initDashboard = async () => {
      await chargerTout();
      const currentUser = users.find(u => u.username === user);
      if (currentUser) {
        const bacc = listeBacheliersRef.find(b => b.numBacc === currentUser.numBacc);
        if (bacc) setInfoBaccBase(bacc);
        const sesInscriptions = listeCandidats.filter(c => c.numBacc === currentUser.numBacc);
        setMesInscriptions(sesInscriptions);
      }
    };
    initDashboard();
  }, [user]);

  // CORRECTION : Cette fonction doit être à l'intérieur du composant ou définie avant le return
  const getStatusStyle = (statut: string) => {
    switch (statut) {
      case "Inscrit Définitif": return { bg: '#27ae60', icon: 'checkmark-circle' };
      case "Validé": return { bg: '#2980b9', icon: 'time' };
      case "Refusé": return { bg: '#e74c3c', icon: 'close-circle' };
      default: return { bg: '#f39c12', icon: 'hourglass' };
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Bonjour, {infoBaccBase?.nom || user}</Text>
            <Text style={styles.idText}>
              BACC: {infoBaccBase?.numBacc || "N/A"} • Série {infoBaccBase?.serie || "N/A"}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>

      {/* SECTION CANDIDATURES */}
      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Mes Candidatures ({mesInscriptions.length})</Text>
        
        {mesInscriptions.length === 0 ? (
          <View style={styles.statusCard}>
            <Text style={styles.statusUpdate}>👉 Aucune inscription en cours.</Text>
          </View>
        ) : (
          mesInscriptions.map((doc) => {
            const config = getStatusStyle(doc.statut);
            return (
              <View key={doc.id} style={[styles.statusCard, { borderLeftColor: config.bg, borderLeftWidth: 5, marginBottom: 12 }]}>
                <View style={styles.statusHeader}>
                  <View>
                    <Text style={styles.filiereTitle}>{doc.filiere}</Text>
                    <Text style={styles.statusLabel}>ID: {doc.id.toString().slice(-6)}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: config.bg }]}>
                    <Text style={styles.badgeText}>{doc.statut.toUpperCase()}</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <Ionicons name={config.icon as any} size={16} color={config.bg} />
                  <Text style={[styles.statusUpdate, { marginTop: 0, marginLeft: 5 }]}>
                    {doc.paye ? "Paiement validé ✅" : "Paiement en attente ⏳"}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </View>

      {/* MENU */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push({ pathname: '/concours', params: { user } })}>
            <View style={[styles.iconCircle, { backgroundColor: '#3498db20' }]}>
              <Ionicons name="school-outline" size={28} color="#3498db" />
            </View>
            <Text style={styles.menuLabel}>S'inscrire</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, mesInscriptions.length === 0 && { opacity: 0.5 }]} 
            onPress={() => mesInscriptions.length > 0 && router.push({ pathname: '/paiement', params: { user } })}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#27ae6020' }]}>
              <Ionicons name="card-outline" size={28} color="#27ae60" />
            </View>
            <Text style={styles.menuLabel}>Paiement</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push({ pathname: '/notifications', params: { user } })}>
            <View style={[styles.iconCircle, { backgroundColor: '#9b59b620' }]}>
              <Ionicons name="notifications-outline" size={28} color="#9b59b6" />
            </View>
            <Text style={styles.menuLabel}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push({ pathname: '/profil', params: { user } })}>
            <View style={[styles.iconCircle, { backgroundColor: '#f1c40f20' }]}>
              <Ionicons name="person-outline" size={28} color="#f1c40f" />
            </View>
            <Text style={styles.menuLabel}>Profil</Text>
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
  welcomeText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  idText: { color: '#aab7b8', fontSize: 12, marginTop: 4 },
  logoutBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 10 },
  statusSection: { padding: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 15 },
  statusCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, elevation: 2 },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  filiereTitle: { fontSize: 15, fontWeight: 'bold', color: '#003366' },
  statusLabel: { fontSize: 10, color: '#95a5a6' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 10, borderTopWidth: 1, borderTopColor: '#f1f1f1', paddingTop: 8 },
  statusUpdate: { fontSize: 12, color: '#34495e' },
  gridContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  menuItem: { backgroundColor: '#fff', width: '47%', padding: 15, borderRadius: 15, alignItems: 'center', elevation: 2 },
  iconCircle: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  menuLabel: { fontSize: 12, fontWeight: 'bold', color: '#34495e' }
});