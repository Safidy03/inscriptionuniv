import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PolicySection {
  id: string;
  title: string;
  icon: any;
  content: string[];
}

export default function PrivacyPolicy() {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);

  const policyData: PolicySection[] = [
    {
      id: "1",
      title: "1. Introduction",
      icon: "document-text-outline",
      content: [
        "La présente Politique de confidentialité explique comment l'application ENI-UF collecte, utilise et protège vos données personnelles.",
        "En utilisant l'Application, vous acceptez les pratiques décrites dans cette Politique.",
      ],
    },
    {
      id: "2",
      title: "2. Responsable du traitement",
      icon: "business-outline",
      content: [
        "Le responsable du traitement des données est l'École Nationale d’Informatique (ENI).",
        "Adresse : Cité Universitaire, Fianarantsoa, Madagascar.",
        "Email : legal@eni.mg",
        "Téléphone : +261 34 00 000 00",
      ],
    },
    {
      id: "3",
      title: "3. Données collectées",
      icon: "folder-outline",
      content: [
        "Nom et prénom",
        "Numéro de baccalauréat",
        "Adresse email",
        "Numéro de téléphone",
        "Informations liées à l’inscription aux concours",
        "Données de connexion (mot de passe chiffré)",
      ],
    },
    {
      id: "4",
      title: "4. Utilisation des données",
      icon: "settings-outline",
      content: [
        "Gestion des inscriptions aux concours",
        "Accès sécurisé au compte utilisateur",
        "Communication des résultats",
        "Amélioration des services de l’Application",
      ],
    },
    {
      id: "5",
      title: "5. Partage des données",
      icon: "share-social-outline",
      content: [
        "Les données sont accessibles uniquement aux services autorisés de l’ENI.",
        "Aucune donnée personnelle n’est vendue ou louée à des tiers.",
        "Les données peuvent être communiquées uniquement en cas d’obligation légale.",
      ],
    },
    {
      id: "6",
      title: "6. Sécurité des données",
      icon: "lock-closed-outline",
      content: [
        "Chiffrement des mots de passe",
        "Accès restreint aux bases de données",
        "Mesures de protection contre les accès non autorisés",
      ],
    },
    {
      id: "7",
      title: "7. Conservation des données",
      icon: "time-outline",
      content: [
        "Les données sont conservées pendant la durée nécessaire à la gestion des inscriptions.",
        "Elles peuvent être supprimées sur demande légitime de l’utilisateur.",
      ],
    },
    {
      id: "8",
      title: "8. Droits des utilisateurs",
      icon: "person-outline",
      content: [
        "Droit d’accès à vos données",
        "Droit de rectification",
        "Droit de suppression",
        "Droit d’opposition au traitement",
      ],
    },
    {
      id: "9",
      title: "9. Modification de la politique",
      icon: "refresh-outline",
      content: [
        "La présente Politique peut être modifiée à tout moment.",
        "Les utilisateurs seront informés via l’Application.",
      ],
    },
    {
      id: "10",
      title: "10. Contact",
      icon: "mail-outline",
      content: [
        "Email : legal@eni.mg",
        "Téléphone : +261 34 00 000 00",
        "Adresse : ENI, Fianarantsoa, Madagascar",
      ],
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const expandAll = () => {
    setExpandedSections(policyData.map((section) => section.id));
  };

  const collapseAll = () => {
    setExpandedSections([]);
  };

  const SectionComponent = ({ section }: { section: PolicySection }) => {
    const isExpanded = expandedSections.includes(section.id);

    return (
      <View style={styles.sectionCard}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.id)}
        >
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIcon}>
              <Ionicons name={section.icon} size={22} color="#003366" />
            </View>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="#7f8c8d"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.sectionContent}>
            {section.content.map((text, index) => (
              <View key={index} style={styles.paragraphRow}>
                <View style={styles.bullet} />
                <Text style={styles.paragraphText}>{text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Politique de confidentialité</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Ionicons name="shield-checkmark" size={40} color="#003366" />
          </View>
          <Text style={styles.heroTitle}>Politique de confidentialité</Text>
          <Text style={styles.heroSubtitle}>
            Dernière mise à jour : 1er février 2026
          </Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroDescription}>
            Votre vie privée est importante pour nous. Cette politique explique
            comment vos données sont protégées.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={expandAll}>
            <Ionicons name="expand-outline" size={18} color="#003366" />
            <Text style={styles.actionButtonText}>Tout développer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={collapseAll}>
            <Ionicons name="contract-outline" size={18} color="#003366" />
            <Text style={styles.actionButtonText}>Tout réduire</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          {policyData.map((section) => (
            <SectionComponent key={section.id} section={section} />
          ))}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
  },
  header: {
    backgroundColor: "#003366",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#95a5a6",
    marginBottom: 20,
  },
  heroDivider: {
    width: 60,
    height: 3,
    backgroundColor: "#003366",
    borderRadius: 2,
    marginBottom: 20,
  },
  heroDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 22,
  },

  // Quick Actions
  quickActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#003366",
  },

  // Sections
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionsContainer: {
    gap: 12,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e8f4f8",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2c3e50",
    flex: 1,
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  paragraphRow: {
    flexDirection: "row",
    marginBottom: 12,
    paddingLeft: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#003366",
    marginTop: 7,
    marginRight: 12,
  },
  paragraphText: {
    flex: 1,
    fontSize: 14,
    color: "#5a6c7d",
    lineHeight: 22,
  },

  // Summary Card
  summaryCard: {
    backgroundColor: "#e8f4f8",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#d4e9f7",
  },
  summaryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
  },
  summaryPoints: {
    width: "100%",
    gap: 12,
  },
  summaryPoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  summaryPointText: {
    flex: 1,
    fontSize: 14,
    color: "#2c3e50",
    fontWeight: "500",
  },

  // Contact Card
  contactCard: {
    backgroundColor: "#fff7e6",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#f39c12",
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 10,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
    lineHeight: 20,
  },

  bottomSpacer: {
    height: 100,
  },

  // Bottom Buttons
  bottomButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  declineButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: "#e74c3c",
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  acceptButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
