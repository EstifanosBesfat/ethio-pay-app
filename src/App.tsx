import TransactionCard from "@/components/TransactionCard";


function App() {
  // Card 1 logic: Send money with fee
  const handleSend = async ({
    phone,
    amount,
  }: {
    phone: string;
    amount: number;
  }) => {
    // simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const fee = amount > 1000 ? 10 : 0;
    const total = amount + fee;

    alert(`Sent: ${amount} ETB\nFee: ${fee} ETB\nTotal Deducted: ${total} ETB`);
  };

  // Card 2 logic: Request money (no fee)
  const handleRequest = async ({
    phone,
    amount,
  }: {
    phone: string;
    amount: number;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    alert(`Request Sent:\nPhone: ${phone}\nAmount: ${amount} ETB`);
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4 gap-8">
      {/* Card 1 */}
      <TransactionCard
        title="Send Money"
        buttonText="Send"
        onSubmit={handleSend}
      />

      {/* Card 2 */}
      <TransactionCard
        title="Request Money"
        buttonText="Request"
        onSubmit={handleRequest}
      />
    </div>
  );
}

export default App;
