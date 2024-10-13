"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const FilterByAmenities = ({ amenities }) => {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  console.log(selectedAmenities);
  const handleAmenityChange = (event, amenities) => {
    event.preventDefault();
    const name = event.target.name;
    const checked = event.target.checked;
    if (checked) {
      setSelectedAmenities((Prv) => [...Prv, name]);
    } else {
      const filter = selectedAmenities.filter((item) => item !== name);
      setSelectedAmenities(filter);
    }
  };
  useEffect(() => {
    const amenities = params.get("amenity");
    if (amenities) {
      const deCodeAmenity = decodeURIComponent(amenities).split("|");
      setSelectedAmenities(deCodeAmenity);
    }
  }, []);

  useEffect(() => {
    if (selectedAmenities.length > 0) {
      params.set("amenity", encodeURIComponent(selectedAmenities.join("|")));
    } else {
      params.delete("amenity");
    }

    replace(`${pathName}?${params.toString()}`);
  }, [selectedAmenities]);

  return (
    <>
      <h3 className="font-bold text-lg">Amenities</h3>
      <form className="flex flex-col gap-2 mt-2">
        {amenities?.map((amenity) => (
          <label key={amenity.id} htmlFor={amenity.name}>
            <input
              type="checkbox"
              name={amenity.name}
              checked={selectedAmenities.includes(amenity.name)}
              id={amenities.name}
              onChange={(e) => handleAmenityChange(e)}
            />
            {amenity.name}
          </label>
        ))}
      </form>
    </>
  );
};

export default FilterByAmenities;
