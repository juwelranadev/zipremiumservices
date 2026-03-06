"use client";

import { useEffect } from "react";
import MainShop from "../components/MainShop";
import { useShopContext } from "../context/ShopContext";

export default function CheckoutPage() {
    const { setView } = useShopContext();

    useEffect(() => {
        setView("checkout");
    }, [setView]);

    return <MainShop categorySlug="all" />;
}
