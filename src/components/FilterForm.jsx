import React from "react";
import { Hash, Star, TrendingUp, MapPin } from "lucide-react";
import {
  tiers,
  enchantments,
  qualities,
  qualityColors,
  qualityShortNames,
} from "../data/constants.js";
import { cities } from "../data/items.js";

const FilterForm = ({ filters, setFilters }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {/* Tier Filter - Required */}
      <div>
        <label
          className="block text-sm font-medium text-gray-300 mb-2"
          style={{ color: "#dfe0e2" }}
        >
          <Hash className="inline h-4 w-4 mr-1" style={{ color: "#d4af37" }} />
          Tier{" "}
          <span className="text-red-400" style={{ color: "#9e2b25" }}>
            *
          </span>
        </label>
        <select
          value={filters.tier}
          onChange={(e) => setFilters({ ...filters, tier: e.target.value })}
          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
          style={{
            backgroundColor: "rgba(62, 62, 71, 0.5)",
            borderColor: "rgba(223, 224, 226, 0.2)",
            color: "#dfe0e2",
            boxShadow: "0 0 0 2px rgba(212, 175, 55, 0.5)",
          }}
        >
          <option value="">Seçin</option>
          {tiers.map((tier) => (
            <option key={tier} value={tier} className="bg-slate-800">
              {tier}
            </option>
          ))}
        </select>
      </div>

      {/* Enchantment Filter - Required */}
      <div>
        <label
          className="block text-sm font-medium text-gray-300 mb-2"
          style={{ color: "#dfe0e2" }}
        >
          <Star className="inline h-4 w-4 mr-1" style={{ color: "#d4af37" }} />
          Enchantment{" "}
          <span className="text-red-400" style={{ color: "#9e2b25" }}>
            *
          </span>
        </label>
        <select
          value={filters.enchantment}
          onChange={(e) =>
            setFilters({ ...filters, enchantment: e.target.value })
          }
          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
          style={{
            backgroundColor: "rgba(62, 62, 71, 0.5)",
            borderColor: "rgba(223, 224, 226, 0.2)",
            color: "#dfe0e2",
            boxShadow: "0 0 0 2px rgba(212, 175, 55, 0.5)",
          }}
        >
          <option value="">Seçin</option>
          {enchantments.map((ench) => (
            <option key={ench} value={ench} className="bg-slate-800">
              +{ench}
            </option>
          ))}
        </select>
      </div>

      {/* Quality Filter */}
      <div>
        <label
          className="block text-sm font-medium text-gray-300 mb-2"
          style={{ color: "#dfe0e2" }}
        >
          <TrendingUp
            className="inline h-4 w-4 mr-1"
            style={{ color: "#d4af37" }}
          />
          Quality
        </label>
        <select
          value={filters.quality}
          onChange={(e) => setFilters({ ...filters, quality: e.target.value })}
          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
          style={{
            backgroundColor: "rgba(62, 62, 71, 0.5)",
            borderColor: "rgba(223, 224, 226, 0.2)",
            color: "#dfe0e2",
            boxShadow: "0 0 0 2px rgba(212, 175, 55, 0.5)",
          }}
        >
          <option value="">Seçin</option>
          {qualities.map((quality) => (
            <option
              key={quality}
              value={quality}
              className="bg-slate-800"
              style={{
                color: qualityColors[quality],
                fontWeight: "bold",
              }}
            >
              {qualityShortNames[quality]} - {quality}
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div>
        <label
          className="block text-sm font-medium text-gray-300 mb-2"
          style={{ color: "#dfe0e2" }}
        >
          <MapPin
            className="inline h-4 w-4 mr-1"
            style={{ color: "#d4af37" }}
          />
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full p-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
          style={{
            backgroundColor: "rgba(62, 62, 71, 0.5)",
            borderColor: "rgba(223, 224, 226, 0.2)",
            color: "#dfe0e2",
            boxShadow: "0 0 0 2px rgba(212, 175, 55, 0.5)",
          }}
        >
          <option value="">Tümü</option>
          {cities.map((city) => (
            <option key={city} value={city} className="bg-slate-800">
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterForm;
