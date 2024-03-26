import DentistCard from "@/components/DentistCard";
import getDentists from "@/libs/getDentists";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth"
import getUserProfile from "@/libs/getUserProfile";
import DentistCardForAdmin from "@/components/DentistCardfForAdmin";
import Link from "next/link";
import { dbConnect } from "@/db/dbConnect";
import Dentist from "@/db/models/Dentist";
import deleteDentist from "@/libs/deleteDentist";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DentistPage() {
  //console.log(dentist);

  const session = await getServerSession(authOptions);
  const dentists = await getDentists();
  let profile:any;
  let token:any;
  let role:any;
  if(session) {
    profile = await getUserProfile(session.user.token);
    token = session?.user.token as string;
    role = profile.data.role;
  }

  const DeleteDentist = async (deleteForm: FormData) => {
    "use server";
    try {
      //   await dbConnect();
      //   var dentist = await Dentist.deleteOne({_id: deleteForm.get("did")})
      await deleteDentist(token, deleteForm.get("did") as string);
      console.log("Deleted");
    } catch (error) {
      console.log(error);
      alert("Cannot delete Dentist, Please try again");
    }
    revalidateTag('dentists');
    redirect("/dentist");
  };

  return (
    <main>
      <div className="text-center text-lg font-bold my-4 ">DentistPage</div>
      {role == "admin" ? (
        <div className="flex flex-col space-y-5 m-4 p-4 items-center justify-center">
          {dentists.data.map((dentistItem: DentistItem) => (
            <div className="bg-sky-200 p-4 border border-sky-600 rounded-md">
              <DentistCardForAdmin
                dentName={dentistItem.name}
                yearExp={dentistItem.year_exp}
                clinic={dentistItem.clinic}
                did={dentistItem._id}
              />
              <div className="flex flex-row space-x-2 justify-end pt-4">
                <Link href={`/dentist/editdentist/${dentistItem._id}`}>
                  <button className="bg-orange-200 border border-orange-600 hover:bg-yellow-400 hover:border-transparent rounded-lg px-2 py-1 text-sm">Edit</button>
                </Link>
                <form action={DeleteDentist}>
                  <input
                    type="text"
                    hidden
                    required
                    id="did"
                    name="did"
                    value={dentistItem._id}
                  />
                  <button className="bg-red-300 border border-red-600 hover:bg-red-600 hover:border-transparent rounded-lg px-2 py-1 text-sm">Delete</button>
                </form>
              </div>
            </div>
          ))}
          <Link href={"/dentist/createdentist"}>
            <button className="bg-green-400 border border-green-800 rounded-lg px-2 py-1 absolute right-2 bottom-2">
              Create
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col space-y-5 m-4 p-4 items-center justify-center">
            {dentists.data.map((dentistItem: DentistItem) => (
              <div className="bg-sky-200 p-4 border border-sky-600 rounded-md">
                <DentistCard
                  dentName={dentistItem.name}
                  yearExp={dentistItem.year_exp}
                  clinic={dentistItem.clinic}
                  />
              </div>
            ))}
        </div>
      )}
    </main>
  );
}