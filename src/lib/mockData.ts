export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  location: string;
  bio: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  location: string;
}

export const specialties = [
  "General Practice",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "Ophthalmology",
  "Dentistry",
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    avatar: "SC",
    rating: 4.9,
    reviewCount: 234,
    nextAvailable: "Today",
    location: "Downtown Medical Center",
    bio: "Board-certified cardiologist with 15+ years of experience in interventional cardiology and heart failure management.",
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    specialty: "General Practice",
    avatar: "JW",
    rating: 4.8,
    reviewCount: 412,
    nextAvailable: "Today",
    location: "Westside Family Clinic",
    bio: "Dedicated family physician focused on preventive care and chronic disease management.",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    avatar: "ER",
    rating: 4.7,
    reviewCount: 189,
    nextAvailable: "Tomorrow",
    location: "Skin Health Institute",
    bio: "Specializing in medical and cosmetic dermatology with expertise in skin cancer screening.",
  },
  {
    id: "4",
    name: "Dr. Michael Park",
    specialty: "Pediatrics",
    avatar: "MP",
    rating: 4.9,
    reviewCount: 567,
    nextAvailable: "Today",
    location: "Children's Wellness Center",
    bio: "Compassionate pediatrician committed to providing comprehensive care for infants through adolescents.",
  },
  {
    id: "5",
    name: "Dr. Lisa Thompson",
    specialty: "Orthopedics",
    avatar: "LT",
    rating: 4.6,
    reviewCount: 145,
    nextAvailable: "Mar 3",
    location: "Sports Medicine & Ortho Clinic",
    bio: "Sports medicine specialist focusing on minimally invasive orthopedic surgery and rehabilitation.",
  },
  {
    id: "6",
    name: "Dr. David Kim",
    specialty: "Neurology",
    avatar: "DK",
    rating: 4.8,
    reviewCount: 298,
    nextAvailable: "Tomorrow",
    location: "Brain & Spine Center",
    bio: "Neurologist specializing in headache disorders, epilepsy, and neurodegenerative diseases.",
  },
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const hours = [9, 9.5, 10, 10.5, 11, 11.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5];
  hours.forEach((h, i) => {
    const hour = Math.floor(h);
    const min = h % 1 === 0.5 ? "30" : "00";
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    slots.push({
      id: `slot-${i}`,
      time: `${displayHour}:${min} ${ampm}`,
      available: Math.random() > 0.3,
    });
  });
  return slots;
};

export const upcomingAppointments: Appointment[] = [
  {
    id: "apt-1",
    doctorId: "1",
    doctorName: "Dr. Sarah Chen",
    specialty: "Cardiology",
    date: "2026-03-02",
    time: "10:00 AM",
    status: "upcoming",
    location: "Downtown Medical Center",
  },
  {
    id: "apt-2",
    doctorId: "4",
    doctorName: "Dr. Michael Park",
    specialty: "Pediatrics",
    date: "2026-03-05",
    time: "2:30 PM",
    status: "upcoming",
    location: "Children's Wellness Center",
  },
];

export const pastAppointments: Appointment[] = [
  {
    id: "apt-3",
    doctorId: "2",
    doctorName: "Dr. James Wilson",
    specialty: "General Practice",
    date: "2026-02-15",
    time: "11:00 AM",
    status: "completed",
    location: "Westside Family Clinic",
  },
  {
    id: "apt-4",
    doctorId: "3",
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Dermatology",
    date: "2026-02-10",
    time: "3:00 PM",
    status: "cancelled",
    location: "Skin Health Institute",
  },
];
