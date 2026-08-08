import { useState } from "react";
import Layout from "../components/Layout";
import AccountCard from "../components/accountcard";

function Accounts() {
  const [cardFrozen, setCardFrozen] = useState(false);
  const [spendLimit, setSpendLimit] = useState(25000);
  const [pinVisible, setPinVisible] = useState(false);
  const [createAccountModal, setCreateAccountModal] = useState(false);
  const [newAccName, setNewAccName] = useState("");
  const [newAccCurrency, setNewAccCurrency] = useState("USD");

  const [vaults, setVaults] = useState([
    { id: "ACC-8921-USD", name: "Operating USD Vault", balance: "$148,920.50", currency: "USD", type: "Primary", status: "Active" },
    { id: "ACC-4591-EUR", name: "Euro Treasury Vault", balance: "€32,150.00", currency: "EUR", type: "Reserve", status: "Active" },
    { id: "ACC-1029-BTC", name: "Crypto Reserve Vault", balance: "$15,800.00", currency: "BTC", type: "Liquidity", status: "Active" },
    { id: "ACC-3342-PR", name: "Payroll Reserve Node", balance: "$28,400.00", currency: "USD", type: "Sub-Vault", status: "Active" }
  ]);

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!newAccName) return;
    const newId = `ACC-${Math.floor(Math.random() * 8999 + 1000)}-${newAccCurrency}`;
    setVaults([
      ...vaults,
      { id: newId, name: newAccName, balance: `${newAccCurrency === "EUR" ? "€" : "$"}0.00`, currency: newAccCurrency, type: "Sub-Vault", status: "Active" }
    ]);
    setNewAccName("");
    setCreateAccountModal(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Accounts & Cards Hub</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Manage multi-currency vaults, corporate cards, and transaction controls.</p>
          </div>

          <button
            onClick={() => setCreateAccountModal(true)}
            className="px-3.5 py-2 rounded-lg bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition shadow-sm flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <span>+ Create Sub-Vault</span>
          </button>
        </div>

        {/* Vault Accounts List & Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Vaults List (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="ui-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <h3 className="text-sm font-bold text-white">Active Multi-Currency Vaults</h3>
                <span className="text-xs font-mono text-zinc-400">{vaults.length} Vaults Active</span>
              </div>

              <div className="space-y-3">
                {vaults.map((vault) => (
                  <div key={vault.id} className="p-4 rounded-lg bg-zinc-950 border border-zinc-800/80 flex items-center justify-between font-mono text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">{vault.name}</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px]">
                          {vault.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500">{vault.id}</div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="font-bold text-emerald-400 text-base">{vault.balance}</div>
                      <div className="text-[10px] text-zinc-400">● {vault.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Card Controls Surface */}
            <div className="ui-card p-5 space-y-4 font-mono text-xs">
              <h3 className="text-sm font-bold text-white font-sans">Card Controls & Spending Limits</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Freeze Card Toggle */}
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white font-sans">Freeze Corporate Card</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Instantly block all card payments</div>
                  </div>
                  <button
                    onClick={() => setCardFrozen(!cardFrozen)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                      cardFrozen ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    {cardFrozen ? "FROZEN" : "ACTIVE"}
                  </button>
                </div>

                {/* PIN Reveal Toggle */}
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white font-sans">Card Security PIN</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{pinVisible ? "PIN: 8912" : "••••"}</div>
                  </div>
                  <button
                    onClick={() => setPinVisible(!pinVisible)}
                    className="px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition"
                  >
                    {pinVisible ? "Hide" : "Reveal"}
                  </button>
                </div>
              </div>

              {/* Monthly Spending Slider */}
              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-sans font-bold">Monthly Spend Limit</span>
                  <span className="text-emerald-400 font-bold">${spendLimit.toLocaleString()}.00</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="5000"
                  value={spendLimit}
                  onChange={(e) => setSpendLimit(Number(e.target.value))}
                  className="w-full bg-zinc-800 accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>Min: $5,000</span>
                  <span>Max: $100,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Holographic Card & IBAN Information */}
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Corporate Card</div>
              <AccountCard />
            </div>

            {/* Banking Routing Details */}
            <div className="ui-card p-4 space-y-3 font-mono text-xs">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">Vault Routing Info</h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">IBAN Code</span>
                  <span className="text-zinc-200 font-bold">US98-NEXUS-8921</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">SWIFT / BIC</span>
                  <span className="text-zinc-200 font-bold">NEXUSUS33XX</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800/80 pb-1.5">
                  <span className="text-zinc-400">Routing Number</span>
                  <span className="text-zinc-200 font-bold">021000021</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Bank Name</span>
                  <span className="text-zinc-200 font-bold">Nexus Central Vault</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to Create New Account */}
      {createAccountModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ui-card p-6 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white">Create New Sub-Vault Account</h3>
              <button onClick={() => setCreateAccountModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Vault Account Name</label>
                <input
                  type="text"
                  required
                  value={newAccName}
                  onChange={(e) => setNewAccName(e.target.value)}
                  placeholder="e.g. Marketing Expense Vault"
                  className="w-full px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Vault Base Currency</label>
                <select
                  value={newAccCurrency}
                  onChange={(e) => setNewAccCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-white font-mono text-xs"
                >
                  <option value="USD">USD - United States Dollar</option>
                  <option value="EUR">EUR - Euro Treasury</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="BTC">BTC - Bitcoin Liquidity</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateAccountModal(false)}
                  className="px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200"
                >
                  Provision Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Accounts;
