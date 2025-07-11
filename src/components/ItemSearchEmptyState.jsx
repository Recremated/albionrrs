import React from "react";
import { Search } from "lucide-react";

const AlbionEmptyState = ({ loading, searchResults, error, selectedItem }) => {
  if (loading || searchResults.length > 0 || error || !selectedItem)
    return null;

  return (
    <div className="text-center py-12">
      <Search
        className="h-16 w-16 text-gray-400 mx-auto mb-4"
        style={{ color: "#d4af37" }}
      />
      <h3
        className="text-xl font-semibold text-gray-300 mb-2"
        style={{ color: "#dfe0e2" }}
      >
        Henüz arama yapılmadı
      </h3>
      <p className="text-gray-400" style={{ color: "#9ca3af" }}>
        Tüm gerekli alanları doldurup arama yapabilirsiniz
      </p>
    </div>
  );
};

export default AlbionEmptyState;
