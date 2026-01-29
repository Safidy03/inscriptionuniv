import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// On importe les données et la fonction d'inscription depuis ton store
import { inscrireAuConcours, listeBacheliersRef, listeConcours, users } from '../../store';

export default function ConsulterConcours() {
  const router = useRouter();
  const { user } = useLocalSearchParams(); // Récupère le pseudo de l'utilisateur connecté

  const handleInscription = (titreConcours: string) => {
    // 1. On cherche l'utilisateur dans la liste des comptes
    const currentUser = users.find(u => u.username === user);
    
    // 2. On cherche ses informations de bachelier (importées via Excel)
    const baccInfo = listeBacheliersRef.find(b => b.numBacc === currentUser?.numBacc);

    // Vérification de sécurité
    if (!currentUser || !baccInfo) {
      Alert.alert("Erreur", "Profil bachelier introuvable. Assurez-vous d'être bien connecté.");
      return;
    }

    Alert.alert(
      "Confirmation",
      `Voulez-vous vous inscrire au concours : ${titreConcours} ?`,
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Confirmer", 
          onPress: () => {
            // Utilisation des "!" pour dire à TypeScript que les données sont validées
            inscrireAuConcours(
              currentUser.numBacc!, // Suppression de l'erreur TS2345
              baccInfo.nom!,
              baccInfo.serie!,
              titreConcours
            );

            Alert.alert("Succès", "Votre candidature a été envoyée avec succès !");
            
            // Retour au dashboard pour voir le nouveau statut "En attente"
            router.push({ pathname: '/dashetudiant', params: { user } });
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.title}>Concours Ouverts</Text>
      </View>

      <Text style={styles.subtitle}>Sélectionnez une filière pour valider votre candidature à l'ENI :</Text>

      {listeConcours.map((c) => (
        <View key={c.id} style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.titreConcours}>{c.titre}</Text>
              <Ionicons name="school-outline" size={20} color="#003366" />
            </View>
            <Text style={styles.desc}>{c.description}</Text>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={14} color="#e74c3c" />
              <Text style={styles.date}> Limite : {c.dateLimite}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.selectBtn} 
            onPress={() => handleInscription(c.titre)}
          >
            <Text style={styles.selectBtnText}>S'INSCRIRE MAINTENANT</Text>
            <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f9' },
  header: { paddingTop: 60, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 10, elevation: 2 },
  title: { fontSize: 24, fontWeight: 'bold', marginLeft: 15, color: '#003366' },
  subtitle: { paddingHorizontal: 25, color: '#666', marginBottom: 20, fontSize: 14 },
  card: { backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 20, marginBottom: 20, elevation: 4, overflow: 'hidden', borderLeftWidth: 5, borderLeftColor: '#003366' },
  cardContent: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  titreConcours: { fontSize: 18, fontWeight: 'bold', color: '#003366', flex: 1 },
  desc: { color: '#7f8c8d', fontSize: 13, lineHeight: 18, marginBottom: 15 },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  date: { fontSize: 12, color: '#e74c3c', fontWeight: 'bold' },
  selectBtn: { backgroundColor: '#003366', padding: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  selectBtnText: { color: '#fff', fontWeight: 'bold', marginRight: 10, letterSpacing: 1 }
});