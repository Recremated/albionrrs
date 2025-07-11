import React from "react";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { formatPrice } from "./PriceService.js";

const UpgradeResult = ({ result }) => {
  return (
    <div
      className={`p-6 rounded-lg border-2 ${
        result.isProfit
          ? "bg-green-500/10 border-green-500/50"
          : "bg-red-500/10 border-red-500/50"
      }`}
      style={{
        backgroundColor: result.isProfit
          ? "rgba(77, 119, 78, 0.1)"
          : "rgba(158, 43, 37, 0.1)",
        borderColor: result.isProfit
          ? "rgba(77, 119, 78, 0.3)"
          : "rgba(158, 43, 37, 0.3)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div
            className="flex items-center text-lg font-semibold text-white"
            style={{ color: "#dfe0e2" }}
          >
            <Sparkles className="h-5 w-5 mr-2" style={{ color: "#d4af37" }} />+
            {result.fromEnch} → +{result.toEnch} Upgrade
          </div>
          <div
            className="ml-4 text-sm text-gray-300"
            style={{ color: "#9ca3af" }}
          >
            Kaynak:{" "}
            {result.resourceBreakdown &&
              result.resourceBreakdown.map((r, i) => (
                <span key={i}>
                  {i > 0 && ", "}
                  {r.resourceType} ({r.city})
                </span>
              ))}
          </div>
        </div>
        <div className="flex items-center">
          {result.isProfit ? (
            <TrendingUp
              className="h-6 w-6 text-green-400 mr-2"
              style={{ color: "#4d774e" }}
            />
          ) : (
            <TrendingDown
              className="h-6 w-6 text-red-400 mr-2"
              style={{ color: "#9e2b25" }}
            />
          )}
          <span
            className={`text-lg font-bold ${
              result.isProfit ? "text-green-400" : "text-red-400"
            }`}
            style={{
              color: result.isProfit ? "#4d774e" : "#9e2b25",
            }}
          >
            {result.profitPercent}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-gray-400" style={{ color: "#9ca3af" }}>
            Mevcut Değer:
          </span>
          {result.currentItemLymhurst ? (
            <p className="text-white font-medium" style={{ color: "#dfe0e2" }}>
              {formatPrice(result.currentValue)}
              <span
                className="text-xs text-gray-400 ml-1"
                style={{ color: "#9ca3af" }}
              >
                ({result.currentItemCity})
              </span>
              <span
                className="block text-xs text-yellow-400"
                style={{ color: "#d4af37" }}
              >
                Lymhurst'te: {formatPrice(result.currentItemLymhurst)}
              </span>
            </p>
          ) : (
            <p className="text-white font-medium" style={{ color: "#dfe0e2" }}>
              {result.currentItemCity ? (
                <>
                  <span
                    className="font-semibold text-purple-300"
                    style={{ color: "#d4af37" }}
                  >
                    {result.currentItemCity}
                  </span>
                  'de: {formatPrice(result.currentValue)}
                </>
              ) : (
                <>
                  <span
                    className="font-semibold text-yellow-300"
                    style={{ color: "#d4af37" }}
                  >
                    Tahmini fiyat:
                  </span>{" "}
                  {formatPrice(result.currentValue)}
                </>
              )}
            </p>
          )}
        </div>
        <div>
          <span className="text-gray-400" style={{ color: "#9ca3af" }}>
            Upgrade Maliyeti:
          </span>
          <p className="text-white font-medium" style={{ color: "#dfe0e2" }}>
            {formatPrice(result.upgradeCost)}
            <span
              className="text-xs text-gray-400 ml-1"
              style={{ color: "#9ca3af" }}
            >
              {result.resourceBreakdown &&
                result.resourceBreakdown.map((r, i) => (
                  <span key={i}>
                    {i > 0 && ", "}
                    {r.resourceType} ({r.city})
                  </span>
                ))}
            </span>
          </p>
        </div>
        <div>
          <span className="text-gray-400" style={{ color: "#9ca3af" }}>
            Hedef Değer:
          </span>
          {result.targetItemLymhurst ? (
            <p className="text-white font-medium" style={{ color: "#dfe0e2" }}>
              {formatPrice(result.targetValue)}
              <span
                className="text-xs text-gray-400 ml-1"
                style={{ color: "#9ca3af" }}
              >
                ({result.targetItemCity})
              </span>
              <span
                className="block text-xs text-yellow-400"
                style={{ color: "#d4af37" }}
              >
                Lymhurst'te: {formatPrice(result.targetItemLymhurst)}
              </span>
            </p>
          ) : (
            <p className="text-white font-medium" style={{ color: "#dfe0e2" }}>
              {result.targetItemCity ? (
                <>
                  <span
                    className="font-semibold text-purple-300"
                    style={{ color: "#d4af37" }}
                  >
                    {result.targetItemCity}
                  </span>
                  'de: {formatPrice(result.targetValue)}
                </>
              ) : (
                <>
                  <span
                    className="font-semibold text-yellow-300"
                    style={{ color: "#d4af37" }}
                  >
                    Tahmini fiyat:
                  </span>{" "}
                  {formatPrice(result.targetValue)}
                </>
              )}
            </p>
          )}
        </div>
        <div>
          <span className="text-gray-400" style={{ color: "#9ca3af" }}>
            Net Kar:
          </span>
          <p
            className={`font-bold ${
              result.isProfit ? "text-green-400" : "text-red-400"
            }`}
            style={{
              color: result.isProfit ? "#4d774e" : "#9e2b25",
            }}
          >
            {result.profit > 0 ? "+" : ""}
            {formatPrice(result.profit)}
          </p>
        </div>
      </div>

      {/* Kaynak detayları */}
      {result.resourceBreakdown && (
        <div
          className="mt-2 text-xs text-gray-400"
          style={{ color: "#9ca3af" }}
        >
          <strong>Kaynaklar:</strong>
          {result.resourceBreakdown.map((r, i) => (
            <div key={i}>
              {r.resourceType}: {formatPrice(r.unitPrice)} x {r.amount} ={" "}
              {formatPrice(r.cost)} ({r.city})
            </div>
          ))}
        </div>
      )}

      {/* Fiyat detayları */}
      <div className="mt-2 text-xs text-gray-400" style={{ color: "#9ca3af" }}>
        <strong>Fiyat Detayları:</strong>
        <div>
          Mevcut Item: {formatPrice(result.currentValue)} (
          {result.currentItemCity})
        </div>
        <div>
          Hedef Item: {formatPrice(result.targetValue)} ({result.targetItemCity}
          )
        </div>
        {result.resourceBreakdown &&
          result.resourceBreakdown.map((r, i) => (
            <div key={i}>
              {r.resourceType}: {formatPrice(r.unitPrice)} ({r.city})
            </div>
          ))}
      </div>

      <div
        className="mt-4 pt-4 border-t border-white/20"
        style={{ borderColor: "rgba(223, 224, 226, 0.1)" }}
      >
        <div className="text-xs text-gray-400" style={{ color: "#9ca3af" }}>
          <p>
            <strong>Hesaplama:</strong> Mevcut item değeri (
            {formatPrice(result.currentValue)}) + Upgrade maliyeti (
            {formatPrice(result.upgradeCost)}) = Toplam maliyet (
            {formatPrice(result.totalCost)})
          </p>
          <p>
            <strong>Kar:</strong> Hedef item değeri (
            {formatPrice(result.targetValue)}) - Toplam maliyet (
            {formatPrice(result.totalCost)}) ={result.profit > 0 ? " +" : " "}
            {formatPrice(result.profit)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeResult;
