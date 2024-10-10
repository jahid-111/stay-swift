import { bookingModel } from "@/models/booking-model";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { hotelId, userId, checkin, checkout } = await request.json();

    await dbConnect();

    const payload = {
      hotelId: new mongoose.Types.ObjectId(hotelId),
      userId: new mongoose.Types.ObjectId(userId),
      checkin,
      checkout,
    };

    await bookingModel.create(payload);

    return NextResponse.json(
      { message: "You've Booked Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { error: error.message || "Booking failed" },
      { status: 500 }
    );
  }
};
