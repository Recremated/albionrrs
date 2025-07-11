import React from "react";
import { Filter } from "lucide-react";

const ActionButtons = ({ onSearch, onClear, loading, canSearch }) => {
  return (
    <div className="flex gap-4">
      <button
        onClick={onSearch}
        disabled={loading || !canSearch}
        className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
        style={{
          background: "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)",
          boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
        }}
      >
        {loading ? "Aranıyor..." : "Ara"}
      </button>
      <button
        onClick={onClear}
        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        style={{
          backgroundColor: "#3e3e47",
          color: "#dfe0e2",
        }}
      >
        <Filter className="inline h-4 w-4 mr-2" />
        Temizle
      </button>
    </div>
  );
};

export default ActionButtons;
