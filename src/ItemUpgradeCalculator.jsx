import React, { useState, useMemo, useCallback } from "react";
import {
  oneHandWeapons,
  twoHandWeapons,
  helmets,
  armors,
  shoes,
  capes,
  tiers,
  enchantments,
} from "./data/items.js";
import { calculateUpgrade } from "./components/UpgradeCalculationService.js";
import Header from "./components/Header.jsx";
import ItemSelectionForm from "./components/ItemSelectionForm.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import UpgradeResults from "./components/UpgradeResults.jsx";
import EmptyState from "./components/EmptyState.jsx";

const UpgradeCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedEnchantment, setSelectedEnchantment] = useState("");
  const [selectedWeaponType, setSelectedWeaponType] = useState("oneHand");
  const [upgradeResults, setUpgradeResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Filtreleri temizle
  const clearAll = useCallback(() => {
    setSelectedWeapon("");
    setSelectedTier("");
    setSelectedEnchantment("");
    setSelectedWeaponType("oneHand");
    setSearchTerm("");
    setShowSearchResults(false);
    setUpgradeResults([]);
    setError("");
  }, []);

  // Seçili item tipine göre item listesini al - memoized
  const getWeaponList = useMemo(() => {
    switch (selectedWeaponType) {
      case "oneHand":
        return oneHandWeapons;
      case "twoHand":
        return twoHandWeapons;
      case "helmet":
        return helmets;
      case "armor":
        return armors;
      case "shoes":
        return shoes;
      case "cape":
        return capes;
      default:
        return oneHandWeapons;
    }
  }, [selectedWeaponType]);

  // Arama sonuçlarını filtrele - memoized
  const getFilteredWeapons = useCallback(() => {
    if (!searchTerm.trim()) return [];

    return getWeaponList
      .filter(
        (weapon) =>
          weapon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          weapon.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 10); // Maksimum 10 sonuç göster
  }, [searchTerm, getWeaponList]);

  // Item adını temizle - memoized
  const getDisplayName = useCallback((weaponId) => {
    const allItems = [
      ...oneHandWeapons,
      ...twoHandWeapons,
      ...helmets,
      ...armors,
      ...shoes,
      ...capes,
    ];
    const weapon = allItems.find((w) => w.id === weaponId);
    return weapon ? weapon.name : weaponId;
  }, []);

  // Upgrade hesaplama
  const handleCalculateUpgrade = useCallback(() => {
    calculateUpgrade(
      selectedWeaponType,
      selectedWeapon,
      selectedTier,
      selectedEnchantment,
      setLoading,
      setError,
      setUpgradeResults
    );
  }, [selectedWeaponType, selectedWeapon, selectedTier, selectedEnchantment]);

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header />

        {/* Selection Form */}
        <ItemSelectionForm
          selectedWeaponType={selectedWeaponType}
          setSelectedWeaponType={setSelectedWeaponType}
          selectedWeapon={selectedWeapon}
          setSelectedWeapon={setSelectedWeapon}
          selectedTier={selectedTier}
          setSelectedTier={setSelectedTier}
          selectedEnchantment={selectedEnchantment}
          setSelectedEnchantment={setSelectedEnchantment}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showSearchResults={showSearchResults}
          setShowSearchResults={setShowSearchResults}
          loading={loading}
          calculateUpgrade={handleCalculateUpgrade}
          clearAll={clearAll}
          getFilteredWeapons={getFilteredWeapons}
          tiers={tiers}
          enchantments={enchantments}
        />

        {/* Error Message */}
        <ErrorMessage error={error} />

        {/* Results */}
        <UpgradeResults
          upgradeResults={upgradeResults}
          selectedWeapon={selectedWeapon}
          selectedTier={selectedTier}
          selectedEnchantment={selectedEnchantment}
          selectedWeaponType={selectedWeaponType}
          getDisplayName={getDisplayName}
        />

        {/* Empty State */}
        <EmptyState loading={loading} />
      </div>
    </div>
  );
};

export default UpgradeCalculator;
