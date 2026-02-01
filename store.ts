import AsyncStorage from "@react-native-async-storage/async-storage";

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
  role: "student" | "admin";
  email?: string;
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
  type: "info" | "success" | "error";
}

// --- DONNÉES INITIALES ---
export let users: User[] = [
  {
    username: "kix",
    password: "123",
    role: "admin",
    email: "kix@eni.com",
    telephone: "0341234567",
    adresse: "Antananarivo",
  },
];

export let listeBacheliersRef: BachelierRef[] = [
  { numBacc: "123456", nom: "RAZAFY Jean", serie: "S" },
  { numBacc: "654321", nom: "SOA Maria", serie: "L" },
  { numBacc: "000000", nom: "Etudiant Test", serie: "OSE" },
];

export let listeConcours: Concours[] = [
  {
    id: 1,
    titre: "Génie Logiciel",
    description: "Développement et Base de données",
    dateLimite: "15/03/2026",
  },
  {
    id: 2,
    titre: "Systèmes & Réseaux",
    description: "Administration et Sécurité",
    dateLimite: "20/03/2026",
  },
];

export let listeCandidats: Candidat[] = [];

// --- LOGIQUE DE PERSISTANCE ---
export const sauvegarderTout = async () => {
  try {
    const data = {
      c: listeCandidats,
      con: listeConcours,
      u: users,
      ref: listeBacheliersRef,
    };
    await AsyncStorage.setItem("@storage_Key", JSON.stringify(data));
  } catch (e) {
    console.log("Erreur sauvegarde local");
  }
};

export const chargerTout = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@storage_Key");
    if (jsonValue != null) {
      const data = JSON.parse(jsonValue);
      listeCandidats = data.c || [];
      listeConcours = data.con || [];

      // On garde les anciens users mais on complète les champs manquants si besoin
      users = (data.u || users).map((user: { email: any }) => ({
        ...user,
        email: user.email || "", // ← au moins une chaîne vide
      }));

      listeBacheliersRef = data.ref || listeBacheliersRef;
    }
  } catch (e) {
    console.log("Erreur chargement local");
  }
};

// --- FONCTIONS ACTIONS ---

export const registerUser = async (
  username: string,
  password: string,
  numBacc: string,
  telephone: string,
  adresse: string,
  email: string,
) => {
  const exists = users.find((u) => u.username === username);
  if (exists) return { success: false, msg: "Pseudo déjà utilisé." };
  users.push({
    username,
    password,
    email,
    role: "student",
    numBacc,
    telephone,
    adresse,
  });
  await sauvegarderTout();
  return { success: true, msg: "Compte créé !" };
};

export const inscrireAuConcours = async (
  numBacc: string,
  nom: string,
  serie: string,
  filiere: string,
) => {
  const indexExistant = listeCandidats.findIndex(
    (c) => c.numBacc === numBacc && c.filiere === filiere,
  );

  if (indexExistant !== -1) {
    const dossier = listeCandidats[indexExistant];
    if (
      [
        "Validé",
        "Inscrit Définitif",
        "En attente",
        "Paiement à vérifier",
      ].includes(dossier.statut)
    ) {
      return {
        success: false,
        msg: "Une inscription est déjà en cours ou validée.",
      };
    }

    if (dossier.statut === "Refusé") {
      listeCandidats[indexExistant] = {
        ...dossier,
        statut: "En attente",
        paye: false,
        id: Date.now(),
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
    paye: false,
  };

  listeCandidats.push(nouveauCandidat);
  await sauvegarderTout();
  return { success: true, msg: `Inscription en ${filiere} réussie !` };
};

// ÉTAPE 1 : L'étudiant soumet son paiement
export const validerPaiementStore = async (
  idDossier: number,
  reference: string,
) => {
  const index = listeCandidats.findIndex((c) => c.id === idDossier);
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
  const index = listeCandidats.findIndex((c) => c.id === idDossier);
  if (index !== -1) {
    const randomSalle = Math.floor(Math.random() * 15) + 1;
    const randomPlace = Math.floor(Math.random() * 50) + 1;

    listeCandidats[index].paye = true;
    listeCandidats[index].statut = "Inscrit Définitif";
    listeCandidats[index].numInscription =
      `ENI-2026-${idDossier.toString().slice(-4)}`;
    listeCandidats[index].salle = `Bâtiment C - Salle ${randomSalle}`;
    listeCandidats[index].place = randomPlace;

    await sauvegarderTout();
    return true;
  }
  return false;
};

// Fonction mise à jour
export const modifierProfilUser = async (
  username: string,
  telephone: string,
  adresse: string,
  email: string,
  nouveauPseudo?: string, // ← AJOUTE CE PARAMÈTRE OPTIONNEL
) => {
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) {
    users[index].telephone = telephone;
    users[index].adresse = adresse;
    users[index].email = email;

    // Si on change le pseudo, on le met à jour
    if (nouveauPseudo && nouveauPseudo !== username) {
      // Vérifier que le nouveau pseudo n'existe pas déjà
      const existeDeja = users.some((u) => u.username === nouveauPseudo);
      if (existeDeja) {
        return { success: false, msg: "Ce pseudo est déjà utilisé" };
      }
      users[index].username = nouveauPseudo;
    }

    await sauvegarderTout();
    return {
      success: true,
      msg: "Profil mis à jour avec succès",
      nouveauUsername: nouveauPseudo || username,
    };
  }
  return { success: false, msg: "Utilisateur non trouvé" };
};
export const mettreAJourStatut = async (id: number, nouveauStatut: string) => {
  listeCandidats = listeCandidats.map((c) =>
    c.id === id ? { ...c, statut: nouveauStatut } : c,
  );
  await sauvegarderTout();
};

export const changerMotDePasse = async (
  username: string,
  ancienPassword: string,
  nouveauPassword: string,
): Promise<{ success: boolean; msg: string }> => {
  // Charger les données d'abord pour avoir la liste à jour
  await chargerTout();

  console.log("Recherche utilisateur:", username);
  console.log("Liste users:", users);

  const user = users.find((u) => u.username === username);

  if (!user) {
    return { success: false, msg: "Utilisateur non trouvé." };
  }

  // Vérification de l'ancien mot de passe
  if (user.password !== ancienPassword) {
    return { success: false, msg: "L'ancien mot de passe est incorrect." };
  }

  // Vérifier que le nouveau mot de passe est différent
  if (ancienPassword === nouveauPassword) {
    return {
      success: false,
      msg: "Le nouveau mot de passe doit être différent de l'ancien.",
    };
  }

  // Mettre à jour le mot de passe
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) {
    users[index].password = nouveauPassword;
    await sauvegarderTout();
    return { success: true, msg: "Mot de passe modifié avec succès !" };
  }

  return { success: false, msg: "Erreur lors de la modification." };
};

