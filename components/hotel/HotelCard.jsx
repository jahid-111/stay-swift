import Image from "next/image";
import HotelSummaryInfo from "./HotelSummaryInfo";

const HotelCard = ({ hotel }) => {
  return (
    <div className="flex gap-6 border border-gray/20 p-4 rounded-md">
      <Image
        src={hotel?.thumbNailUrl}
        className="max-h-[162px] max-w-[240px] rounded-md"
        alt={hotel?.name}
        width={280}
        height={200}
      />
      <HotelSummaryInfo hotelInfo={hotel} fromListPage={true} />
    </div>
  );
};

export default HotelCard;
