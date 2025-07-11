import { fetchPrices } from "./PriceService.js";
import {
  cities,
  getResourceType,
  getResourceId,
  getWeaponId,
  getHelmetId,
  getArmorId,
  getShoesId,
  getCapeId,
  getResourceAmount,
} from "../data/items.js";

export const calculateUpgrade = async (
  selectedWeaponType,
  selectedWeapon,
  selectedTier,
  selectedEnchantment,
  setLoading,
  setError,
  setUpgradeResults
) => {
  if (
    !selectedWeaponType ||
    !selectedWeapon ||
    !selectedTier ||
    !selectedEnchantment
  ) {
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

    // Mevcut item (weapon, helmet, armor, shoes veya cape)
    const currentItemId =
      selectedWeaponType === "helmet"
        ? getHelmetId(selectedWeapon, selectedTier, selectedEnchantment)
        : selectedWeaponType === "armor"
        ? getArmorId(selectedWeapon, selectedTier, selectedEnchantment)
        : selectedWeaponType === "shoes"
        ? getShoesId(selectedWeapon, selectedTier, selectedEnchantment)
        : selectedWeaponType === "cape"
        ? getCapeId(selectedWeapon, selectedTier, selectedEnchantment)
        : getWeaponId(selectedWeapon, selectedTier, selectedEnchantment);
    weaponIds.push(currentItemId);

    // Upgrade edilmiş itemlar ve kaynaklar (tüm adımlar için)
    for (const targetEnch of possibleUpgrades) {
      const targetItemId =
        selectedWeaponType === "helmet"
          ? getHelmetId(selectedWeapon, selectedTier, targetEnch.toString())
          : selectedWeaponType === "armor"
          ? getArmorId(selectedWeapon, selectedTier, targetEnch.toString())
          : selectedWeaponType === "shoes"
          ? getShoesId(selectedWeapon, selectedTier, targetEnch.toString())
          : selectedWeaponType === "cape"
          ? getCapeId(selectedWeapon, selectedTier, targetEnch.toString())
          : getWeaponId(selectedWeapon, selectedTier, targetEnch.toString());
      weaponIds.push(targetItemId);

      // Aradaki tüm adımlar için kaynakları ekle
      for (let step = currentEnch + 1; step <= targetEnch; step++) {
        const resourceId = getResourceId(selectedTier, step - 1, step);
        resourceIds.add(resourceId);
      }
    }

    // Fiyatları çek
    const [weaponPriceData, resourcePriceData, weaponLymhurstPriceData] =
      await Promise.all([
        fetchPrices(weaponIds, cities, true), // Itemlar için kalite 4 (tüm şehirler)
        fetchPrices(Array.from(resourceIds), ["Brecilien"], false), // Resource için kalite parametresi yok!
        fetchPrices(weaponIds, ["Lymhurst"], true), // Sadece Lymhurst fiyatları
      ]);

    // Fiyat verilerini organize et
    const weaponPriceMap = {};
    const lymhurstPriceMap = {};
    const resourcePriceMap = {};

    // Item fiyatları: Önce Lymhurst, yoksa diğer şehirlerden en düşük fiyat
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

    // Mevcut itemın fiyatı
    const currentItemPrice = weaponPriceMap[currentItemId];
    const currentItemLymhurst = lymhurstPriceMap[currentItemId];
    if (!currentItemPrice || currentItemPrice.sell_price_min === 0) {
      setError(
        `${selectedTier} ${selectedWeapon} +${selectedEnchantment} için hiçbir şehirde fiyat bulunamadı`
      );
      setLoading(false);
      return;
    }

    // Her upgrade için hesaplama yap
    for (const targetEnch of possibleUpgrades) {
      const targetItemId =
        selectedWeaponType === "helmet"
          ? getHelmetId(selectedWeapon, selectedTier, targetEnch.toString())
          : selectedWeaponType === "armor"
          ? getArmorId(selectedWeapon, selectedTier, targetEnch.toString())
          : selectedWeaponType === "shoes"
          ? getShoesId(selectedWeapon, selectedTier, targetEnch.toString())
          : selectedWeaponType === "cape"
          ? getCapeId(selectedWeapon, selectedTier, targetEnch.toString())
          : getWeaponId(selectedWeapon, selectedTier, targetEnch.toString());
      const targetItemPrice = weaponPriceMap[targetItemId];
      const targetItemLymhurst = lymhurstPriceMap[targetItemId];
      if (!targetItemPrice || targetItemPrice.sell_price_min === 0) {
        continue; // Bu upgrade için veri yok, atla
      }

      // Gerekli kaynaklar ve toplam upgrade maliyeti
      let totalResourceCost = 0;
      const resourceBreakdown = [];
      let allResourcesAvailable = true;
      const resourceCities = [];

      // Resource miktarını belirle
      const resourceAmount = getResourceAmount(selectedWeaponType);

      for (let step = currentEnch + 1; step <= targetEnch; step++) {
        const resourceType = getResourceType(selectedTier, step - 1, step);
        const resourceId = getResourceId(selectedTier, step - 1, step);
        const resourcePrice = resourcePriceMap[resourceId];
        if (!resourcePrice || resourcePrice.sell_price_min === 0) {
          allResourcesAvailable = false;
          break;
        }
        const cost = resourcePrice.sell_price_min * resourceAmount;
        totalResourceCost += cost;
        resourceBreakdown.push({
          resourceType,
          resourceId,
          cost,
          unitPrice: resourcePrice.sell_price_min,
          city: resourcePrice.location,
          amount: resourceAmount,
        });
        resourceCities.push(resourcePrice.location);
      }
      if (!allResourcesAvailable) {
        continue; // Kaynaklardan biri yoksa bu upgrade'i atla
      }

      // Hesaplamalar
      const currentValue = currentItemPrice.sell_price_min;
      const targetValue = targetItemPrice.sell_price_min;
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
        targetItemId,
        isProfit: profit > 0,
        currentItemCity: currentItemPrice.location,
        targetItemCity: targetItemPrice.location,
        resourceCities,
        currentItemLymhurst: currentItemLymhurst
          ? currentItemLymhurst.sell_price_min
          : null,
        targetItemLymhurst: targetItemLymhurst
          ? targetItemLymhurst.sell_price_min
          : null,
        itemType: selectedWeaponType,
        resourceAmount,
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
