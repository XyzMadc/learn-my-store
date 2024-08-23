import FilterDropdown from "@/components/ui/dropdownFilter";
import { useState } from "react";

export default function SidebarFilterProducts() {
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);

  const handleToggleGender = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((item) => item !== gender)
        : [...prev, gender]
    );
  };

  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleToggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  const handleToggleCollections = (collection: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collection)
        ? prev.filter((item) => item !== collection)
        : [...prev, collection]
    );
  };

  const handleToggleAthletes = (athlete: string) => {
    setSelectedAthletes((prev) =>
      prev.includes(athlete)
        ? prev.filter((item) => item !== athlete)
        : [...prev, athlete]
    );
  };

  return (
    <aside className="w-1/4 bg-white p-4">
      <h2 className="text-lg font-bold mb-4">{`Men's Football Shoes (55)`}</h2>
      <div className="p-4 space-y-2">
        <FilterDropdown
          label="Gender"
          options={["Men", "Women", "Unisex"]}
          selectedOptions={selectedGenders}
          onToggle={handleToggleGender}
        />
        <FilterDropdown
          label="Size"
          options={["S", "M", "L", "XL"]}
          selectedOptions={selectedSizes}
          onToggle={handleToggleSize}
        />
        <FilterDropdown
          label="Color"
          options={["Red", "Blue", "Green", "Black"]}
          selectedOptions={selectedColors}
          onToggle={handleToggleColor}
        />
        <FilterDropdown
          label="Colections"
          options={["Mercurial", "Phantom", "Tiempo"]}
          selectedOptions={selectedCollections}
          onToggle={handleToggleCollections}
        />
        <FilterDropdown
          label="Athletes"
          options={["Erling Haaland", "Cristiano Ronaldo", "Kylian Mbappé"]}
          selectedOptions={selectedAthletes}
          onToggle={handleToggleAthletes}
        />
      </div>
    </aside>
  );
}
