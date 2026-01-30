import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { chargerTout, listeCandidats } from '../../store';

export default function DashAdminScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // État pour les statistiques en temps réel
  const [stats, setStats] = useState({ 
    aValider: 0, 
    aPayer: 0, 
    total: 0 
  });

  // Mise à jour automatique des stats quand on arrive sur l'écran
  useFocusEffect(
    useCallback(() => {
      const updateDashboard = async () => {
        await chargerTout();
        setStats({
          aValider: listeCandidats.filter(c => c.statut === "En attente").length,
          aPayer: listeCandidats.filter(c => c.statut === "Paiement à vérifier").length,
          total: listeCandidats.length
        });
      };
      updateDashboard();
    }, [])
  );

  const navigateTo = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(path as any);
    }, 600);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={styles.loadingText}>Accès au terminal sécurisé...</Text>
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
            <Text style={styles.adminSubtitle}>Session : Scolarité & Finances</Text>
          </View>
          <TouchableOpacity onPress={() => router.replace('/')}>
            <Ionicons name="power" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Statistiques Dynamiques */}
      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#f39c12' }]}>{stats.aValider}</Text>
          <Text style={styles.statLabel}>Dossiers</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#e74c3c' }]}>{stats.aPayer}</Text>
          <Text style={styles.statLabel}>Paiements</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, { color: '#27ae60' }]}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Candidats</Text>
        </View>
      </View>

      {/* Menu de Gestion */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Gestion des Opérations</Text>
        
        <AdminMenuButton 
          title="Valider les Candidatures" 
          desc="Vérification des dossiers et pièces"
          icon="checkmark-done-circle-outline" 
          onPress={() => navigateTo('/(tabs)/valider_dossiers')} 
        />
        
        {/* NOUVEAU : Validation Financière */}
        <AdminMenuButton 
          title="Valider les Paiements" 
          desc="Vérification des reçus (Mvola/Orange)"
          icon="cash-outline" 
          onPress={() => navigateTo('/(tabs)/valider_paiements')} 
        />
        
        <AdminMenuButton 
          title="Créer un Nouveau Concours" 
          desc="Définir les dates et centres"
          icon="add-circle-outline" 
          onPress={() => navigateTo('/(tabs)/create_concours')} 
        />
        
        <AdminMenuButton 
          title="Importer Liste Admis BACC" 
          desc="Mise à jour base de données"
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
    elevation: 2
  },
  cardIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#f0f4f8', justifyContent: 'center', alignItems: 'center' },
  cardTextBox: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#34495e' },
  cardDesc: { fontSize: 12, color: '#95a5a6', marginTop: 2 }
});