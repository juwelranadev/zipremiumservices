import { LucideIcon, TrendingUp, ArrowUpRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  bgColor: string;
}

export default function StatsCard({ title, value, change, icon: Icon, bgColor }: StatsCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-purple-500/30 transition-all duration-300 overflow-hidden">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-orange-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-orange-500/5 transition-all duration-500"></div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`relative p-3.5 rounded-xl ${bgColor} shadow-lg`}>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
            <Icon className="relative w-6 h-6 text-white" />
          </div>
          <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-sm font-medium ${
            isPositive 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            <TrendingUp className={`w-3.5 h-3.5 ${!isPositive && 'rotate-180'}`} />
            <span>{change}</span>
          </div>
        </div>
        
        <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
        
        <div className="flex items-end justify-between">
          <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{value}</p>
          <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/10 rounded-lg transition-all">
            <ArrowUpRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min(parseInt(change) * 4, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
