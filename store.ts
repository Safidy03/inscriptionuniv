import AsyncStorage from '@react-native-async-storage/async-storage';

// --- INTERFACES ---
export interface Candidat {
  id: number;
  nom: string;
  serie: string;
  numBacc: string;
  statut: string;
  filiere: string;
  paye: boolean;
  referencePaiement?: string;
  numInscription?: string;
  salle?: string;
  place?: number;
}

export interface Concours {
  id: number;
  titre: string;
  description: string;
  dateLimite: string;
}

export interface User {
  username: string;
  password: string;
  role: 'student' | 'admin';
  numBacc?: string;
  telephone?: string;
  adresse?: string;
}

export interface BachelierRef {
  numBacc: string;
  nom: string;
  serie: string;
}

export interface Notification {
  id: number;
  titre: string;
  message: string;
  date: string;
  type: 'info' | 'success' | 'error';
}

// --- DONNÉES INITIALES ---
export let users: User[] = [
  { username: 'kix', password: '123', role: 'admin' }
];

export let listeBacheliersRef: BachelierRef[] = [
  { numBacc: "123456", nom: "RAZAFY Jean", serie: "S" },
  { numBacc: "654321", nom: "SOA Maria", serie: "L" },
  { numBacc: "000000", nom: "Etudiant Test", serie: "OSE" }
];

export let listeConcours: Concours[] = [
  { id: 1, titre: "Génie Logiciel", description: "Développement et Base de données", dateLimite: "15/03/2026" },
  { id: 2, titre: "Systèmes & Réseaux", description: "Administration et Sécurité", dateLimite: "20/03/2026" }
];

export let listeCandidats: Candidat[] = [];

// --- LOGIQUE DE PERSISTANCE ---
export const sauvegarderTout = async () => {
  try {
    const data = { c: listeCandidats, con: listeConcours, u: users, ref: listeBacheliersRef };
    await AsyncStorage.setItem('@storage_Key', JSON.stringify(data));
  } catch (e) { console.log("Erreur sauvegarde local"); }
};

export const chargerTout = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    if (jsonValue != null) {
      const data = JSON.parse(jsonValue);
      listeCandidats = data.c || [];
      listeConcours = data.con || [];
      users = data.u || users;
      listeBacheliersRef = data.ref || listeBacheliersRef;
    }
  } catch (e) { console.log("Erreur chargement local"); }
};

// --- FONCTIONS ACTIONS ---

export const registerUser = async (username: string, password: string, numBacc: string, telephone: string, adresse: string) => {
  const exists = users.find(u => u.username === username);
  if (exists) return { success: false, msg: "Pseudo déjà utilisé." };
  users.push({ username, password, role: 'student', numBacc, telephone, adresse });
  await sauvegarderTout();
  return { success: true, msg: "Compte créé !" };
};

export const inscrireAuConcours = async (numBacc: string, nom: string, serie: string, filiere: string) => {
  const indexExistant = listeCandidats.findIndex(
    c => c.numBacc === numBacc && c.filiere === filiere
  );

  if (indexExistant !== -1) {
    const dossier = listeCandidats[indexExistant];
    if (["Validé", "Inscrit Définitif", "En attente", "Paiement à vérifier"].includes(dossier.statut)) {
      return { success: false, msg: "Une inscription est déjà en cours ou validée." };
    }

    if (dossier.statut === "Refusé") {
      listeCandidats[indexExistant] = {
        ...dossier,
        statut: "En attente",
        paye: false,
        id: Date.now() 
      };
      await sauvegarderTout();
      return { success: true, msg: "Dossier renvoyé !" };
    }
  }

  const nouveauCandidat: Candidat = {
    id: Date.now(),
    nom,
    serie,
    numBacc,
    filiere,
    statut: "En attente",
    paye: false
  };
  
  listeCandidats.push(nouveauCandidat);
  await sauvegarderTout();
  return { success: true, msg: `Inscription en ${filiere} réussie !` };
};

// ÉTAPE 1 : L'étudiant soumet son paiement
export const validerPaiementStore = async (idDossier: number, reference: string) => {
  const index = listeCandidats.findIndex(c => c.id === idDossier);
  if (index !== -1) {
    listeCandidats[index].referencePaiement = reference;
    listeCandidats[index].statut = "Paiement à vérifier"; // L'étudiant attend l'admin
    await sauvegarderTout();
    return true;
  }
  return false;
};

// ÉTAPE 2 : L'admin confirme le paiement et génère la convocation
export const confirmerPaiementFinal = async (idDossier: number) => {
  const index = listeCandidats.findIndex(c => c.id === idDossier);
  if (index !== -1) {
    const randomSalle = Math.floor(Math.random() * 15) + 1; 
    const randomPlace = Math.floor(Math.random() * 50) + 1;

    listeCandidats[index].paye = true;
    listeCandidats[index].statut = "Inscrit Définitif";
    listeCandidats[index].numInscription = `ENI-2026-${idDossier.toString().slice(-4)}`;
    listeCandidats[index].salle = `Bâtiment C - Salle ${randomSalle}`;
    listeCandidats[index].place = randomPlace;

    await sauvegarderTout();
    return true;
  }
  return false;
};

export const modifierProfilUser = async (username: string, telephone: string, adresse: string) => {
  const index = users.findIndex(u => u.username === username);
  if (index !== -1) {
    users[index].telephone = telephone;
    users[index].adresse = adresse;
    await sauvegarderTout();
    return true;
  }
  return false;
};

export const mettreAJourStatut = async (id: number, nouveauStatut: string) => {
  listeCandidats = listeCandidats.map(c => c.id === id ? { ...c, statut: nouveauStatut } : c);
  await sauvegarderTout();
};

// --- SYSTÈME DE NOTIFICATIONS ---
export const getNotifications = (mesInscriptions: Candidat[]): Notification[] => {
  let notes: Notification[] = [
    { id: 1, titre: "Bienvenue", message: "Compte créé avec succès.", date: "Système", type: 'info' }
  ];

  mesInscriptions.forEach((doc) => {
    if (doc.statut === "Validé") {
      notes.push({
        id: doc.id + 100,
        titre: `Dossier Validé : ${doc.filiere}`,
        message: `Dossier conforme. Vous pouvez maintenant payer les frais.`,
        date: "Admin",
        type: 'success'
      });
    } else if (doc.statut === "Paiement à vérifier") {
      notes.push({
        id: doc.id + 150,
        titre: `Paiement en cours : ${doc.filiere}`,
        message: `Votre référence ${doc.referencePaiement} est en cours de vérification.`,
        date: "Attente",
        type: 'info'
      });
    } else if (doc.statut === "Inscrit Définitif") {
      notes.push({
        id: doc.id + 200,
        titre: `Convocation disponible : ${doc.filiere}`,
        message: `Paiement validé ! Téléchargez votre convocation (N° ${doc.numInscription}).`,
        date: "Terminé",
        type: 'success'
      });
    } else if (doc.statut === "Refusé") {
      notes.push({
        id: doc.id + 300,
        titre: `Dossier Refusé : ${doc.filiere}`,
        message: `Dossier rejeté. Veuillez contacter l'établissement.`,
        date: "Admin",
        type: 'error'
      });
    }
  });

  return notes.reverse();
};