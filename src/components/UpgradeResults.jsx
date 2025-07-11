import React from "react";
import UpgradeResult from "./UpgradeResult.jsx";

const UpgradeResults = ({
  upgradeResults,
  selectedWeapon,
  selectedTier,
  selectedEnchantment,
  selectedWeaponType,
  getDisplayName,
}) => {
  if (upgradeResults.length === 0) {
    return null;
  }

  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
      style={{
        backgroundColor: "rgba(62, 62, 71, 0.3)",
        borderColor: "rgba(223, 224, 226, 0.1)",
      }}
    >
      <h2
        className="text-2xl font-bold text-white mb-4"
        style={{ color: "#dfe0e2" }}
      >
        Upgrade Sonuçları
      </h2>
      <p className="text-gray-300 mb-6" style={{ color: "#9ca3af" }}>
        {getDisplayName(selectedWeapon)} {selectedTier} +{selectedEnchantment} (
        {selectedWeaponType === "oneHand"
          ? "One-Hand Silah"
          : selectedWeaponType === "twoHand"
          ? "Two-Hand Silah"
          : selectedWeaponType === "helmet"
          ? "Helmet"
          : selectedWeaponType === "armor"
          ? "Armor"
          : selectedWeaponType === "shoes"
          ? "Shoes"
          : "Cape"}
        ) için upgrade seçenekleri:
      </p>

      <div className="space-y-4">
        {upgradeResults.map((result, index) => (
          <UpgradeResult key={index} result={result} />
        ))}
      </div>
    </div>
  );
};

export default UpgradeResults;
