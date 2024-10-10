import { getHotelById } from "@/data/queries";
import { getDayBooked } from "@/utils/data-util";
import Link from "next/link";
import React from "react";

const BookingCard = async ({ hotelId, checkin, checkout }) => {
  const hotelInfo = await getHotelById(hotelId);

  const days = getDayBooked(checkin, checkout);

  const totalCost = ((hotelInfo?.highRate + hotelInfo?.lowRate) / 2) * days;

  return (
    <div className="flex justify-between items-center ">
      <div>
        <h3 className="text-xl font-semibold">
          <Link href={`/hotels/${hotelId}`}>{hotelInfo?.name}</Link>
        </h3>
        <div className="text-sm text-gray-600 my-4">
          <p>Check In : {checkin}</p>
          <p>Check Out : {checkout}</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-right">
          ${totalCost.toFixed(2)}
        </h3>
        <p className="text-sm text-gray-600">{`${
          totalCost / days
        } per night  ${Math.floor(days)} days`}</p>
      </div>
    </div>
  );
};

export default BookingCard;
