import React, { useEffect, useCallback } from "react";
import { Zap } from "lucide-react";

const ItemSearch = ({
  searchTerm,
  setSearchTerm,
  setSelectedItem,
  showSearchResults,
  setShowSearchResults,
  getFilteredWeapons,
}) => {
  // Dışarı tıklandığında arama sonuçlarını kapat
  const handleClickOutside = useCallback(
    (e) => {
      if (!e.target.closest(".weapon-search-container")) {
        setShowSearchResults(false);
      }
    },
    [setShowSearchResults]
  );

  // Component mount olduğunda event listener ekle
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Item seç - artık base item ID'sini kullan
  const selectWeapon = (weapon) => {
    // Base item ID'sini kullan (tier olmadan)
    const baseItemId = weapon.baseItemId || weapon.itemId || weapon.id;
    setSelectedItem(baseItemId);
    setSearchTerm(weapon.displayName || weapon.name);
    setShowSearchResults(false);
  };

  return (
    <div className="relative weapon-search-container">
      <label
        className="block text-sm font-medium text-gray-300 mb-2"
        style={{ color: "#dfe0e2" }}
      >
        <Zap className="inline h-4 w-4 mr-1" style={{ color: "#d4af37" }} />
        Item{" "}
        <span className="text-red-400" style={{ color: "#9e2b25" }}>
          *
        </span>
      </label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowSearchResults(true);
          if (!e.target.value) {
            setSelectedItem("");
          }
        }}
        onFocus={() => setShowSearchResults(true)}
        placeholder="Item adı veya ID'si yazın..."
        className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
        style={{
          backgroundColor: "rgba(62, 62, 71, 0.5)",
          borderColor: "rgba(223, 224, 226, 0.2)",
          color: "#dfe0e2",
        }}
      />

      {/* Arama Sonuçları */}
      {showSearchResults && searchTerm.trim() && (
        <div
          className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/20 rounded-lg max-h-60 overflow-y-auto"
          style={{
            backgroundColor: "#1c1f26",
            borderColor: "rgba(223, 224, 226, 0.1)",
          }}
        >
          {getFilteredWeapons().length > 0 ? (
            getFilteredWeapons().map((weapon) => (
              <div
                key={weapon.itemId || weapon.id}
                onClick={() => selectWeapon(weapon)}
                className="p-2 hover:bg-purple-600/30 cursor-pointer text-white border-b border-white/10 last:border-b-0"
                style={{
                  color: "#dfe0e2",
                  borderColor: "rgba(223, 224, 226, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(212, 175, 55, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                {weapon.displayName || weapon.name}
              </div>
            ))
          ) : (
            <div
              className="p-2 text-gray-400 text-sm"
              style={{ color: "#9ca3af" }}
            >
              Sonuç bulunamadı
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemSearch;
