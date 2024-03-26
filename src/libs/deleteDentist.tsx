export default async function deleteDentist(token: string, did: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/dentists/${did}`, {
        method: "DELETE",
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