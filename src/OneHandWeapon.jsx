import React, { useState } from "react";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Loader,
  DollarSign,
  Zap,
  Sparkles,
  Star,
  Hash,
} from "lucide-react";

const OneHandWeapon = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedEnchantment, setSelectedEnchantment] = useState("");
  const [upgradeResults, setUpgradeResults] = useState([]);

  const cities = [
    "Bridgewatch",
    "Caerleon",
    "Fort Sterling",
    "Lymhurst",
    "Martlock",
    "Thetford",
    "Brecilien",
  ];

  // One hand silahlar
  const oneHandWeapons = [
    { id: "MAIN_ARCANESTAFF", name: "Arcane Staff" },
    { id: "MAIN_AXE", name: "Axe" },
    { id: "MAIN_ROCKMACE_KEEPER", name: "Rock Mace" },
    { id: "MAIN_RAPIER_MORGANA", name: "Morgana Rapier" },
    { id: "MAIN_SWORD", name: "Sword" },
    { id: "MAIN_FROSTSTAFF_AVALON", name: "Avalon Frost Staff" },
    { id: "MAIN_SCIMITAR_MORGANA", name: "Morgana Scimitar" },
    { id: "MAIN_CURSEDSTAFF", name: "Cursed Staff" },
    { id: "MAIN_DAGGER", name: "Dagger" },
    { id: "MAIN_SPEAR_LANCE_AVALON", name: "Avalon Lance" },
    { id: "MAIN_DAGGER_HELL", name: "Hell Dagger" },
    { id: "MAIN_MACE_CRYSTAL", name: "Crystal Mace" },
    { id: "MAIN_NATURESTAFF_KEEPER", name: "Keeper Nature Staff" },
    { id: "MAIN_FIRESTAFF", name: "Fire Staff" },
    { id: "MAIN_FIRESTAFF_CRYSTAL", name: "Crystal Fire Staff" },
    { id: "MAIN_NATURESTAFF_CRYSTAL", name: "Crystal Nature Staff" },
    { id: "MAIN_FROSTSTAFF", name: "Frost Staff" },
    { id: "MAIN_HOLYSTAFF_AVALON", name: "Avalon Holy Staff" },
    { id: "MAIN_HAMMER", name: "Hammer" },
    { id: "MAIN_SPEAR_KEEPER", name: "Keeper Spear" },
    { id: "MAIN_FROSTSTAFF_KEEPER", name: "Keeper Frost Staff" },
    { id: "MAIN_HOLYSTAFF", name: "Holy Staff" },
    { id: "MAIN_MACE_HELL", name: "Hell Mace" },
    { id: "MAIN_SWORD_CRYSTAL", name: "Crystal Sword" },
    { id: "MAIN_NATURESTAFF_AVALON", name: "Avalon Nature Staff" },
    { id: "MAIN_CURSEDSTAFF_UNDEAD", name: "Undead Cursed Staff" },
    { id: "MAIN_HOLYSTAFF_MORGANA", name: "Morgana Holy Staff" },
    { id: "MAIN_1HCROSSBOW", name: "1H Crossbow" },
    { id: "MAIN_MACE", name: "Mace" },
    { id: "MAIN_NATURESTAFF", name: "Nature Staff" },
    { id: "MAIN_CURSEDSTAFF_CRYSTAL", name: "Crystal Cursed Staff" },
    { id: "MAIN_CURSEDSTAFF_AVALON", name: "Avalon Cursed Staff" },
    { id: "MAIN_SPEAR", name: "Spear" },
    { id: "MAIN_FIRESTAFF_KEEPER", name: "Keeper Fire Staff" },
    { id: "MAIN_ARCANESTAFF_UNDEAD", name: "Undead Arcane Staff" },
  ];

  // Tier seçenekleri
  const tiers = ["T4", "T5", "T6", "T7", "T8"];

  // Enchantment seçenekleri (0, 1, 2 - 3 ve 4 hariç)
  const enchantments = ["0", "1", "2"];

  // Resource mapping - enchantment'a göre kaynak türü
  const getResourceType = (tier, fromEnch, toEnch) => {
    // Sadece enchantment upgrade'ine göre kaynak tipi belirlenir
    switch (true) {
      case fromEnch === 0 && toEnch === 1:
        return "RUNE";
      case fromEnch === 1 && toEnch === 2:
        return "SOUL";
      case fromEnch === 2 && toEnch === 3:
        return "RELIC";
      default:
        return "RUNE";
    }
  };

  // Resource ID'lerini oluştur (hem tier hem enchantment'a göre)
  const getResourceId = (tier, fromEnch, toEnch) => {
    const resourceType = getResourceType(tier, fromEnch, toEnch);
    // Tier numarasını al (örn. T5 -> 5)
    const tierNum = tier.replace("T", "");
    const resourceMap = {
      RUNE: `T${tierNum}_RUNE`,
      SOUL: `T${tierNum}_SOUL`,
      RELIC: `T${tierNum}_RELIC`,
    };
    return resourceMap[resourceType];
  };

  // Weapon ID'sini oluştur
  const getWeaponId = (weapon, tier, enchantment) => {
    const baseId = `${tier}_${weapon}`;
    return enchantment === "0" ? baseId : `${baseId}@${enchantment}`;
  };

  // Fiyatları çek
  const fetchPrices = async (itemIds, locations, withQuality = true) => {
    let url = `https://europe.albion-online-data.com/api/v2/stats/prices/${itemIds.join(
      ","
    )}?locations=${locations.join(",")}`;
    if (withQuality) {
      url += "&qualities=4";
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching prices:", error);
      throw error;
    }
  };

  // Upgrade hesaplama
  const calculateUpgrade = async () => {
    if (!selectedWeapon || !selectedTier || !selectedEnchantment) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    setLoading(true);
    setError("");
    setUpgradeResults([]);

    try {
      const currentEnch = parseInt(selectedEnchantment);
      const results = [];

      // Hangi upgrade'lerin mümkün olduğunu belirle
      const possibleUpgrades = [];
      for (let i = currentEnch + 1; i <= 3; i++) {
        possibleUpgrades.push(i);
      }

      if (possibleUpgrades.length === 0) {
        setError("Bu enchantment seviyesi için upgrade mümkün değil");
        setLoading(false);
        return;
      }

      // Gerekli item ID'leri topla
      const weaponIds = [];
      const resourceIds = new Set();

      // Mevcut silah
      const currentWeaponId = getWeaponId(
        selectedWeapon,
        selectedTier,
        selectedEnchantment
      );
      weaponIds.push(currentWeaponId);

      // Upgrade edilmiş silahlar ve kaynaklar (tüm adımlar için)
      for (const targetEnch of possibleUpgrades) {
        const targetWeaponId = getWeaponId(
          selectedWeapon,
          selectedTier,
          targetEnch.toString()
        );
        weaponIds.push(targetWeaponId);

        // Aradaki tüm adımlar için kaynakları ekle
        for (let step = currentEnch + 1; step <= targetEnch; step++) {
          const resourceId = getResourceId(selectedTier, step - 1, step);
          resourceIds.add(resourceId);
        }
      }

      // Fiyatları çek
      const [weaponPriceData, resourcePriceData, weaponLymhurstPriceData] =
        await Promise.all([
          fetchPrices(weaponIds, cities, true), // Silahlar için kalite 4 (tüm şehirler)
          fetchPrices(Array.from(resourceIds), ["Brecilien"], false), // Resource için kalite parametresi yok!
          fetchPrices(weaponIds, ["Lymhurst"], true), // Sadece Lymhurst fiyatları
        ]);
      console.log("Beklenen weaponIds:", weaponIds);
      console.log(
        "API'dan dönen item_id'ler (weapon):",
        weaponPriceData.map((i) => i.item_id)
      );
      console.log("Beklenen resourceIds:", Array.from(resourceIds));
      console.log(
        "API'dan dönen item_id'ler (resource):",
        resourcePriceData.map((i) => i.item_id)
      );
      console.log("weaponPriceData", weaponPriceData);
      console.log("resourcePriceData", resourcePriceData);
      console.log("weaponLymhurstPriceData", weaponLymhurstPriceData);

      // Fiyat verilerini organize et
      const weaponPriceMap = {};
      const lymhurstPriceMap = {};
      const resourcePriceMap = {};

      // Silah fiyatları: Önce Lymhurst, yoksa diğer şehirlerden en düşük fiyat
      weaponIds.forEach((weaponId) => {
        // Lymhurst'teki fiyatları bul (sadece Lymhurst datasından)
        const lymhurstItems = weaponLymhurstPriceData.filter(
          (item) =>
            item.item_id === weaponId &&
            item.sell_price_min &&
            item.sell_price_min > 0
        );
        if (lymhurstItems.length > 0) {
          // Lymhurst'te birden fazla varsa en düşük fiyatı al
          const minLymhurst = lymhurstItems.reduce((min, item) =>
            item.sell_price_min < min.sell_price_min ? item : min
          );
          lymhurstPriceMap[weaponId] = minLymhurst;
          weaponPriceMap[weaponId] = minLymhurst;
        } else {
          lymhurstPriceMap[weaponId] = null;
          // Diğer şehirlerdeki en düşük fiyatı bul
          const otherItems = weaponPriceData.filter(
            (item) =>
              item.item_id === weaponId &&
              item.sell_price_min &&
              item.sell_price_min > 0
          );
          if (otherItems.length > 0) {
            const minOther = otherItems.reduce((min, item) =>
              item.sell_price_min < min.sell_price_min ? item : min
            );
            weaponPriceMap[weaponId] = minOther;
          }
        }
      });

      // Kaynak fiyatları aynı kalabilir
      resourcePriceData.forEach((item) => {
        if (!item.sell_price_min || item.sell_price_min === 0) return;
        const existing = resourcePriceMap[item.item_id];
        if (!existing || item.sell_price_min < existing.sell_price_min) {
          resourcePriceMap[item.item_id] = item; // item.location ile şehir de tutuluyor
        }
      });

      // Mevcut silahın fiyatı
      const currentWeaponPrice = weaponPriceMap[currentWeaponId];
      const currentWeaponLymhurst = lymhurstPriceMap[currentWeaponId];
      if (!currentWeaponPrice || currentWeaponPrice.sell_price_min === 0) {
        console.warn("Eksik veya sıfır fiyat verisi:", {
          currentWeaponId,
          currentWeaponPrice,
          weaponPriceMap,
        });
        setError(
          `${selectedTier} ${selectedWeapon} +${selectedEnchantment} için hiçbir şehirde fiyat bulunamadı`
        );
        setLoading(false);
        return;
      }

      // Her upgrade için hesaplama yap
      for (const targetEnch of possibleUpgrades) {
        const targetWeaponId = getWeaponId(
          selectedWeapon,
          selectedTier,
          targetEnch.toString()
        );
        const targetWeaponPrice = weaponPriceMap[targetWeaponId];
        const targetWeaponLymhurst = lymhurstPriceMap[targetWeaponId];
        if (!targetWeaponPrice || targetWeaponPrice.sell_price_min === 0) {
          continue; // Bu upgrade için veri yok, atla
        }

        // Gerekli kaynaklar ve toplam upgrade maliyeti
        let totalResourceCost = 0;
        let resourceBreakdown = [];
        let allResourcesAvailable = true;
        let resourceCities = [];
        for (let step = currentEnch + 1; step <= targetEnch; step++) {
          const resourceType = getResourceType(selectedTier, step - 1, step);
          const resourceId = getResourceId(selectedTier, step - 1, step);
          const resourcePrice = resourcePriceMap[resourceId];
          if (!resourcePrice || resourcePrice.sell_price_min === 0) {
            allResourcesAvailable = false;
            break;
          }
          const cost = resourcePrice.sell_price_min * 288;
          totalResourceCost += cost;
          resourceBreakdown.push({
            resourceType,
            resourceId,
            cost,
            unitPrice: resourcePrice.sell_price_min,
            city: resourcePrice.location,
          });
          resourceCities.push(resourcePrice.location);
        }
        if (!allResourcesAvailable) {
          continue; // Kaynaklardan biri yoksa bu upgrade'i atla
        }

        // Hesaplamalar
        const currentValue = currentWeaponPrice.sell_price_min;
        const targetValue = targetWeaponPrice.sell_price_min;
        const upgradeCost = totalResourceCost;
        const totalCost = currentValue + upgradeCost;
        const profit = targetValue - totalCost;
        const profitPercent = ((profit / totalCost) * 100).toFixed(2);

        results.push({
          fromEnch: currentEnch,
          toEnch: targetEnch,
          currentValue,
          targetValue,
          resourceCost: upgradeCost,
          upgradeCost,
          totalCost,
          profit,
          profitPercent,
          resourceBreakdown,
          targetWeaponId,
          isProfit: profit > 0,
          currentWeaponCity: currentWeaponPrice.location,
          targetWeaponCity: targetWeaponPrice.location,
          resourceCities,
          currentWeaponLymhurst: currentWeaponLymhurst
            ? currentWeaponLymhurst.sell_price_min
            : null,
          targetWeaponLymhurst: targetWeaponLymhurst
            ? targetWeaponLymhurst.sell_price_min
            : null,
        });
      }

      if (results.length === 0) {
        setError("Hiçbir upgrade için yeterli veri bulunamadı");
      } else {
        setUpgradeResults(results);
      }
    } catch (err) {
      setError("Hesaplama sırasında hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fiyat formatlama
  const formatPrice = (price) => {
    if (!price || price === 0) return "N/A";
    return new Intl.NumberFormat("tr-TR").format(price);
  };

  // Silah adını temizle
  const getDisplayName = (weaponId) => {
    const weapon = oneHandWeapons.find((w) => w.id === weaponId);
    return weapon ? weapon.name : weaponId;
  };

  // Filtreleri temizle
  const clearAll = () => {
    setSelectedWeapon("");
    setSelectedTier("");
    setSelectedEnchantment("");
    setUpgradeResults([]);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            One-Hand Weapon Upgrade Calculator
          </h1>
          <p className="text-gray-300">
            Silah upgrade'lerinin karlılığını hesaplayın
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Kaynak: Brecilien | Satış: Lymhurst | Quality: 4
          </p>
        </div>

        {/* Selection Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Weapon Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Zap className="inline h-4 w-4 mr-1" />
                Silah <span className="text-red-400">*</span>
              </label>
              <select
                value={selectedWeapon}
                onChange={(e) => setSelectedWeapon(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Silah Seçin</option>
                {oneHandWeapons.map((weapon) => (
                  <option
                    key={weapon.id}
                    value={weapon.id}
                    className="bg-slate-800"
                  >
                    {weapon.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tier Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Hash className="inline h-4 w-4 mr-1" />
                Tier <span className="text-red-400">*</span>
              </label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Star className="inline h-4 w-4 mr-1" />
                Mevcut Enchantment <span className="text-red-400">*</span>
              </label>
              <select
                value={selectedEnchantment}
                onChange={(e) => setSelectedEnchantment(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          {(!selectedWeapon || !selectedTier || !selectedEnchantment) && (
            <div className="mb-6 p-4 bg-yellow-600/20 border border-yellow-500/50 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                <p className="text-yellow-200">
                  Hesaplama yapabilmek için <strong>silah</strong>,{" "}
                  <strong>tier</strong> ve <strong>mevcut enchantment</strong>{" "}
                  seçimi zorunludur.
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
                !selectedWeapon ||
                !selectedTier ||
                !selectedEnchantment
              }
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
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
            >
              Temizle
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {/* Results */}
        {upgradeResults.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Upgrade Sonuçları
            </h2>
            <p className="text-gray-300 mb-6">
              {getDisplayName(selectedWeapon)} {selectedTier} +
              {selectedEnchantment} için upgrade seçenekleri:
            </p>

            <div className="space-y-4">
              {upgradeResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 ${
                    result.isProfit
                      ? "bg-green-500/10 border-green-500/50"
                      : "bg-red-500/10 border-red-500/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center text-lg font-semibold text-white">
                        <Sparkles className="h-5 w-5 mr-2" />+{result.fromEnch}{" "}
                        → +{result.toEnch} Upgrade
                      </div>
                      <div className="ml-4 text-sm text-gray-300">
                        Kaynak:{" "}
                        {result.resourceBreakdown &&
                          result.resourceBreakdown.map((r, i) => (
                            <span key={i}>
                              {i > 0 && ", "}
                              {r.resourceType} ({r.city})
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {result.isProfit ? (
                        <TrendingUp className="h-6 w-6 text-green-400 mr-2" />
                      ) : (
                        <TrendingDown className="h-6 w-6 text-red-400 mr-2" />
                      )}
                      <span
                        className={`text-lg font-bold ${
                          result.isProfit ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {result.profitPercent}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Mevcut Değer:</span>
                      {result.currentWeaponLymhurst ? (
                        <p className="text-white font-medium">
                          {formatPrice(result.currentValue)}
                          <span className="text-xs text-gray-400 ml-1">
                            ({result.currentWeaponCity})
                          </span>
                          <span className="block text-xs text-yellow-400">
                            Lymhurst'te:{" "}
                            {formatPrice(result.currentWeaponLymhurst)}
                          </span>
                        </p>
                      ) : (
                        <p className="text-white font-medium">
                          {result.currentWeaponCity ? (
                            <>
                              <span className="font-semibold text-purple-300">
                                {result.currentWeaponCity}
                              </span>
                              'de: {formatPrice(result.currentValue)}
                            </>
                          ) : (
                            <>
                              <span className="font-semibold text-yellow-300">
                                Tahmini fiyat:
                              </span>{" "}
                              {formatPrice(result.currentValue)}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-400">Upgrade Maliyeti:</span>
                      <p className="text-white font-medium">
                        {formatPrice(result.upgradeCost)}
                        <span className="text-xs text-gray-400 ml-1">
                          {/* Kaynak şehirleri */}
                          {result.resourceBreakdown &&
                            result.resourceBreakdown.map((r, i) => (
                              <span key={i}>
                                {i > 0 && ", "}
                                {r.resourceType} ({r.city})
                              </span>
                            ))}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Hedef Değer:</span>
                      {result.targetWeaponLymhurst ? (
                        <p className="text-white font-medium">
                          {formatPrice(result.targetValue)}
                          <span className="text-xs text-gray-400 ml-1">
                            ({result.targetWeaponCity})
                          </span>
                          <span className="block text-xs text-yellow-400">
                            Lymhurst'te:{" "}
                            {formatPrice(result.targetWeaponLymhurst)}
                          </span>
                        </p>
                      ) : (
                        <p className="text-white font-medium">
                          {result.targetWeaponCity ? (
                            <>
                              <span className="font-semibold text-purple-300">
                                {result.targetWeaponCity}
                              </span>
                              'de: {formatPrice(result.targetValue)}
                            </>
                          ) : (
                            <>
                              <span className="font-semibold text-yellow-300">
                                Tahmini fiyat:
                              </span>{" "}
                              {formatPrice(result.targetValue)}
                            </>
                          )}
                        </p>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-400">Net Kar:</span>
                      <p
                        className={`font-bold ${
                          result.isProfit ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {result.profit > 0 ? "+" : ""}
                        {formatPrice(result.profit)}
                      </p>
                    </div>
                  </div>

                  {/* Kaynak detayları */}
                  {result.resourceBreakdown && (
                    <div className="mt-2 text-xs text-gray-400">
                      <strong>Kaynaklar:</strong>
                      {result.resourceBreakdown.map((r, i) => (
                        <div key={i}>
                          {r.resourceType}: {formatPrice(r.unitPrice)} x 288 ={" "}
                          {formatPrice(r.cost)} ({r.city})
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Fiyat detayları */}
                  <div className="mt-2 text-xs text-gray-400">
                    <strong>Fiyat Detayları:</strong>
                    <div>
                      Mevcut Silah: {formatPrice(result.currentValue)} (
                      {result.currentWeaponCity})
                    </div>
                    <div>
                      Hedef Silah: {formatPrice(result.targetValue)} (
                      {result.targetWeaponCity})
                    </div>
                    {result.resourceBreakdown &&
                      result.resourceBreakdown.map((r, i) => (
                        <div key={i}>
                          {r.resourceType}: {formatPrice(r.unitPrice)} ({r.city}
                          )
                        </div>
                      ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-xs text-gray-400">
                      <p>
                        <strong>Hesaplama:</strong> Mevcut silah değeri (
                        {formatPrice(result.currentValue)}) + Upgrade maliyeti (
                        {formatPrice(result.upgradeCost)}) = Toplam maliyet (
                        {formatPrice(result.totalCost)})
                      </p>
                      <p>
                        <strong>Kar:</strong> Hedef silah değeri (
                        {formatPrice(result.targetValue)}) - Toplam maliyet (
                        {formatPrice(result.totalCost)}) =
                        {result.profit > 0 ? " +" : " "}
                        {formatPrice(result.profit)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && upgradeResults.length === 0 && !error && (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Upgrade Hesaplayıcı Hazır
            </h3>
            <p className="text-gray-400">
              Silah, tier ve enchantment seçip hesaplamayı başlatın
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneHandWeapon;
