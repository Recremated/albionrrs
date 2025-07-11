import { getDisplayName } from "../data/utils.js";
import { API_URLS } from "../data/constants.js";
import { cities } from "../data/items.js";

export class ItemService {
  // Test için basit bir debug fonksiyonu
  static async testAPI() {
    try {
      const testUrl = `${API_URLS.prices}/T4_CAPEITEM_MORGANA?locations=Lymhurst&qualities=4`;
      console.log("Testing API with URL:", testUrl);

      const response = await fetch(testUrl);
      console.log("Test Response Status:", response.status);

      const data = await response.json();
      console.log("Test API Response:", data);

      return data;
    } catch (error) {
      console.error("Test API Error:", error);
      throw error;
    }
  }

  // items.js'den item listesini çek (artık GitHub'dan çekmiyoruz)
  static async fetchItems() {
    try {
      // Bu fonksiyon artık kullanılmıyor çünkü ItemSearchPage items.js'den yüklüyor
      // Ama geriye uyumluluk için boş bir array döndür
      console.log("fetchItems called - using items.js data instead");
      return [];
    } catch (err) {
      throw new Error("Item listesi yüklenirken hata oluştu: " + err.message);
    }
  }

  // Item ID'sinden base item ID'sini çıkar (tier olmadan)
  static extractBaseItemId(itemId) {
    // T4_MAIN_DAGGER -> MAIN_DAGGER
    // T6_MAIN_DAGGER@1 -> MAIN_DAGGER
    const parts = itemId.split("_");
    if (parts.length < 2) return itemId;

    // Tier kısmını çıkar (ilk kısım)
    const baseParts = parts.slice(1);
    let baseItemId = baseParts.join("_");

    // Enchantment kısmını çıkar (@1, @2, @3, @4)
    baseItemId = baseItemId.replace(/@[0-4]$/, "");

    return baseItemId;
  }

