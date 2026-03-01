import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-hero mb-4">
          <Heart className="h-7 w-7 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Demo Mode</h1>
        <p className="mt-3 text-muted-foreground">
          Password reset is not available in demo mode. Just sign in with any email!
        </p>
        <Button className="mt-8 shadow-hero" size="lg" onClick={() => navigate("/auth")}>
          Go to Sign In
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
