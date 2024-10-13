import { amenitiesModel } from "@/models/amenities-model";
import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { userModel } from "@/models/user-model";
import {
  isDateInBook,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export async function getAllHotels(
  destination,
  checkin,
  checkout,
  category,
  sortByPrice,
  range,
  amenity
) {
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
      "amenities",
    ])
    .lean();

  let allHotels = hotelsByDestination; // Things  Of all

  const allAmenities = await getAmenities();

  const fromHotelAmenity = allHotels.map((hotel) =>
    replaceMongoIdInArray(hotel.amenities)
  );

  const flatFromHotelAmenity = [].concat(...fromHotelAmenity);

  const dataAmenities = allAmenities.filter(
    (amenities) => !flatFromHotelAmenity.includes(amenities.id)
  );

  if (amenity) {
    const matchAmenityIds = amenity.split("|");

    const matchAmenity = dataAmenities.filter((aId) =>
      matchAmenityIds.some((id) => aId.name.includes(id))
    );

    const selectedAmenityIds = matchAmenity.map((select) => select.id);

    const hotelAmenitiesIds = allHotels.map((hotel) =>
      hotel.amenities
        ? hotel.amenities.map((amenityHotel) => amenityHotel.toString())
        : []
    );

    allHotels = allHotels.filter((hotel, index) => {
      return hotelAmenitiesIds[index].some((amenityId) =>
        selectedAmenityIds.includes(amenityId)
      );
    });
  }

  if (range) {
    const rangeMatch = range.split("|");
    const min = parseFloat(rangeMatch[0]);
    const max = parseFloat(rangeMatch[1]);
    allHotels = allHotels.filter((hotel) => {
      return hotel.highRate >= min && hotel.lowRate <= max;
    });
  }

  if (category) {
    const categoriesToMatch = category.split("|");
    allHotels = allHotels.filter((hotel) => {
      return categoriesToMatch.includes(hotel.propertyCategory.toString());
    });
  }

  if (sortByPrice) {
    if (sortByPrice === "highToLow") {
      allHotels = allHotels.sort((a, b) => b.highRate - a.highRate);
    }
    if (sortByPrice === "lowToHigh") {
      allHotels = allHotels.sort((a, b) => a.lowRate - b.lowRate);
    }
  }

  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const found = await findBooking(hotel._id, checkin, checkout);

        if (found) {
          allHotels["isBooked"] = true;
        } else {
          allHotels["isBooked"] = false;
        }

        return hotel;
      })
    );
  }

  return replaceMongoIdInArray(allHotels);
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

export async function getHotelById(hotelId, checkin, checkout) {
  const hotel = await hotelModel.findById(hotelId).lean();

  if (checkin && checkout) {
    const found = await findBooking(hotel._id, checkin, checkout);
    if (found) {
      hotel["isBooked"] = true;
    } else {
      hotel["isBooked"] = false;
    }
  }
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

export async function getUserByEmail(email) {
  const users = await userModel.find({ email: email }).lean();

  return replaceMongoIdInObject(users[0]);
}

export async function getUserBookings(userId) {
  const bookings = await bookingModel.find({ userId: userId }).lean();

  return replaceMongoIdInArray(bookings);
}

export async function getAmenities() {
  try {
    const amenities = await amenitiesModel.find({}).lean();
    return replaceMongoIdInArray(amenities);
  } catch (error) {
    console.error("Error fetching amenities:", error);
    throw new Error("Failed to fetch amenities");
  }
}
