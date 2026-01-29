import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import XLSX from 'xlsx';

import { BachelierRef, importerBacheliers, listeBacheliersRef } from '../../store';

export default function ImportBaccExcel() {
  const router = useRouter();
  const [importing, setImporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Pour la recherche

  // Fonction de filtrage
  const bacheliersFiltrés = listeBacheliersRef.filter(b => 
    b.nom.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.numBacc.includes(searchQuery)
  );

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
      });

      if (result.canceled) return;

      setImporting(true);
      const fileUri = result.assets[0].uri;

      const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: 'base64', // Correction appliquée ici aussi
      });

      const workbook = XLSX.read(fileBase64, { type: 'base64' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const data: any[] = XLSX.utils.sheet_to_json(worksheet);

      const formattedData: BachelierRef[] = data.map(row => ({
        numBacc: String(row.numBacc || row.Matricule),
        nom: String(row.nom || row.Nom),
        serie: String(row.serie || row.Serie),
      }));

      await importerBacheliers(formattedData);
      setImporting(false);
      Alert.alert("Succès", `${formattedData.length} bacheliers importés.`);

    } catch (error) {
      setImporting(false);
      Alert.alert("Erreur", "Impossible de lire le fichier Excel.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Gestion des Bacheliers</Text>
      </View>

      <View style={styles.content}>
        {/* BOUTON IMPORT */}
        <TouchableOpacity style={styles.importBtn} onPress={handlePickDocument} disabled={importing}>
          <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
          <Text style={styles.importBtnText}> {importing ? "IMPORTATION..." : "IMPORTER EXCEL"} </Text>
        </TouchableOpacity>

        {/* BARRE DE RECHERCHE */}
        <View style={styles.searchSection}>
          <Ionicons name="search" size={20} color="#7f8c8d" style={styles.searchIcon} />
          <TextInput 
            style={styles.input}
            placeholder="Rechercher par nom ou numéro..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.listHeader}>Liste des bacheliers officiels ({bacheliersFiltrés.length})</Text>
        
        <FlatList
          data={bacheliersFiltrés} // Utilisation de la liste filtrée
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <View>
                <Text style={styles.itemName}>{item.nom}</Text>
                <Text style={styles.itemBacc}>N° {item.numBacc}</Text>
              </View>
              <View style={styles.serieBadge}>
                <Text style={styles.serieText}>{item.serie}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', elevation: 2 },
  backBtn: { padding: 5 },
  pageTitle: { fontSize: 18, fontWeight: 'bold', color: '#003366', marginLeft: 15 },
  content: { flex: 1, padding: 20 },
  importBtn: { backgroundColor: '#27ae60', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  importBtnText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
  searchSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, height: 45 },
  listHeader: { fontWeight: 'bold', marginBottom: 10, color: '#34495e' },
  listItem: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  itemName: { fontSize: 15, fontWeight: 'bold', color: '#2c3e50' },
  itemBacc: { fontSize: 12, color: '#7f8c8d' },
  serieBadge: { backgroundColor: '#003366', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  serieText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});