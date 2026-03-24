import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Utensils, Car, ShoppingBag, Film, HeartPulse, Zap, Wallet, MoreHorizontal } from 'lucide-react';
import { Transaction, CATEGORIES } from '../types.ts';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  compact?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Utensils: <Utensils size={18} />,
  Car: <Car size={18} />,
  ShoppingBag: <ShoppingBag size={18} />,
  Film: <Film size={18} />,
  HeartPulse: <HeartPulse size={18} />,
  Zap: <Zap size={18} />,
  Wallet: <Wallet size={18} />,
  MoreHorizontal: <MoreHorizontal size={18} />,
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete, compact }) => {
  const getCategoryInfo = (categoryId: string) => {
    return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1];
  };

  const formatCurrency = (val: number, type: 'income' | 'expense') => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
    return type === 'income' ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${compact ? '' : 'min-h-[400px]'}`}>
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          {compact ? 'Recent Transactions' : 'All Transactions'}
        </h3>
        {!compact && (
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            Export CSV
          </button>
        )}
      </div>

      <div className="divide-y divide-slate-100">
        <AnimatePresence initial={false}>
          {transactions.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              No transactions found.
            </div>
          ) : (
            transactions.map((t) => {
              const category = getCategoryInfo(t.category);
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-4 hover:bg-slate-50 transition-colors group flex items-center gap-4"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                  >
                    {iconMap[category.icon]}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{t.description}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {format(new Date(t.date), 'MMM dd, yyyy • hh:mm a')}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className={`font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {formatCurrency(t.amount, t.type)}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-0.5">
                      {category.name}
                    </p>
                  </div>

                  <button 
                    onClick={() => onDelete(t.id)}
                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {compact && transactions.length > 0 && (
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
          <button className="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
            View All Transactions
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
