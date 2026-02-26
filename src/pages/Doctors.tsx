import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DoctorCard from "@/components/DoctorCard";
import { doctors, specialties } from "@/lib/mockData";
import { useState, useMemo } from "react";

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase());
      const matchesSpecialty = !selectedSpecialty || d.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [search, selectedSpecialty]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Find a Doctor</h1>
        <p className="mt-2 text-muted-foreground">Browse our network of trusted healthcare professionals</p>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSpecialty(null)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                !selectedSpecialty
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              All
            </button>
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSpecialty(selectedSpecialty === s ? null : s)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedSpecialty === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc, i) => (
            <DoctorCard key={doc.id} doctor={doc} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
