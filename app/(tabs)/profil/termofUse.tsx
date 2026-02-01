import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface TermSection {
  id: string;
  title: string;
  icon: any;
  content: string[];
}

export default function TermsOfUse() {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"]);
  const [hasAccepted, setHasAccepted] = useState(false);

  const termsData: TermSection[] = [
    {
      id: "1",
      title: "1. Acceptation des conditions",
      icon: "checkmark-circle-outline",
      content: [
        "En accédant et en utilisant l'application ENI-UF (ci-après \"l'Application\"), vous acceptez d'être lié par les présentes conditions d'utilisation.",
        "Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'Application.",
        "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur dès leur publication.",
        "Votre utilisation continue de l'Application après la publication des modifications constitue votre acceptation de ces modifications.",
      ],
    },
    {
      id: "2",
      title: "2. Description du service",
      icon: "apps-outline",
      content: [
        "L'Application fournit une plateforme pour la gestion des inscriptions aux concours de l'École Nationale d'Informatique de Fianarantsoa.",
        "Les services incluent : consultation des résultats, inscription aux concours, gestion du profil étudiant, et accès aux informations académiques.",
        "Nous nous efforçons de maintenir l'Application disponible 24h/24 et 7j/7, mais ne garantissons pas une disponibilité ininterrompue.",
        "L'Application peut être modifiée, suspendue ou interrompue à tout moment sans préavis.",
      ],
    },
    {
      id: "3",
      title: "3. Création et sécurité du compte",
      icon: "person-circle-outline",
      content: [
        "Vous devez créer un compte pour utiliser certaines fonctionnalités de l'Application.",
        "Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion.",
        "Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte.",
        "Vous êtes entièrement responsable de toutes les activités effectuées sous votre compte.",
        "Vous devez fournir des informations exactes, complètes et à jour lors de l'inscription.",
        "Vous ne devez pas créer de compte en utilisant de fausses informations ou au nom d'une autre personne.",
      ],
    },
    {
      id: "4",
      title: "4. Utilisation acceptable",
      icon: "shield-checkmark-outline",
      content: [
        "Vous acceptez d'utiliser l'Application uniquement à des fins légales et conformément aux présentes conditions.",
        "Il est interdit de : utiliser l'Application d'une manière qui pourrait endommager, désactiver ou surcharger nos serveurs.",
        "Tenter d'accéder de manière non autorisée à l'Application, aux comptes d'autres utilisateurs ou aux systèmes informatiques.",
        "Utiliser des robots, des araignées ou d'autres dispositifs automatisés pour accéder à l'Application.",
        "Collecter ou stocker des données personnelles d'autres utilisateurs sans leur consentement.",
        "Publier ou transmettre du contenu illégal, nuisible, menaçant, abusif, harcelant ou diffamatoire.",
      ],
    },
    {
      id: "5",
      title: "5. Propriété intellectuelle",
      icon: "shield-outline",
      content: [
        "Tout le contenu de l'Application, y compris mais sans s'y limiter, les textes, graphiques, logos, icônes, images, clips audio et logiciels, est la propriété de l'ENI ou de ses fournisseurs de contenu.",
        "Ce contenu est protégé par les lois malgaches et internationales sur le droit d'auteur.",
        "Vous ne pouvez pas reproduire, distribuer, modifier, créer des œuvres dérivées, afficher publiquement ou exploiter de quelque manière que ce soit le contenu sans notre autorisation écrite préalable.",
        "Le logo ENI et les autres marques sont des marques de commerce de l'École Nationale d'Informatique.",
      ],
    },
    {
      id: "6",
      title: "6. Protection des données personnelles",
      icon: "lock-closed-outline",
      content: [
        "Nous collectons et traitons vos données personnelles conformément à notre Politique de confidentialité.",
        "Les données collectées incluent : nom, prénom, numéro de baccalauréat, adresse email, numéro de téléphone.",
        "Vos données sont utilisées uniquement pour la gestion des inscriptions et la communication des résultats.",
        "Nous ne vendons ni ne louons vos informations personnelles à des tiers.",
        "Vous avez le droit d'accéder, de rectifier et de supprimer vos données personnelles.",
        "Les données sont stockées de manière sécurisée et conservées pendant la durée nécessaire aux fins pour lesquelles elles ont été collectées.",
      ],
    },
    {
      id: "7",
      title: "7. Limitation de responsabilité",
      icon: "alert-circle-outline",
      content: [
        "L'Application est fournie \"en l'état\" sans garantie d'aucune sorte, expresse ou implicite.",
        "Nous ne garantissons pas que l'Application sera exempte d'erreurs ou que les défauts seront corrigés.",
        "Nous ne sommes pas responsables des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser l'Application.",
        "En aucun cas notre responsabilité ne dépassera le montant que vous avez payé, le cas échéant, pour accéder à l'Application.",
        "Certaines juridictions ne permettent pas l'exclusion de certaines garanties, donc certaines des exclusions ci-dessus peuvent ne pas s'appliquer à vous.",
      ],
    },
    {
      id: "8",
      title: "8. Résiliation",
      icon: "close-circle-outline",
      content: [
        "Nous nous réservons le droit de suspendre ou de résilier votre accès à l'Application à tout moment, sans préavis ni responsabilité, pour quelque raison que ce soit.",
        "Motifs de résiliation : violation des présentes conditions, comportement frauduleux ou trompeur, activités illégales.",
        "En cas de résiliation, votre droit d'utiliser l'Application cessera immédiatement.",
        "Toutes les dispositions des présentes conditions qui, de par leur nature, devraient survivre à la résiliation, survivront à la résiliation.",
      ],
    },
    {
      id: "9",
      title: "9. Modifications de l'application",
      icon: "construct-outline",
      content: [
        "Nous nous réservons le droit de modifier ou d'interrompre l'Application ou tout service à tout moment, temporairement ou définitivement, avec ou sans préavis.",
        "Nous ne serons pas responsables envers vous ou envers un tiers pour toute modification, suspension ou interruption de l'Application.",
        "Il est de votre responsabilité de consulter régulièrement les présentes conditions pour prendre connaissance des éventuelles modifications.",
      ],
    },
    {
      id: "10",
      title: "10. Loi applicable et juridiction",
      icon: "globe-outline",
      content: [
        "Les présentes conditions sont régies et interprétées conformément aux lois de la République de Madagascar.",
        "Tout litige découlant des présentes conditions sera soumis à la juridiction exclusive des tribunaux de Fianarantsoa, Madagascar.",
        "Si une disposition des présentes conditions est jugée invalide ou inapplicable, cette disposition sera limitée ou éliminée dans la mesure minimale nécessaire.",
        "Les présentes conditions constituent l'intégralité de l'accord entre vous et l'ENI concernant l'utilisation de l'Application.",
      ],
    },
    {
      id: "11",
      title: "11. Contact",
      icon: "mail-outline",
      content: [
        "Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à :",
        "Email : legal@eni.mg",
        "Téléphone : +261 34 00 000 00",
        "Adresse : École Nationale d'Informatique, Cité Universitaire, Fianarantsoa, Madagascar",
        "Nous nous engageons à répondre à vos demandes dans un délai de 5 jours ouvrables.",
      ],
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const expandAll = () => {
    setExpandedSections(termsData.map((section) => section.id));
  };

  const collapseAll = () => {
    setExpandedSections([]);
  };

  const handleAccept = () => {
    setHasAccepted(true);
    Alert.alert(
      "Conditions acceptées",
      "Vous avez accepté les conditions d'utilisation de l'application.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ],
    );
  };

  const handleDecline = () => {
    Alert.alert(
      "Conditions refusées",
      "Vous devez accepter les conditions d'utilisation pour continuer à utiliser l'application.",
      [
        { text: "Revoir les conditions", style: "cancel" },
        {
          text: "Quitter",
          style: "destructive",
          onPress: () => router.back(),
        },
      ],
    );
  };

  const TermSectionComponent = ({ section }: { section: TermSection }) => {
    const isExpanded = expandedSections.includes(section.id);

    return (
      <View style={styles.sectionCard}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.id)}
          activeOpacity={0.7}
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
            {section.content.map((paragraph, index) => (
              <View key={index} style={styles.paragraphRow}>
                <View style={styles.bullet} />
                <Text style={styles.paragraphText}>{paragraph}</Text>
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
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conditions d'utilisation</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Ionicons name="document-text" size={40} color="#003366" />
          </View>
          <Text style={styles.heroTitle}>Conditions d'utilisation</Text>
          <Text style={styles.heroSubtitle}>
            Dernière mise à jour : 1er février 2026
          </Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroDescription}>
            Veuillez lire attentivement ces conditions d'utilisation avant
            d'utiliser l'application ENI-UF. En utilisant cette application,
            vous acceptez d'être lié par ces conditions.
          </Text>
        </View>

        {/* Quick Actions */}
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

        {/* Terms Sections */}
        <View style={styles.section}>
          <View style={styles.sectionsContainer}>
            {termsData.map((section) => (
              <TermSectionComponent key={section.id} section={section} />
            ))}
          </View>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="information-circle" size={32} color="#003366" />
          </View>
          <Text style={styles.summaryTitle}>En résumé</Text>
          <View style={styles.summaryPoints}>
            <View style={styles.summaryPoint}>
              <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
              <Text style={styles.summaryPointText}>
                Utilisez l'application de manière responsable
              </Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
              <Text style={styles.summaryPointText}>
                Protégez vos informations de connexion
              </Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
              <Text style={styles.summaryPointText}>
                Respectez la propriété intellectuelle
              </Text>
            </View>
            <View style={styles.summaryPoint}>
              <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
              <Text style={styles.summaryPointText}>
                Vos données sont protégées et sécurisées
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactCard}>
          <Ionicons name="help-circle-outline" size={24} color="#003366" />
          <Text style={styles.contactTitle}>Des questions ?</Text>
          <Text style={styles.contactText}>
            Si vous avez des questions concernant ces conditions, contactez-nous
            à legal@eni.mg
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Accept/Decline Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
          <Ionicons name="close-circle-outline" size={22} color="#e74c3c" />
          <Text style={styles.declineButtonText}>Refuser</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Ionicons name="checkmark-circle" size={22} color="#fff" />
          <Text style={styles.acceptButtonText}>Accepter</Text>
        </TouchableOpacity>
      </View>
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
