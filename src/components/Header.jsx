import React from "react";
import { Calculator, TrendingUp, Zap, Crown } from "lucide-react";

const Header = () => {
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
          <Calculator className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1
            className="text-4xl font-bold bg-clip-text text-transparent"
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)",
              WebkitBackgroundClip: "text",
            }}
          >
            Upgrade Calculator
          </h1>
          <p className="text-sm font-medium" style={{ color: "#e8c95f" }}>
            Karlılık Hesaplayıcısı
          </p>
        </div>
      </div>

      {/* Alt Başlık */}
      <p className="text-gray-300 text-lg mb-2" style={{ color: "#dfe0e2" }}>
        Item upgrade'lerinin karlılığını hesaplayın ve en iyi fırsatları bulun
      </p>

      {/* Özellikler */}
      <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" style={{ color: "#d4af37" }} />
          <span>Hızlı Hesaplama</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" style={{ color: "#4d774e" }} />
          <span>Karlılık Analizi</span>
        </div>
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4" style={{ color: "#d4af37" }} />
          <span>Premium Veriler</span>
        </div>
      </div>

      {/* Varsayılan Ayarlar */}
      <div
        className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10"
        style={{
          backgroundColor: "rgba(62, 62, 71, 0.3)",
          borderColor: "rgba(223, 224, 226, 0.1)",
        }}
      >
        <p className="text-xs text-gray-400" style={{ color: "#dfe0e2" }}>
          <span style={{ color: "#d4af37" }}>Kaynak:</span> Brecilien |
          <span className="ml-2" style={{ color: "#4d774e" }}>
            Satış:
          </span>{" "}
          Lymhurst |
          <span className="ml-2" style={{ color: "#d4af37" }}>
            Quality:
          </span>{" "}
          4
        </p>
      </div>
    </div>
  );
};

export default Header;
