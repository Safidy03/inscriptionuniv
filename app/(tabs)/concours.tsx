import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { listeConcours } from '../../store'; // On importe la liste réelle

export default function ConsulterConcours() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Concours Ouverts</Text>
      {listeConcours.map((c) => (
        <View key={c.id} style={styles.card}>
          <Text style={styles.titreConcours}>{c.titre}</Text>
          <Text style={styles.desc}>{c.description}</Text>
          <Text style={styles.date}>Limite : {c.dateLimite}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 3 },
  titreConcours: { fontSize: 18, fontWeight: 'bold', color: '#003366' },
  desc: { color: '#666', marginVertical: 5 },
  date: { fontSize: 12, color: '#e74c3c', fontWeight: 'bold' }
});