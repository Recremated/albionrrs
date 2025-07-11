import React, { useState, useMemo } from "react";
import { formatPrice, formatDate } from "../data/utils.js";
import {
  qualityColors,
  qualityShortNames,
  qualityNumberToText,
  tierColors,
} from "../data/constants.js";
import { ArrowUpDown, TrendingUp, MapPin, Star } from "lucide-react";

const SearchResults = ({ searchResults }) => {
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");

  // Sıralama fonksiyonları
  const sortFunctions = {
    price: (a, b) => {
      const priceA = a.sell_price_min || 0;
      const priceB = b.sell_price_min || 0;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    },
    city: (a, b) => {
      const cityA = a.city || "";
      const cityB = b.city || "";
      return sortOrder === "asc"
        ? cityA.localeCompare(cityB)
        : cityB.localeCompare(cityA);
    },
    quality: (a, b) => {
      const qualityA = parseInt(a.quality) || 0;
      const qualityB = parseInt(b.quality) || 0;
      return sortOrder === "asc" ? qualityA - qualityB : qualityB - qualityA;
    },
  };

  // Sıralanmış sonuçlar
  const sortedResults = useMemo(() => {
    if (!searchResults || searchResults.length === 0) return [];

    // Sadece satış fiyatı olan item'ları filtrele
    const itemsWithSellPrice = searchResults.filter(
      (item) => item.sell_price_min && item.sell_price_min > 0
    );

    const sortFunction = sortFunctions[sortBy];
    if (!sortFunction) return itemsWithSellPrice;

    return [...itemsWithSellPrice].sort(sortFunction);
  }, [searchResults, sortBy, sortOrder]);

  // Sıralama yönünü değiştir
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (!searchResults || searchResults.length === 0) return null;

  return (
    <div
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
      style={{
        backgroundColor: "rgba(62, 62, 71, 0.3)",
        borderColor: "rgba(223, 224, 226, 0.1)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-2xl font-bold text-white"
          style={{ color: "#dfe0e2" }}
        >
          Sonuçlar ({sortedResults.length})
        </h2>

        {/* Sıralama Kontrolleri */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            style={{
              backgroundColor: "rgba(62, 62, 71, 0.5)",
              borderColor: "rgba(223, 224, 226, 0.2)",
              color: "#dfe0e2",
            }}
          >
            <option value="price">Fiyata Göre</option>
            <option value="city">Şehre Göre</option>
            <option value="quality">Kaliteye Göre</option>
          </select>

          <button
            onClick={toggleSortOrder}
            className="px-3 py-1 bg-white/10 border border-white/20 rounded text-white text-sm hover:bg-white/20 transition-colors"
            style={{
              backgroundColor: "rgba(62, 62, 71, 0.5)",
              borderColor: "rgba(223, 224, 226, 0.2)",
              color: "#dfe0e2",
            }}
            title={sortOrder === "asc" ? "Artan" : "Azalan"}
          >
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {sortedResults.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-4"
            style={{
              backgroundColor: "rgba(62, 62, 71, 0.2)",
              borderColor: "rgba(223, 224, 226, 0.1)",
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3
                  className="text-lg font-semibold text-white"
                  style={{ color: "#dfe0e2" }}
                >
                  {item.displayName}
                </h3>
                <p className="text-gray-400 text-sm">{item.itemId}</p>
              </div>
              <div className="text-right">
                <div className="flex gap-2 text-sm text-gray-300">
                  <span
                    className="px-2 py-1 rounded font-semibold"
                    style={{
                      backgroundColor: `${
                        tierColors[item.tier]?.light || "#335870"
                      }20`,
                      color: tierColors[item.tier]?.dark || "#557E98",
                      border: `1px solid ${
                        tierColors[item.tier]?.light || "#335870"
                      }40`,
                      textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    {item.tier}
                  </span>
                  <span
                    className="bg-yellow-600/30 px-2 py-1 rounded"
                    style={{
                      backgroundColor: "rgba(212, 175, 55, 0.3)",
                    }}
                  >
                    +{item.enchantment}
                  </span>
                  <span
                    className="px-2 py-1 rounded font-semibold"
                    style={{
                      backgroundColor: `${
                        qualityColors[qualityNumberToText[item.quality]] ||
                        "#414041"
                      }30`,
                      color:
                        qualityColors[qualityNumberToText[item.quality]] ||
                        "#414041",
                      border: `1px solid ${
                        qualityColors[qualityNumberToText[item.quality]] ||
                        "#414041"
                      }60`,
                      textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    }}
                    title={qualityNumberToText[item.quality] || item.quality}
                  >
                    {qualityShortNames[qualityNumberToText[item.quality]] ||
                      item.quality}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400" style={{ color: "#9ca3af" }}>
                  Şehir:
                </span>
                <p className="text-white" style={{ color: "#dfe0e2" }}>
                  {item.city}
                </p>
              </div>
              <div>
                <span className="text-gray-400" style={{ color: "#9ca3af" }}>
                  Satış Fiyatı:
                </span>
                <p className="text-green-400" style={{ color: "#4d774e" }}>
                  {formatPrice(item.sell_price_min)}
                </p>
              </div>
              <div>
                <span className="text-gray-400" style={{ color: "#9ca3af" }}>
                  Alış Fiyatı:
                </span>
                <p className="text-blue-400" style={{ color: "#d4af37" }}>
                  {formatPrice(item.buy_price_max)}
                </p>
              </div>
              <div>
                <span className="text-gray-400" style={{ color: "#9ca3af" }}>
                  Son Güncelleme:
                </span>
                <p className="text-gray-300" style={{ color: "#dfe0e2" }}>
                  {formatDate(item.sell_price_min_date)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
