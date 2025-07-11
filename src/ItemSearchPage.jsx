import React, { useState, useEffect, useMemo, useCallback } from "react";
import ItemSearchHeader from "./components/ItemSearchHeader.jsx";
import SearchForm from "./components/SearchForm.jsx";
import SearchResults from "./components/SearchResults.jsx";
import ItemSearchEmptyState from "./components/ItemSearchEmptyState.jsx";
import ItemSearchErrorMessage from "./components/ItemSearchErrorMessage.jsx";
import LoadingState from "./components/LoadingState.jsx";
import WarningMessage from "./components/WarningMessage.jsx";
import ActionButtons from "./components/ActionButtons.jsx";
import SelectedItem from "./components/SelectedItem.jsx";
import { ItemService } from "./components/ItemService.js";
import {
  oneHandWeapons,
  twoHandWeapons,
  armors,
  helmets,
  shoes,
  capes,
} from "./data/items.js";

const ItemSearchPage = () => {
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

  // items.js'den item listesini yükle
  useEffect(() => {
    const loadItems = async () => {
      setLoadingItems(true);
      try {
        // Tüm item kategorilerini birleştir
        const allItemCategories = [
          ...oneHandWeapons,
          ...twoHandWeapons,
          ...armors,
          ...helmets,
          ...shoes,
          ...capes,
        ];

        // Her item için baseItemId ve displayName oluştur
        const processedItems = allItemCategories.map((item) => ({
          itemId: item.id, // Base item ID (örn: MAIN_DAGGER)
          baseItemId: item.id, // Base item ID (aynı)
          displayName: item.name, // Kullanıcı dostu isim (örn: Dagger)
        }));

        setAllItems(processedItems);

        // Test API'yi çağır
        console.log("Testing API...");
        await ItemService.testAPI();

        console.log(`Toplam ${processedItems.length} item yüklendi`);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingItems(false);
      }
    };

    loadItems();
  }, []);

  // API'den item verilerini çek
  const fetchItemData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await ItemService.fetchItemData(selectedItem, filters);
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [selectedItem, filters]);

  // Filtreleri temizle
  const clearFilters = useCallback(() => {
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
  }, []);

  // Arama yapılabilir mi kontrol et - memoized
  const canSearch = useMemo(() => {
    return selectedItem && filters.tier && filters.enchantment;
  }, [selectedItem, filters.tier, filters.enchantment]);

  if (loadingItems) {
    return <LoadingState loadingItems={loadingItems} />;
  }

  return (
    <div
      className="min-h-screen p-4"
      style={{
        background:
          "linear-gradient(135deg, #1c1f26 0%, #3e3e47 50%, #1c1f26 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ItemSearchHeader itemCount={allItems.length} />

        {/* Search & Filters */}
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          allItems={allItems}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          filters={filters}
          setFilters={setFilters}
          canSearch={canSearch}
          onSearch={fetchItemData}
          onClear={clearFilters}
          loading={loading}
        />

        {/* Error Message */}
        <ItemSearchErrorMessage error={error} />

        {/* Results */}
        <SearchResults searchResults={searchResults} />

        {/* Empty State */}
        <ItemSearchEmptyState
          loading={loading}
          searchResults={searchResults}
          error={error}
          selectedItem={selectedItem}
        />
      </div>
    </div>
  );
};

export default ItemSearchPage;
