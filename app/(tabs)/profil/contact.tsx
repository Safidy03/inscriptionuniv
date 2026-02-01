import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MessageType = "question" | "technical" | "complaint" | "suggestion";

export default function ContactUs() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedType, setSelectedType] = useState<MessageType>("question");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const messageTypes: { type: MessageType; label: string; icon: any }[] = [
    { type: "question", label: "Question", icon: "help-circle-outline" },
    {
      type: "technical",
      label: "Problème technique",
      icon: "construct-outline",
    },
    { type: "complaint", label: "Réclamation", icon: "alert-circle-outline" },
    { type: "suggestion", label: "Suggestion", icon: "bulb-outline" },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    // Reset errors
    setErrors({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    let hasError = false;
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    // Validate name
    if (!name.trim()) {
      newErrors.name = "Veuillez entrer votre nom";
      hasError = true;
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Veuillez entrer votre email";
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = "Veuillez entrer un email valide";
      hasError = true;
    }

    // Validate subject
    if (!subject.trim()) {
      newErrors.subject = "Veuillez entrer un objet";
      hasError = true;
    }

    // Validate message
    if (!message.trim()) {
      newErrors.message = "Veuillez entrer votre message";
      hasError = true;
    } else if (message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Here you would implement the actual message sending logic
    Alert.alert(
      "Message envoyé",
      "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
      [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setSelectedType("question");
          },
        },
      ],
    );
  };

  const handleEmailPress = () => {
    Linking.openURL("mailto:support@eni.mg");
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:+261340000000");
  };

  const handleWhatsAppPress = () => {
    Linking.openURL("https://wa.me/261340000000");
  };

  const handleLocationPress = () => {
    // You can open Google Maps or any map app
    const address = "ENI Fianarantsoa, Madagascar";
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const ContactMethodCard = ({
    icon,
    title,
    value,
    description,
    onPress,
    color,
  }: {
    icon: any;
    title: string;
    value: string;
    description: string;
    onPress: () => void;
    color: string;
  }) => (
    <TouchableOpacity style={styles.methodCard} onPress={onPress}>
      <View style={[styles.methodIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>
      <View style={styles.methodContent}>
        <Text style={styles.methodTitle}>{title}</Text>
        <Text style={styles.methodValue}>{value}</Text>
        <Text style={styles.methodDescription}>{description}</Text>
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
        <Text style={styles.headerTitle}>Contactez-nous</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroIcon}>
            <Ionicons name="mail" size={40} color="#003366" />
          </View>
          <Text style={styles.heroTitle}>Nous sommes là pour vous aider</Text>
          <Text style={styles.heroSubtitle}>
            N'hésitez pas à nous contacter pour toute question ou assistance
          </Text>
        </View>

        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MOYENS DE CONTACT</Text>
          <View style={styles.methodsGroup}>
            <ContactMethodCard
              icon="mail-outline"
              title="Email"
              value="support@eni.mg"
              description="Réponse sous 24h"
              onPress={handleEmailPress}
              color="#3498db"
            />
            <ContactMethodCard
              icon="call-outline"
              title="Téléphone"
              value="+261 34 00 000 00"
              description="Lun-Ven: 8h00 - 17h00"
              onPress={handlePhonePress}
              color="#27ae60"
            />
            <ContactMethodCard
              icon="logo-whatsapp"
              title="WhatsApp"
              value="+261 34 00 000 00"
              description="Réponse rapide"
              onPress={handleWhatsAppPress}
              color="#25D366"
            />
            <ContactMethodCard
              icon="location-outline"
              title="Adresse"
              value="ENI Fianarantsoa"
              description="Cité Universitaire, Madagascar"
              onPress={handleLocationPress}
              color="#e74c3c"
            />
          </View>
        </View>

        {/* Office Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HORAIRES D'OUVERTURE</Text>
          <View style={styles.hoursCard}>
            <View style={styles.hourRow}>
              <View style={styles.hourLeft}>
                <Ionicons name="calendar-outline" size={20} color="#003366" />
                <Text style={styles.hourDay}>Lundi - Vendredi</Text>
              </View>
              <Text style={styles.hourTime}>8:00 - 17:00</Text>
            </View>
            <View style={styles.hourDivider} />
            <View style={styles.hourRow}>
              <View style={styles.hourLeft}>
                <Ionicons name="calendar-outline" size={20} color="#7f8c8d" />
                <Text style={styles.hourDayClosed}>Samedi - Dimanche</Text>
              </View>
              <Text style={styles.hourTimeClosed}>Fermé</Text>
            </View>
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUIVEZ-NOUS</Text>
          <View style={styles.socialCard}>
            <Text style={styles.socialText}>
              Restez informé des dernières actualités
            </Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={24} color="#1877f2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-twitter" size={24} color="#1da1f2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-instagram" size={24} color="#e4405f" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-linkedin" size={24} color="#0077b5" />
              </TouchableOpacity>
            </View>
          </View>
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
    lineHeight: 22,
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

  // Contact Methods
  methodsGroup: {
    gap: 12,
  },
  methodCard: {
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
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  methodContent: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 13,
    color: "#95a5a6",
    marginBottom: 4,
  },
  methodValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 2,
  },
  methodDescription: {
    fontSize: 12,
    color: "#7f8c8d",
  },

  // Form
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },
  inputIcon: {
    marginLeft: 15,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#2c3e50",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  textAreaWrapper: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },
  textArea: {
    padding: 15,
    fontSize: 16,
    color: "#2c3e50",
    minHeight: 120,
  },
  characterCount: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  characterCountText: {
    fontSize: 12,
    color: "#95a5a6",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },

  // Message Type
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  typeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#e8f4f8",
    borderWidth: 1,
    borderColor: "#e8f4f8",
    gap: 6,
  },
  typeChipActive: {
    backgroundColor: "#003366",
    borderColor: "#003366",
  },
  typeChipText: {
    fontSize: 13,
    color: "#003366",
    fontWeight: "600",
  },
  typeChipTextActive: {
    color: "#fff",
  },

  // Submit Button
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 12,
    gap: 10,
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },

  // Hours Card
  hoursCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  hourRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hourLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  hourDay: {
    fontSize: 15,
    color: "#2c3e50",
    fontWeight: "500",
  },
  hourDayClosed: {
    fontSize: 15,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  hourTime: {
    fontSize: 15,
    color: "#27ae60",
    fontWeight: "600",
  },
  hourTimeClosed: {
    fontSize: 15,
    color: "#e74c3c",
    fontWeight: "600",
  },
  hourDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 15,
  },

  // Social Media
  socialCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  socialText: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 20,
    textAlign: "center",
  },
  socialButtons: {
    flexDirection: "row",
    gap: 15,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  bottomSpacer: {
    height: 40,
  },
});
