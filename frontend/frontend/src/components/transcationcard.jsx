import React from "react";

function TransactionCard({ item }) {
  const isPositive = item.amount.includes("+");

  return (
    <div className="py-3 px-4 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:bg-zinc-900 transition-colors flex items-center justify-between">
      <div className="flex items-center space-x-3.5">
        {/* Direction Icon */}
        <div className={`w-8 h-8 rounded-md flex items-center justify-center border text-xs font-semibold ${
          isPositive 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-zinc-800 border-zinc-700 text-zinc-300"
        }`}>
          {isPositive ? "↓" : "↑"}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-white">{item.name || "Ledger Transfer"}</span>
            {item.category && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60">
                {item.category}
              </span>
            )}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
            TX#{item.id || "8921"} • {item.date || "Today"}
          </div>
        </div>
      </div>

      {/* Amount & Status */}
      <div className="text-right">
        <div className={`font-mono text-xs font-semibold ${
          isPositive ? "text-emerald-400" : "text-zinc-200"
        }`}>
          {item.amount}
        </div>
        <div className="text-[10px] text-zinc-400 mt-0.5 font-medium">
          {item.status || "Completed"}
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
