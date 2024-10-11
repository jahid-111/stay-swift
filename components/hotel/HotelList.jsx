import { getAllHotels } from "@/data/queries";
import HotelCard from "./HotelCard";
import NoHotels from "./NoHotels";

const HotelList = async ({
  destination,
  checkin,
  checkout,
  category,
  priceRange,
}) => {
  const allHotels = await getAllHotels(
    destination,
    checkin,
    checkout,
    category,
    priceRange
  );

  // console.log("priceRange",allHotels);
  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {allHotels.length > 0 ? (
          allHotels.map((hotel) => (
            <HotelCard
              key={hotel?.id}
              hotel={hotel}
              checkin={checkin}
              checkout={checkout}
            />
          ))
        ) : (
          <NoHotels />
        )}
      </div>
    </div>
  );
};

export default HotelList;
