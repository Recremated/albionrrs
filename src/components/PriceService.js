import { cacheService } from "../services/CacheService.js";

// Price fetching service for Albion Online data
export const fetchPrices = async (itemIds, locations, withQuality = true) => {
  let url = `https://europe.albion-online-data.com/api/v2/stats/prices/${itemIds.join(
    ","
  )}?locations=${locations.join(",")}`;
  if (withQuality) {
    url += "&qualities=4"; // Default olarak Excellent (4) kullan
  }

  console.log("PriceService - Requesting itemIds:", itemIds);
  console.log("PriceService - URL:", url);

  // Cache key oluştur
  const cacheKey = cacheService.generateKey(url);

  // Cache'den kontrol et
  const cachedData = cacheService.get(cacheKey);
  if (cachedData) {
    console.log("PriceService - Returning cached data");
    return cachedData;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  console.log("PriceService - API Response:", data);

  // Cache'e kaydet
  cacheService.set(cacheKey, data);

  return data;
};

/**
 * Fiyat fallback mantığı: Lymhurst anlık fiyat > Lymhurst 1g ortalama > Lymhurst 7g ortalama > diğer şehirlerde en düşük anlık fiyat > null
 * @param {string} itemId - Tam item ID (örn: T4_MAIN_DAGGER@1)
 * @param {string|number} quality - 1-5 arası kalite (Albion API: 1=Normal, 2=Good, ...)
 * @returns {Promise<number|null>} - Bulunan en iyi fiyat veya null
 * NOT: Enchantment parametresi itemId'ye gömülü olmalı, ayrıca verilmez.
 */
export const getPriceFallback = async (itemId, quality) => {
  // 1. Lymhurst anlık fiyatı
  const lymhurst = "Lymhurst";
  const otherCities = [
    "Caerleon",
    "Bridgewatch",
    "Fort Sterling",
    "Martlock",
    "Thetford",
  ];

  // 1. Lymhurst anlık fiyat
  try {
    const realTimeData = await fetchPrices([itemId], [lymhurst], true);
    const lymhurstItem = realTimeData.find(
      (item) =>
        item.item_id === itemId &&
        String(item.quality) === String(quality) &&
        item.sell_price_min > 0
    );
    if (lymhurstItem) {
      return lymhurstItem.sell_price_min;
    }
  } catch {
    // Devam et
  }

  // 2. Lymhurst 1 günlük ortalama fiyat (volume >= 1)
  try {
    const url1d = `https://europe.albion-online-data.com/api/v2/stats/history/${itemId}.json?locations=${lymhurst}&qualities=${quality}&time-scale=24`;
    const resp1d = await fetch(url1d);
    if (resp1d.ok) {
      const hist1d = await resp1d.json();
      // Son 1 günün verisi (en güncel gün)
      if (Array.isArray(hist1d) && hist1d.length > 0) {
        const lastDay = hist1d[hist1d.length - 1];
        if (lastDay && lastDay.avg_price > 0 && lastDay.volume >= 1) {
          return lastDay.avg_price;
        }
      }
    }
  } catch {
    // Devam et
  }

  // 3. Lymhurst 7 günlük ortalama fiyat (volume >= 2)
  try {
    const url7d = `https://europe.albion-online-data.com/api/v2/stats/history/${itemId}.json?locations=${lymhurst}&qualities=${quality}&time-scale=168`;
    const resp7d = await fetch(url7d);
    if (resp7d.ok) {
      const hist7d = await resp7d.json();
      // Son 7 günün verisi (en güncel gün)
      if (Array.isArray(hist7d) && hist7d.length > 0) {
        const lastWeek = hist7d[hist7d.length - 1];
        if (lastWeek && lastWeek.avg_price > 0 && lastWeek.volume >= 2) {
          return lastWeek.avg_price;
        }
      }
    }
  } catch {
    // Devam et
  }

  // 4. Diğer şehirlerdeki anlık fiyatlardan en düşük olanı
  try {
    const otherData = await fetchPrices([itemId], otherCities, true);
    // Sadece istenen kalite ve fiyatı olanlar
    const valid = otherData.filter(
      (item) =>
        item.item_id === itemId &&
        String(item.quality) === String(quality) &&
        item.sell_price_min > 0
    );
    if (valid.length > 0) {
      // En düşük fiyatı bul
      const minItem = valid.reduce((min, item) =>
        item.sell_price_min < min.sell_price_min ? item : min
      );
      return minItem.sell_price_min;
    }
  } catch {
    // Devam et
  }

  // Hiçbir yerde fiyat yoksa null
  return null;
};

// Format price with Turkish locale
export const formatPrice = (price) => {
  if (!price || price === 0) return "N/A";
  return new Intl.NumberFormat("tr-TR").format(price);
};
