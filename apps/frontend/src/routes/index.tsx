import type { components } from "@repo/api-types";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle, XCircle, Rocket, Code, Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const features = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Full Stack",
      description: "Built with Rust (Axum) backend and React frontend",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Type Safe",
      description: "End-to-end type safety with shared API types",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast & Modern",
      description: "Blazing fast performance with modern tooling",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">Mint + React + Axum</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A modern full-stack application built with Rust and React
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">Rust</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
          </div>
        </div>

        {/* Status Card */}
        <div className="max-w-md mx-auto mb-12">
          <HealthCheck />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">{feature.icon}</div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}

function HealthCheck() {
  const [health, setHealth] = useState<components["schemas"]["ApiResponse"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        console.log("Making request to http://localhost:3001/api/health");
        const response = await fetch("http://localhost:3001/api/health");
        console.log("Response received:", response.status);
        const data = await response.json();
        console.log("Data parsed:", data);
        setHealth(data);
      } catch (error) {
        console.error("Failed to fetch health:", error);
      } finally {
        console.log("Setting loading to false");
        setIsLoading(false);
      }
    };
    fetchHealth();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          ) : health ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          Backend Status
        </CardTitle>
        <CardDescription>{isLoading ? "Checking connection..." : "Real-time health check"}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : health ? (
          <div>
            <p className="text-green-600 font-semibold mb-2">✅ {health.message}</p>
            <p className="text-sm text-gray-500">Timestamp: {health.timestamp}</p>
          </div>
        ) : (
          <p className="text-red-600 font-semibold">❌ Backend not responding</p>
        )}
      </CardContent>
    </Card>
  );
}
