"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface TransactionCardProps {
  title: string;
  buttonText: string;
  onSubmit: (data: { phone: string; amount: number }) => Promise<void>;
}

export default function TransactionCard({
  title,
  buttonText,
  onSubmit,
}: TransactionCardProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = async () => {
    // Validation
    if (Number(amount) <= 0) {
      alert("You cannot transfer zero or negative ETB!");
      return;
    }

    const isValidEthioPhone = /^(09|07)\d{8}$/.test(phoneNumber);
    if (!isValidEthioPhone) {
      alert("Invalid Phone! Must start with 09 or 07 and be 10 digits.");
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({
        phone: phoneNumber,
        amount: Number(amount),
      });
    } catch {
      alert("Network Error: Could not complete transfer.");
    } finally {
      setIsLoading(false);
      setPhoneNumber("");
      setAmount("");
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-lg shadow-black/8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Transfer funds quickly and securely
        </p>
      </div>

      {/* Form */}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleTransfer();
        }}
      >
        {/* Phone */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="09/07XX XXX XXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder-muted-foreground shadow-sm shadow-black/4 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
          />
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-foreground"
          >
            Amount (ETB)
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground placeholder-muted-foreground shadow-sm shadow-black/4 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
              ETB
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Processing...
            </>
          ) : (
            <>
              {buttonText}
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 rounded-lg bg-muted/50 p-3">
        <p className="text-xs text-muted-foreground">
          ✓ Secure transfer • Instant delivery • No hidden fees
        </p>
      </div>
    </div>
  );
}
