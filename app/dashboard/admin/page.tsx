import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth(); 
     if (!session) {
                redirect("/login");
                return;
        }
    return (
        <div className= "flex flex-col items-center">
            <h1 className="text-2xl">Bienvenue sur la page administrateur {session.user.name} !</h1>
            <a
                href={"/dashboard/admin/create"}
                className='ml-20 bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 h-[48px] w-32 rounded-lg shadow-lg'>
                    Créer un utilisateur   
            </a>
        </div>
        
    );
}
