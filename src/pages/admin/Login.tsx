import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo-careease-usa.png";
import { logger } from "@/lib/logger";

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
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user?.email) {
          const normalizedEmail = user.email.toLowerCase();
          
          // Méthode 1: Vérifier dans profiles
          const { data: profileData } = await supabase
            .from("profiles")
            .select("role")
            .eq("email", normalizedEmail)
            .eq("role", "admin")
            .maybeSingle();

          if (profileData) {
            navigate("/admin");
            return;
          }

          // Méthode 2: Fallback - Vérifier dans admins
          const { data: adminData } = await supabase
            .from("admins")
            .select("email")
            .eq("email", normalizedEmail)
            .maybeSingle();

          if (adminData) {
            navigate("/admin");
          }
        }
      } catch (error) {
        logger.error("Error checking session:", error);
      }
    };
    checkExistingSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      logger.log("Tentative de connexion avec:", normalizedEmail);

      if (isSignUp) {
        // CRÉATION DE COMPTE
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin/login`,
          },
        });

        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            toast({
              title: "Compte existant",
              description: "Cet email est déjà enregistré. Veuillez vous connecter.",
              variant: "default",
            });
            setIsSignUp(false);
            return;
          }
          throw signUpError;
        }

        // Créer un profil admin dans la table profiles
        if (signUpData.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ 
              email: normalizedEmail,
              role: "admin"
            }]);

          if (profileError && !profileError.message.includes('duplicate')) {
            logger.error("Error creating profile:", profileError);
          }

          // Aussi ajouter dans admins en fallback
          const { error: adminError } = await supabase
            .from("admins")
            .insert([{ email: normalizedEmail }]);

          if (adminError && !adminError.message.includes('duplicate')) {
            logger.error("Error adding to admins:", adminError);
          }
        }

        toast({
          title: "Compte créé !",
          description: "Vérifiez votre email pour confirmer votre compte, puis connectez-vous.",
        });
        setIsSignUp(false);
        
      } else {
        // CONNEXION
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (authError) {
          logger.error("Auth error details:", authError);
          if (authError.message.includes('Invalid login credentials') || authError.message.includes('invalid')) {
            throw new Error("Email ou mot de passe invalide. Vérifiez vos informations.");
          } else if (authError.message.includes('Email not confirmed')) {
            throw new Error("Veuillez confirmer votre email avant de vous connecter. Vérifiez votre boîte mail.");
          }
          throw new Error(authError.message || "Erreur d'authentification.");
        }

        logger.log("Authentification réussie, vérification des droits admin...");

        // Vérifier si l'utilisateur est admin - Essayer d'abord avec profiles, puis admins
        let isAdmin = false;
        
        // Méthode 1: Vérifier dans profiles
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, email, role")
          .eq("email", normalizedEmail)
          .eq("role", "admin")
          .maybeSingle();

        logger.log("Résultat vérification profiles:", { profileData, profileError });

        if (profileData) {
          isAdmin = true;
          logger.log("Admin trouvé dans profiles");
        }

        // Méthode 2: Fallback - Vérifier dans admins si profiles ne fonctionne pas
        if (!isAdmin) {
          logger.log("Vérification dans table admins...");
          const { data: adminData, error: adminError } = await supabase
            .from("admins")
            .select("email")
            .eq("email", normalizedEmail)
            .maybeSingle();
          
          logger.log("Résultat vérification admins:", { adminData, adminError });

          if (adminData) {
            isAdmin = true;
            logger.log("Admin trouvé dans admins");
          }
        }

        if (!isAdmin) {
          logger.error("Utilisateur non autorisé:", normalizedEmail);
          await supabase.auth.signOut();
          throw new Error("Cet email n'est pas autorisé en tant qu'administrateur. Contactez le support pour obtenir l'accès.");
        }

        logger.log("Utilisateur admin vérifié avec succès");
        toast({
          title: "Bienvenue !",
          description: "Connexion réussie.",
        });
        navigate("/admin");
      }
      
    } catch (error: any) {
      logger.error("Login error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite. Veuillez réessayer.",
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
            <img src={logo} alt="CareEase USA" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl">Portail Admin</CardTitle>
          <CardDescription>
            {isSignUp
              ? "Créer votre compte administrateur"
              : "Connectez-vous pour accéder au tableau de bord"}
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
                placeholder="contact@careeaseusa.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="pr-10"
                  autoComplete="current-password"
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
              <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? "Chargement..."
                : isSignUp
                ? "Créer le compte"
                : "Se connecter"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline"
            >
              {isSignUp
                ? "Vous avez déjà un compte ? Connexion"
                : "Pas de compte ? Créer un compte"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;