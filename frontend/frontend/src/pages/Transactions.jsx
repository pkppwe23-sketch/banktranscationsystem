import { useState } from "react";
import Layout from "../components/Layout";

function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTx, setSelectedTx] = useState(null);

  const fullData = [
    { id: "10982", name: "Stripe Client Settlement", amount: "+$14,250.00", status: "Completed", date: "2026-07-28 15:42", category: "Revenue", hash: "0x89f1a209b1", ip: "192.168.1.102", fee: "$0.00", memo: "Client Invoice Settlement #892" },
    { id: "10981", name: "AWS Cloud Infrastructure", amount: "-$1,240.50", status: "Completed", date: "2026-07-28 11:15", category: "Expense", hash: "0x3c91e4a812", ip: "54.210.12.98", fee: "$0.00", memo: "Monthly Cloud Hosting Server Node" },
    { id: "10980", name: "Payroll Node Disbursement", amount: "-$8,500.00", status: "Completed", date: "2026-07-27 18:30", category: "Payroll", hash: "0x9d102b48a1", ip: "192.168.1.102", fee: "$0.00", memo: "Engineering Team Q3 Compensation" },
    { id: "10979", name: "Binance Liquidity Yield", amount: "+$3,420.00", status: "Completed", date: "2026-07-27 09:20", category: "Investment", hash: "0x1b489c20a4", ip: "10.0.4.12", fee: "$2.50", memo: "Staking Reward Liquidity Pool" },
    { id: "10978", name: "Starlink Orbital Link Fee", amount: "-$250.00", status: "Pending", date: "2026-07-26 14:10", category: "Telecom", hash: "0x5e209a14c8", ip: "192.168.1.105", fee: "$0.00", memo: "Satellite Data Subscription" },
    { id: "10977", name: "Google Cloud Platform Tier 1", amount: "-$45.00", status: "Completed", date: "2026-07-25 16:30", category: "Services", hash: "0x7a892b104c", ip: "192.168.1.102", fee: "$0.00", memo: "BigQuery Analytics Query Pool" }
  ];

  const filteredData = fullData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.includes(searchTerm) || 
                          item.hash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportAuditLog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ledger_audit_log_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/80">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Ledger Transaction History</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Cryptographically signed ledger audit trail logs.</p>
          </div>

          <button
            onClick={exportAuditLog}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 font-medium transition"
          >
            Export Audit JSON
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, hash, or description..."
            className="w-full sm:w-80 px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-800 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-zinc-500"
          />

          <div className="flex items-center space-x-1.5 w-full sm:w-auto font-mono text-xs">
            {["All", "Completed", "Pending"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                  statusFilter === status
                    ? "bg-zinc-800 text-white font-semibold border border-zinc-700"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-2">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedTx(item)}
                className="cursor-pointer py-3 px-4 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-900 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center border text-xs font-semibold ${
                    item.amount.includes("+") 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-zinc-800 border-zinc-700 text-zinc-300"
                  }`}>
                    {item.amount.includes("+") ? "↓" : "↑"}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors">{item.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      TX#{item.id} • {item.date} • {item.hash}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-mono text-xs font-bold ${
                    item.amount.includes("+") ? "text-emerald-400" : "text-zinc-200"
                  }`}>
                    {item.amount}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                    ● {item.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 ui-card text-center text-xs text-zinc-400 font-mono">
              No transaction logs found matching search.
            </div>
          )}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ui-card p-6 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-white font-sans">Transaction Log Details</h3>
              <button onClick={() => setSelectedTx(null)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Transaction ID</span>
                <span className="text-white font-bold">#{selectedTx.id}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Description</span>
                <span className="text-white font-bold">{selectedTx.name}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Amount</span>
                <span className={`font-bold ${selectedTx.amount.includes("+") ? "text-emerald-400" : "text-zinc-100"}`}>{selectedTx.amount}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Status</span>
                <span className="text-emerald-400 font-bold">● {selectedTx.status}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Cryptographic Hash</span>
                <span className="text-indigo-400 font-bold">{selectedTx.hash}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Dispatch IP</span>
                <span className="text-zinc-300">{selectedTx.ip}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800/80 pb-2">
                <span className="text-zinc-400">Network Fee</span>
                <span className="text-zinc-300">{selectedTx.fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Reference Memo</span>
                <span className="text-zinc-200">{selectedTx.memo}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTx(null)}
              className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs font-sans transition"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Transactions;