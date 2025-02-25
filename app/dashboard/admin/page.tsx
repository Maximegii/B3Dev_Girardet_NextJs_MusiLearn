import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth(); 
    if (!session) {
        redirect("/login");
        return;
    }else if (session.user.role !== "admin") {
        redirect("/dashboard");
        return;
    }

    return (
        <div className= "flex flex-col items-center">
                <h1 className="text-2xl">Bienvenue sur la page administrateur {session.user.name} !</h1>
        </div>
    );
}