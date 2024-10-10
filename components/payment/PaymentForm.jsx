"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentForm = ({
  loggedInUser,
  hotelInfo,
  payMoney,
  checkin: initialCheckin,
  checkout: initialCheckout,
}) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [checkin, setCheckin] = useState(initialCheckin);
  const [checkout, setCheckout] = useState(initialCheckout);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const hotelId = hotelInfo?.id;
      const userId = loggedInUser?.id;
      const checkin = formData.get("checkin");
      const checkout = formData.get("checkout");

      const response = await fetch("/api/auth/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelId,
          userId,
          checkin,
          checkout,
        }),
      });

      if (response.status === 201) {
        router.push("/bookings");
      } else {
        const data = await response.json();
        setError(data.message || "Payment failed");
      }
    } catch (error) {
      setError(error?.message || "An error occurred");
    }
  }

  return (
    <>
      <div>
        <h4 className="text-2xl text-red-500">Error: {error}</h4>
      </div>
      <form onSubmit={onSubmit} className="my-8">
        <div className="my-4 space-y-2">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            value={loggedInUser?.name}
            type="text"
            id="name"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
            readOnly
          />
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            value={loggedInUser?.email}
            type="email"
            id="email"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
            readOnly
          />
        </div>

        <div className="my-4 space-y-2">
          <span>Check in</span>
          <h4 className="mt-2">
            <input
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              type="date"
              name="checkin"
              id="checkin"
            />
          </h4>
        </div>

        <div className="my-4 space-y-2">
          <span>Checkout</span>
          <h4 className="mt-2">
            <input
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              type="date"
              name="checkout"
              id="checkout"
            />
          </h4>
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="card" className="block">
            Card Number
          </label>
          <input
            type="text"
            id="card"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
          />
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="expiry" className="block">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiry"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
          />
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="cvv" className="block">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
          />
        </div>

        <button type="submit" className="btn-primary w-full">
          Pay Now ({payMoney})
        </button>
      </form>
    </>
  );
};

export default PaymentForm;
