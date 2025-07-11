import React from "react";
import { Search, TrendingUp, Crown } from "lucide-react";

const AlbionHeader = ({ itemCount }) => {
  return (
    <div className="text-center mb-8">
      {/* Logo ve Başlık */}
      <div className="flex items-center justify-center mb-4">
        <div
          className="p-3 rounded-full mr-4"
          style={{
            background: "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)",
          }}
        >
          <Crown className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)",
              WebkitBackgroundClip: "text",
            }}
          >
            Albion Market Tracker
          </h1>
          <p className="text-sm font-medium" style={{ color: "#e8c95f" }}>
            by Recremated#1
          </p>
        </div>
      </div>

      {/* Alt Başlık */}
      <p className="text-gray-300 text-lg mb-2" style={{ color: "#dfe0e2" }}>
        Albion Online item fiyatlarını gerçek zamanlı takip edin
      </p>

      {/* İstatistikler */}
      <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" style={{ color: "#d4af37" }} />
          <span>{itemCount} item yüklendi</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" style={{ color: "#4d774e" }} />
          <span>Gerçek zamanlı veriler</span>
        </div>
      </div>
    </div>
  );
};

export default AlbionHeader;
