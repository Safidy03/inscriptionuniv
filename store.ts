import AsyncStorage from '@react-native-async-storage/async-storage';

// --- INTERFACES ---
export interface Candidat {
  id: number;
  nom: string;
  serie: string;
  numBacc: string;
  statut: string;
  filiere?: string;
  concoursChoisi?: string;
  paye: boolean;             // Obligatoire
  referencePaiement?: string; 
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
    const data = {
      c: listeCandidats,
      con: listeConcours,
      u: users,
      ref: listeBacheliersRef
    };
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

export const importerBacheliers = async (nouveaux: BachelierRef[]) => {
  listeBacheliersRef = [...listeBacheliersRef, ...nouveaux];
  await sauvegarderTout();
};

export const registerUser = async (username: string, password: string, numBacc: string, telephone: string, adresse: string) => {
  const exists = users.find(u => u.username === username);
  if (exists) return { success: false, msg: "Ce nom d'utilisateur est déjà utilisé." };

  const bachelierValide = listeBacheliersRef.find(b => b.numBacc === numBacc);
  if (!bachelierValide) return { success: false, msg: "Numéro de Bacc non reconnu." };

  const baccDejaUtilise = users.find(u => u.numBacc === numBacc);
  if (baccDejaUtilise) return { success: false, msg: "Un compte existe déjà pour ce Bacc." };

  users.push({ username, password, role: 'student', numBacc, telephone, adresse });
  await sauvegarderTout();
  return { success: true, msg: "Compte créé !" };
};

export const inscrireAuConcours = async (numBacc: string, nom: string, serie: string, filiere: string) => {
  const nouveauCandidat: Candidat = {
    id: Date.now(),
    nom: nom,
    serie: serie,
    numBacc: numBacc,
    filiere: filiere,
    statut: "En attente",
    paye: false // Ajouté pour corriger l'erreur de l'interface
  };
  
  listeCandidats.push(nouveauCandidat);
  await sauvegarderTout();
  return { success: true, msg: "Inscription réussie !" };
};

export const validerPaiementStore = async (numBacc: string, reference: string) => {
  const index = listeCandidats.findIndex(c => c.numBacc === numBacc);
  if (index !== -1) {
    listeCandidats[index].paye = true;
    listeCandidats[index].referencePaiement = reference;
    listeCandidats[index].statut = "Inscrit Définitif";
    await sauvegarderTout();
    return true;
  }
  return false;
};

export const mettreAJourStatut = async (id: number, nouveauStatut: string) => {
  listeCandidats = listeCandidats.map(c => c.id === id ? { ...c, statut: nouveauStatut } : c);
  await sauvegarderTout();
};

export const ajouterConcours = async (nouveau: Omit<Concours, 'id'>) => {
  const concoursComplet: Concours = { ...nouveau, id: Date.now() };
  listeConcours.push(concoursComplet);
  await sauvegarderTout();
};

export const supprimerConcours = async (id: number) => {
  listeConcours = listeConcours.filter(c => c.id !== id);
  await sauvegarderTout();
};

export const getNotifications = (statut: string): Notification[] => {
  const notes: Notification[] = [
    { id: 1, titre: "Bienvenue", message: "Merci d'avoir créé votre compte sur InscriptionUniv.", date: "Il y a 2h", type: 'info' }
  ];

  if (statut === "En attente") {
    notes.push({ id: 2, titre: "Dossier reçu", message: "Votre inscription au concours est en cours de traitement.", date: "Il y a 1h", type: 'info' });
  } else if (statut === "Validé") {
    notes.push({ id: 3, titre: "Félicitations !", message: "Votre dossier a été validé. Vous pouvez payer les frais.", date: "À l'instant", type: 'success' });
  } else if (statut === "Refusé") {
    notes.push({ id: 4, titre: "Dossier Incomplet", message: "Votre dossier a été rejeté. Veuillez vérifier vos pièces.", date: "À l'instant", type: 'error' });
  } else if (statut === "Inscrit Définitif") {
    notes.push({ id: 5, titre: "Paiement Validé", message: "Vous êtes officiellement inscrit au concours.", date: "À l'instant", type: 'success' });
  }

  return notes.reverse();
};