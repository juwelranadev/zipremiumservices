"use client";

import { useEffect } from "react";
import MainShop from "./components/MainShop";
import { useShopContext } from "./context/ShopContext";

export default function Home() {
  const { setView } = useShopContext();

  useEffect(() => {
    setView("home");
  }, [setView]);

  return <MainShop categorySlug="all" />;
}
