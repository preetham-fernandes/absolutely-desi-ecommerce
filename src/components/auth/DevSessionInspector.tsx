// src/components/DevSessionInspector.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

export function DevSessionInspector() {
  const { user, isAuthenticated, loading } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  
  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;
  
  // Get the session cookie value
  const getSessionCookie = () => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('session='))
      ?.split('=')[1] || 'No session cookie found';
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
      >
        {showDetails ? "Hide" : "Show"} Session Debug
      </button>
      
      {showDetails && (
        <div className="mt-2 p-3 bg-gray-900 text-white rounded-md shadow-lg max-w-md">
          <h3 className="font-bold mb-2">Session Status</h3>
          <pre className="text-xs overflow-auto max-h-60">
            {JSON.stringify({
              isAuthenticated,
              loading,
              user,
              sessionCookie: getSessionCookie(),
              timestamp: new Date().toISOString()
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}