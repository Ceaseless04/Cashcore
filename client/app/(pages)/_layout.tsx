import { Stack } from "expo-router";
import Navbar from "@/components/navbar";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: () => <Navbar />,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="budget" />
      <Stack.Screen name="savings" />
      <Stack.Screen name="loans" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}