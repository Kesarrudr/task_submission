import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Statistics {
  totalSaleAmount: number;
  totalSold: number;
  totalNotSold: number;
}

export default function TransactionStatistics({
  selectedMonth,
}: {
  selectedMonth: string;
}) {
  const [statistics, setStatistics] = useState<Statistics>({
    totalSaleAmount: 0,
    totalSold: 0,
    totalNotSold: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/database/statistics?month=${selectedMonth}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch statistics");
      }
      const data = await response.json();
      if (data.status === "success") {
        setStatistics(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch statistics");
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading statistics...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${statistics.totalSaleAmount.toFixed(2)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Sold Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{statistics.totalSold}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Not Sold Items</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{statistics.totalNotSold}</p>
        </CardContent>
      </Card>
    </>
  );
}
