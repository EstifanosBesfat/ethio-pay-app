import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // 1. LOGGING IN
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert(error.message);
    } else {
      // 2. SIGNING UP
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) alert(error.message);
      else alert("Account created! You are now logged in.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}