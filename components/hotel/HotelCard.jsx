import HotelSummaryInfo from "./HotelSummaryInfo";

// import HotelPageBg from "../../public/a";
const HotelCard = () => {
  return (
    <div className="flex gap-6 border border-gray/20 p-4 rounded-md">
      image
      <img
        src="./assets/images/image-1.png"
        className="max-h-[162px] max-w-[240px]"
        alt=""
        with={200}
        height={200}
      />
      <HotelSummaryInfo fromListPage={true} />
    </div>
  );
};

export default HotelCard;
