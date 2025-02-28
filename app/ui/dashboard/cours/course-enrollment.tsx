import React from 'react';
import Link from 'next/link';

interface CourseEnrollmentProps {
    courseId: string;
}

const CourseEnrollment: React.FC<CourseEnrollmentProps> = ({ courseId }) => {
    return (
        <li key={courseId} className="list-none mt-2">
            <Link href={`/dashboard/cours/${courseId}`} className="bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 h-[48px] w-32 rounded-lg shadow-lg">
                Inscription
            </Link>
        </li>
    );
};

export default CourseEnrollment;