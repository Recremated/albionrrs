import React from "react";
import { Zap, Hash, Star, AlertCircle, Calculator, Loader } from "lucide-react";
import ItemSearch from "./ItemSearch.jsx";

const WeaponSelectionForm = ({
  selectedWeaponType,
  setSelectedWeaponType,
  selectedWeapon,
  setSelectedWeapon,
  selectedTier,
  setSelectedTier,
  selectedEnchantment,
  setSelectedEnchantment,
  searchTerm,
  setSearchTerm,
  showSearchResults,
  setShowSearchResults,
  loading,
  calculateUpgrade,
  clearAll,
  getFilteredWeapons,
  tiers,
  enchantments,
}) => {
  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20"
      style={{
        backgroundColor: "rgba(62, 62, 71, 0.3)",
        borderColor: "rgba(223, 224, 226, 0.1)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Weapon Type Selection */}
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            style={{ color: "#dfe0e2" }}
          >
            <Zap className="inline h-4 w-4 mr-1" style={{ color: "#d4af37" }} />
            Item Tipi{" "}
            <span className="text-red-400" style={{ color: "#9e2b25" }}>
              *
            </span>
          </label>
          <select
            value={selectedWeaponType}
            onChange={(e) => {
              setSelectedWeaponType(e.target.value);
              setSelectedWeapon(""); // Item seçimini sıfırla
              setSearchTerm(""); // Arama terimini de sıfırla
            }}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{
              backgroundColor: "rgba(62, 62, 71, 0.5)",
              borderColor: "rgba(223, 224, 226, 0.2)",
              color: "#dfe0e2",
            }}
          >
            <option value="oneHand">One-Hand Silah (288 birim)</option>
            <option value="twoHand">Two-Hand Silah (384 birim)</option>
            <option value="helmet">Helmet (96 birim)</option>
            <option value="armor">Armor (192 birim)</option>
            <option value="shoes">Shoes (96 birim)</option>
            <option value="cape">Cape (96 birim)</option>
          </select>
        </div>

        {/* Weapon Selection */}
        <ItemSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedItem={setSelectedWeapon}
          showSearchResults={showSearchResults}
          setShowSearchResults={setShowSearchResults}
          getFilteredWeapons={getFilteredWeapons}
        />

        {/* Tier Selection */}
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            style={{ color: "#dfe0e2" }}
          >
            <Hash
              className="inline h-4 w-4 mr-1"
              style={{ color: "#d4af37" }}
            />
            Tier{" "}
            <span className="text-red-400" style={{ color: "#9e2b25" }}>
              *
            </span>
          </label>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{
              backgroundColor: "rgba(62, 62, 71, 0.5)",
              borderColor: "rgba(223, 224, 226, 0.2)",
              color: "#dfe0e2",
            }}
          >
            <option value="">Tier Seçin</option>
            {tiers.map((tier) => (
              <option key={tier} value={tier} className="bg-slate-800">
                {tier}
              </option>
            ))}
          </select>
        </div>

        {/* Enchantment Selection */}
        <div>
          <label
            className="block text-sm font-medium text-gray-300 mb-2"
            style={{ color: "#dfe0e2" }}
          >
            <Star
              className="inline h-4 w-4 mr-1"
              style={{ color: "#d4af37" }}
            />
            Mevcut Enchantment{" "}
            <span className="text-red-400" style={{ color: "#9e2b25" }}>
              *
            </span>
          </label>
          <select
            value={selectedEnchantment}
            onChange={(e) => setSelectedEnchantment(e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{
              backgroundColor: "rgba(62, 62, 71, 0.5)",
              borderColor: "rgba(223, 224, 226, 0.2)",
              color: "#dfe0e2",
            }}
          >
            <option value="">Enchantment Seçin</option>
            {enchantments.map((ench) => (
              <option key={ench} value={ench} className="bg-slate-800">
                +{ench}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Required Fields Warning */}
      {(!selectedWeaponType ||
        !selectedWeapon ||
        !selectedTier ||
        !selectedEnchantment) && (
        <div
          className="mb-6 p-4 bg-yellow-600/20 border border-yellow-500/50 rounded-lg"
          style={{
            backgroundColor: "rgba(212, 175, 55, 0.1)",
            borderColor: "rgba(212, 175, 55, 0.3)",
          }}
        >
          <div className="flex items-center">
            <AlertCircle
              className="h-5 w-5 text-yellow-400 mr-2"
              style={{ color: "#d4af37" }}
            />
            <p className="text-yellow-200" style={{ color: "#e8c95f" }}>
              Hesaplama yapabilmek için <strong>item tipi</strong>,{" "}
              <strong>item</strong>, <strong>tier</strong> ve{" "}
              <strong>mevcut enchantment</strong> seçimi zorunludur.
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={calculateUpgrade}
          disabled={
            loading ||
            !selectedWeaponType ||
            !selectedWeapon ||
            !selectedTier ||
            !selectedEnchantment
          }
          className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
          style={{
            background: "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)",
            boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
          }}
        >
          {loading ? (
            <>
              <Loader className="inline h-4 w-4 mr-2 animate-spin" />
              Hesaplanıyor...
            </>
          ) : (
            <>
              <Calculator className="inline h-4 w-4 mr-2" />
              Upgrade Hesapla
            </>
          )}
        </button>
        <button
          onClick={clearAll}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          style={{
            backgroundColor: "#3e3e47",
            color: "#dfe0e2",
          }}
        >
          Temizle
        </button>
      </div>
    </div>
  );
};

export default WeaponSelectionForm;
