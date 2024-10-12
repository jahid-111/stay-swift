"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FilterByRange = () => {
  const [range, setRange] = useState({ min: "", max: "" });

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handlePriceRangeMin = (e) => {
    const minValue = e.target.value;
    setRange((prevRange) => ({ ...prevRange, min: minValue }));
  };

  const handlePriceRangeMax = (e) => {
    const maxValue = e.target.value;
    setRange((prevRange) => ({ ...prevRange, max: maxValue }));
  };

  useEffect(() => {
    const rangeInParams = params.get("range");

    if (rangeInParams) {
      const decodeRange = decodeURIComponent(rangeInParams);
      const foundRange = decodeRange.split("|");
      setRange({ min: foundRange[0], max: foundRange[1] });
    }
  }, []);
  useEffect(() => {
    if (range.min && range.max) {
      const rangeParam = `${range.min}|${range.max}`;
      const encodedRange = encodeURIComponent(rangeParam);
      params.set("range", encodedRange);
    }
    replace(`${pathName}?${params?.toString()}`);
  }, [range]);

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <div>
        <p className="font-semibold">
          Min: <span className="text-orange-500">{range.min}</span>
        </p>
        <input
          onChange={(e) => handlePriceRangeMin(e)}
          type="range"
          name="min"
          id="min"
          min="100"
          max="10000"
          value={range.min}
        />
      </div>
      <div>
        <p className="font-semibold">
          Max: <span className="text-orange-500">{range.max}</span>
        </p>
        <input
          onChange={(e) => handlePriceRangeMax(e)}
          type="range"
          name="max"
          id="max"
          min="200"
          max="10000"
          value={range.max}
        />
      </div>
    </div>
  );
};

export default FilterByRange;
