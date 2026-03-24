import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardProps {
  stats: {
    balance: number;
    income: number;
    expenses: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  const cards = [
    {
      title: 'Total Balance',
      value: stats.balance,
      icon: <Wallet className="text-blue-600" size={24} />,
      bg: 'bg-blue-50',
      trend: '+2.5%',
      trendUp: true,
    },
    {
      title: 'Total Income',
      value: stats.income,
      icon: <ArrowUpRight className="text-emerald-600" size={24} />,
      bg: 'bg-emerald-50',
      trend: '+12.3%',
      trendUp: true,
    },
    {
      title: 'Total Expenses',
      value: stats.expenses,
      icon: <ArrowDownRight className="text-rose-600" size={24} />,
      bg: 'bg-rose-50',
      trend: '-4.1%',
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center`}>
              {card.icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${card.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {card.trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {card.trend}
            </div>
          </div>
          <p className="text-slate-500 font-medium text-sm">{card.title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">
            {formatCurrency(card.value)}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;
