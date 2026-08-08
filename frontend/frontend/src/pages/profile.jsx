import { useState } from "react";
import Layout from "../components/Layout";

function Profile() {
  const [tfaEnabled, setTfaEnabled] = useState(true);
  const [apiKey, setApiKey] = useState("nx_live_98a72b01c94801e89a");
  const [keyScope, setKeyScope] = useState("Full Admin");
  const [keyCopied, setKeyCopied] = useState(false);
  const [qrModal, setQrModal] = useState(false);

  const [sessions, setSessions] = useState([
    { id: "SESS-01", device: "Chrome 126 / macOS Sonoma", ip: "192.168.1.102", location: "San Francisco, USA", status: "Active (Current)" },
    { id: "SESS-02", device: "Safari 17 / iOS 17.5", ip: "172.56.21.90", location: "New York, USA", status: "Active" },
    { id: "SESS-03", device: "Firefox 125 / Windows 11", ip: "24.180.99.12", location: "London, UK", status: "Expired" }
  ]);

  const generateNewKey = () => {
    const newKey = "nx_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 8);
    setApiKey(newKey);
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 1500);
  };

  const revokeSession = (id) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="pb-2 border-b border-zinc-800/80">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Security & API Console</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Manage operator credentials, active device sessions, and API scope permissions.</p>
        </div>

        {/* Identity & Operator Info */}
        <div className="ui-card p-5 space-y-4">
          <div className="flex items-center space-x-4 pb-4 border-b border-zinc-800">
            <div className="w-12 h-12 rounded-lg bg-white text-zinc-950 flex items-center justify-center font-black text-lg shadow-sm">
              PK
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">Pritesh Kumar</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                  VERIFIED OPERATOR
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">user@gmail.com • Node Tier 4 Vault</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-zinc-400 text-[10px] uppercase">Legal Name</label>
              <input
                type="text"
                disabled
                value="Pritesh Kumar"
                className="w-full mt-1 px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-200"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-[10px] uppercase">Email Address</label>
              <input
                type="text"
                disabled
                value="user@gmail.com"
                className="w-full mt-1 px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-200"
              />
            </div>
          </div>
        </div>

        {/* Security Controls & 2FA */}
        <div className="ui-card p-5 space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-white font-sans">Two-Factor Authentication & API Scopes</h3>

          {/* 2FA Item */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-950 border border-zinc-800">
            <div>
              <div className="font-bold text-white font-sans text-xs">Hardware 2FA Authentication</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Require TOTP for node transfers</div>
            </div>
            <div className="flex items-center space-x-2 font-sans">
              {tfaEnabled && (
                <button onClick={() => setQrModal(true)} className="text-xs text-indigo-400 hover:underline">
                  Show QR
                </button>
              )}
              <button
                onClick={() => setTfaEnabled(!tfaEnabled)}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  tfaEnabled ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {tfaEnabled ? "ENABLED" : "DISABLED"}
              </button>
            </div>
          </div>

          {/* API Token Box */}
          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-white font-sans text-xs">Developer API Bearer Token</div>
                <div className="text-[11px] text-zinc-400">For programmatic wire transfers & stats</div>
              </div>

              <select
                value={keyScope}
                onChange={(e) => setKeyScope(e.target.value)}
                className="px-2.5 py-1 bg-zinc-900 rounded border border-zinc-800 text-zinc-200 font-mono text-[11px]"
              >
                <option value="Full Admin">Full Admin Scope</option>
                <option value="Read-Only">Read-Only Scope</option>
                <option value="Transfer-Only">Transfer-Only Scope</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="w-full px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-800 text-indigo-400 font-mono text-xs"
              />
              <button
                onClick={copyKey}
                className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-sans font-medium rounded-lg transition shrink-0"
              >
                {keyCopied ? "Copied" : "Copy Token"}
              </button>
              <button
                onClick={generateNewKey}
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-sans font-medium rounded-lg transition shrink-0"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>

        {/* Active Device Sessions Table */}
        <div className="ui-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <h3 className="text-sm font-bold text-white">Active Device Login Sessions</h3>
            <span className="text-xs font-mono text-zinc-400">{sessions.length} Devices</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {sessions.map((sess) => (
              <div key={sess.id} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">{sess.device}</div>
                  <div className="text-[11px] text-zinc-400">{sess.ip} • {sess.location}</div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`text-[10px] font-bold ${sess.status.includes("Current") ? "text-emerald-400" : "text-zinc-400"}`}>
                    ● {sess.status}
                  </span>
                  {!sess.status.includes("Current") && (
                    <button
                      onClick={() => revokeSession(sess.id)}
                      className="text-rose-400 hover:underline text-[11px]"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2FA QR Code Setup Modal */}
      {qrModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="ui-card p-6 w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl space-y-4 text-center">
            <h3 className="text-sm font-bold text-white font-sans">2FA Authenticator QR Code</h3>
            <p className="text-xs text-zinc-400">Scan with Google Authenticator or 1Password.</p>

            <div className="w-36 h-36 bg-white rounded-lg p-2 mx-auto flex items-center justify-center border border-zinc-700">
              {/* QR Code graphic representation */}
              <div className="w-full h-full border-4 border-zinc-950 grid grid-cols-4 gap-1 p-1">
                <div className="bg-zinc-950"></div>
                <div className="bg-zinc-950"></div>
                <div className="bg-zinc-950"></div>
                <div className="bg-white"></div>
                <div className="bg-zinc-950"></div>
                <div className="bg-white"></div>
                <div className="bg-zinc-950"></div>
                <div className="bg-zinc-950"></div>
                <div className="bg-zinc-950"></div>
                <div className="bg-zinc-950"></div>
                <div className="bg-white"></div>
                <div className="bg-zinc-950"></div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-400">
              Secret Key: <span className="text-indigo-400 font-bold">NEXUS-8921-TOTP-SECRET</span>
            </div>

            <button
              onClick={() => setQrModal(false)}
              className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-xs font-sans transition"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Profile;