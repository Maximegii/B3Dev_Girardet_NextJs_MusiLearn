import { fetchCourse } from "@/app/lib/data";
import CourseEnrollment from "./course-enrollment";

export default async function CourseList() {
    const courses = await fetchCourse();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            
            <div className="space-y-4">
                {courses.map((course) => (
                    <div key={course.id} className="bg-yellow-100 p-5 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-gray-700 mt-1">{course.description}</p>
                        <div className="mt-2 text-sm text-gray-600">
                            <p><span className="font-medium">🎸 Instrument:</span> {course.instrument}</p>
                            <p><span className="font-medium">📊 Niveau:</span> {course.level}</p>
                            <p><span className="font-medium">🕒 Horaire:</span> {course.schedule}</p>
                        </div>
                        <div className="mt-4">
                            <CourseEnrollment courseId={course.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
