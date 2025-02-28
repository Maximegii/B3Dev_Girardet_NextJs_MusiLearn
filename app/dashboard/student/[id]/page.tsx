import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CourseList from "@/app/ui/dashboard/student/course-list";
import { fetchEnrolledCourses, fetchProgress } from '@/app/lib/actions';

export default async function Page() {
    const session = await auth();
    
    if (!session) {
        redirect("/login");
        return null;
    }

    const courses = await fetchEnrolledCourses(session.user.id);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-100 to-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    🎓 Bienvenue, {session.user.name} !
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                    Voici votre suivi des cours inscrits 📚
                </p>

                <div className="w-full space-y-4">
                    {await Promise.all(courses.map(async (course) => {
                        const progress = await fetchProgress(course.id, session.user.id);
                        
                        return (
                            <CourseList
                                key={course.id}
                                courseId={course.id}
                                userId={session.user.id}
                                initialEvaluation={progress?.evaluation || ""}
                                initialComment={progress?.comment || ""}
                            />
                        );
                    }))}
                </div>
            </div>
        </div>
    );
}
