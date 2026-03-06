"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from "react";
import type { CartItem, Order, Product } from "../types";
import { mockOrders } from "../shopData";

interface ShopContextType {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    view: "home" | "checkout" | "orders" | "order-history" | "order-details";
    setView: React.Dispatch<React.SetStateAction<"home" | "checkout" | "orders" | "order-history" | "order-details">>;
    paymentMethod: "bkash" | "nagad" | "paycrypto";
    setPaymentMethod: React.Dispatch<React.SetStateAction<"bkash" | "nagad" | "paycrypto">>;
    cryptoCurrency: string;
    setCryptoCurrency: React.Dispatch<React.SetStateAction<string>>;
    paymentType: "network" | "uid";
    setPaymentType: React.Dispatch<React.SetStateAction<"network" | "uid">>;
    selectedNetwork: string;
    setSelectedNetwork: React.Dispatch<React.SetStateAction<string>>;
    selectedPlatform: string;
    setSelectedPlatform: React.Dispatch<React.SetStateAction<string>>;
    payerNumber: string;
    setPayerNumber: React.Dispatch<React.SetStateAction<string>>;
    trxId: string;
    setTrxId: React.Dispatch<React.SetStateAction<string>>;
    lastAddedProductId: number | null;
    orders: Order[];
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
    copiedAddress: boolean;
    setCopiedAddress: React.Dispatch<React.SetStateAction<boolean>>;
    selectedOrder: Order | null;
    setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    showSignInModal: boolean;
    setShowSignInModal: React.Dispatch<React.SetStateAction<boolean>>;
    showSignUpModal: boolean;
    setShowSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    theme: "light" | "dark";
    toggleTheme: () => void;
    username: string;
    handleSignIn: (email: string, password: string) => void;
    handleSignUp: (userData: { name: string; email: string; phone: string; password: string }) => void;
    alertConfig: { isOpen: boolean; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string; onConfirm?: () => void };
    setAlertConfig: React.Dispatch<React.SetStateAction<{ isOpen: boolean; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string; onConfirm?: () => void }>>;
    showAlert: (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, onConfirm?: () => void) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [view, setView] = useState<"home" | "checkout" | "orders" | "order-history" | "order-details">("home");
    const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "paycrypto">("bkash");
    const [cryptoCurrency, setCryptoCurrency] = useState("USDT");
    const [paymentType, setPaymentType] = useState<"network" | "uid">("network");
    const [selectedNetwork, setSelectedNetwork] = useState("TRC20");
    const [selectedPlatform, setSelectedPlatform] = useState("Binance");
    const [payerNumber, setPayerNumber] = useState("");
    const [trxId, setTrxId] = useState("");
    const [lastAddedProductId, setLastAddedProductId] = useState<number | null>(null);
    const lastAddedTimer = useRef<number | null>(null);
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [copiedAddress, setCopiedAddress] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [alertConfig, setAlertConfig] = useState<{ isOpen: boolean; type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string; onConfirm?: () => void }>({
        isOpen: false,
        type: 'info',
        title: '',
        message: ''
    });

    const username = "ZIKRUL";

    // Initialize theme
    useEffect(() => {
        if (typeof window !== "undefined") {
            const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(isDark ? "dark" : "light");
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    const addToCart = useCallback((product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        if (lastAddedTimer.current) {
            window.clearTimeout(lastAddedTimer.current);
        }
        setLastAddedProductId(product.id);
        lastAddedTimer.current = window.setTimeout(
            () => setLastAddedProductId(null),
            2000
        );
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prevCart.filter((item) => item.id !== productId);
        });
    }, []);

    const getTotalPrice = useCallback(() => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);

    const getTotalItems = useCallback(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    const handleSignIn = (email: string, password: string) => {
        // Sign in processed
        setIsLoggedIn(true);
    };

    const handleSignUp = (userData: { name: string; email: string; phone: string; password: string }) => {
        // Sign up processed
        setIsLoggedIn(true);
    };

    const showAlert = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, onConfirm?: () => void) => {
        setAlertConfig({ isOpen: true, type, title, message, onConfirm });
    };

    return (
        <ShopContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                removeFromCart,
                getTotalPrice,
                getTotalItems,
                isCartOpen,
                setIsCartOpen,
                view,
                setView,
                paymentMethod,
                setPaymentMethod,
                cryptoCurrency,
                setCryptoCurrency,
                paymentType,
                setPaymentType,
                selectedNetwork,
                setSelectedNetwork,
                selectedPlatform,
                setSelectedPlatform,
                payerNumber,
                setPayerNumber,
                trxId,
                setTrxId,
                lastAddedProductId,
                orders,
                setOrders,
                copiedAddress,
                setCopiedAddress,
                selectedOrder,
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
                handleSignIn,
                handleSignUp,
                alertConfig,
                setAlertConfig,
                showAlert,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}

export function useShopContext() {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error("useShopContext must be used within a ShopProvider");
    }
    return context;
}
