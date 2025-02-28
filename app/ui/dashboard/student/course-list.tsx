'use client';

import React from 'react';
import { fetchCourseById } from '@/app/lib/actions';


export default function CourseList({ courseId, userId, initialEvaluation, initialComment }: { courseId: any, userId: string, initialEvaluation: string,initialComment: string}) {

    const [course, setCourse] = React.useState<any>(null);

    React.useEffect(() => {
        async function fetchData() {
            const fetchedCourse = await fetchCourseById(courseId);
            setCourse(fetchedCourse);
        }
        fetchData();
    }, [courseId]);

    if (!course) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Mon Cours</h1>
            <ul className="space-y-4">
                <li key={course.id} className="p-4 border rounded-lg">
                    <h2 className="text-xl font-semibold">{course.title}</h2>
                    <p>{course.description}</p>
                    <p>Instrument: {course.instrument}</p>
                    <p>Niveau: {course.level}</p>
                    <p>Horaire: {course.schedule}</p>
                    <p>Note: {initialEvaluation}</p>
                    <p>Commentaire: {initialComment}</p>
                </li>    
            </ul>
        </div>
    );
};
