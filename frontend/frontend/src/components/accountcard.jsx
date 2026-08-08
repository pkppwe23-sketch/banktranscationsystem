import { useState } from "react";

function AccountCard({ balance = "$148,920.50", accountNo = "4829-9102-3841-8921", holder = "Pritesh Kumar" }) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNo.replace(/-/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full max-w-sm ui-card p-5 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Vault Account</span>
          <div className="text-xs text-zinc-500 font-mono">PRIMARY NODE</div>
        </div>
        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
          VISA
        </span>
      </div>

      {/* Account Number Display */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-[11px] text-zinc-400 mb-1">
          <span>Account Identifier</span>
          <button
            onClick={handleCopy}
            className="text-indigo-400 hover:text-indigo-300 font-mono text-[10px]"
          >
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
        <div className="font-mono text-lg font-bold text-white tracking-wider">
          {showDetails ? accountNo : `•••• •••• •••• ${accountNo.slice(-4)}`}
        </div>
      </div>

      {/* Holder & Balance */}
      <div className="flex justify-between items-end pt-4 border-t border-zinc-800/80">
        <div>
          <div className="text-[10px] text-zinc-400 uppercase">Account Holder</div>
          <div className="text-xs font-medium text-white mt-0.5">{holder}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-zinc-400 uppercase">Balance</div>
          <div className="font-mono text-sm font-bold text-emerald-400 mt-0.5">{balance}</div>
        </div>
      </div>

      {/* Action */}
      <div className="mt-3 pt-2 text-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          {showDetails ? "Hide full number" : "Reveal full number"}
        </button>
      </div>
    </div>
  );
}

export default AccountCard;
