import React from "react";
import { Loader, Crown, TrendingUp } from "lucide-react";

const LoadingState = ({ loadingItems }) => {
  if (!loadingItems) return null;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #1c1f26 0%, #3e3e47 50%, #1c1f26 100%)",
      }}
    >
      <div className="text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 rounded-full mr-4 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)",
            }}
          >
            <Crown className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Albion Market Tracker
            </h1>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          <Loader
            className="h-16 w-16 text-yellow-400 animate-spin mx-auto mb-4"
            style={{ color: "#d4af37" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <TrendingUp
              className="h-8 w-8 text-yellow-300 animate-pulse"
              style={{ color: "#e8c95f" }}
            />
          </div>
        </div>

        <p className="text-white text-lg mb-2" style={{ color: "#dfe0e2" }}>
          Veriler yükleniyor...
        </p>
        <p className="text-gray-400 text-sm">
          Albion Online market verileri hazırlanıyor
        </p>

        {/* Progress Bar */}
        <div
          className="w-64 h-2 bg-gray-700 rounded-full mt-6 mx-auto overflow-hidden"
          style={{ backgroundColor: "#3e3e47" }}
        >
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full animate-pulse"
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #e8c95f 100%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
