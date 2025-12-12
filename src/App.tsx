import TransactionCard from "@/components/TransactionCard";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  status: "Success" | "Failed";
}

function App() {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // ---------------------------------------------------------
  // 1. READ LOGIC: Fetch from Real Database
  // ---------------------------------------------------------
  const getTransactions = async () => {
    setLoadingHistory(true);
    
    // Select * from transactions table, order by newest first
    const { data: supabaseData, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error loading history:", error.message);
    } else {
      console.log("Data loaded:", supabaseData);
      
      // Transform Database format to UI format
      const formattedData: Transaction[] = supabaseData.map((item: any) => ({
        id: item.id,
        name: item.phone, // Showing phone because we don't have names yet
        amount: item.amount,
        date: new Date(item.created_at).toLocaleDateString(),
        status: "Success",
      }));

      setHistory(formattedData);
    }
    setLoadingHistory(false);
  };

  // Run on page load
  useEffect(() => {
    getTransactions();
  }, []);

  // ---------------------------------------------------------
  // 2. WRITE LOGIC: Save to Real Database
  // ---------------------------------------------------------
  const handleSend = async ({ phone, amount }: { phone: string; amount: number }) => {
    // Insert into Supabase
    const { error } = await supabase
      .from('transactions')
      .insert([
        { 
          phone: phone, 
          amount: amount,
          type: 'send' 
        }
      ]);

    if (error) {
      alert("Error sending money: " + error.message);
    } else {
      alert(`Success! Sent ${amount} ETB to ${phone}`);
      // Refresh the list automatically so we see the new item
      getTransactions();
    }
  };

  const handleRequest = async ({ phone, amount }: { phone: string; amount: number }) => {
    // You can add logic here later to save "requests" to DB too
    alert(`Requested ${amount} from ${phone}`);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
        <p className="text-gray-500">Welcome back, User.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Actions Column */}
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

        {/* History Column */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border h-fit">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>

          {loadingHistory ? (
            <div className="space-y-3">
              <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {history.length === 0 ? (
                 <p className="text-gray-400 text-sm">No transactions yet.</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>

                    <div className="text-right">
                      <span className="block font-bold">{item.amount} ETB</span>
                      <span className="text-xs text-green-600">Success</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;