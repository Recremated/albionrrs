import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  TrendingUp,
  MapPin,
  Star,
  Hash,
  AlertCircle,
  Loader,
} from "lucide-react";

const AlbionItemSearch = () => {
  const [allItems, setAllItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [filters, setFilters] = useState({
    tier: "",
    enchantment: "",
    quality: "",
    location: "",
  });

  // Albion Online şehirleri
  const cities = [
    "Bridgewatch",
    "Caerleon",
    "Fort Sterling",
    "Lymhurst",
    "Martlock",
    "Thetford",
    "Brecilien",
    "Morganas Rest",
  ];

  // Tier seçenekleri
  const tiers = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"];

  // Enchantment seçenekleri
  const enchantments = ["0", "1", "2", "3", "4"];

  // Quality seçenekleri
  const qualities = ["1", "2", "3", "4", "5"];

  // GitHub'dan item listesini çek ve temizle
  useEffect(() => {
    const fetchItems = async () => {
      setLoadingItems(true);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/ao-data/ao-bin-dumps/master/formatted/items.txt"
        );
        if (!response.ok) {
          throw new Error("Item listesi yüklenemedi");
        }
        const text = await response.text();
        const rawItems = text.split("\n").filter((line) => line.trim() !== "");

        const parsedItems = [];

        rawItems.forEach((line) => {
          const parts = line.split(":");
          if (parts.length >= 3) {
            const itemId = parts[1].trim(); // örnek: T4_CAPEITEM_MORGANA
            const displayName = parts[2].trim(); // örnek: Morgana Cape
            parsedItems.push({
              itemId,
              displayName: getDisplayName(displayName),
            });
          }
        });

        setAllItems(parsedItems);
      } catch (err) {
        setError("Item listesi yüklenirken hata oluştu: " + err.message);
        console.error("Error fetching items:", err);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

  // Item adını temizle ve görüntülenebilir hale getir
  const getDisplayName = (itemName) => {
    return itemName
      .replace(/_/g, " ") // Alt çizgileri boşlukla değiştir
      .replace(/\b\w/g, (l) => l.toUpperCase()); // Her kelimenin ilk harfini büyük yap
  };

  // Seçilen tier ve enchantment ile tam item ID'si oluştur
  const buildItemId = (itemName, tier, enchantment) => {
    let itemId = `${tier}_${itemName}`;
    if (enchantment !== "0") {
      itemId += `@${enchantment}`;
    }
    return itemId;
  };

  // Filtrelenmiş item listesini al
  const getFilteredItems = () => {
    let filtered = allItems;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.itemId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.slice(0, 50); // performans için sınırla
  };

  // API'den item verilerini çek
  const fetchItemData = async () => {
    // Gerekli alanları kontrol et
    if (!selectedItem) {
      setError("Lütfen bir item seçin");
      return;
    }
    if (!filters.tier) {
      setError("Lütfen tier seviyesi seçin");
      return;
    }
    if (!filters.enchantment) {
      setError("Lütfen enchantment seviyesi seçin");
      return;
    }
    if (!filters.quality) {
      setError("Lütfen quality seviyesi seçin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Seçilen tier ve enchantment ile tam item ID'si oluştur
      const fullItemId = buildItemId(
        selectedItem,
        filters.tier,
        filters.enchantment
      );

      const locations = filters.location ? [filters.location] : cities;
      const qualities = [filters.quality];

      const url = `https://europe.albion-online-data.com/api/v2/stats/prices/${fullItemId}?locations=${locations.join(
        ","
      )}&qualities=${qualities.join(",")}`;

      console.log("Fetching URL:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        setError(
          "Bu item için veri bulunamadı. Farklı tier/enchantment/quality/location deneyin."
        );
        setSearchResults([]);
        return;
      }

      // Fiyatlar tamamen sıfırsa uyarı göster
      const allZero = data.every(
        (item) =>
          item.sell_price_min === 0 &&
          item.sell_price_max === 0 &&
          item.buy_price_min === 0 &&
          item.buy_price_max === 0
      );

      if (allZero) {
        setError(
          "Bu item için şu anda satış veya alış fiyatı bulunmamaktadır."
        );
        setSearchResults([]);
        return;
      }

      let filteredData = data;

      // Eğer tek şehir seçilmediyse, yani tüm şehirler üzerinden arama yapılıyorsa
      if (!filters.location) {
        filteredData = data.filter(
          (item) =>
            item.sell_price_min > 0 ||
            item.sell_price_max > 0 ||
            item.buy_price_min > 0 ||
            item.buy_price_max > 0
        );
      }

      if (!filteredData || filteredData.length === 0) {
        setError(
          "Bu item için geçerli veri bulunamadı. Farklı tier/enchantment/quality/location deneyin."
        );
        setSearchResults([]);
        return;
      }

      const processedItems = filteredData.map((item) => ({
        ...item,
        city: item.city,
        itemId: fullItemId,
        displayName: getDisplayName(selectedItem),
        tier: filters.tier,
        enchantment: filters.enchantment,
      }));

      setSearchResults(processedItems);
    } catch (err) {
      setError("Veri çekilirken bir hata oluştu: " + err.message);
      console.error("Error:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleItemSelect = (item) => {
    const itemId = item.itemId; // örnek: T4_CAPEITEM_MORGANA@3

    const tierMatch = itemId.match(/^T\d+/);
    const enchantMatch = itemId.match(/@(\d+)$/);

    const tier = tierMatch ? tierMatch[0] : "";
    const enchantment = enchantMatch ? enchantMatch[1] : "0";
    const cleanedName = itemId
      .replace(/^T\d+_/, "") // baştan tier'i kaldır
      .replace(/@\d+$/, ""); // sondan enchant'ı kaldır

    setSelectedItem(cleanedName); // örnek: CAPEITEM_MORGANA
    setFilters((prev) => ({
      ...prev,
      tier,
      enchantment,
    }));
    setSearchTerm("");
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setFilters({
      tier: "",
      enchantment: "",
      quality: "",
      location: "",
    });
    setSearchTerm("");
    setSelectedItem("");
    setSearchResults([]);
    setError("");
  };

  // Fiyat formatlama
  const formatPrice = (price) => {
    if (!price || price === 0) return "N/A";
    return new Intl.NumberFormat("tr-TR").format(price);
  };

  // Tarih formatlama
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Arama yapılabilir mi kontrol et
  const canSearch =
    selectedItem && filters.tier && filters.enchantment && filters.quality;

  if (loadingItems) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Item listesi yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Recremated#1</h1>
          <p className="text-gray-300">
            Albion Online item fiyatlarını ve verilerini arayın
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {allItems.length} item yüklendi
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          {/* Item Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Search className="inline h-4 w-4 mr-1" />
              Item Ara (Zorunlu)
            </label>
            <input
              type="text"
              placeholder="Item adı girin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Item Suggestions */}
            {searchTerm && (
              <div className="mt-2 max-h-60 overflow-y-auto bg-white/10 border border-white/20 rounded-lg">
                {getFilteredItems().map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleItemSelect(item)}
                    className={`p-3 cursor-pointer hover:bg-white/20 border-b border-white/10 last:border-b-0 ${
                      selectedItem === item.itemId ? "bg-purple-600/30" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">
                          {item.displayName}
                        </p>
                        <p className="text-gray-400 text-sm">{item.itemId}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {getFilteredItems().length === 0 && (
                  <div className="p-3 text-gray-400 text-center">
                    Sonuç bulunamadı
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Item */}
          {selectedItem && (
            <div className="mb-6 p-4 bg-purple-600/20 border border-purple-500/50 rounded-lg">
              <h3 className="text-white font-medium mb-1">Seçili Item:</h3>
              <p className="text-purple-200">{getDisplayName(selectedItem)}</p>
              <p className="text-purple-300 text-sm">{selectedItem}</p>
            </div>
          )}

          {/* Required Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Tier Filter - Required */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Hash className="inline h-4 w-4 mr-1" />
                Tier <span className="text-red-400">*</span>
              </label>
              <select
                value={filters.tier}
                onChange={(e) =>
                  setFilters({ ...filters, tier: e.target.value })
                }
                className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seçin</option>
                {tiers.map((tier) => (
                  <option key={tier} value={tier} className="bg-slate-800">
                    {tier}
                  </option>
                ))}
              </select>
            </div>

            {/* Enchantment Filter - Required */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Star className="inline h-4 w-4 mr-1" />
                Enchantment <span className="text-red-400">*</span>
              </label>
              <select
                value={filters.enchantment}
                onChange={(e) =>
                  setFilters({ ...filters, enchantment: e.target.value })
                }
                className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seçin</option>
                {enchantments.map((ench) => (
                  <option key={ench} value={ench} className="bg-slate-800">
                    +{ench}
                  </option>
                ))}
              </select>
            </div>

            {/* Quality Filter - Required */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <TrendingUp className="inline h-4 w-4 mr-1" />
                Quality <span className="text-red-400">*</span>
              </label>
              <select
                value={filters.quality}
                onChange={(e) =>
                  setFilters({ ...filters, quality: e.target.value })
                }
                className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Seçin</option>
                {qualities.map((quality) => (
                  <option
                    key={quality}
                    value={quality}
                    className="bg-slate-800"
                  >
                    Quality {quality}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location
              </label>
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Tümü</option>
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-slate-800">
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Required Fields Warning */}
          {!canSearch && (
            <div className="mb-6 p-4 bg-yellow-600/20 border border-yellow-500/50 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                <p className="text-yellow-200">
                  Arama yapabilmek için <strong>item seçimi</strong>,{" "}
                  <strong>tier</strong>, <strong>enchantment</strong> ve{" "}
                  <strong>quality</strong> alanları zorunludur kardeşim. Zorluk
                  çıkarma.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={fetchItemData}
              disabled={loading || !canSearch}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              {loading ? "Aranıyor..." : "Ara"}
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <Filter className="inline h-4 w-4 mr-2" />
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
        {searchResults.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              Sonuçlar ({searchResults.length})
            </h2>

            <div className="grid gap-4">
              {searchResults.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.displayName}
                      </h3>
                      <p className="text-gray-400 text-sm">{item.itemId}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-2 text-sm text-gray-300">
                        <span className="bg-purple-600/30 px-2 py-1 rounded">
                          {item.tier}
                        </span>
                        <span className="bg-yellow-600/30 px-2 py-1 rounded">
                          +{item.enchantment}
                        </span>
                        <span className="bg-green-600/30 px-2 py-1 rounded">
                          Q{item.quality}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Şehir:</span>
                      <p className="text-white">{item.city}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Satış Fiyatı:</span>
                      <p className="text-green-400">
                        {formatPrice(item.sell_price_min)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Alış Fiyatı:</span>
                      <p className="text-blue-400">
                        {formatPrice(item.buy_price_max)}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-400">Son Güncelleme:</span>
                      <p className="text-gray-300">
                        {formatDate(item.sell_price_min_date)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && searchResults.length === 0 && !error && selectedItem && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Henüz arama yapılmadı
            </h3>
            <p className="text-gray-400">
              Tüm gerekli alanları doldurup arama yapabilirsiniz
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbionItemSearch;
