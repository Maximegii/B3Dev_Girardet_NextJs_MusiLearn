import { fetchCourseById } from '@/app/lib/actions';
import postgres from "postgres";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function CoursePage({ params }: { params: Promise<{ id: string} >}) {
    const session = await auth();

    const courseId = (await params).id;

    if (!session || !session.user) {
        redirect("/login");
        return null;
    }
    const course = await Promise.all([
        fetchCourseById(courseId)
    ]);
    
    let isEnrolled = [];
    if (session.user.id && courseId) {
        isEnrolled = await sql`
            SELECT 1 FROM enrollments WHERE studentid = ${session.user.id} AND courseid = ${courseId} LIMIT 1;
        `;
    }
    async function enrollInCourse() {
        'use server'
        const session = await auth();
        if (session && session.user.id && courseId) {
            await sql`
                INSERT INTO enrollments (studentid, courseid, enrollmentdate, status)
                VALUES (${session.user.id}, ${courseId}, NOW(), 'inscrit')
                ON CONFLICT DO NOTHING;
            `;
            redirect(`/dashboard/cours/${courseId}`);
        } else {
            throw new Error("User ID or Course ID is undefined");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 w-auto" >
            <div className="bg-white mt-7 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4">Cours de {course[0]?.instrument} {course[0]?.schedule}</h1>
                <h1 className="text-2xl font-bold mb-4">{course[0]?.schedule}</h1>

                <p className="mb-4">C'est un cours de niveau: {course[0]?.level}</p>
                {isEnrolled.length > 0 ? (
                    <p className="text-green-500">✅ Vous êtes déjà inscrit à ce cours.</p>
                ) : (
                    <form onSubmit={enrollInCourse}>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            S'inscrire
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}