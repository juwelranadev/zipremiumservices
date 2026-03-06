"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import OrderHistory from "../components/OrderHistory";
import Footer from "../components/Footer";
import MaintenanceBar from "../components/MaintenanceBar";
import EnhancedAlert from "../components/EnhancedAlert";
import LoadingScreen from "../components/LoadingScreen";
import { useShopContext } from "../context/ShopContext";
import type { Order } from "../types";

export default function OrderHistoryPage() {
    const router = useRouter();
    const {
        cart,
        setCart,
        addToCart,
        getTotalItems,
        view,
        setView,
        orders,
        setSelectedOrder,
        isLoggedIn,
        setIsLoggedIn,
        showSignInModal,
        setShowSignInModal,
        showSignUpModal,
        setShowSignUpModal,
        isLoading,
        setIsLoading,
        menuOpen,
        setMenuOpen,
        theme,
        toggleTheme,
        username,
        alertConfig,
        setAlertConfig,
        showAlert,
        setIsCartOpen,
    } = useShopContext();

    const menuRef = useRef<HTMLDivElement>(null);

    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order);
        setView("order-details");
        router.push("/"); // Back to home to see details, or I could implement OrderDetails page too
    };

    const handleReorder = (order: Order) => {
        order.items.forEach((item) => {
            for (let i = 0; i < item.quantity; i++) {
                addToCart(item);
            }
        });
        setIsCartOpen(true);
        showAlert("success", "Reorder", "Items added to cart for reorder!");
    };

    if (!isLoggedIn && !isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-white mb-4">Please Sign In to view your order history</h1>
                <button
                    onClick={() => { setShowSignInModal(true); router.push("/"); }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Go to Sign In
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-gray-100 transition-colors">
            {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

            <MaintenanceBar />
            <Header
                view="order-history"
                setView={setView}
                setIsCartOpen={setIsCartOpen}
                getTotalItems={getTotalItems}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                menuRef={menuRef}
                theme={theme}
                toggleTheme={toggleTheme}
                username={username}
                isLoggedIn={isLoggedIn}
                onSignInClick={() => router.push('/sign-in')}
                onSignUpClick={() => setShowSignUpModal(true)}
                onAlert={showAlert}
            />

            <OrderHistory
                orders={orders}
                onSelectOrder={handleSelectOrder}
                onReorder={handleReorder}
            />

            <EnhancedAlert
                isOpen={alertConfig.isOpen}
                type={alertConfig.type}
                title={alertConfig.title}
                message={alertConfig.message}
                onConfirm={alertConfig.onConfirm}
                onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))}
            />

            <Footer />
        </div>
    );
}
