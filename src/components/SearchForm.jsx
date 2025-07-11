import React, { useState, useCallback } from "react";
import ItemSearch from "./ItemSearch.jsx";
import SelectedItem from "./SelectedItem.jsx";
import FilterForm from "./FilterForm.jsx";
import WarningMessage from "./WarningMessage.jsx";
import ActionButtons from "./ActionButtons.jsx";

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  allItems,
  selectedItem,
  setSelectedItem,
  filters,
  setFilters,
  canSearch,
  onSearch,
  onClear,
  loading,
}) => {
  // Arama kutusu için sonuçları göster/gizle state'i
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Arama sonuçlarını filtrele
  const getFilteredWeapons = useCallback(() => {
    if (!searchTerm.trim()) return [];
    return allItems
      .filter(
        (item) =>
          (item.name || "")
            .toLowerCase()
            .includes((searchTerm || "").toLowerCase()) ||
          (item.id || "")
            .toLowerCase()
            .includes((searchTerm || "").toLowerCase())
      )
      .slice(0, 10);
  }, [allItems, searchTerm]);

  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20"
      style={{
        backgroundColor: "rgba(62, 62, 71, 0.3)",
        borderColor: "rgba(223, 224, 226, 0.1)",
      }}
    >
      {/* Item Search */}
      <ItemSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSelectedItem={setSelectedItem}
        showSearchResults={showSearchResults}
        setShowSearchResults={setShowSearchResults}
        getFilteredWeapons={getFilteredWeapons}
      />

      {/* Selected Item */}
      <SelectedItem selectedItem={selectedItem} />

      {/* Required Filters */}
      <FilterForm filters={filters} setFilters={setFilters} />

      {/* Required Fields Warning */}
      <WarningMessage canSearch={canSearch} />

      {/* Action Buttons */}
      <ActionButtons
        onSearch={onSearch}
        onClear={onClear}
        loading={loading}
        canSearch={canSearch}
      />
    </div>
  );
};

export default SearchForm;
