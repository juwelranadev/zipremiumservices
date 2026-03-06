'use client';

import { useState } from 'react';
import AirdropsTab from '../../components/AirdropsTab';
import { Airdrop } from '../../../types';

export default function AirdropsPage() {
    const [airdrops, setAirdrops] = useState<Airdrop[]>([
        {
            id: 1,
            title: "Premium Welcome Pack",
            description: "Get a chance to win Netflix, Spotify, and YouTube Premium for 1 month.",
            reward: "$50 Value",
            participants: "1.2k",
            timeLeft: "2 Days",
            type: "Free",
            color: "from-purple-500 to-indigo-600",
            status: "live"
        },
        {
            id: 2,
            title: "Social Growth Booster",
            description: "500 real Facebook followers for 10 lucky winners!",
            reward: "500 Followers",
            participants: "3.5k",
            timeLeft: "5 Days",
            type: "Referral",
            color: "from-blue-500 to-cyan-600",
            status: "live"
        },
        {
            id: 3,
            title: "Crypto Starter Kit",
            description: "Join our community and get a share of $1,000 USDT.",
            reward: "$1,000 USDT",
            participants: "10k",
            timeLeft: "12 Hours",
            type: "Community",
            color: "from-yellow-400 to-orange-500",
            status: "live"
        },
        {
            id: 4,
            title: "Early Bird Access",
            description: "Exclusive access to new products before they hit the shop.",
            reward: "Beta Access",
            participants: "800",
            timeLeft: "0",
            type: "Exclusive",
            color: "from-emerald-500 to-teal-600",
            status: "ended"
        }
    ]);

    const handleAddAirdrop = () => {
        alert("Add Airdrop Modal would open here (Admin UI)");
    };

    const handleEditAirdrop = (airdrop: Airdrop) => {
        alert(`Editing airdrop: ${airdrop.title}`);
    };

    const handleDeleteAirdrop = (id: number) => {
        if (confirm("Are you sure you want to delete this airdrop?")) {
            setAirdrops(airdrops.filter(a => a.id !== id));
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <AirdropsTab
                airdrops={airdrops}
                onAddAirdrop={handleAddAirdrop}
                onEditAirdrop={handleEditAirdrop}
                onDeleteAirdrop={handleDeleteAirdrop}
            />
        </div>
    );
}
