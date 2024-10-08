import { getReviewsForHotel } from "@/data/queries";
import Link from "next/link";
import React from "react";

const ReviewHotel = async ({ id }) => {
  const reviews = await getReviewsForHotel(id);

  return (
    <>
      {reviews?.length === 0 ? (
        <Link href="#"> Be the First one to Review</Link>
      ) : (
        <Link href={`/hotels/${id}/review`}> Be the First one to Review</Link>
      )}
    </>
  );
};

export default ReviewHotel;
