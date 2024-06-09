import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckOutForm.css";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useUser from "../hooks/useUser";
import ActionLoader from "../components/shared/ActionLoader";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ booking, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const { currentUser } = useUser();
  const [clientSecret, setClientSecret] = useState();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const { package_price, status } = booking;

  // fetch client secret

  const getClientSecret = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price: package_price,
      });
      console.log("client secret from server", data);
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  useEffect(() => {
    if (package_price && package_price > 1) {
      getClientSecret();
    }
  }, [package_price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "Paid") {
      return toast.error("Already Paid");
    }
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false); // Reset processing state
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: currentUser?.email,
            name: currentUser?.name,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        ...booking,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      console.log("payment obj", paymentInfo);

      try {
        const response = await axiosSecure.put("/payment", paymentInfo);
        const { resultOfBooking, resultOfPayment } = response.data;
        if (
          resultOfBooking.acknowledged &&
          resultOfBooking.modifiedCount &&
          resultOfPayment.acknowledged &&
          resultOfPayment.insertedId
        ) {
          toast.success("Payment Success");
          refetch();
        }
      } catch (error) {}

      setProcessing(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="border p-2 border-black"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? <ActionLoader /> : "Pay"}
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
