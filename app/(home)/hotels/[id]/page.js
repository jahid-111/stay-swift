import Gallery from "@/components/hotel/details/Gallery";
import Overview from "@/components/hotel/details/Overview";
import Summary from "@/components/hotel/details/Summary";
import { getHotelById } from "@/data/queries";
import React from "react";

const DetailsPage = async ({ params: { id } }) => {
  const hotelIfo = await getHotelById(id);
  // console.log(hotelIfo);

  return (
    <>
      <Summary hotelInfo={hotelIfo} />
      <Gallery gallery={hotelIfo?.gallery} />
      <Overview overview={hotelIfo?.overview} />
    </>
  );
};

export default DetailsPage;