// --- SYSTÈME DE NOTIFICATIONS ---
export const getNotifications = (
  mesInscriptions: Candidat[],
): Notification[] => {
  let notes: Notification[] = [
    {
      id: 1,
      titre: "Bienvenue",
      message: "Compte créé avec succès.",
      date: "Système",
      type: "info",
    },
  ];

  mesInscriptions.forEach((doc) => {
    if (doc.statut === "Validé") {
      notes.push({
        id: doc.id + 100,
        titre: `Dossier Validé : ${doc.filiere}`,
        message: `Dossier conforme. Vous pouvez maintenant payer les frais.`,
        date: "Admin",
        type: "success",
      });
    } else if (doc.statut === "Paiement à vérifier") {
      notes.push({
        id: doc.id + 150,
        titre: `Paiement en cours : ${doc.filiere}`,
        message: `Votre référence ${doc.referencePaiement} est en cours de vérification.`,
        date: "Attente",
        type: "info",
      });
    } else if (doc.statut === "Inscrit Définitif") {
      notes.push({
        id: doc.id + 200,
        titre: `Convocation disponible : ${doc.filiere}`,
        message: `Paiement validé ! Téléchargez votre convocation (N° ${doc.numInscription}).`,
        date: "Terminé",
        type: "success",
      });
    } else if (doc.statut === "Refusé") {
      notes.push({
        id: doc.id + 300,
        titre: `Dossier Refusé : ${doc.filiere}`,
        message: `Dossier rejeté. Veuillez contacter l'établissement.`,
        date: "Admin",
        type: "error",
      });
    }
  });

  return notes.reverse();
};

export const demanderResetPasswordParEmail = async (
  email: string,
): Promise<{
  success: boolean;
  msg: string;
  username?: string;
  code?: string;
  // on garde le code dans la réponse (pour l'afficher à l'utilisateur)
}> => {
  await chargerTout();
  const user = users.find((u) => u.email === email);

  if (!user) {
    return { success: false, msg: "Aucun compte associé à cet email." };
  }

  const code = genererCodeReset();
  const expiration = Date.now() + 15 * 60 * 1000;

  codesReset[user.username] = { code, expiration };

  return {
    success: true,
    msg: "Code généré avec succès",
    username: user.username,
    code, // ← on retourne toujours le code
  };
};

export const genererCodeReset = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

let codesReset: { [username: string]: { code: string; expiration: number } } =
  {};

export const resetPasswordAvecCode = async (
  username: string,
  code: string,
  nouveauPassword: string,
): Promise<{ success: boolean; msg: string }> => {
  await chargerTout();

  const resetData = codesReset[username];

  if (!resetData) {
    return {
      success: false,
      msg: "Aucune demande de réinitialisation trouvée.",
    };
  }

  if (Date.now() > resetData.expiration) {
    delete codesReset[username];
    return {
      success: false,
      msg: "Le code a expiré. Veuillez en demander un nouveau.",
    };
  }

  if (resetData.code !== code) {
    return { success: false, msg: "Code incorrect." };
  }

  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) {
    users[index].password = nouveauPassword;
    await sauvegarderTout();
    delete codesReset[username];
    return { success: true, msg: "Mot de passe réinitialisé avec succès !" };
  }

  return { success: false, msg: "Erreur lors de la réinitialisation." };
};
