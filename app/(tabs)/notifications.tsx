import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getNotifications, listeCandidats, users } from '../../store';

export default function NotificationsScreen() {
  const router = useRouter();
  const { user } = useLocalSearchParams();

  // On récupère le statut actuel de l'étudiant
  const currentUser = users.find(u => u.username === user);
  const monDossier = listeCandidats.find(c => c.numBacc === currentUser?.numBacc);
  const mesNotifications = getNotifications(monDossier?.statut || "Aucun");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <FlatList
        data={mesNotifications}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.card, styles[item.type]]}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={item.type === 'success' ? 'checkmark-circle' : (item.type === 'error' ? 'alert-circle' : 'notifications')} 
                size={28} 
                color={item.type === 'success' ? '#27ae60' : (item.type === 'error' ? '#e74c3c' : '#3498db')} 
              />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.row}>
                <Text style={styles.notifTitle}>{item.titre}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucune notification pour le moment.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { paddingTop: 60, paddingHorizontal: 25, paddingBottom: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', elevation: 2 },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 20, color: '#003366' },
  list: { padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 15, padding: 15, marginBottom: 15, flexDirection: 'row', elevation: 2, borderLeftWidth: 5 },
  info: { borderLeftColor: '#3498db' },
  success: { borderLeftColor: '#27ae60' },
  error: { borderLeftColor: '#e74c3c' },
  iconContainer: { justifyContent: 'center', marginRight: 15 },
  textContainer: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notifTitle: { fontWeight: 'bold', fontSize: 15, color: '#2c3e50' },
  dateText: { fontSize: 11, color: '#95a5a6' },
  messageText: { fontSize: 13, color: '#7f8c8d', marginTop: 5 },
  empty: { textAlign: 'center', marginTop: 50, color: '#95a5a6' }
});