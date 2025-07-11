import React from "react";
import { Calculator } from "lucide-react";

const EmptyState = ({ loading }) => {
  if (loading) {
    return null;
  }

  return (
    <div className="text-center py-12">
      <Calculator
        className="h-16 w-16 text-gray-400 mx-auto mb-4"
        style={{ color: "#d4af37" }}
      />
      <h3
        className="text-xl font-semibold text-gray-300 mb-2"
        style={{ color: "#dfe0e2" }}
      >
        Upgrade Hesaplayıcı Hazır
      </h3>
      <p className="text-gray-400" style={{ color: "#9ca3af" }}>
        Silah tipi, silah, tier ve enchantment seçip hesaplamayı başlatın
      </p>
    </div>
  );
};

export default EmptyState;
