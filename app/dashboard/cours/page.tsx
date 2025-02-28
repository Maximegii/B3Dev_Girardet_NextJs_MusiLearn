import CourseList from "@/app/ui/dashboard/cours/course-list";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth(); 
    if (!session) {
        redirect("/login");
        return;
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                🎼 Voici la liste des cours !
            </h1>
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
                <CourseList />
            </div>
        </div>
    );
}
