import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface PriceRange {
  range: string;
  count: number;
}

interface BarChartResponse {
  status: string;
  message: string;
  data: PriceRange[];
}

export default function TransactionsBarChart({
  selectedMonth,
}: {
  selectedMonth: string;
}) {
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPriceRanges();
  }, [selectedMonth]);

  const fetchPriceRanges = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/database/barchart?month=${selectedMonth}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch price ranges");
      }
      const data: BarChartResponse = await response.json();
      if (data.status === "success") {
        setPriceRanges(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch price ranges");
      }
    } catch (error) {
      console.error("Error fetching price ranges:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Range Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[300px]">
            <p>Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Range Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Range Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceRanges}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
