import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import {
  isDateInBook,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function getAllHotels(destination, checkin, checkout) {
  const regex = new RegExp(destination, "i");

  const hotelsByDestination = await hotelModel
    .find({ city: { $regex: regex } })
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
    ])
    .lean();

  let allHotels = hotelsByDestination;

  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const found = await findBooking(hotel._id, checkin, checkout);

        if (found) {
          hotel["isBooked"] = true;
        } else {
          hotel["isBooked"] = false;
        }

        return hotel;
      })
    );
  }

  return replaceMongoIdInArray(allHotels); //
}

async function findBooking(hotelId, checkin, checkout) {
  const matches = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean();

  const found = matches.find((match) => {
    return (
      isDateInBook(checkin, match?.checkin, match.checkout) ||
      isDateInBook(checkout, match?.checkin, match.checkout)
    );
  });
  return found;
}

export async function getHotelById(hotelId) {
  const hotel = await hotelModel.findById(hotelId).lean();
  return replaceMongoIdInObject(hotel);
}
export async function getRatingsForHotel(hotelId) {
  const ratings = await ratingModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(ratings);
}
export async function getReviewsForHotel(hotelId) {
  const reviews = await reviewModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(reviews);
}
