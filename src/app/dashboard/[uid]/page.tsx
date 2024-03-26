import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getBookings from "@/libs/getBookings"
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { dbConnect } from "@/db/dbConnect";
import Booking from "@/db/models/Booking";

export default async function dashBoardPage( {params} : {params:{uid:string}} ) {

    const session = await getServerSession(authOptions);
    const token = (session?.user.token)?.toString();

    if(!session || !session.user.token) {
        return null;
    }

    const bookings = await getBookings(session.user.token);
    const filteredBookings = bookings.data.filter((bookItem: BookItem) => bookItem.user == params.uid);

    const profile = await getUserProfile(session.user.token);

    const deleteBooking = async (deleteForm: FormData) => {
        'use server'
        try {
            await dbConnect();
            const booking = await Booking.deleteOne({_id: deleteForm.get("bid")})
        } catch(error) {
            console.log(error);
        }
    };

    return(
        <main>
            <div className="text-center text-lg font-bold m-4">Your Bookings</div>
            {
                (filteredBookings.length == 0) ?    -
                <div className="text-center text-md font-semibold m-4">
                    You don't have any booking
                </div> :
                (
                    <div className="flex flex-col space-y-5 m-4 p-4 items-center justify-center">
                        {
                    filteredBookings.map((bookItem: BookItem) => (
                        <div key={bookItem._id} className="bg-sky-200 p-6 border border-sky-600 rounded-md">
                            <div>Booking ID : {bookItem._id}</div>
                            <div>Booking Date : {bookItem.bookDate}</div>
                            <div>Dentist : {bookItem.dentist.name}</div>
                            <div className="flex flex-row space-x-2 mx-2 px-2 justify-end">
                            <Link href={`/dashboard/editbooking/choosedate/${bookItem._id}?bookDate=${encodeURIComponent(bookItem.bookDate)}`}>
                                <button className="bg-orange-200 border border-orange-600 hover:bg-yellow-400 hover:border-transparent rounded-lg px-2 py-1 text-sm">Edit</button>
                            </Link>
                            <form action={deleteBooking}>
                                <input type="text" hidden required id="bid" name="bid" value={bookItem._id}/>
                                <button type="submit" className="bg-red-300 border border-red-600 hover:bg-red-600 hover:border-transparent rounded-lg px-2 py-1 text-sm">Delete</button>
                            </form>
                            </div>
                        </div>
                    ))
                    }
                    </div>
                )

            }
            {
                (profile.data.role == "admin") ?
                <div>
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="text-center text-lg font-bold m-4">All Bookings</div>
                    <div className="flex flex-col space-y-5 m-4 p-4 items-center justify-center">
                    {
                        bookings.data.map((bookItem: BookItem) => (
                            <div key={bookItem._id} className="bg-sky-200 p-6 border border-sky-600 rounded-md">
                            <div>Booking ID : {bookItem._id}</div>
                            <div>Booking Date : {bookItem.bookDate}</div>
                            <div>User ID : {bookItem.user}</div>
                            <div>Dentist : {bookItem.dentist.name}</div>
                            <div className="flex flex-row space-x-2 mx-2 px-2 justify-end">
                            <Link href={`/dashboard/editbooking/choosedate/${bookItem._id}?bookDate=${encodeURIComponent(bookItem.bookDate)}`}>
                                <button className="bg-orange-200 border border-orange-600 hover:bg-yellow-400 hover:border-transparent rounded-lg px-2 py-1 text-sm">Edit</button>
                            </Link>
                            <form action={deleteBooking}>
                                <input type="text" hidden required id="bid" name="bid" value={bookItem._id}/>
                                <button type="submit" className="bg-red-300 border border-red-600 hover:bg-red-600 hover:border-transparent rounded-lg px-2 py-1 text-sm">Delete</button>
                            </form>
                            </div>
                        </div>
                        ))
                    }
                    </div>
                </div> :
                null
            }
        </main>
    )
}