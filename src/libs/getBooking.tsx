export default async function getBooking(token:string, bid: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bid}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    });
    if(!response.ok) {
        throw new Error("Failed to fetch bookings");
    }
    return await response.json();
}