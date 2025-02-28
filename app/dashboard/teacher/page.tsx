import CourseList from "@/app/ui/dashboard/teacher/course-list";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function Page() {
    const session = await auth(); 
    if (!session) {
            redirect("/login");
            return;
    }
    return (
        
        <main>
            <div className= "flex flex-col items-center">
                <h1 className="text-2xl">Bienvenue {session.user.name}</h1>                  
                <div className="mt-6 gap-6 ">
                    <CourseList />
                    
                </div>                
            </div>
        </main>
    );
}