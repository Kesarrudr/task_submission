import { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import debounce from "lodash/debounce";

interface Transaction {
  id: string;
  data: {
    id: number;
    sold: boolean;
    image: string;
    price: number;
    title: string;
    category: string;
    dateOfSale: string;
    description: string;
  };
}

interface TransactionsTableProps {
  selectedMonth: string;
  searchTerm: string;
}

export default function TransactionsTable({
  selectedMonth,
  searchTerm,
}: TransactionsTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const perPage = 10;

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        month: selectedMonth,
        page: currentPage.toString(),
        perpage: perPage.toString(),
      });

      if (searchTerm) {
        queryParams.append("search", searchTerm);
      }

      const response = await fetch(
        `http://localhost:3000/api/v1/database/transactions?${queryParams.toString()}`,
      );
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      if (data.status === "success") {
        setTransactions(data.data.productTranscation);
      } else {
        throw new Error(data.message || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, searchTerm, currentPage]);

  useEffect(() => {
    const debouncedFetch = debounce(fetchTransactions, 300);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [fetchTransactions]);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sold</TableHead>
            <TableHead>Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.data.id}</TableCell>
              <TableCell>{transaction.data.title}</TableCell>
              <TableCell>
                <div className="max-w-xs overflow-hidden">
                  <p className="truncate">{transaction.data.description}</p>
                  <button
                    className="text-blue-500 hover:underline mt-1"
                    onClick={() => alert(transaction.data.description)}
                  >
                    Read more
                  </button>
                </div>
              </TableCell>
              <TableCell>${transaction.data.price.toFixed(2)}</TableCell>
              <TableCell>{transaction.data.category}</TableCell>
              <TableCell>{transaction.data.sold ? "Yes" : "No"}</TableCell>
              <TableCell>
                <img
                  src={transaction.data.image}
                  alt={transaction.data.title}
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-between">
        <div>Page No: {currentPage}</div>
        <div>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="ml-2"
          >
            Next
          </Button>
        </div>
        <div>Per Page: {perPage}</div>
      </div>
    </div>
  );
}
