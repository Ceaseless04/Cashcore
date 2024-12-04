import { Slot } from "expo-router";
import Navbar from "@/components/navbar";


export default function Layout() {
  return (
    <>
      <Navbar />
      <Slot />
    </>
  )
}