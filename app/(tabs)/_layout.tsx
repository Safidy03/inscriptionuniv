import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="dashetudiant" />
      <Stack.Screen name="dashadmin" />
      <Stack.Screen name="concours" />
      <Stack.Screen name="inscription" />
      <Stack.Screen name="paiement" />
      <Stack.Screen name="resultats" />
      <Stack.Screen name="profil" />
      <Stack.Screen name="valider_dossiers" />
      <Stack.Screen name="create_concours" />
      <Stack.Screen name="gestion_composants" />
      <Stack.Screen name="import_bacc" />
    </Stack>
  );
}