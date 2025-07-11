import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div
      className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-lg mb-6"
      style={{
        backgroundColor: "rgba(158, 43, 37, 0.1)",
        borderColor: "rgba(158, 43, 37, 0.3)",
        color: "#e8c95f",
      }}
    >
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" style={{ color: "#9e2b25" }} />
        {error}
      </div>
    </div>
  );
};

export default ErrorMessage;
