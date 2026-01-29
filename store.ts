// Dans store.ts (à la racine)

export interface Candidat {
    id: number;
    nom: string;
    serie: string;
    numBacc: string;
    statut: string;
    concoursChoisi: string; // Cette ligne est OBLIGATOIRE
  }
  
  export let listeCandidats: Candidat[] = [];
  
  // Vérifie bien que tu as ces 4 arguments ici :
  export const ajouterCandidat = (nom: string, serie: string, numBacc: string, concours: string) => {
    const nouveau: Candidat = {
      id: Date.now(),
      nom,
      serie,
      numBacc,
      statut: "En attente",
      concoursChoisi: concours
    };
    listeCandidats.push(nouveau);
  };
  
  export const mettreAJourStatut = (id: number, nouveauStatut: string) => {
    listeCandidats = listeCandidats.map(c => 
      c.id === id ? { ...c, statut: nouveauStatut } : c
    );
  };
  // 1. Définir la structure d'un Concours
export interface Concours {
    id: number;
    titre: string;
    description: string;
    dateLimite: string;
  }
  
  // 2. Créer la liste des concours (avec quelques exemples par défaut)
  export let listeConcours: Concours[] = [
    { id: 1, titre: "Médecine", description: "Concours d'entrée en 1ère année", dateLimite: "15/03/2026" },
    { id: 2, titre: "Polytechnique", description: "Ingénierie et Technologies", dateLimite: "20/03/2026" }
  ];
  
  // 3. Fonction pour que l'admin ajoute un concours
  export const ajouterConcours = (nouveau: Omit<Concours, 'id'>) => {
    const concoursComplet: Concours = {
      ...nouveau,
      id: Date.now(),
    };
    listeConcours.push(concoursComplet);
  };
  // Fonction pour supprimer un concours par son ID
export const supprimerConcours = (id: number) => {
    const index = listeConcours.findIndex(c => c.id === id);
    if (index !== -1) {
      listeConcours.splice(index, 1);
    }
  };
  // 1. Structure d'un compte utilisateur
export interface User {
    username: string;
    password: string;
    role: 'student' | 'admin';
  }
  
  // 2. Liste des utilisateurs (on garde l'admin par défaut)
  export let users: User[] = [
    { username: 'kix', password: '123', role: 'admin' }
  ];
  
  // 3. Fonction pour créer un compte étudiant
  export const registerUser = (username: string, password: string) => {
    const exists = users.find(u => u.username === username);
    if (exists) return false; // L'utilisateur existe déjà
    
    users.push({ username, password, role: 'student' });
    return true;
  };
  