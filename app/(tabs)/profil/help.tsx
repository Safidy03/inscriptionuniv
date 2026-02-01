import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Comment puis-je m'inscrire au concours ?",
    answer:
      "Pour vous inscrire au concours, connectez-vous à votre compte, accédez à la section 'Concours', sélectionnez le concours souhaité et cliquez sur 'S'inscrire'. Assurez-vous d'avoir tous les documents requis avant de commencer.",
    category: "Inscription",
  },
  {
    id: "2",
    question: "Quels documents sont nécessaires pour l'inscription ?",
    answer:
      "Les documents requis incluent : votre diplôme de baccalauréat, une pièce d'identité valide, deux photos d'identité récentes, et un certificat de scolarité. Tous les documents doivent être au format PDF ou JPEG.",
    category: "Inscription",
  },
  {
    id: "3",
    question: "Comment puis-je modifier mes informations personnelles ?",
    answer:
      "Accédez à votre profil en cliquant sur l'icône de profil, puis sur 'Informations personnelles'. Vous pouvez modifier vos informations en cliquant sur l'icône de modification à côté de chaque champ.",
    category: "Compte",
  },
  {
    id: "4",
    question: "J'ai oublié mon mot de passe, que faire ?",
    answer:
      "Sur la page de connexion, cliquez sur 'Mot de passe oublié ?'. Entrez votre adresse email et vous recevrez un lien pour réinitialiser votre mot de passe. Le lien est valable pendant 24 heures.",
    category: "Compte",
  },
  {
    id: "5",
    question: "Comment consulter mes résultats ?",
    answer:
      "Les résultats sont publiés dans la section 'Résultats' de l'application. Vous recevrez également une notification par email dès que vos résultats seront disponibles.",
    category: "Résultats",
  },
  {
    id: "6",
    question: "Quand auront lieu les épreuves du concours ?",
    answer:
      "Les dates des épreuves sont communiquées au moins 2 semaines à l'avance. Consultez régulièrement la section 'Calendrier' et vos notifications pour rester informé.",
    category: "Concours",
  },
  {
    id: "7",
    question: "Comment puis-je contacter le support technique ?",
    answer:
      "Vous pouvez contacter le support technique par email à support@eni.mg ou par téléphone au +261 34 00 000 00 du lundi au vendredi de 8h à 17h.",
    category: "Support",
  },
  {
    id: "8",
    question: "Puis-je modifier mon inscription après validation ?",
    answer:
      "Une fois votre inscription validée, vous ne pouvez plus la modifier. Contactez le service des concours à concours@eni.mg pour toute demande de modification exceptionnelle.",
    category: "Inscription",
  },
];

const categories = [
  "Tous",
  "Inscription",
  "Compte",
  "Résultats",
  "Concours",
  "Support",
];

export default function HelpCenter() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tous" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEmail = () => {
    Linking.openURL("mailto:support@eni.mg");
  };

  const handlePhone = () => {
    Linking.openURL("tel:+261340000000");
  };

  const FAQItemComponent = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.faqHeader}>
          <View style={styles.faqQuestion}>
            <Ionicons
              name="help-circle-outline"
              size={20}
              color="#003366"
              style={styles.questionIcon}
            />
            <Text style={styles.questionText}>{item.question}</Text>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#7f8c8d"
          />
        </View>
        {isExpanded && (
          <View style={styles.faqAnswer}>
            <Text style={styles.answerText}>{item.answer}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const QuickActionCard = ({
    icon,
    title,
    description,
    onPress,
    color,
  }: {
    icon: any;
    title: string;
    description: string;
    onPress: () => void;
    color: string;
  }) => (
    <TouchableOpacity style={styles.actionCard} onPress={onPress}>
      <View style={[styles.actionIconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#bdc3c7" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Centre d'aide</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Ionicons name="chatbubbles" size={40} color="#003366" />
          </View>
          <Text style={styles.heroTitle}>
            Comment pouvons-nous vous aider ?
          </Text>
          <Text style={styles.heroSubtitle}>
            Trouvez rapidement des réponses à vos questions
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#7f8c8d" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher dans l'aide..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#95a5a6"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#95a5a6" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === category &&
                      styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACTIONS RAPIDES</Text>
          <View style={styles.actionsGroup}>
            <QuickActionCard
              icon="mail-outline"
              title="Envoyer un email"
              description="support@eni.mg"
              onPress={handleEmail}
              color="#3498db"
            />
            <QuickActionCard
              icon="call-outline"
              title="Appeler le support"
              description="+261 34 00 000 00"
              onPress={handlePhone}
              color="#27ae60"
            />
            <QuickActionCard
              icon="time-outline"
              title="Horaires d'ouverture"
              description="Lun-Ven: 8h00 - 17h00"
              onPress={() => {}}
              color="#f39c12"
            />
          </View>
        </View>

        {/* FAQ List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            QUESTIONS FRÉQUENTES ({filteredFAQs.length})
          </Text>
          <View style={styles.faqList}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((item) => (
                <FAQItemComponent key={item.id} item={item} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons
                  name="search-outline"
                  size={48}
                  color="#bdc3c7"
                  style={styles.emptyIcon}
                />
                <Text style={styles.emptyTitle}>Aucun résultat trouvé</Text>
                <Text style={styles.emptyDescription}>
                  Essayez de modifier votre recherche ou contactez le support
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Still Need Help Section */}
        <View style={styles.needHelpSection}>
          <View style={styles.needHelpIcon}>
            <Ionicons name="headset-outline" size={32} color="#003366" />
          </View>
          <Text style={styles.needHelpTitle}>
            Vous ne trouvez pas ce que vous cherchez ?
          </Text>
          <Text style={styles.needHelpDescription}>
            Notre équipe de support est là pour vous aider
          </Text>
          <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
            <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contacter le support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
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
    paddingVertical: 40,
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
    marginBottom: 10,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },

  // Search Section
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
  },

  // Categories
  categoriesSection: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dfe6e9",
  },
  categoryChipActive: {
    backgroundColor: "#003366",
    borderColor: "#003366",
  },
  categoryChipText: {
    fontSize: 14,
    color: "#7f8c8d",
    fontWeight: "600",
  },
  categoryChipTextActive: {
    color: "#fff",
  },

  // Sections
  section: {
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#95a5a6",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 5,
  },

  // Quick Actions
  actionsGroup: {
    gap: 12,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: "#7f8c8d",
  },

  // FAQ List
  faqList: {
    gap: 12,
  },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  faqQuestion: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  questionIcon: {
    marginTop: 2,
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#2c3e50",
    lineHeight: 22,
  },
  faqAnswer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  answerText: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 22,
    marginBottom: 10,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#e8f4f8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: "#003366",
    fontWeight: "600",
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  emptyIcon: {
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },

  // Need Help Section
  needHelpSection: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e8f4f8",
  },
  needHelpIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#e8f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  needHelpTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  needHelpDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#003366",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 10,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  // Links Section
  linksGroup: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  linkText: {
    flex: 1,
    fontSize: 15,
    color: "#2c3e50",
    fontWeight: "500",
  },

  bottomSpacer: {
    height: 40,
  },
});
