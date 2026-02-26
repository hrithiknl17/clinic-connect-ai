import { useState } from "react";
import { Calendar, Clock, Activity, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import AppointmentCard from "@/components/AppointmentCard";
import { upcomingAppointments as initialUpcoming, pastAppointments as initialPast, Appointment } from "@/lib/mockData";

const Dashboard = () => {
  const [upcoming, setUpcoming] = useState<Appointment[]>(initialUpcoming);
  const [past, setPast] = useState<Appointment[]>(initialPast);

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

  const completedCount = past.filter((a) => a.status === "completed").length;
  const cancelledCount = past.filter((a) => a.status === "cancelled").length;

  const statCards = [
    { label: "Upcoming", value: upcoming.length, icon: Calendar, color: "text-primary" },
    { label: "Completed", value: completedCount, icon: Activity, color: "text-success" },
    { label: "Cancelled", value: cancelledCount, icon: Clock, color: "text-destructive" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">My Appointments</h1>
            <p className="mt-1 text-muted-foreground">Manage your upcoming and past visits</p>
          </div>
          <Button asChild className="shadow-hero w-fit">
            <Link to="/doctors">
              <Plus className="mr-2 h-4 w-4" /> Book Appointment
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
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

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="mt-8">
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
              <AppointmentCard key={apt.id} appointment={apt} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
