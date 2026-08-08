import Navbar from "./Navbar";
import Sidebar from "./sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Grid */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;