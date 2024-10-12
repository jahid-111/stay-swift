"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SortHotel = () => {
  const [priceSort, setPriceSort] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handlePriceSort = (event) => {
    event.preventDefault();
    const name = event.target.name;
    setPriceSort(name);

    console.log(priceSort);
  };

  useEffect(() => {
    const sortName = params.get("sort");
    if (sortName) {
      setPriceSort(sortName);
    }
  }, []);

  useEffect(() => {
    if (priceSort) {
      params.set("sort", encodeURI(priceSort));
    } else {
      params.delete("sort");
    }
    replace(`${pathName}?${params?.toString()}`);
  }, [priceSort]);

  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="highToLow">
          <input
            onChange={(e) => handlePriceSort(e)}
            checked={priceSort.includes("highToLow")}
            className="me-1"
            type="radio"
            name="highToLow"
            id="highToLow"
          />
          Price High to Low
        </label>

        <label htmlFor="lowToHigh">
          <input
            onChange={(e) => handlePriceSort(e)}
            checked={priceSort.includes("lowToHigh")}
            className="me-1"
            type="radio"
            name="lowToHigh"
            id="lowToHigh"
          />
          Price Low to high
        </label>
      </form>
    </div>
  );
};

export default SortHotel;
