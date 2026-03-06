"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import MainShop from "../components/MainShop";
import { useShopContext } from "../context/ShopContext";

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { setView } = useShopContext();

    useEffect(() => {
        setView("home");
    }, [setView]);

    return <MainShop categorySlug={slug} />;
}
