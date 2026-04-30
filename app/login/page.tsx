"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div style={{ 
      minHeight: "80vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div className="glass" style={{ width: "100%", maxWidth: "400px", padding: "40px" }}>
        <header style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ 
            background: "rgba(255, 107, 0, 0.1)", 
            width: "48px", 
            height: "48px", 
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px"
          }}>
            <LogIn color="var(--accent-orange)" size={24} />
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Welcome Back</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Log in to access your commute dashboard.</p>
        </header>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 500 }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
              <input 
                type="email" 
                className="input" 
                placeholder="name@example.com" 
                style={{ paddingLeft: "44px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 500 }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
              <input 
                type="password" 
                className="input" 
                placeholder="••••••••" 
                style={{ paddingLeft: "44px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <p style={{ color: "var(--accent-orange)", fontSize: "13px", textAlign: "center" }}>{error}</p>
          )}

          <button className="btn btn-primary" style={{ width: "100%", height: "48px" }} disabled={loading}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "var(--accent-blue)", textDecoration: "none", fontWeight: 600 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
