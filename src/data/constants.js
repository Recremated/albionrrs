// Tier seçenekleri
export const tiers = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"];

// Enchantment seçenekleri
export const enchantments = ["0", "1", "2", "3", "4"];

// Quality seçenekleri
export const qualities = [
  "Normal",
  "Good",
  "Outstanding",
  "Excellent",
  "Masterpiece",
];

// Quality kısa formatları
export const qualityShortNames = {
  Normal: "N",
  Good: "G",
  Outstanding: "O",
  Excellent: "E",
  Masterpiece: "M",
};

// API'den gelen sayısal quality değerlerini metin formatına çevir
export const qualityNumberToText = {
  1: "Normal",
  2: "Good",
  3: "Outstanding",
  4: "Excellent",
  5: "Masterpiece",
};

// Quality renkleri
export const qualityColors = {
  Normal: "#414041",
  Good: "#5D6C85",
  Outstanding: "#753A17",
  Excellent: "#EFF5F7",
  Masterpiece: "#FFDC6C",
};

// Tier renkleri (Albion Online resmi renk paleti)
export const tierColors = {
  T3: { light: "#3D4D2F", dark: "#567043" },
  T4: { light: "#335870", dark: "#557E98" },
  T5: { light: "#6F2019", dark: "#934038" },
  T6: { light: "#BE6A2A", dark: "#D8894C" },
  T7: { light: "#C8A940", dark: "#E8C95F" },
  T8: { light: "#D4D4D4", dark: "#FFFFFF" },
};

// API URLs
export const API_URLS = {
  items:
    "https://raw.githubusercontent.com/ao-data/ao-bin-dumps/master/formatted/items.txt",
  prices: "https://europe.albion-online-data.com/api/v2/stats/prices",
};

// Performance constants
export const PERFORMANCE = {
  MAX_SEARCH_RESULTS: 10,
  DEBOUNCE_DELAY: 300,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// UI constants
export const UI = {
  LOADING_TIMEOUT: 10000, // 10 seconds
  ERROR_DISPLAY_TIME: 5000, // 5 seconds
};

// Albion Online tema renkleri - Yeni Renk Paleti
export const themeColors = {
  // Ana renkler
  nightBlue: "#1c1f26", // Gece Laciverti - Arka plan, navbar
  ironGray: "#3e3e47", // Demir Grisi - Kartlar, kutular, sekmeler
  goldYellow: "#d4af37", // Altın Sarısı - Butonlar, vurgu, fiyat karı
  bloodRed: "#9e2b25", // Kan Kırmızısı - Uyarılar, düşüşler, negatif fiyat
  forestGreen: "#4d774e", // Orman Yeşili - Pozitif fiyat, başarılar
  silverWhite: "#dfe0e2", // Gümüş Beyazı - Yazılar, açıklamalar
  charcoalBlack: "#121212", // Kömür Siyahı - Footer, modallarda arka plan

  // Eski renkler (geriye uyumluluk için)
  primary: "#d4af37", // Altın Sarısı
  primaryLight: "#e8c95f", // Açık Altın
  secondary: "#4d774e", // Orman Yeşili
  secondaryLight: "#6b8c6b", // Açık Yeşil
  background: "#1c1f26", // Gece Laciverti
  backgroundLight: "#3e3e47", // Demir Grisi
  text: "#dfe0e2", // Gümüş Beyazı
  textMuted: "#9ca3af", // Muted text
  success: "#4d774e", // Orman Yeşili
  error: "#9e2b25", // Kan Kırmızısı
  warning: "#d4af37", // Altın Sarısı
  info: "#3b82f6", // Blue for info
};

// Default values
export const DEFAULTS = {
  SELECTED_WEAPON_TYPE: "oneHand",
  SELECTED_TIER: "",
  SELECTED_ENCHANTMENT: "",
  SELECTED_QUALITY: "",
  SELECTED_LOCATION: "",
};
