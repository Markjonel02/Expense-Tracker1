import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  LayoutDashboard, 
  ListOrdered, 
  PieChart as PieChartIcon,
  Settings,
  Bell,
  User,
  Menu,
  X
} from 'lucide-react';
import { Transaction, TransactionType, CATEGORIES } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import TransactionList from './components/TransactionList.tsx';
import AddTransaction from './components/AddTransaction.tsx';
import CategoryChart from './components/CategoryChart.tsx';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('expenses_data');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', description: 'Grocery Shopping', amount: 120.50, type: 'expense', category: 'food', date: new Date().toISOString() },
      { id: '2', description: 'Monthly Salary', amount: 4500.00, type: 'income', category: 'salary', date: new Date().toISOString() },
      { id: '3', description: 'Uber Ride', amount: 25.00, type: 'expense', category: 'transport', date: new Date().toISOString() },
      { id: '4', description: 'Netflix Subscription', amount: 15.99, type: 'expense', category: 'entertainment', date: new Date().toISOString() },
    ];
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'charts'>('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('expenses_data', JSON.stringify(transactions));
  }, [transactions]);

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    return {
      balance: income - expenses,
      income,
      expenses
    };
  }, [transactions]);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions([transaction, ...transactions]);
    setIsAddModalOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">ExpenseFlow</h1>
          </div>

          <nav className="flex-1 space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('transactions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'transactions' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <ListOrdered size={20} />
              Transactions
            </button>
            <button 
              onClick={() => setActiveTab('charts')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'charts' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <PieChartIcon size={20} />
              Analytics
            </button>
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
              <Settings size={20} />
              Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <button 
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {activeTab === 'dashboard' ? 'Overview' : activeTab === 'transactions' ? 'Transactions' : 'Analytics'}
                </h2>
                <p className="text-slate-500 mt-1">Manage your finances with ease.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                <Plus size={20} />
                Add Transaction
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div 
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <Dashboard stats={stats} />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CategoryChart transactions={transactions} />
                    <TransactionList 
                      transactions={transactions.slice(0, 5)} 
                      onDelete={handleDeleteTransaction}
                      compact
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'transactions' && (
                <motion.div 
                  key="transactions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
                </motion.div>
              )}

              {activeTab === 'charts' && (
                <motion.div 
                  key="charts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  <CategoryChart transactions={transactions} full />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      <AddTransaction 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddTransaction} 
      />
    </div>
  );
};

export default App;
