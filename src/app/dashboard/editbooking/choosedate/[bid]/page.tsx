"use client";
import { useSearchParams } from "next/navigation";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function editBookingPage({
  params,
}: {
  params: { bid: string };
}) {
  const urlParams = useSearchParams();
  const bookDate = urlParams.get("bookDate");
  const [newBookDate, setNewBookDate] = useState<Dayjs|null>(null);
  const bookingId = params.bid;

  const handleBookDate = () => {
    const hour = dayjs(newBookDate).hour();
    if ((hour >= 9 && hour < 11) || (hour >= 13 && hour < 16)) {
      window.location.href = `/dashboard/editbooking/choosedentist/${bookingId}?bid=${bookingId}&bookDate=${dayjs(newBookDate).format("YYYY-MM-DDTHH:00:00")}`;
    } else {
      alert("Please choose a time between 9:00-11:00 or 13:00-16:00.");
    }
  }

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex flex-col justify-center items-center my-4 py-2">
          <div className="text-blue-700 font-semibold mb-2">
            <span className="text-lg">Booking ID:</span> {params.bid}
          </div>
          <div className="text-blue-700 font-semibold">
            <span className="text-lg">Old Date:</span> {bookDate}
          </div>
        </div>
        <div className="w-full text-center items-center justify-center flex flex-col my-4 py-4 space-y-2">
          <h1 className="text-2xl font-semibold text-blue-700">Choose Date</h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              views={["year", "month", "day", "hours", "minutes", "seconds"]}
              className="bg-white"
              value={newBookDate}
              format="YYYY/MM/DD HH:00:00"
              onChange={(value) => {
                setNewBookDate(value);
              }
            }
            />
          </LocalizationProvider>
          {/* <Link
            href={`/dashboard/editbooking/choosedentist/${bookingId}?bid=${bookingId}&bookDate=${dayjs(newBookDate).format("YYYY-MM-DDTHH:00:00")}`}
          > */}
            <button className="bg-blue-300 m-2 p-2 rounded-lg hover:bg-indigo-500 text-white" onClick={handleBookDate}>
              next
            </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
