import TransactionCard from "@/components/TransactionCard";
import { useState, useEffect } from "react";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  status: "Success" | "Failed";
}

// 1. PERFORMANCE: Moved outside component (Created once, never re-created)
const fetchHistory = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Abebe Bikila",
          amount: 500,
          date: "Today",
          status: "Success",
        },
        {
          id: 2,
          name: "Kebede Michael",
          amount: 120,
          date: "Yesterday",
          status: "Failed",
        },
        {
          id: 3,
          name: "Almaz Ayana",
          amount: 1000,
          date: "Mon",
          status: "Success",
        },
      ]);
    }, 2000);
  });
};

function App() {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchHistory();
      setHistory(data);
      setLoadingHistory(false);
    };
    loadData();
  }, []);

  // Logic handlers...
  const handleSend = async ({
    phone,
    amount,
  }: {
    phone: string;
    amount: number;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`Sent ${amount} to ${phone}`);
  };

  const handleRequest = async ({
    phone,
    amount,
  }: {
    phone: string;
    amount: number;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    alert(`Requested ${amount} from ${phone}`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      {/* 2. LAYOUT: Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-500">Welcome back, User.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Actions */}
        <div className="space-y-6">
          <TransactionCard
            title="Send Money"
            buttonText="Send"
            onSubmit={handleSend}
          />
          <TransactionCard
            title="Request Money"
            buttonText="Request"
            onSubmit={handleRequest}
          />
        </div>

        {/* Right Column: History */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

          {loadingHistory ? (
            <div className="space-y-3">
              {/* Skeleton Loading Effect */}
              <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                // 3. KEY PROP: Mandatory for lists
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition-all"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {item.name}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>

                  <div className="text-right">
                    <span className="block font-bold">{item.amount} ETB</span>
                    <span
                      className={`text-xs ${
                        item.status === "Success"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
