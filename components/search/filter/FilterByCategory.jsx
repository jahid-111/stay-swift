"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const FilterByCategory = () => {
  const [query, setQuery] = useState([]);
  console.log(query);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const checked = event.target.checked;

    if (checked) {
      setQuery((prv) => [...prv, name]);
    } else {
      const filtered = query.filter((item) => item !== name);
      setQuery(filtered);
    }
    console.log(query);
  };

  // ========================================  Page Reload Action
  useEffect(() => {
    const category = params.get("category");
    if (category) {
      const deCodeCate = decodeURI(category);
      const queryInCategory = deCodeCate.split("|");
      setQuery(queryInCategory);
    }
  }, []);
  // ========================================  Component Action
  useEffect(() => {
    if (query.length > 0) {
      params.set("category", encodeURI(query.join("|")));
    } else {
      params.delete("category");
    }

    replace(`${pathName}?${params?.toString()}`);
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Star Category</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="fiveStar">
          <input
            onChange={handleChange}
            checked={query.includes("5")}
            type="checkbox"
            name="5"
            id="fiveStar"
          />
          5 Star
        </label>

        <label htmlFor="fourStar">
          <input
            onChange={handleChange}
            checked={query.includes("4")}
            type="checkbox"
            name="4"
            id="forStar"
            d="fourStar"
          />
          4 Star
        </label>

        <label htmlFor="threeStar">
          <input
            onChange={handleChange}
            checked={query.includes("3")}
            type="checkbox"
            name="3"
            id="threeStar"
          />
          3 Star
        </label>

        <label htmlFor="twoStar">
          <input
            onChange={handleChange}
            checked={query.includes("2")}
            type="checkbox"
            name="2"
            id="twoStar"
          />
          2 Star
        </label>

        <label htmlFor="oneStar">
          <input
            onChange={handleChange}
            checked={query.includes("1")}
            type="checkbox"
            name="1"
            id="oneStar"
          />
          1 Star
        </label>
      </form>
    </div>
  );
};

export default FilterByCategory;
