import HotelList from "@/components/hotel/HotelList";
import Filter from "@/components/search/filter/Filter";
import Search from "@/components/search/Search";
import Loading from "@/components/utilComponents/Loading";
import React, { Suspense } from "react";

const refineEncode = (Value) => {
  const decodedValue = decodeURI(Value);
  if (decodedValue === "undefined") {
    return "";
  }
  return decodedValue;
};

const HotelListPage = ({
  searchParams: { destination, checkin, checkout, category, sort, range },
}) => {
  // console.log("⭐⭐⭐ range :", range);
  return (
    <>
      <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
        <div className="container items-center py-12 ">
          <Search
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            fromList={true}
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container grid grid-cols-12">
          <Filter />
          <Suspense fallback={<Loading />}>
            <HotelList
              destination={destination}
              checkin={checkin}
              checkout={checkout}
              sortBy={sort}
              category={refineEncode(category)}
              range={refineEncode(range)}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default HotelListPage;
