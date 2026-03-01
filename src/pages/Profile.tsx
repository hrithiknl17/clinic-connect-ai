import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  User, Mail, Phone, MapPin, Calendar, Save,
  Clock, Activity, Plus, Star,
} from "lucide-react";
import AppointmentCard from "@/components/AppointmentCard";
import {
  upcomingAppointments as initialUpcoming,
  pastAppointments as initialPast,
  Appointment,
} from "@/lib/mockData";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState("Demo User");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [dob, setDob] = useState("1990-01-15");
  const [address, setAddress] = useState("123 Main St, City, State");

  const [upcoming, setUpcoming] = useState<Appointment[]>(initialUpcoming);
  const [past, setPast] = useState<Appointment[]>(initialPast);
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Profile updated!" });
  };

  const handleCancel = (id: string) => {
    const apt = upcoming.find((a) => a.id === id);
    if (!apt) return;
    setUpcoming((prev) => prev.filter((a) => a.id !== id));
    setPast((prev) => [{ ...apt, status: "cancelled" as const }, ...prev]);
  };

  const handleReschedule = (id: string, newDate: string, newTime: string) => {
    setUpcoming((prev) =>
      prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime } : a))
    );
  };

  const handleReview = (id: string, rating: number, comment: string) => {
    setReviewedIds((prev) => new Set(prev).add(id));
    const apt = past.find((a) => a.id === id);
    toast({
      title: `Review Submitted ⭐`,
      description: `You rated ${apt?.doctorName} ${rating}/5. Thank you!`,
    });
  };

  const completedCount = past.filter((a) => a.status === "completed").length;
  const cancelledCount = past.filter((a) => a.status === "cancelled").length;

  const statCards = [
    { label: "Upcoming", value: upcoming.length, icon: Calendar, color: "text-primary" },
    { label: "Completed", value: completedCount, icon: Activity, color: "text-success" },
    { label: "Cancelled", value: cancelledCount, icon: Clock, color: "text-destructive" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-hero text-2xl font-bold text-primary-foreground">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{displayName}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" /> {user.email}
            </p>
          </div>
        </div>

        <Tabs defaultValue="appointments" className="mt-8">
          <TabsList>
            <TabsTrigger value="appointments">My Appointments</TabsTrigger>
            <TabsTrigger value="profile">Personal Info</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">Manage your upcoming and past visits</p>
              <Button asChild className="shadow-hero" size="sm">
                <Link to="/doctors">
                  <Plus className="mr-1 h-4 w-4" /> Book Appointment
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {statCards.map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <s.icon className={`h-5 w-5 ${s.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{s.value}</div>
                      <div className="text-sm text-muted-foreground">{s.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="mt-4 space-y-4">
                {upcoming.length > 0 ? (
                  upcoming.map((apt) => (
                    <AppointmentCard key={apt.id} appointment={apt} onCancel={handleCancel} onReschedule={handleReschedule} />
                  ))
                ) : (
                  <div className="rounded-xl border border-border bg-card p-12 text-center">
                    <p className="text-muted-foreground">No upcoming appointments.</p>
                    <Button asChild className="mt-4">
                      <Link to="/doctors">Book your first appointment</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="past" className="mt-4 space-y-4">
                {past.map((apt) => (
                  <AppointmentCard
                    key={apt.id}
                    appointment={apt}
                    onReview={apt.status === "completed" ? handleReview : undefined}
                    reviewed={reviewedIds.has(apt.id)}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <form onSubmit={handleSave} className="rounded-xl border border-border bg-card p-6 shadow-card space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-muted-foreground" /> Display Name
                </Label>
                <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
                </Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob" className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground" /> Date of Birth
                </Label>
                <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-muted-foreground" /> Address
                </Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, City, State" />
              </div>
              <Button type="submit" className="shadow-hero" size="lg">
                <Save className="h-4 w-4 mr-1" /> Save Changes
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
