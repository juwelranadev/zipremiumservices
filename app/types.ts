export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    category: string;
    icon: React.ReactNode;
    features: string[];
    rating: number;
    reviews: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    date: string;
    status: "pending" | "processing" | "completed" | "cancelled";
    total: number;
    items: CartItem[];
    paymentMethod: string;
    trxId: string;
    payerNumber: string;
}
export interface Airdrop {
    id: number;
    title: string;
    description: string;
    reward: string;
    participants: string;
    timeLeft: string;
    type: string;
    color: string;
    status: "live" | "ended" | "upcoming";
}

export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    helpful: number;
    verified: boolean;
    service?: string;
}
