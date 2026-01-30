import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getNotifications, listeCandidats, users } from '../../store';

export default function NotificationsScreen() {
  const router = useRouter();
  const { user } = useLocalSearchParams();

  // 1. Trouver l'utilisateur actuel
  const currentUser = users.find(u => u.username === user);
  
  // 2. Récupérer TOUTES les inscriptions de l'utilisateur
  const mesDossiers = listeCandidats.filter(c => c.numBacc === currentUser?.numBacc);

  // 3. Envoyer la liste des dossiers à getNotifications
  const mesNotifications = getNotifications(mesDossiers);

  // Fonction de simulation de téléchargement avec affichage des infos réelles
  const handleDownload = (notifId: number, titre: string) => {
    // On retrouve le dossier correspondant via l'ID de la notification (id - 200 défini dans store)
    const idDossierOriginal = notifId - 200;
    const dossier = listeCandidats.find(d => d.id === idDossierOriginal);

    if (dossier && dossier.statut === "Inscrit Définitif") {
      Alert.alert(
        "📄 CONVOCATION OFFICIELLE",
        `NOM : ${dossier.nom}\n` +
        `N° INSCRIPTION : ${dossier.numInscription}\n` +
        `CONCOURS : ${dossier.filiere}\n\n` +
        `--------------------------------\n` +
        `📅 DATE : 15 Avril 2026\n` +
        `🕒 HEURE : 07h30\n` +
        `📍 LIEU : Campus Universitaire ENI\n` +
        `🚪 SALLE : ${dossier.salle}\n` +
        `🪑 PLACE : N° ${dossier.place}\n` +
        `--------------------------------\n\n` +
        `⚠️ Présentez-vous 30min avant l'épreuve muni de votre pièce d'identité.`,
        [{ text: "OK, j'ai compris", style: "default" }]
      );
    } else {
      const filiere = titre.split(': ')[1] || "Concours";
      Alert.alert("Erreur", `Impossible de générer la convocation pour ${filiere}.`);
    }
  };

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
          <View style={[styles.card, styles[item.type as 'info' | 'success' | 'error']]}>
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

              {/* BOUTON DE TÉLÉCHARGEMENT PDF : S'affiche uniquement pour les convocations */}
              {item.titre.includes("Convocation") && (
                <TouchableOpacity 
                  style={styles.downloadBtn}
                  onPress={() => handleDownload(item.id, item.titre)}
                >
                  <Ionicons name="cloud-download-outline" size={18} color="#fff" />
                  <Text style={styles.downloadText}>Afficher ma Convocation</Text>
                </TouchableOpacity>
              )}
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
  iconContainer: { justifyContent: 'flex-start', paddingTop: 5, marginRight: 15 },
  textContainer: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notifTitle: { fontWeight: 'bold', fontSize: 14, color: '#2c3e50', flex: 1 },
  dateText: { fontSize: 10, color: '#95a5a6', marginLeft: 5 },
  messageText: { fontSize: 13, color: '#7f8c8d', marginTop: 5 },
  downloadBtn: { 
    flexDirection: 'row', 
    backgroundColor: '#27ae60', 
    padding: 10, 
    borderRadius: 8, 
    marginTop: 12, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  downloadText: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginLeft: 8 },
  empty: { textAlign: 'center', marginTop: 50, color: '#95a5a6' }
});