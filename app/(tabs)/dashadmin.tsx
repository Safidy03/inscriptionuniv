import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function DashAdminScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Simulation de chargement pour le réalisme technique
  const navigateTo = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(path as any);
    }, 900);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={styles.loadingText}>Synchronisation avec le serveur...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Admin */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.adminTitle}>Direction ENI</Text>
            <Text style={styles.adminSubtitle}>Session : Administrateur Central</Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/')}>
            <Ionicons name="power" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistiques Rapides pour la crédibilité */}
      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>148</Text>
          <Text style={styles.statLabel}>Inscrits</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#f39c12' }]}>12</Text>
          <Text style={styles.statLabel}>À Valider</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#27ae60' }]}>03</Text>
          <Text style={styles.statLabel}>Concours</Text>
        </View>
      </View>

      {/* Menu de Gestion (UML) */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Gestion des Opérations</Text>
        
        <AdminMenuButton 
          title="Créer un Nouveau Concours" 
          desc="Définir les dates et centres d'examen"
          icon="add-circle-outline" 
          onPress={() => navigateTo('/(tabs)/create_concours')} 
        />
        
        <AdminMenuButton 
          title="Valider les Candidatures" 
          desc="Vérification des dossiers et pièces jointes"
          icon="checkmark-done-circle-outline" 
          onPress={() => navigateTo('/(tabs)/valider_dossiers')} 
        />
        
        <AdminMenuButton 
          title="Gérer les Composants" 
          desc="Configuration des modules de l'examen"
          icon="settings-outline" 
          onPress={() => navigateTo('/(tabs)/gestion_composants')} 
        />
        
        <AdminMenuButton 
          title="Importer Liste Admis BACC" 
          desc="Mise à jour de la base de données ministérielle"
          icon="cloud-upload-outline" 
          onPress={() => navigateTo('/(tabs)/import_bacc')} 
        />
      </View>
    </ScrollView>
  );
}

// Composant Bouton Admin
function AdminMenuButton({ title, desc, icon, onPress }: any) {
  return (
    <TouchableOpacity style={styles.adminCard} onPress={onPress}>
      <View style={styles.cardIconBox}>
        <Ionicons name={icon} size={28} color="#003366" />
      </View>
      <View style={styles.cardTextBox}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#003366', fontWeight: '600' },
  header: { 
    backgroundColor: '#003366', 
    paddingTop: 60, 
    paddingBottom: 40, 
    paddingHorizontal: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35
  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  adminTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  adminSubtitle: { color: '#bdc3c7', fontSize: 13, marginTop: 4 },
  statsSection: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    marginTop: -25 
  },
  statBox: { 
    backgroundColor: '#fff', 
    width: '30%', 
    padding: 15, 
    borderRadius: 18, 
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#003366' },
  statLabel: { fontSize: 11, color: '#7f8c8d', marginTop: 2 },
  menuSection: { padding: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2c3e50', marginBottom: 20 },
  adminCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    padding: 18, 
    borderRadius: 20, 
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05
  },
  cardIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#f0f4f8', justifyContent: 'center', alignItems: 'center' },
  cardTextBox: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#34495e' },
  cardDesc: { fontSize: 12, color: '#95a5a6', marginTop: 2 }
});