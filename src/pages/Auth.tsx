import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Heart, Shield, Lock, Eye, EyeOff } from "lucide-react";

type AuthView = "login" | "signup";

const Auth = () => {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("demo@medibook.com");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email);
    toast({ title: view === "login" ? "Welcome back!" : "Account created!" });
    navigate("/profile");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-hero mb-4">
            <Heart className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {view === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {view === "login" ? "Sign in to manage your appointments" : "Join MediBook to book appointments"}
          </p>
        </div>

        {/* Demo banner */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground">Demo Mode</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                This is a demo app. Use any email and password to sign in instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full shadow-hero" size="lg">
              {view === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setView(view === "login" ? "signup" : "login")}
              className="text-sm text-primary hover:underline"
            >
              {view === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>Demo Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
