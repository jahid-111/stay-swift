import Link from "next/link";
import RatingHotel from "./RatingHotel";
import ReviewHotel from "./ReviewHotel";

const HotelSummaryInfo = ({ hotelInfo, fromListPage }) => {
  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2
          className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl"}
        >
          {hotelInfo?.name}
        </h2>
        <p>📍 {hotelInfo?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <RatingHotel id={hotelInfo?.id} />
          |
          <ReviewHotel id={hotelInfo?.id} />
        </div>
        <div>
          <span className="font-semibold text-xl bg-gray-200 px-3  rounded-sm ">
            {hotelInfo?.propertyCategory} ⭐
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">
          ${(hotelInfo?.highRate + hotelInfo?.lowRate) / 2}/night
        </h2>
        <p className=" text-right">Per Night for 1 Rooms</p>
        {fromListPage ? (
          <Link href={`/hotels/${hotelInfo.id}`} className="btn-primary ">
            Details
          </Link>
        ) : (
          <button className="btn-primary ">Book</button>
        )}
      </div>
    </>
  );
};

export default HotelSummaryInfo;
