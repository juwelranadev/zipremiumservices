"use client";

import { useEffect } from "react";
import { useShopContext } from "./context/ShopContext";
import PremiumLanding from "./components/landing/PremiumLanding";

export default function Home() {
  const { setView } = useShopContext();

  useEffect(() => {
    setView("home");
  }, [setView]);

  return <PremiumLanding />;
}
