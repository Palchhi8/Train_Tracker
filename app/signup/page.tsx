"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Sign up with Supabase
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // 2. Redirect to login or show success (Supabase handles confirmation emails by default)
      router.push("/login?message=Check your email to confirm your account");
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
            background: "rgba(0, 163, 255, 0.1)", 
            width: "48px", 
            height: "48px", 
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px"
          }}>
            <UserPlus color="var(--accent-blue)" size={24} />
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Join the Track</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Start your journey with smart commuting.</p>
        </header>

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "14px", fontWeight: 500 }}>Full Name</label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--text-muted)" }} />
              <input 
                type="text" 
                className="input" 
                placeholder="John Doe" 
                style={{ paddingLeft: "44px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--accent-orange)", textDecoration: "none", fontWeight: 600 }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
