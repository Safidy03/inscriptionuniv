import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BachelierRef, chargerTout, listeBacheliersRef, modifierProfilUser, users } from '../../store';

export default function ProfilEtudiant() {
  const router = useRouter();
  const { user } = useLocalSearchParams();
  
  const [isEditing, setIsEditing] = useState(false);
  const [tel, setTel] = useState('');
  const [adr, setAdr] = useState('');
  const [infosBacc, setInfosBacc] = useState<BachelierRef | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await chargerTout();
      const foundUser = users.find(u => u.username === user);
      if (foundUser) {
        setTel(foundUser.telephone || '');
        setAdr(foundUser.adresse || '');
        const foundBacc = listeBacheliersRef.find(b => b.numBacc === foundUser.numBacc);
        if (foundBacc) setInfosBacc(foundBacc);
      }
    };
    loadData();
  }, [user]);

  const handleSave = async () => {
    const success = await modifierProfilUser(String(user), tel, adr);
    if (success) {
      setIsEditing(false);
      Alert.alert("Succès", "Profil mis à jour !");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Mon Profil</Text>
        <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
          <Text style={styles.editBtnText}>{isEditing ? "Enregistrer" : "Modifier"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={60} color="#003366" />
        </View>
        <Text style={styles.userName}>{infosBacc?.nom || user}</Text>
        <Text style={styles.userMail}>{user}@eni.mg</Text>

        <View style={styles.infoList}>
          <Text style={styles.sectionTitle}>Infos Académiques</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>N° BACC</Text>
            <Text style={styles.fixedValue}>{infosBacc?.numBacc || "N/A"}</Text>
          </View>

          <Text style={styles.sectionTitle}>Coordonnées</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Téléphone</Text>
            {isEditing ? (
              <TextInput style={styles.input} value={tel} onChangeText={setTel} keyboardType="phone-pad" />
            ) : (
              <Text style={styles.infoValue}>{tel || "Non renseigné"}</Text>
            )}
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Adresse</Text>
            {isEditing ? (
              <TextInput style={styles.input} value={adr} onChangeText={setAdr} />
            ) : (
              <Text style={styles.infoValue}>{adr || "Non renseignée"}</Text>
            )}
          </View>
        </View>

        {!isEditing && (
          <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
            <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f9' },
  topBar: { paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 2 },
  backBtn: { padding: 5 },
  pageTitle: { fontSize: 18, fontWeight: 'bold', color: '#003366' },
  editBtnText: { color: '#3498db', fontWeight: 'bold' },
  content: { alignItems: 'center', padding: 25 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 3, marginBottom: 15 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
  userMail: { fontSize: 14, color: '#7f8c8d', marginBottom: 25 },
  infoList: { width: '100%', backgroundColor: '#fff', borderRadius: 20, padding: 20 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#003366', marginTop: 15, marginBottom: 10, textTransform: 'uppercase' },
  infoItem: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f1f1f1', paddingBottom: 8 },
  infoLabel: { fontSize: 11, color: '#95a5a6', marginBottom: 4 },
  infoValue: { fontSize: 16, color: '#2c3e50' },
  fixedValue: { fontSize: 16, color: '#bdc3c7' }, // Couleur grise pour ce qui n'est pas modifiable
  input: { fontSize: 16, color: '#2980b9', padding: 0, fontWeight: '500' },
  logoutBtn: { marginTop: 30, flexDirection: 'row', alignItems: 'center' },
  logoutText: { color: '#e74c3c', fontWeight: 'bold', marginLeft: 8 }
});