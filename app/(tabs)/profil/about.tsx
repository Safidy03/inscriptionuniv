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

interface AboutSection {
  id: string;
  title: string;
  icon: any;
  content: string[];
}

export default function AboutApp() {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);

  const aboutData: AboutSection[] = [
    {
      id: "1",
      title: "1. Présentation de l'application",
      icon: "information-circle-outline",
      content: [
        "ENI-UF est une application mobile officielle de l’École Nationale d’Informatique.",
        "Elle permet de gérer les inscriptions aux concours et d’accéder aux informations académiques.",
        "L’application vise à simplifier et sécuriser les démarches des candidats.",
      ],
    },
    {
      id: "2",
      title: "2. Objectifs",
      icon: "flag-outline",
      content: [
        "Faciliter l’inscription aux concours de l’ENI.",
        "Réduire les démarches administratives manuelles.",
        "Garantir un accès rapide et sécurisé aux résultats.",
        "Améliorer la communication entre l’ENI et les candidats.",
      ],
    },
    {
      id: "3",
      title: "3. Fonctionnalités principales",
      icon: "apps-outline",
      content: [
        "Création et gestion de compte utilisateur.",
        "Inscription en ligne aux concours.",
        "Consultation des résultats.",
        "Accès aux informations académiques.",
        "Notifications importantes.",
      ],
    },
    {
      id: "4",
      title: "4. Public concerné",
      icon: "people-outline",
      content: [
        "Candidats aux concours d’entrée à l’ENI.",
        "Étudiants de l’École Nationale d’Informatique.",
        "Personnel administratif autorisé.",
      ],
    },
    {
      id: "5",
      title: "5. Technologies utilisées",
      icon: "hardware-chip-outline",
      content: [
        "Application mobile développée avec React Native et Expo.",
        "Backend sécurisé avec une base de données fiable.",
        "Architecture moderne orientée performance et sécurité.",
      ],
    },
    {
      id: "6",
      title: "6. Établissement",
      icon: "school-outline",
      content: [
        "École Nationale d’Informatique (ENI).",
        "Située à Fianarantsoa, Madagascar.",
        "Institution publique spécialisée dans l’enseignement de l’informatique.",
      ],
    },
    {
      id: "7",
      title: "7. Contact",
      icon: "mail-outline",
      content: [
        "Email : legal@eni.mg",
        "Téléphone : +261 34 00 000 00",
        "Adresse : Cité Universitaire, Fianarantsoa, Madagascar",
      ],
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const SectionComponent = ({ section }: { section: AboutSection }) => {
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
        <Text style={styles.headerTitle}>À propos</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Ionicons name="school" size={40} color="#003366" />
          </View>
          <Text style={styles.heroTitle}>ENI-UF</Text>
          <Text style={styles.heroSubtitle}>
            Application officielle de l’ENI
          </Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroDescription}>
            Une application mobile conçue pour moderniser et sécuriser les
            inscriptions et l’accès aux informations académiques.
          </Text>
        </View>

        {/* Sections */}
        <View style={styles.section}>
          {aboutData.map((section) => (
            <SectionComponent key={section.id} section={section} />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Version 1.0.0</Text>
          <Text>© 2026 École Nationale d’Informatique</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    marginLeft: 30,
  },
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
    marginBottom: 10,
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
