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

// Format price with Turkish locale
export const formatPrice = (price) => {
  if (!price || price === 0) return "N/A";
  return new Intl.NumberFormat("tr-TR").format(price);
};
