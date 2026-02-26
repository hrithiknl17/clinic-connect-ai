import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Check, Calendar as CalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { doctors, generateTimeSlots } from "@/lib/mockData";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const doctor = doctors.find((d) => d.id === doctorId);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "confirm" | "done">("select");

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Doctor not found.</p>
        <Button asChild className="mt-4">
          <Link to="/doctors">Browse Doctors</Link>
        </Button>
      </div>
    );
  }

  const handleConfirm = () => {
    setStep("done");
    toast({
      title: "Appointment Confirmed! ✓",
      description: `Your appointment with ${doctor.name} has been booked.`,
    });
  };

  if (step === "done") {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <Check className="h-10 w-10 text-success" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-foreground">Booking Confirmed!</h1>
        <p className="mt-3 text-muted-foreground">
          Your appointment with <strong>{doctor.name}</strong> on{" "}
          {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at{" "}
          {selectedSlot} has been confirmed.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">A confirmation email has been sent to your inbox.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link to="/dashboard">View My Appointments</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/doctors">Book Another</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link
          to="/doctors"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to doctors
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          {/* Doctor info sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-hero text-xl font-bold text-primary-foreground">
                {doctor.avatar}
              </div>
              <h2 className="mt-4 font-heading text-xl font-bold text-foreground">{doctor.name}</h2>
              <p className="text-sm font-medium text-primary">{doctor.specialty}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {doctor.rating} ({doctor.reviewCount} reviews)
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {doctor.location}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{doctor.bio}</p>
            </div>
          </div>

          {/* Booking area */}
          <div className="lg:col-span-2">
            {step === "select" && (
              <div className="animate-fade-in">
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">Select Date & Time</h1>
                <p className="mt-1 text-muted-foreground">Choose a convenient time for your visit</p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-card p-4 shadow-card">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(d) => {
                        setSelectedDate(d);
                        setSelectedSlot(null);
                      }}
                      disabled={(date) => date < new Date()}
                      className="pointer-events-auto"
                    />
                  </div>

                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      Available Times
                    </h3>
                    {selectedDate && (
                      <p className="text-sm text-muted-foreground">
                        {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </p>
                    )}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                            selectedSlot === slot.time
                              ? "border-primary bg-primary text-primary-foreground shadow-hero"
                              : slot.available
                              ? "border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary"
                              : "cursor-not-allowed border-border bg-muted text-muted-foreground/40"
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    size="lg"
                    disabled={!selectedSlot}
                    onClick={() => setStep("confirm")}
                    className="shadow-hero"
                  >
                    Continue to Confirm
                  </Button>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div className="animate-fade-in">
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">Confirm Appointment</h1>
                <p className="mt-1 text-muted-foreground">Review your booking details</p>

                <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Doctor</span>
                      <span className="font-medium text-foreground">{doctor.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Specialty</span>
                      <span className="font-medium text-foreground">{doctor.specialty}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-foreground">
                        {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-3">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium text-foreground">{selectedSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium text-foreground">{doctor.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button variant="outline" onClick={() => setStep("select")}>
                    Back
                  </Button>
                  <Button onClick={handleConfirm} size="lg" className="shadow-hero">
                    Confirm Booking
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
