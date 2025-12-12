import TransactionCard from "@/components/TransactionCard";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js"; // <--- FIXED: Added 'type'
import AuthForm from "@/components/AuthForm";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  status: "Success" | "Failed";
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // 1. AUTH LISTENER
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. READ LOGIC
  const getTransactions = async () => {
    // Only fetch if we are logged in
    if (!session?.user) return;

    setLoadingHistory(true);
    const { data: supabaseData, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading history:", error.message);
    } else {
      const formattedData: Transaction[] = supabaseData.map((item: any) => ({
        id: item.id,
        name: item.phone,
        amount: item.amount,
        date: new Date(item.created_at).toLocaleDateString(),
        status: "Success",
      }));
      setHistory(formattedData);
    }
    setLoadingHistory(false);
  };

  // Run fetch when session changes (user logs in)
  useEffect(() => {
    if (session) {
      getTransactions();
    }
  }, [session]);

  // 3. WRITE LOGIC
  const handleSend = async ({
    phone,
    amount,
  }: {
    phone: string;
    amount: number;
  }) => {
    const { error } = await supabase.from("transactions").insert([
      {
        phone: phone,
        amount: amount,
        type: "send",
        user_id: session.user.id, // <--- THE NEW STAMP
      },
    ]);

    if (error) {
      alert("Error sending money: " + error.message);
    } else {
      alert(`Success! Sent ${amount} ETB to ${phone}`);
      getTransactions();
    }
  };

  const handleRequest = async ({
    phone,
    amount,
  }: {
    phone: string;
    amount: number;
  }) => {
    alert(`Requested ${amount} from ${phone}`);
  };

  // 4. CONDITIONAL RENDERING (The Gate)
  if (!session) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      {/* Header with Logout */}
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-gray-500">User: {session.user.email}</p>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
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
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
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
