import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { useEffect, useState } from "react";
import TransactionsBarChart from "./components/TransactionsBarChart";
import TransactionsTable from "./components/TransactionsTable";
import TransactionStatistics from "./components/TransactionStatistics";
import { Input } from "./components/ui/input";

export default function TransactionsPage() {
  const [selectedMonth, setSelectedMonth] = useState("3"); // Default to March (3rd month)
  const [searchTerm, setSearchTerm] = useState("");

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  useEffect(() => {
    setSearchTerm("");
  }, [selectedMonth]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4"> Transactions Dashboard</h1>
      <div className="mb-4">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <TransactionStatistics selectedMonth={selectedMonth} />
      </div>
      <div className="mb-4">
        <TransactionsBarChart selectedMonth={selectedMonth} />
      </div>
      <Input
        type="text"
        placeholder="Search transaction"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:w-[300px]"
      />

      <TransactionsTable
        selectedMonth={selectedMonth}
        searchTerm={searchTerm}
      />
    </div>
  );
}
