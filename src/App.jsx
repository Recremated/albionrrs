import React, { useState, Suspense, lazy } from "react";
import LoadingState from "./components/LoadingState.jsx";

// Lazy load components
const ItemSearchPage = lazy(() => import("./ItemSearchPage.jsx"));
const ItemUpgradeCalculator = lazy(() => import("./ItemUpgradeCalculator.jsx"));

const App = () => {
  const [page, setPage] = useState("item"); // "item" veya "upgrade"

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-4"
      style={{
        background:
          "linear-gradient(135deg, #1c1f26 0%, #3e3e47 50%, #1c1f26 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Sayfa Geçiş Butonları */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setPage("item")}
            className={`py-3 px-8 rounded-xl font-bold transition-all duration-300 border-2 text-white flex items-center gap-2 ${
              page === "item"
                ? "shadow-lg"
                : "bg-white/10 hover:bg-yellow-600/30 border-yellow-500/50 hover:border-yellow-400 hover:shadow-lg"
            }`}
            style={{
              background:
                page === "item"
                  ? "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)"
                  : "transparent",
              borderColor:
                page === "item" ? "#d4af37" : "rgba(212, 175, 55, 0.5)",
              boxShadow:
                page === "item"
                  ? "0 10px 25px rgba(212, 175, 55, 0.3)"
                  : "none",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white"></div>
            Item Fiyatları
          </button>
          <button
            onClick={() => setPage("upgrade")}
            className={`py-3 px-8 rounded-xl font-bold transition-all duration-300 border-2 text-white flex items-center gap-2 ${
              page === "upgrade"
                ? "shadow-lg"
                : "bg-white/10 hover:bg-green-600/30 border-green-500/50 hover:border-green-400 hover:shadow-lg"
            }`}
            style={{
              background:
                page === "upgrade"
                  ? "linear-gradient(135deg, #4d774e 0%, #6b8c6b 100%)"
                  : "transparent",
              borderColor:
                page === "upgrade" ? "#4d774e" : "rgba(77, 119, 78, 0.5)",
              boxShadow:
                page === "upgrade"
                  ? "0 10px 25px rgba(77, 119, 78, 0.3)"
                  : "none",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white"></div>
            Item Upgrade
          </button>
        </div>
        {/* Sayfa İçeriği */}
        <Suspense fallback={<LoadingState loadingItems={true} />}>
          {page === "item" ? <ItemSearchPage /> : <ItemUpgradeCalculator />}
        </Suspense>
      </div>
    </div>
  );
};

export default App;
