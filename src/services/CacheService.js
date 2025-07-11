import { PERFORMANCE } from "../data/constants.js";

class CacheService {
  constructor() {
    this.cache = new Map();
  }

  // Cache key oluştur
  generateKey(url, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    return `${url}?${sortedParams}`;
  }

  // Cache'den veri al
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    // Cache süresi dolmuş mu kontrol et
    if (Date.now() - item.timestamp > PERFORMANCE.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  // Cache'e veri kaydet
  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  // Cache'i temizle
  clear() {
    this.cache.clear();
  }

  // Belirli bir key'i sil
  delete(key) {
    this.cache.delete(key);
  }

  // Cache boyutunu al
  size() {
    return this.cache.size;
  }
}

export const cacheService = new CacheService();
