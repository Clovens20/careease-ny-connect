import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        const { data: adminData } = await supabase
          .from("admins")
          .select("*")
          .eq("email", user.email.toLowerCase())
          .maybeSingle();
        
        if (adminData) {
          navigate("/admin");
        }
      }
    };
    checkExistingSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      // Vérifier d'abord si l'email est autorisé comme admin
      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("email")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (adminError || !adminData) {
        throw new Error("This email is not authorized as administrator");
      }

      if (isSignUp) {
        // Flux d'inscription
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;

        toast({
          title: "Account Created!",
          description: "You can now sign in.",
        });
        setIsSignUp(false);
      } else {
        // Flux de connexion
        const { error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (error) throw error;

        toast({
          title: "Welcome!",
          description: "Successfully signed in.",
        });
        navigate("/admin");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="CareEase NY" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl">Admin Portal</CardTitle>
          <CardDescription>
            {isSignUp ? "Create your admin account" : "Sign in to access the dashboard"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@careeaseny.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline"
            >
              {isSignUp ? "Already have an account? Sign in" : "No account? Create account"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;