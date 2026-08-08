import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import AccountCard from "../components/accountcard";
import TransactionCard from "../components/transcationcard";
import api from "../services/api";

function Dashboard() {
  const [filter, setFilter] = useState("all");
  const [chartRange, setChartRange] = useState("30d");
  const [selectedVault, setSelectedVault] = useState("Operating Account");
  const [quickTransferOpen, setQuickTransferOpen] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  // Quick Wire Form state
  const [quickRecipient, setQuickRecipient] = useState("");
  const [quickAmount, setQuickAmount] = useState("");

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Fetch accounts from backend if authenticated
    api.get("/api/accounts")
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setAccounts(res.data);
        }
      })
      .catch((err) => {
        console.log("Using local mock vault accounts:", err.message);
      });
  }, []);

  const transactionsData = [
    { id: "10982", name: "Stripe Client Settlement", amount: "+$14,250.00", status: "Completed", date: "Today, 15:42", category: "Revenue", hash: "0x89f1...2a" },
    { id: "10981", name: "AWS Cloud Infrastructure", amount: "-$1,240.50", status: "Completed", date: "Today, 11:15", category: "Expense", hash: "0x3c91...1b" },
    { id: "10980", name: "Payroll Node Disbursement", amount: "-$8,500.00", status: "Completed", date: "Yesterday, 18:30", category: "Payroll", hash: "0x9d10...4c" },
    { id: "10979", name: "Binance Liquidity Yield", amount: "+$3,420.00", status: "Completed", date: "Yesterday, 09:20", category: "Investment", hash: "0x1b48...8d" },
    { id: "10978", name: "Starlink Orbital Link Fee", amount: "-$250.00", status: "Pending", date: "26 Jul, 14:10", category: "Telecom", hash: "0x5e20...10" }
  ];

  const filteredTransactions = transactionsData.filter((item) => {
    if (filter === "income") return item.amount.includes("+");
    if (filter === "expense") return item.amount.includes("-");
    return true;
  });

  const handleQuickWireSubmit = (e) => {
    e.preventDefault();
    if (!quickRecipient || !quickAmount) return;
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setQuickTransferOpen(false);
      setQuickRecipient("");
      setQuickAmount("");
    }, 1500);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Enterprise Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>ENTERPRISE VAULT SYSTEM • ONLINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise Dashboard Overview
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Real-time cashflow telemetry, vault allocations, and transactional metrics.
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setQuickTransferOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition shadow-sm flex items-center space-x-1.5"
            >
              <span>⚡ Quick Wire Transfer</span>
            </button>
            <Link
              to="/accounts"
              className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 transition"
            >
              + Create Sub-Vault
            </Link>
          </div>
        </div>

        {/* Live FX Currency Ticker Tape */}
        <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono flex items-center justify-between overflow-x-auto">
          <span className="text-zinc-500 font-semibold uppercase text-[10px] tracking-wider shrink-0 mr-4">Live FX Rates:</span>
          <div className="flex items-center space-x-6 shrink-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-zinc-400">USD/EUR</span>
              <span className="text-white font-bold">€0.9214</span>
              <span className="text-emerald-400 text-[10px]">▲ +0.14%</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-zinc-400">USD/GBP</span>
              <span className="text-white font-bold">£0.7842</span>
              <span className="text-rose-400 text-[10px]">▼ -0.05%</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-zinc-400">USD/JPY</span>
              <span className="text-white font-bold">¥154.20</span>
              <span className="text-emerald-400 text-[10px]">▲ +0.32%</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="text-zinc-400">BTC/USD</span>
              <span className="text-white font-bold">$67,420.00</span>
              <span className="text-emerald-400 text-[10px]">▲ +2.40%</span>
            </div>
          </div>
        </div>

        {/* 4 Grand Metric Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="ui-card p-4 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Total Liquidity</span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">+18.4%</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">$148,920.50</div>
            <div className="text-[11px] text-zinc-400 font-mono flex justify-between pt-1 border-t border-zinc-800/60">
              <span>Available Liquid</span>
              <span className="text-zinc-200 font-semibold">$124,500.00</span>
            </div>
          </div>

          <div className="ui-card p-4 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Monthly Inflow</span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">CREDIT</span>
            </div>
            <div className="font-mono text-2xl font-bold text-emerald-400">+$42,150.00</div>
            <div className="text-[11px] text-zinc-400 font-mono flex justify-between pt-1 border-t border-zinc-800/60">
              <span>Average Daily</span>
              <span className="text-zinc-200 font-semibold">$1,405.00</span>
            </div>
          </div>

          <div className="ui-card p-4 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Monthly Outflow</span>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700">DEBIT</span>
            </div>
            <div className="font-mono text-2xl font-bold text-zinc-200">-$12,480.00</div>
            <div className="text-[11px] text-zinc-400 font-mono flex justify-between pt-1 border-t border-zinc-800/60">
              <span>Net Savings Ratio</span>
              <span className="text-emerald-400 font-semibold">70.3%</span>
            </div>
          </div>

          <div className="ui-card p-4 space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Transaction Velocity</span>
              <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/20">450 / 1K LIMIT</span>
            </div>
            <div className="font-mono text-2xl font-bold text-white">45.0%</div>
            <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-indigo-500 h-full w-[45%] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Visual Charts & Telemetry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Chart: Cash Flow Area Curve (2 Cols) */}
          <div className="lg:col-span-2 ui-card p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">Cash Flow & Yield Performance</h3>
                <p className="text-xs text-zinc-400">Historical inflows vs. operational expenditures</p>
              </div>

              {/* Chart Range Switcher */}
              <div className="flex items-center space-x-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-[11px] font-mono">
                {["7d", "30d", "90d", "1y"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setChartRange(range)}
                    className={`px-2.5 py-1 rounded transition ${
                      chartRange === range ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {range.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* High-Precision Clean SVG Area Chart */}
            <div className="w-full h-64 relative pt-4 flex flex-col justify-between">
              <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="#27272a" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#27272a" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="500" y2="120" stroke="#27272a" strokeDasharray="3 3" />

                {/* Area */}
                <path
                  d="M 0,150 L 0,110 Q 75,50 150,85 T 300,25 T 450,60 L 500,40 L 500,150 Z"
                  fill="url(#flowGradient)"
                />

                {/* Main Curve */}
                <path
                  d="M 0,110 Q 75,50 150,85 T 300,25 T 450,60 L 500,40"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />

                {/* Outflow Comparison Line */}
                <path
                  d="M 0,130 Q 75,100 150,110 T 300,90 T 450,105 L 500,95"
                  fill="none"
                  stroke="#71717a"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Datapoints */}
                <circle cx="150" cy="85" r="4" fill="#6366f1" />
                <circle cx="300" cy="25" r="4" fill="#10b981" />
                <circle cx="500" cy="40" r="4" fill="#6366f1" />
              </svg>

              {/* Chart Legend */}
              <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
                    <span className="text-zinc-200">Vault Revenue ($42,150)</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-500 inline-block"></span>
                    <span>Expenditure ($12,480)</span>
                  </span>
                </div>
                <span>Update: 2 mins ago</span>
              </div>
            </div>
          </div>

          {/* Right Visual Col: Capital Asset Breakdown (Donut / Segment Bar) */}
          <div className="ui-card p-5 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white">Asset Allocation</h3>
              <p className="text-xs text-zinc-400">Capital distribution across vaults</p>
            </div>

            {/* Segment Progress Bars */}
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>USD Cash Reserve</span>
                  <span className="font-bold text-white">$92,400.00 (62%)</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[62%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Euro Treasury Vault</span>
                  <span className="font-bold text-white">€32,150.00 (22%)</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[22%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Crypto Reserve (BTC/ETH)</span>
                  <span className="font-bold text-white">$15,800.00 (11%)</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[11%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Yield Treasury Bills</span>
                  <span className="font-bold text-white">$8,570.50 (5%)</span>
                </div>
                <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[5%]"></div>
                </div>
              </div>
            </div>

            {/* Active Vault Account Selector */}
            <div className="pt-3 border-t border-zinc-800/80">
              <label className="text-[10px] font-mono text-zinc-400 uppercase">Active Working Vault</label>
              <select
                value={selectedVault}
                onChange={(e) => setSelectedVault(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-white font-mono text-xs focus:outline-none"
              >
                <option value="Operating Account">Operating Account (US98...0012)</option>
                <option value="Euro Vault">Euro Treasury Vault (EU45...9821)</option>
                <option value="Payroll Vault">Payroll Vault (US11...4091)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lower Grid: Ledger Transactions & Holographic Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Recent Activity Feed (2 Cols) */}
          <div className="lg:col-span-2 ui-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Recent Ledger Stream</h3>
                <p className="text-xs text-zinc-400">Cryptographically verified transactions</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-[11px] font-medium">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-2.5 py-1 rounded transition ${
                    filter === "all" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  All Logs
                </button>
                <button
                  onClick={() => setFilter("income")}
                  className={`px-2.5 py-1 rounded transition ${
                    filter === "income" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Credits
                </button>
                <button
                  onClick={() => setFilter("expense")}
                  className={`px-2.5 py-1 rounded transition ${
                    filter === "expense" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Debits
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {filteredTransactions.map((item) => (
                <TransactionCard key={item.id} item={item} />
              ))}
            </div>

            <div className="pt-2 text-center">
              <Link to="/transactions" className="text-xs text-zinc-400 hover:text-white font-medium">
                Open Full Audit Log →
              </Link>
            </div>
          </div>

          {/* Right Col: Virtual Card Display & Security Telemetry */}
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Corporate Card</div>
              <AccountCard />
            </div>

            {/* Node Security Telemetry */}
            <div className="ui-card p-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Security Health</span>
                <span className="text-emerald-400 font-bold">100% SECURE</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">2FA Key Type</span>
                <span className="text-zinc-200">Hardware YubiKey</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Node Location</span>
                <span className="text-zinc-200">US-EAST (Virginia)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Wire Transfer Modal */}
      {quickTransferOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ui-card p-6 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white">⚡ Quick Wire Transfer</h3>
              <button onClick={() => setQuickTransferOpen(false)} className="text-zinc-400 hover:text-white text-base">✕</button>
            </div>

            {transferSuccess ? (
              <div className="py-6 text-center space-y-2">
                <div className="text-emerald-400 text-2xl font-bold">✓ Wire Dispatched</div>
                <p className="text-xs text-zinc-400 font-mono">Transfer signed and broadcast to ledger.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickWireSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Recipient Account / IBAN</label>
                  <input
                    type="text"
                    required
                    value={quickRecipient}
                    onChange={(e) => setQuickRecipient(e.target.value)}
                    placeholder="ACC-8921-NODE"
                    className="w-full px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-white font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Amount ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={quickAmount}
                    onChange={(e) => setQuickAmount(e.target.value)}
                    placeholder="1000.00"
                    className="w-full px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-white font-mono text-xs font-bold"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setQuickTransferOpen(false)}
                    className="px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200"
                  >
                    Dispatch Funds
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Dashboard;