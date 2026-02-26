import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Calendar, Save, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Profile {
  display_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  address: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile>({
    display_name: "",
    phone: "",
    date_of_birth: "",
    address: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    if (user) {
      fetchProfile();
    }
  }, [user, authLoading]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("display_name, phone, date_of_birth, address, avatar_url")
      .eq("user_id", user!.id)
      .single();

    if (data) {
      setProfile({
        display_name: data.display_name || "",
        phone: data.phone || "",
        date_of_birth: data.date_of_birth || "",
        address: data.address || "",
        avatar_url: data.avatar_url || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name || null,
        phone: profile.phone || null,
        date_of_birth: profile.date_of_birth || null,
        address: profile.address || null,
      })
      .eq("user_id", user!.id);

    if (error) {
      toast({ title: "Error saving profile", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
    }
    setSaving(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="mt-1 text-muted-foreground">Manage your personal information</p>
        </div>

        {/* Avatar / initials */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-hero text-2xl font-bold text-primary-foreground">
            {(profile.display_name || user?.email || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{profile.display_name || "User"}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" /> {user?.email}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-muted-foreground" /> Display Name
            </Label>
            <Input
              id="name"
              value={profile.display_name || ""}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone || ""}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob" className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-muted-foreground" /> Date of Birth
            </Label>
            <Input
              id="dob"
              type="date"
              value={profile.date_of_birth || ""}
              onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-muted-foreground" /> Address
            </Label>
            <Input
              id="address"
              value={profile.address || ""}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              placeholder="123 Main St, City, State"
            />
          </div>

          <Button type="submit" className="shadow-hero" size="lg" disabled={saving}>
            <Save className="h-4 w-4 mr-1" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
