import { auth } from "@/auth";
import PaymentForm from "@/components/payment/PaymentForm";
import { getHotelById, getUserByEmail } from "@/data/queries";
import { getDayBooked } from "@/utils/data-util";
import { redirect } from "next/navigation";
import React from "react";

const PaymentPage = async ({
  params: { id },
  searchParams: { checkin, checkout },
}) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);
  const hotelInfo = await getHotelById(id, checkin, checkout);

  let cost = (hotelInfo?.highRate + hotelInfo.lowRate) / 2;

  const hasCheckInCheckOut = checkin && checkout;

  if (hasCheckInCheckOut) {
    const days = getDayBooked(checkin, checkout);
    cost = cost * days;
  }

  console.log("⭐", loggedInUser);
  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h2 className="font-bold text-2xl">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          You have picked <b>{hotelInfo?.name}</b> and Total price is
          <b className="text-orange-500 font-semibold mx-1">${cost}</b>
          {hasCheckInCheckOut && `For ${getDayBooked(checkin, checkout)} Day's`}
        </p>
        <PaymentForm
          loggedInUser={loggedInUser}
          hotelInfo={hotelInfo}
          checkin={checkin}
          checkout={checkout}
        />
      </div>
    </section>
  );
};

export default PaymentPage;
