import SortHotel from "../../sort/SortHotel";
import FilterByAmenities from "./FilterByAmenities";
import FilterByCategory from "./FilterByCategory";
import FilterByRange from "./FilterByRange";

const Filter = ({ amenities }) => {
  return (
    <div className="col-span-3 space-y-4">
      <SortHotel />

      <FilterByRange />

      <FilterByCategory />

      <FilterByAmenities amenities={amenities} />
    </div>
  );
};

export default Filter;
