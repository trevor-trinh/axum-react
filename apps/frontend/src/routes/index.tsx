import type { components } from "@repo/api-types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [health, setHealth] = useState<components["schemas"]["ApiResponse"] | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      const response = await fetch("http://localhost:3001/api/health");
      const data = await response.json();
      setHealth(data);
    };
    fetchHealth();
  }, []);

  return (
    <div className="p-2 flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Mint + React + Axum</h1>

      <h2 className="text-xl font-semibold mb-2">Backend Status</h2>
      {health ? (
        <p>
          ✅ {health.message} (Timestamp: {health.timestamp})
        </p>
      ) : (
        <p>❌ Backend not responding</p>
      )}
    </div>
  );
}
