import { fetchCourse } from "@/app/lib/data";
import clsx from 'clsx'
import CourseAddButton from "./course-add";
import CourseDel from "./course-del";
import CourseUpdateButton from "./course-updateButton";

export default async function CourseList() {
    const teacherList = await fetchCourse();
    

    return (
        <div className="flex flex-col ">
            <h2 className="text-xl">Gestion des cours</h2>
            <p>Créer un cour : </p><CourseAddButton />
            <div className="flex flex-col justify-between rounded-xl bg-sky-300 w-80 mt-4">
                <div className="flex flex-col justify-between rounded-xl bg-sky-200 m-2 p-2">
                    {teacherList.map((course, i) => {
                        return (
                            <div
                                key={course.id}
                                className={clsx(
                                    'flex flex-row items-center justify-between py-4',
                                    {
                                        'border-t': i !== 0,
                                    },
                                )}
                            >
                                <div className="flex items-center">
                                    <div className="min-w-0">
                                        <p className="truncate text-xl font-semibold md:text-base">
                                            Cour: {course.title}
                                        </p>
                                        <p className="hidden text-lg text-gray-500 sm:block">
                                            Description: {course.description}
                                        </p><p className="hidden text-lg text-gray-500 sm:block">
                                            Instrument: {course.instrument}
                                        </p>
                                        <p className="hidden text-lg text-gray-500 sm:block">
                                            Niveau: {course.level}
                                        </p>
                                        <p className="hidden text-lg text-gray-500 sm:block">
                                            Horaire: {course.schedule}
                                        </p>
                                        <CourseDel courseId={course.id} />
                                        <CourseUpdateButton courseId={course.id} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    )

}