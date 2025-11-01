import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type City = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
};

interface SelectCityProps {
  selectedCity: string;
  setSelectedCity: (cityId: string) => void;
}

export const SelectCity = ({ selectedCity, setSelectedCity }: SelectCityProps) => {
  // 1️⃣ Récupérer les villes actives
  const { data: cities, isLoading } = useQuery<City[]>({
    queryKey: ["cities", "active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cities")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  if (isLoading) return <p>Loading cities...</p>;

  return (
    <Select value={selectedCity} onValueChange={setSelectedCity}>
      <SelectTrigger className="h-12">
        <SelectValue placeholder="Select a city..." />
      </SelectTrigger>
      <SelectContent>
        {cities?.map((city) => (
          <SelectItem key={city.id} value={city.id}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
