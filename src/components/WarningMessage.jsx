import React from "react";
import { AlertCircle } from "lucide-react";

const WarningMessage = ({ canSearch }) => {
  if (canSearch) return null;

  return (
    <div
      className="mb-6 p-4 bg-yellow-600/20 border border-yellow-500/50 rounded-lg"
      style={{
        backgroundColor: "rgba(212, 175, 55, 0.1)",
        borderColor: "rgba(212, 175, 55, 0.3)",
      }}
    >
      <div className="flex items-center">
        <AlertCircle
          className="h-5 w-5 text-yellow-400 mr-2"
          style={{ color: "#d4af37" }}
        />
        <p className="text-yellow-200" style={{ color: "#e8c95f" }}>
          Arama yapabilmek için <strong>item seçimi</strong>,{" "}
          <strong>tier</strong> ve <strong>enchantment</strong> alanları
          zorunludur. Quality seçimi opsiyoneldir.
        </p>
      </div>
    </div>
  );
};

export default WarningMessage;
