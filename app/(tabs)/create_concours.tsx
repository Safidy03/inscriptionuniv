import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function CreateConcours() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setLoading(true);
    // Simulation d'enregistrement dans la base de données
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Succès", 
        "Le nouveau concours a été publié avec succès.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar Professionnelle */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Nouveau Concours</Text>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Informations Générales</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Titre du concours</Text>
          <TextInput style={styles.input} placeholder="Ex: Concours d'entrée L1 2024" placeholderTextColor="#bdc3c7" />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Date de l'examen</Text>
            <TextInput style={styles.input} placeholder="JJ/MM/AAAA" placeholderTextColor="#bdc3c7" />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Frais (Ar)</Text>
            <TextInput style={styles.input} placeholder="50 000" keyboardType="numeric" placeholderTextColor="#bdc3c7" />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Centres d'examen</Text>
          <TextInput style={styles.input} placeholder="Ex: Fianarantsoa, Tana, Mahajanga" placeholderTextColor="#bdc3c7" />
        </View>

        <Text style={[styles.sectionLabel, {marginTop: 20}]}>Composants & Modules (UML)</Text>
        <View style={styles.componentBox}>
          <Text style={styles.componentText}>• Mathématiques (Coeff: 3)</Text>
          <Text style={styles.componentText}>• Algorithmique (Coeff: 5)</Text>
          <Text style={styles.componentText}>• Anglais (Coeff: 2)</Text>
        </View>

        <TouchableOpacity 
          style={styles.submitBtn} 
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={20} color="#fff" style={{marginRight: 10}} />
              <Text style={styles.submitBtnText}>PUBLIER LE CONCOURS</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', elevation: 2 },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { marginLeft: 5, color: '#003366', fontWeight: 'bold' },
  pageTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#003366', marginRight: 40 },
  formContainer: { padding: 25 },
  sectionLabel: { fontSize: 14, fontWeight: 'bold', color: '#7f8c8d', textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#34495e', marginBottom: 8, fontWeight: '600' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e1e4e8', borderRadius: 12, padding: 15, fontSize: 16, color: '#2c3e50' },
  row: { flexDirection: 'row' },
  componentBox: { backgroundColor: '#e1f5fe', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#003366', marginBottom: 30 },
  componentText: { color: '#003366', fontSize: 14, marginBottom: 5, fontWeight: '500' },
  submitBtn: { backgroundColor: '#003366', padding: 20, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 4 },
  submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 }
});