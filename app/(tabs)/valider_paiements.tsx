import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// IMPORTATION DU STORE
import { chargerTout, confirmerPaiementFinal, listeCandidats } from '../../store';

export default function ValiderPaiements() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [candidats, setCandidats] = useState<any[]>([]);

  // CHARGEMENT : On filtre sur ceux qui ont payé mais ne sont pas encore définitifs
  const rafraichirListe = async () => {
    await chargerTout();
    const dossiersAPayer = listeCandidats.filter(
      (c) => c.statut === "Paiement à vérifier"
    );
    setCandidats(dossiersAPayer);
  };

  useEffect(() => {
    rafraichirListe();
  }, []);

  const handleAction = (id: number, nom: string) => {
    setLoadingId(id);

    // Simulation du temps de vérification bancaire
    setTimeout(async () => {
      // APPEL À LA FONCTION DU STORE QUI GÉNÈRE LA CONVOCATION
      await confirmerPaiementFinal(id);
      
      // Mise à jour de l'affichage local
      setCandidats(prev => prev.filter(c => c.id !== id));
      setLoadingId(null);
      
      Alert.alert("Paiement Confirmé", `La convocation de ${nom} a été générée avec succès.`);
    }, 800);
  };

  return (
    <View style={styles.container}>
      {/* BARRE DE NAVIGATION */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Validation Paiements</Text>
        <TouchableOpacity onPress={rafraichirListe}>
          <Ionicons name="refresh" size={20} color="#003366" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionHint}>Reçus Mobile Money à vérifier :</Text>
        
        {candidats.map((c) => (
          <View key={c.id} style={styles.candidatCard}>
            <View style={styles.infoBox}>
              <Text style={styles.candName}>{c.nom}</Text>
              <Text style={styles.refText}>Réf: {c.referencePaiement}</Text>
              
              <View style={styles.filiereBadge}>
                <Ionicons name="cash" size={14} color="#27ae60" />
                <Text style={styles.filiereText}>{c.filiere}</Text>
              </View>
            </View>

            <View style={styles.actionGroup}>
              {loadingId === c.id ? (
                <ActivityIndicator color="#003366" />
              ) : (
                <TouchableOpacity 
                  onPress={() => handleAction(c.id, c.nom)} 
                  style={[styles.miniBtn, {backgroundColor: '#27ae60'}]}
                >
                  <Ionicons name="checkmark-done" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {candidats.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={70} color="#dcdde1" />
            <Text style={styles.emptyTitle}>Aucun paiement</Text>
            <Text style={styles.emptySub}>Tous les reçus ont été traités.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { padding: 5 },
  pageTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  scrollContent: { padding: 20 },
  sectionHint: { fontSize: 13, color: '#95a5a6', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
  candidatCard: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
  infoBox: { flex: 1 },
  candName: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  refText: { fontSize: 14, color: '#27ae60', fontWeight: 'bold', marginTop: 3 },
  filiereBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#27ae6015', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, alignSelf: 'flex-start', marginTop: 8 },
  filiereText: { fontSize: 11, color: '#27ae60', fontWeight: 'bold', marginLeft: 5 },
  actionGroup: { flexDirection: 'row' },
  miniBtn: { width: 55, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#bdc3c7', marginTop: 15 },
  emptySub: { fontSize: 14, color: '#bdc3c7', marginTop: 5 }
});