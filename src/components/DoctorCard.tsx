import { Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Doctor } from "@/lib/mockData";

interface DoctorCardProps {
  doctor: Doctor;
  index?: number;
}

const DoctorCard = ({ doctor, index = 0 }: DoctorCardProps) => {
  return (
    <div
      className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full gradient-hero text-lg font-bold text-primary-foreground">
          {doctor.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-lg font-semibold text-foreground truncate">
            {doctor.name}
          </h3>
          <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              {doctor.rating} ({doctor.reviewCount})
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {doctor.location}
            </span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{doctor.bio}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-medium text-success">
          <Clock className="h-4 w-4" />
          Next: {doctor.nextAvailable}
        </span>
        <Button asChild size="sm">
          <Link to={`/book/${doctor.id}`}>Book Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;
