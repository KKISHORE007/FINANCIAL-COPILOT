import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DataContext } from '../context/DataContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const { dashboard, loading } = useContext(DataContext);

  if (loading) return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00B386]"></div>
    </div>
  );

  const formatINRCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val || 0);

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Spending Projection',
        data: [12000, 19000, 24000, dashboard?.summary?.spent || 28000],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Income Tracker',
        data: [15000, 30000, 45000, dashboard?.summary?.income || 60000],
        borderColor: '#00B386',
        backgroundColor: 'rgba(0, 179, 134, 0.2)',
        tension: 0.4,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#E2E8F0' } },
    },
    scales: {
      y: { grid: { color: '#21262D' }, ticks: { color: '#8b949e' } },
      x: { grid: { color: '#21262D' }, ticks: { color: '#8b949e' } }
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#0D1117] min-h-screen text-[#E2E8F0] font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-[#21262D]">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00B386] to-[#00DFC0] mb-2">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-400">Here is your financial overview for the month.</p>
          </div>
          <button onClick={logout} className="mt-4 md:mt-0 hover:scale-105 transform bg-transparent border border-red-500 hover:bg-red-500/10 text-red-500 px-6 py-2 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            Secure Logout
          </button>
        </div>

        {/* Overview Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#161B22] border border-[#21262D] rounded-2xl p-6 hover:-translate-y-1 hover:border-[#00B386] hover:shadow-[0_0_20px_rgba(0,179,134,0.1)] transition-all">
            <h3 className="text-gray-400 mb-2 font-medium">Monthly Income</h3>
            <p className="text-3xl font-bold text-white">{formatINRCurrency(dashboard?.summary?.income)}</p>
          </div>
          <div className="bg-[#161B22] border border-[#21262D] rounded-2xl p-6 hover:-translate-y-1 hover:border-[#EF4444] hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all">
            <h3 className="text-gray-400 mb-2 font-medium">Total Spent</h3>
            <p className="text-3xl font-bold text-[#EF4444]">{formatINRCurrency(dashboard?.summary?.spent)}</p>
          </div>
          <div className="bg-[#161B22] border border-[#21262D] rounded-2xl p-6 hover:-translate-y-1 hover:border-[#00DFC0] hover:shadow-[0_0_20px_rgba(0,223,192,0.1)] transition-all">
            <h3 className="text-gray-400 mb-2 font-medium">Saved Target</h3>
            <p className="text-3xl font-bold text-white">{formatINRCurrency(dashboard?.summary?.saved)}</p>
          </div>
          <div className="bg-[#161B22] border border-[#21262D] rounded-2xl p-6 hover:-translate-y-1 hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all">
            <h3 className="text-gray-400 mb-2 font-medium">Available Balance</h3>
            <p className="text-3xl font-bold text-white">{formatINRCurrency(dashboard?.summary?.balance)}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#161B22] border border-[#21262D] rounded-2xl p-6 group">
              <h2 className="text-xl font-bold mb-6 text-white group-hover:text-[#00B386] transition-colors">Cash Flow Tracking</h2>
              <div className="w-full h-[300px]">
                <Line options={chartOptions} data={lineChartData} />
              </div>
            </div>

            <div className="bg-[#161B22] border border-[#21262D] rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6 text-white">Recent Transactions</h2>
              <div className="space-y-4">
                {dashboard?.transactions?.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center p-4 bg-[#0D1117] rounded-xl hover:bg-[#21262D]/50 transition border border-transparent hover:border-[#00B386]/30">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${tx.is_credit ? 'bg-[#00B386]/20 text-[#00B386]' : 'bg-[#EF4444]/20 text-[#EF4444]'}`}>
                        {tx.is_credit ? '↓' : '↑'}
                      </div>
                      <div>
                        <p className="font-medium text-white">{tx.description}</p>
                        <p className="text-xs text-gray-400 capitalize">{tx.category} • {new Date(tx.transaction_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className={`font-bold ${tx.is_credit ? 'text-[#00B386]' : 'text-white'}`}>
                      {tx.is_credit ? '+' : '-'}{formatINRCurrency(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
             {/* Nudges */}
             <div className="bg-gradient-to-br from-[#161B22] to-[#161B22]/80 border border-[#F59E0B]/50 rounded-2xl p-6 shadow-[0_0_20px_rgba(245,158,11,0.05)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#F59E0B]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F59E0B]"></span>
                </span>
                Active Nudges
              </h2>
              <div className="space-y-3">
                {dashboard?.nudges?.length > 0 ? dashboard.nudges.slice(0,3).map(nudge => (
                  <div key={nudge.id} className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 p-4 rounded-xl text-sm text-[#F59E0B] flex gap-3">
                    <span className="text-lg">⚠️</span>
                    <p>{nudge.message}</p>
                  </div>
                )) : (
                  <p className="text-gray-400 text-sm">No active nudges tracking issues. Good job!</p>
                )}
              </div>
            </div>

            <div className="bg-[#161B22] border border-[#21262D] rounded-2xl p-6 group hover:border-[#00B386] transition-colors">
              <h2 className="text-xl font-bold mb-6 text-white border-b border-[#21262D] pb-3">Stock Portfolio</h2>
              <div className="space-y-4">
                {dashboard?.stocks?.slice(0,4).map(stock => {
                  const profit = stock.current_price - stock.purchase_price;
                  const isProfit = profit >= 0;
                  return (
                    <div key={stock.id} className="flex justify-between items-center group/item hover:bg-[#0D1117] p-2 rounded-lg transition cursor-pointer">
                       <div>
                         <p className="font-bold text-white group-hover/item:text-[#00B386] transition">{stock.symbol}</p>
                         <p className="text-xs text-gray-500">{stock.quantity} shares</p>
                       </div>
                       <div className="text-right">
                         <p className="font-medium text-white">{formatINRCurrency(stock.current_price)}</p>
                         <p className={`text-xs ${isProfit ? 'text-[#00B386]' : 'text-[#EF4444]'}`}>
                           {isProfit ? '+' : ''}{((profit / stock.purchase_price) * 100).toFixed(2)}%
                         </p>
                       </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
