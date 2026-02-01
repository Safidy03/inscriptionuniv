import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface RatingCategory {
  id: string;
  label: string;
  icon: any;
  rating: number;
}

export default function RateApp() {
  const router = useRouter();

  const [overallRating, setOverallRating] = useState(0);
  const [categories, setCategories] = useState<RatingCategory[]>([
    {
      id: "design",
      label: "Design & Interface",
      icon: "color-palette-outline",
      rating: 0,
    },
    {
      id: "ease",
      label: "Facilité d'utilisation",
      icon: "hand-left-outline",
      rating: 0,
    },
    {
      id: "features",
      label: "Fonctionnalités",
      icon: "layers-outline",
      rating: 0,
    },
    {
      id: "performance",
      label: "Performance",
      icon: "speedometer-outline",
      rating: 0,
    },
  ]);

  const [feedback, setFeedback] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>(
    [],
  );

  const improvements = [
    "Plus de fonctionnalités",
    "Meilleure performance",
    "Design amélioré",
    "Notifications",
    "Mode sombre",
    "Support multilingue",
    "Intégration calendrier",
    "Aide contextuelle",
  ];

  const handleCategoryRating = (categoryId: string, rating: number) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, rating } : cat)),
    );
  };

  const toggleImprovement = (improvement: string) => {
    setSelectedImprovements((prev) =>
      prev.includes(improvement)
        ? prev.filter((item) => item !== improvement)
        : [...prev, improvement],
    );
  };

  const handleSubmit = () => {
    if (overallRating === 0) {
      Alert.alert(
        "Évaluation incomplète",
        "Veuillez donner une note globale à l'application",
      );
      return;
    }

    // Here you would implement the actual submission logic
    Alert.alert(
      "Merci pour votre évaluation !",
      `Votre avis nous aide à améliorer l'application. Nous apprécions votre retour ${overallRating} étoiles.`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ],
    );
  };

  const StarRating = ({
    rating,
    onRate,
    size = 36,
    showLabel = false,
  }: {
    rating: number;
    onRate: (rating: number) => void;
    size?: number;
    showLabel?: boolean;
  }) => {
    const labels = ["Très mauvais", "Mauvais", "Moyen", "Bon", "Excellent"];

    return (
      <View style={styles.starRatingContainer}>
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => onRate(star)}
              activeOpacity={0.7}
              style={styles.starButton}
            >
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={size}
                color={star <= rating ? "#f39c12" : "#bdc3c7"}
              />
            </TouchableOpacity>
          ))}
        </View>
        {showLabel && rating > 0 && (
          <Text style={styles.ratingLabel}>{labels[rating - 1]}</Text>
        )}
      </View>
    );
  };

  const CategoryRating = ({ category }: { category: RatingCategory }) => (
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryIcon}>
          <Ionicons name={category.icon} size={22} color="#003366" />
        </View>
        <Text style={styles.categoryLabel}>{category.label}</Text>
      </View>
      <View style={styles.categoryStars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleCategoryRating(category.id, star)}
            style={styles.categoryStarButton}
          >
            <Ionicons
              name={star <= category.rating ? "star" : "star-outline"}
              size={24}
              color={star <= category.rating ? "#f39c12" : "#bdc3c7"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const getRatingEmoji = () => {
    if (overallRating === 0) return "🤔";
    if (overallRating === 1) return "😢";
    if (overallRating === 2) return "😕";
    if (overallRating === 3) return "😐";
    if (overallRating === 4) return "😊";
    return "🤩";
  };

  const getRatingText = () => {
    if (overallRating === 0) return "Donnez-nous votre avis";
    if (overallRating === 1) return "Nous sommes désolés";
    if (overallRating === 2) return "Nous pouvons faire mieux";
    if (overallRating === 3) return "Merci pour votre retour";
    if (overallRating === 4) return "Merci beaucoup !";
    return "Génial ! Merci infiniment !";
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Évaluer l'application</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Overall Rating Section */}
        <View style={styles.overallSection}>
          <Text style={styles.emojiLarge}>{getRatingEmoji()}</Text>
          <Text style={styles.overallTitle}>{getRatingText()}</Text>
          <Text style={styles.overallSubtitle}>
            Notez votre expérience globale
          </Text>
          <StarRating
            rating={overallRating}
            onRate={setOverallRating}
            size={40}
            showLabel={true}
          />
          {overallRating > 0 && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingBadgeText}>
                {overallRating}/5 étoiles
              </Text>
            </View>
          )}
        </View>

        {/* Category Ratings */}
        {overallRating > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              ÉVALUEZ PAR CATÉGORIE (OPTIONNEL)
            </Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <CategoryRating key={category.id} category={category} />
              ))}
            </View>
          </View>
        )}

        {/* Would Recommend */}
        {overallRating > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RECOMMANDATION</Text>
            <View style={styles.recommendCard}>
              <Text style={styles.recommendQuestion}>
                Recommanderiez-vous cette application ?
              </Text>
              <View style={styles.recommendButtons}>
                <TouchableOpacity
                  style={[
                    styles.recommendButton,
                    wouldRecommend === true && styles.recommendButtonActive,
                  ]}
                  onPress={() => setWouldRecommend(true)}
                >
                  <Ionicons
                    name="thumbs-up"
                    size={24}
                    color={wouldRecommend === true ? "#fff" : "#27ae60"}
                  />
                  <Text
                    style={[
                      styles.recommendButtonText,
                      wouldRecommend === true &&
                        styles.recommendButtonTextActive,
                    ]}
                  >
                    Oui
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.recommendButton,
                    wouldRecommend === false && styles.recommendButtonActiveNo,
                  ]}
                  onPress={() => setWouldRecommend(false)}
                >
                  <Ionicons
                    name="thumbs-down"
                    size={24}
                    color={wouldRecommend === false ? "#fff" : "#e74c3c"}
                  />
                  <Text
                    style={[
                      styles.recommendButtonText,
                      wouldRecommend === false &&
                        styles.recommendButtonTextActive,
                    ]}
                  >
                    Non
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Improvements Suggestions */}
        {overallRating > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              QUELLES AMÉLIORATIONS SOUHAITEZ-VOUS ?
            </Text>
            <View style={styles.improvementsCard}>
              <View style={styles.improvementsGrid}>
                {improvements.map((improvement) => (
                  <TouchableOpacity
                    key={improvement}
                    style={[
                      styles.improvementChip,
                      selectedImprovements.includes(improvement) &&
                        styles.improvementChipActive,
                    ]}
                    onPress={() => toggleImprovement(improvement)}
                  >
                    <Ionicons
                      name={
                        selectedImprovements.includes(improvement)
                          ? "checkmark-circle"
                          : "add-circle-outline"
                      }
                      size={18}
                      color={
                        selectedImprovements.includes(improvement)
                          ? "#fff"
                          : "#003366"
                      }
                    />
                    <Text
                      style={[
                        styles.improvementChipText,
                        selectedImprovements.includes(improvement) &&
                          styles.improvementChipTextActive,
                      ]}
                    >
                      {improvement}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Feedback Text */}
        {overallRating > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              PARTAGEZ VOS COMMENTAIRES (OPTIONNEL)
            </Text>
            <View style={styles.feedbackCard}>
              <View style={styles.feedbackIcon}>
                <Ionicons name="chatbox-outline" size={24} color="#003366" />
              </View>
              <Text style={styles.feedbackPrompt}>
                Qu'est-ce qui vous plaît le plus ? Qu'est-ce qui pourrait être
                amélioré ?
              </Text>
              <TextInput
                style={styles.feedbackInput}
                value={feedback}
                onChangeText={setFeedback}
                placeholder="Partagez vos pensées avec nous..."
                placeholderTextColor="#95a5a6"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
              <View style={styles.characterCount}>
                <Ionicons name="text-outline" size={14} color="#95a5a6" />
                <Text style={styles.characterCountText}>
                  {feedback.length} caractères
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Statistics */}
        {overallRating > 0 && (
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={24} color="#003366" />
              <Text style={styles.statValue}>2,547</Text>
              <Text style={styles.statLabel}>Évaluations</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="star" size={24} color="#f39c12" />
              <Text style={styles.statValue}>4.6</Text>
              <Text style={styles.statLabel}>Note moyenne</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="trending-up-outline" size={24} color="#27ae60" />
              <Text style={styles.statValue}>94%</Text>
              <Text style={styles.statLabel}>Recommandent</Text>
            </View>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Submit Button */}
      {overallRating > 0 && (
        <View style={styles.bottomButton}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="checkmark-circle" size={22} color="#fff" />
            <Text style={styles.submitButtonText}>Envoyer mon évaluation</Text>
          </TouchableOpacity>
        </View>
      )}
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

  // Overall Rating Section
  overallSection: {
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  emojiLarge: {
    fontSize: 80,
    marginBottom: 20,
  },
  overallTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  overallSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 25,
    textAlign: "center",
  },
  starRatingContainer: {
    alignItems: "center",
  },
  starsRow: {
    flexDirection: "row",
    gap: 8,
  },
  starButton: {
    padding: 5,
  },
  ratingLabel: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  ratingBadge: {
    marginTop: 15,
    backgroundColor: "#f39c12",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  ratingBadgeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  // Sections
  section: {
    marginBottom: 20,
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

  // Category Ratings
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#e8f4f8",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2c3e50",
    flex: 1,
  },
  categoryStars: {
    flexDirection: "row",
    gap: 4,
  },
  categoryStarButton: {
    padding: 2,
  },

  // Recommend Section
  recommendCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  recommendQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  recommendButtons: {
    flexDirection: "row",
    gap: 12,
  },
  recommendButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
    borderWidth: 2,
    borderColor: "#f8f9fa",
    gap: 8,
  },
  recommendButtonActive: {
    backgroundColor: "#27ae60",
    borderColor: "#27ae60",
  },
  recommendButtonActiveNo: {
    backgroundColor: "#e74c3c",
    borderColor: "#e74c3c",
  },
  recommendButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  recommendButtonTextActive: {
    color: "#fff",
  },

  // Improvements
  improvementsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  improvementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  improvementChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#e8f4f8",
    borderWidth: 2,
    borderColor: "#e8f4f8",
    gap: 6,
  },
  improvementChipActive: {
    backgroundColor: "#003366",
    borderColor: "#003366",
  },
  improvementChipText: {
    fontSize: 13,
    color: "#003366",
    fontWeight: "600",
  },
  improvementChipTextActive: {
    color: "#fff",
  },

  // Feedback
  feedbackCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  feedbackIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e8f4f8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    alignSelf: "center",
  },
  feedbackPrompt: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 15,
    textAlign: "center",
    lineHeight: 20,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: "#2c3e50",
    backgroundColor: "#f8f9fa",
    minHeight: 120,
  },
  characterCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 5,
  },
  characterCountText: {
    fontSize: 12,
    color: "#95a5a6",
  },

  // Statistics
  statsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 4,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 10,
  },

  bottomSpacer: {
    height: 100,
  },

  // Bottom Button
  bottomButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButton: {
    backgroundColor: "#003366",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
