import { useRef, useState } from "react";
import { Play, Pause, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Regular Patient",
    specialty: "Cardiology",
    year: "2024",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "/images/doctor-1.jpg",
    rating: 5,
    quote: "MediBook made booking so easy!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Patient since 2023",
    specialty: "Dermatology",
    year: "2023",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "/images/doctor-2.jpg",
    rating: 5,
    quote: "Best healthcare platform I've used.",
  },
  {
    id: 3,
    name: "Arun Venkatesh",
    role: "Frequent Visitor",
    specialty: "General Practice",
    year: "2024",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "/images/doctor-3.jpg",
    rating: 5,
    quote: "Trusted doctors, seamless experience.",
  },
  {
    id: 4,
    name: "Meena Lakshmi",
    role: "New Patient",
    specialty: "Pediatrics",
    year: "2025",
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "/images/doctor-4.jpg",
    rating: 4,
    quote: "Found the right specialist instantly.",
  },
];

const VideoCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group relative flex-shrink-0 w-[300px] md:w-[350px] h-[480px] rounded-2xl overflow-hidden shadow-card-hover">
      <video
        ref={videoRef}
        src={testimonial.video}
        poster={testimonial.poster}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm text-background transition-opacity opacity-0 group-hover:opacity-100"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      {/* Top label */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-warning">
          {testimonial.specialty} · {testimonial.year}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-warning text-warning" />
          ))}
        </div>
        <p className="text-sm italic text-background/80 mb-2">"{testimonial.quote}"</p>
        <h3 className="text-lg font-bold text-background">{testimonial.name}</h3>
        <p className="text-sm text-background/70">{testimonial.role}</p>
      </div>
    </div>
  );
};

const VideoTestimonials = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          What Our Patients Say
        </h2>
        <p className="mt-2 text-muted-foreground">
          Real stories from real patients — watch their experiences
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-6 px-4 animate-scroll">
          {[...testimonials, ...testimonials].map((t, i) => (
            <VideoCard key={`${t.id}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
