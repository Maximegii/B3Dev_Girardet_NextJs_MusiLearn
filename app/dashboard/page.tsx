import CourseList from "../ui/dashboard/course-list";
import TeacherList from "../ui/dashboard/teacher-list";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth(); 
    if (!session) {
        redirect("/login");
        return;
    }

    return (
        <main className="container mx-auto p-6">
            
            <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">Bienvenue, {session.user.name} 👋</h1>
                <p className="text-gray-500 mt-2">Accédez à toutes les ressources et informations ici.</p>
            </div>

           
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">👨‍🏫 Liste des enseignants</h2>
                    <TeacherList />
                </div>

                
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">📚 Liste des cours</h2>
                    <CourseList />
                </div>
            </div>
        </main>
    );
}
