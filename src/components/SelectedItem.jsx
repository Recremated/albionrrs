import React from "react";
import { getDisplayName } from "../data/utils.js";

const SelectedItem = ({ selectedItem }) => {
  if (!selectedItem) return null;

  return (
    <div
      className="mb-6 p-4 bg-purple-600/20 border border-purple-500/50 rounded-lg"
      style={{
        backgroundColor: "rgba(212, 175, 55, 0.1)",
        borderColor: "rgba(212, 175, 55, 0.3)",
      }}
    >
      <h3 className="text-white font-medium mb-1" style={{ color: "#dfe0e2" }}>
        Seçili Item:
      </h3>
      <p className="text-purple-200" style={{ color: "#e8c95f" }}>
        {getDisplayName(selectedItem)}
      </p>
      <p className="text-purple-300 text-sm" style={{ color: "#d4af37" }}>
        {selectedItem}
      </p>
    </div>
  );
};

export default SelectedItem;
