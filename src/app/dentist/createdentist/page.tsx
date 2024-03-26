import { authOptions } from "@/libs/auth"
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Dentist from "@/db/models/Dentist";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function createDentistPage() {

    const createDentist = async (createDentistForm: FormData) => {
        'use server'
        const name = createDentistForm.get("name");
        const year_exp = createDentistForm.get("year_exp");
        const clinic = createDentistForm.get("clinic");

        try {
            await dbConnect();
            const dentist = await Dentist.create({
                "name": name,
                "year_exp": year_exp,
                "clinic": clinic
            })
        } catch(error) {
            console.log(error);
            alert("Cannot create Dentist, Please try again")
        }
        revalidateTag('dentists');
        redirect("/dentist");
    }
    
    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) {
        return(
            <div>
                Please Sign-In
            </div>
        )
    }

    const profile = await getUserProfile(session.user.token);

    return(
        profile.data.role !== "admin" ? 
            <div className="bg-blue-100 min-h-screen flex items-center justify-center">
              <div className="p-8 rounded-lg shadow-md">
                <p className="text-blue-700 font-semibold text-center">You are not an Admin</p>
              </div>
            </div>
          : 
            <div className="bg-blue-100 min-h-screen flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-semibold text-blue-700 text-center mb-6">Create Dentist</h1>
                <form action={createDentist} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-blue-700 font-semibold block mb-1">
                      Dentist Name
                    </label>
                    <input
                      type="text"
                      required
                      id="name"
                      name="name"
                      placeholder="Name"
                      className="w-full px-3 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="year_exp" className="text-blue-700 font-semibold block mb-1">
                      Year Experience
                    </label>
                    <input
                      type="number"
                      required
                      id="year_exp"
                      name="year_exp"
                      placeholder="Year Experience"
                      className="w-full px-3 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="clinic" className="text-blue-700 font-semibold block mb-1">
                      Work At Clinic
                    </label>
                    <input
                      type="text"
                      required
                      id="clinic"
                      name="clinic"
                      placeholder="Clinic"
                      className="w-full px-3 py-2 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors w-full"
                  >
                    Create new Dentist
                  </button>
                </form>
              </div>
            </div>
          )
}