  // API'den item verilerini çek
  static async fetchItemData(selectedItem, filters) {
    // Gerekli alanları kontrol et
    if (!selectedItem) {
      throw new Error("Lütfen bir item seçin");
    }
    if (!filters.tier) {
      throw new Error("Lütfen tier seviyesi seçin");
    }
    if (!filters.enchantment) {
      throw new Error("Lütfen enchantment seviyesi seçin");
    }

    // Quality seçimi zorunlu değil, seçilmezse tüm quality'leri ara
    const qualityMap = {
      Normal: "1",
      Good: "2",
      Outstanding: "3",
      Excellent: "4",
      Masterpiece: "5",
    };

    let qualities = [];
    if (filters.quality) {
      // Belirli bir quality seçilmişse sadece onu ara
      const qualityNumber = qualityMap[filters.quality] || "4";
      qualities = [qualityNumber];
    } else {
      // Quality seçilmemişse tüm quality'leri ara
      qualities = ["1", "2", "3", "4", "5"];
    }

    try {
      // Seçilen item'ın base ID'sini bul
      let baseItemId = selectedItem;

      // Eğer seçilen item zaten tam ID ise (T4_MAIN_DAGGER), base ID'yi çıkar
      if (selectedItem.includes("_") && selectedItem.match(/^T[0-8]_/)) {
        baseItemId = this.extractBaseItemId(selectedItem);
      }

      console.log("Selected Item:", selectedItem);
      console.log("Base Item ID:", baseItemId);
      console.log("Tier:", filters.tier);
      console.log("Enchantment:", filters.enchantment);

      // Kullanıcının seçtiği tier ve enchantment ile item ID'si oluştur
      const itemId = this.buildItemId(
        baseItemId,
        filters.tier,
        filters.enchantment
      );

      const locations = filters.location ? [filters.location] : cities;

      const url = `${API_URLS.prices}/${itemId}?locations=${locations.join(
        ","
      )}&qualities=${qualities.join(",")}`;

      console.log("Fetching URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);
      console.log("API Response length:", data.length);
      if (data.length > 0) {
        console.log("First item ID:", data[0].item_id);
        console.log(
          "Sample items:",
          data.slice(0, 3).map((item) => ({
            item_id: item.item_id,
            city: item.city,
            quality: item.quality,
            sell_price_min: item.sell_price_min,
          }))
        );
      }

      if (!data || data.length === 0) {
        throw new Error(
          `Bu item (${itemId}) için veri bulunamadı. Farklı tier/enchantment/quality/location deneyin.`
        );
      }

      // Fiyat verilerini kontrol et
      const validItems = data.filter(
        (item) =>
          item.sell_price_min > 0 ||
          item.sell_price_max > 0 ||
          item.buy_price_min > 0 ||
          item.buy_price_max > 0
      );

      if (validItems.length === 0) {
        // Tüm şehirlerde fiyat yoksa, daha detaylı bilgi ver
        const citiesWithData = data.map((item) => item.city).join(", ");
        throw new Error(
          `Bu item (${itemId}) için hiçbir şehirde fiyat bulunamadı. ` +
            `Aranan şehirler: ${citiesWithData}. ` +
            `Farklı tier, enchantment, quality veya location deneyin.`
        );
      }

      // Eğer tek şehir seçilmediyse, sadece geçerli fiyatları olan itemları döndür
      let filteredData = validItems;

      // Eğer tek şehir seçildiyse, o şehirdeki veriyi kontrol et
      if (filters.location) {
        const locationData = data.filter(
          (item) => item.city === filters.location
        );
        if (locationData.length === 0) {
          throw new Error(
            `Bu item (${itemId}) için ${filters.location} şehrinde veri bulunamadı. ` +
              `Diğer şehirlerde fiyat var: ${validItems
                .map((item) => item.city)
                .join(", ")}`
          );
        }
        filteredData = locationData.filter(
          (item) =>
            item.sell_price_min > 0 ||
            item.sell_price_max > 0 ||
            item.buy_price_min > 0 ||
            item.buy_price_max > 0
        );

        if (filteredData.length === 0) {
          throw new Error(
            `Bu item (${itemId}) için ${filters.location} şehrinde fiyat bulunamadı. ` +
              `Diğer şehirlerde fiyat var: ${validItems
                .map((item) => item.city)
                .join(", ")}`
          );
        }
      }

      const processedItems = filteredData.map((item) => ({
        ...item,
        city: item.city,
        itemId: item.item_id,
        displayName: getDisplayName(baseItemId),
        tier: filters.tier,
        enchantment: filters.enchantment,
      }));

      console.log("Processed Items:", processedItems);
      return processedItems;
    } catch (err) {
      throw new Error("Veri çekilirken bir hata oluştu: " + err.message);
    }
  }

  // Item ID'sinden tier'ı çıkar
  static extractTierFromItemId(itemId) {
    const match = itemId.match(/^(T[0-8])_/);
    return match ? match[1] : null;
  }

  // Item ID'sinden enchantment'ı çıkar
  static extractEnchantmentFromItemId(itemId) {
    const match = itemId.match(/@([0-4])$/);
    return match ? match[1] : "0";
  }

  // Seçilen tier ve enchantment ile tam item ID'si oluştur
  static buildItemId(itemName, tier, enchantment) {
    console.log("buildItemId - itemName:", itemName);
    console.log("buildItemId - tier:", tier);
    console.log("buildItemId - enchantment:", enchantment);

    // Eğer itemName zaten tam item ID'si ise (örn: T4_MAIN_DAGGER), sadece enchantment ekle
    if (itemName.includes("_") && itemName.match(/^T[0-8]_/)) {
      let itemId = itemName;
      if (enchantment !== "0") {
        itemId += `@${enchantment}`;
      }
      console.log("buildItemId - final itemId (existing):", itemId);
      return itemId;
    }

    // Eğer itemName base item ID'si ise (örn: MAIN_DAGGER), tier ve enchantment ekle
    let itemId = `${tier}_${itemName}`;
    if (enchantment !== "0") {
      itemId += `@${enchantment}`;
    }

    console.log("buildItemId - final itemId (new):", itemId);
    return itemId;
  }
}
