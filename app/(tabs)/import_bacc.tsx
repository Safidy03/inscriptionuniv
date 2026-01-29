import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ImportBacc() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  const startImport = () => {
    setStatus('loading');
    setProgress(0);
    
    // Simulation d'une barre de progression qui avance
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('success');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Importation BACC</Text>
      </View>

      <View style={styles.content}>
        {status === 'idle' && (
          <View style={styles.card}>
            <Ionicons name="cloud-download-outline" size={80} color="#003366" />
            <Text style={styles.cardTitle}>Synchronisation Ministérielle</Text>
            <Text style={styles.cardDesc}>
              Importer la base de données officielle des bacheliers 2024 pour la vérification automatique des dossiers.
            </Text>
            <TouchableOpacity style={styles.importBtn} onPress={startImport}>
              <Text style={styles.importBtnText}>LANCER L'IMPORTATION</Text>
            </TouchableOpacity>
          </View>
        )}

        {status === 'loading' && (
          <View style={styles.card}>
            <ActivityIndicator size="large" color="#003366" />
            <Text style={styles.loadingText}>Importation en cours : {progress}%</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.subLoading}>Vérification des signatures numériques...</Text>
          </View>
        )}

        {status === 'success' && (
          <View style={styles.card}>
            <Ionicons name="checkmark-done-circle" size={80} color="#27ae60" />
            <Text style={[styles.cardTitle, {color: '#27ae60'}]}>Importation Terminée</Text>
            <Text style={styles.cardDesc}>
              12 450 nouveaux bacheliers ont été ajoutés à la base de contrôle locale.
            </Text>
            <TouchableOpacity style={styles.backDashBtn} onPress={() => router.back()}>
              <Text style={styles.backDashText}>RETOURNER AU DASHBOARD</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, color: '#003366', fontWeight: 'bold' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003366', marginRight: 40 },
  content: { flex: 1, justifyContent: 'center', padding: 25 },
  card: { backgroundColor: '#fff', padding: 40, borderRadius: 30, alignItems: 'center', elevation: 5 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50', marginTop: 20, textAlign: 'center' },
  cardDesc: { color: '#7f8c8d', textAlign: 'center', marginTop: 10, lineHeight: 20 },
  importBtn: { backgroundColor: '#003366', padding: 20, borderRadius: 15, marginTop: 30, width: '100%', alignItems: 'center' },
  importBtnText: { color: '#fff', fontWeight: 'bold' },
  loadingText: { marginTop: 20, fontWeight: 'bold', color: '#003366' },
  progressBarBg: { height: 8, width: '100%', backgroundColor: '#eee', borderRadius: 4, marginTop: 15, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#003366' },
  subLoading: { fontSize: 11, color: '#bdc3c7', marginTop: 10 },
  backDashBtn: { backgroundColor: '#f0f4f8', padding: 15, borderRadius: 12, marginTop: 25 },
  backDashText: { color: '#003366', fontWeight: 'bold' }
});