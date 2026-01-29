import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// IMPORTATION CORRIGÉE (Chemin vers la racine)
import { listeCandidats, mettreAJourStatut } from '../../store';

export default function ValiderDossiers() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [candidats, setCandidats] = useState<any[]>([]);

  // CHARGEMENT DYNAMIQUE : On récupère les candidats du store
  useEffect(() => {
    const dossiersAValider = listeCandidats.filter(
      (c) => c.statut === "En attente" || c.statut === "A vérifier"
    );
    setCandidats(dossiersAValider);
  }, []);

  const handleAction = (id: number, nom: string, action: string) => {
    setLoadingId(id);

    // Simulation du temps de traitement
    setTimeout(() => {
      const nouveauStatut = action === "APPROUVÉ" ? "Validé" : "Refusé";
      mettreAJourStatut(id, nouveauStatut);
      
      // Mise à jour locale de la liste pour faire disparaître la carte traitée
      setCandidats(prev => prev.filter(c => c.id !== id));
      setLoadingId(null);
      
      Alert.alert("Succès", `Le dossier de ${nom} a été ${nouveauStatut.toLowerCase()}.`);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Validation des Dossiers</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {candidats.map((c) => (
          <View key={c.id} style={styles.candidatCard}>
            <View style={styles.infoBox}>
              <Text style={styles.candName}>{c.nom}</Text>
              {/* AFFICHAGE DU CONCOURS CHOISI */}
              <Text style={styles.candDetails}>
                Série {c.serie} • Bacc: {c.numBacc}
              </Text>
              <View style={styles.concoursBadge}>
                <Ionicons name="ribbon-outline" size={14} color="#003366" />
                <Text style={styles.concoursText}>Vise : {c.concoursChoisi || "Non spécifié"}</Text>
              </View>
            </View>

            <View style={styles.actionGroup}>
              {loadingId === c.id ? (
                <ActivityIndicator color="#003366" />
              ) : (
                <>
                  <TouchableOpacity 
                    onPress={() => handleAction(c.id, c.nom, "APPROUVÉ")} 
                    style={[styles.miniBtn, {backgroundColor: '#27ae60'}]}
                  >
                    <Ionicons name="checkmark" size={20} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleAction(c.id, c.nom, "REJETÉ")} 
                    style={[styles.miniBtn, {backgroundColor: '#e74c3c'}]}
                  >
                    <Ionicons name="close" size={20} color="#fff" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}

        {candidats.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#bdc3c7" />
            <Text style={styles.emptyTitle}>Aucun dossier à valider</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  topBar: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 15 },
  backText: { marginLeft: 5, color: '#003366', fontWeight: '600' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
  scrollContent: { padding: 20 },
  candidatCard: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3 },
  infoBox: { flex: 1 },
  candName: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  candDetails: { fontSize: 13, color: '#7f8c8d', marginVertical: 4 },
  concoursBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#00336610', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, alignSelf: 'flex-start', marginTop: 5 },
  concoursText: { fontSize: 12, color: '#003366', fontWeight: 'bold', marginLeft: 5 },
  actionGroup: { flexDirection: 'row', alignItems: 'center' },
  miniBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyTitle: { fontSize: 18, color: '#bdc3c7', marginTop: 10 }
});