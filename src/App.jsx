import React, { useState } from "react";
import AlbionItemSearch from "./AlbionItemSearch.jsx";
import OneHandWeapon from "./OneHandWeapon.jsx";

const App = () => {
  const [page, setPage] = useState("item"); // "item" veya "upgrade"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Sayfa Geçiş Butonları */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setPage("item")}
            className={`py-2 px-6 rounded-lg font-bold transition-colors border-2 border-purple-500/50 text-white ${
              page === "item"
                ? "bg-purple-600/80 border-purple-500"
                : "bg-white/10 hover:bg-purple-600/30"
            }`}
          >
            Item Fiyatları
          </button>
          <button
            onClick={() => setPage("upgrade")}
            className={`py-2 px-6 rounded-lg font-bold transition-colors border-2 border-purple-500/50 text-white ${
              page === "upgrade"
                ? "bg-purple-600/80 border-purple-500"
                : "bg-white/10 hover:bg-purple-600/30"
            }`}
          >
            One-Hand Upgrade
          </button>
        </div>
        {/* Sayfa İçeriği */}
        {page === "item" ? <AlbionItemSearch /> : <OneHandWeapon />}
      </div>
    </div>
  );
};

export default App;
