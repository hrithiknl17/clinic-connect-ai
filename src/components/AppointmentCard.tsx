import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/lib/mockData";

interface AppointmentCardProps {
  appointment: Appointment;
}

const statusStyles: Record<string, string> = {
  upcoming: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-success/10 text-success border-success/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const formattedDate = new Date(appointment.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-heading font-semibold text-foreground">{appointment.doctorName}</h3>
          <p className="text-sm text-primary font-medium">{appointment.specialty}</p>
        </div>
        <Badge variant="outline" className={statusStyles[appointment.status]}>
          {appointment.status}
        </Badge>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {appointment.time}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          {appointment.location}
        </span>
      </div>
      {appointment.status === "upcoming" && (
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm">Reschedule</Button>
          <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
