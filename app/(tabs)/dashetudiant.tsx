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

export default function DashboardEtudiant() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Simulation d'une action avec chargement pour la crédibilité
  const navigateTo = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(path as any);
    }, 800); // Petit délai pour simuler un appel API
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={styles.loadingText}>Chargement des données...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Professionnel */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>Bonjour, Rakoto</Text>
            <Text style={styles.idText}>ID: 24-UF-001 • Terminale S</Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/')}>
            <Ionicons name="log-out-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* État du Dossier - Visuel "Temps Réel" */}
      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Ma Candidature</Text>
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusLabel}>Statut actuel</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>EN COURS</Text>
            </View>
          </View>
          <Text style={styles.statusUpdate}>Dernière mise à jour : il y a 2 heures</Text>
        </View>
      </View>

      {/* Menu en Grille */}
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <MenuButton 
            title="Consulter Concours" 
            icon="search-outline" 
            color="#003366" 
            onPress={() => navigateTo('/(tabs)/concours')} 
          />
          <MenuButton 
            title="Déposer Dossier" 
            icon="document-text-outline" 
            color="#003366" 
            onPress={() => navigateTo('/(tabs)/inscription')} 
          />
        </View>
        <View style={styles.row}>
          <MenuButton 
            title="Effectuer Paiement" 
            icon="card-outline" 
            color="#003366" 
            onPress={() => navigateTo('/(tabs)/paiement')} 
          />
          <MenuButton 
            title="Mes Résultats" 
            icon="ribbon-outline" 
            color="#003366" 
            onPress={() => navigateTo('/(tabs)/resultats')} 
          />
        </View>
      </View>
    </ScrollView>
  );
}

// Composant réutilisable pour les boutons du menu
function MenuButton({ title, icon, color, onPress }: any) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.menuLabel}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 10, color: '#003366', fontWeight: '500' },
  header: { 
    backgroundColor: '#003366', 
    paddingTop: 60, 
    paddingBottom: 30, 
    paddingHorizontal: 25, 
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30 
  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  idText: { color: '#bdc3c7', fontSize: 13, marginTop: 4 },
  statusSection: { padding: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#2c3e50', marginBottom: 15 },
  statusCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  statusHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusLabel: { fontSize: 15, color: '#7f8c8d' },
  badge: { backgroundColor: '#f39c12', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  statusUpdate: { fontSize: 12, color: '#bdc3c7', fontStyle: 'italic' },
  gridContainer: { paddingHorizontal: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  menuItem: { 
    backgroundColor: '#fff', 
    width: '47%', 
    padding: 20, 
    borderRadius: 25, 
    alignItems: 'center', 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5
  },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  menuLabel: { fontSize: 13, fontWeight: '600', color: '#34495e', textAlign: 'center' }
});