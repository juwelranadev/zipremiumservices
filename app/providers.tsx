"use client";

import { ShopProvider, useShopContext } from "./context/ShopContext";
import EnhancedAlert from "./components/EnhancedAlert";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import Cart from "./components/Cart";

function GlobalAlert() {
    const { alertConfig, setAlertConfig } = useShopContext();
    return (
        <EnhancedAlert
            isOpen={alertConfig.isOpen}
            type={alertConfig.type}
            title={alertConfig.title}
            message={alertConfig.message}
            onConfirm={alertConfig.onConfirm}
            onOrderConfirmed={alertConfig.onConfirm}
            onClose={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
        />
    );
}

function GlobalModals() {
    const {
        showSignInModal, setShowSignInModal,
        showSignUpModal, setShowSignUpModal,
        handleSignIn, handleSignUp,
        showAlert,
        cart, isCartOpen, setIsCartOpen,
        addToCart, removeFromCart, getTotalPrice,
        setView, isLoggedIn
    } = useShopContext();

    return (
        <>
            <SignInModal
                isOpen={showSignInModal}
                onClose={() => setShowSignInModal(false)}
                onSignIn={handleSignIn}
                onSignUp={() => {
                    setShowSignInModal(false);
                    setShowSignUpModal(true);
                }}
            />
            <SignUpModal
                isOpen={showSignUpModal}
                onClose={() => setShowSignUpModal(false)}
                onSignUp={handleSignUp}
                onSignIn={() => {
                    setShowSignUpModal(false);
                    window.location.href = '/sign-in';
                }}
                onAlert={showAlert}
            />
            <Cart
                cart={cart}
                isCartOpen={isCartOpen}
                setIsCartOpen={setIsCartOpen}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                getTotalPrice={getTotalPrice}
                setView={setView}
                isLoggedIn={isLoggedIn}
                onSignInClick={() => window.location.href = '/sign-in'}
                onAlert={showAlert}
            />
        </>
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ShopProvider>
            {children}
            <GlobalAlert />
            <GlobalModals />
        </ShopProvider>
    );
}
