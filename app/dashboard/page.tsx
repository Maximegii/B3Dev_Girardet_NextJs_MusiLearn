import CourseList from "../ui/dashboard/course-list";
import TeacherList from "../ui/dashboard/teacher-list";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth(); 
    if (!session) {
            redirect("/");
            return;
    }
    return (
        
        <main>
            <div className= "flex flex-col items-center">
                <h1 className="text-2xl">Bienvenue {session.user.name}</h1>
            </div>
            
            <div className="flex">
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 ml-8">
                    <TeacherList />
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 ml-8">
                    <CourseList />
                </div>
            </div>
        </main>
    );
}