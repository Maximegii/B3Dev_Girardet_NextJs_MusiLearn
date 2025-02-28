import React from 'react';
import Link from 'next/link';

interface CourseUpdateButtonProps {
    courseId: string;
}

const CourseUpdateButton: React.FC<CourseUpdateButtonProps> = ({ courseId }) => {
    return (
        <div className="mt-5">
            <Link href={`/dashboard/teacher/${courseId}`}
                className="bg-blue-500 text-white p-3 text-sm font-medium hover:bg-blue-600 rounded-lg shadow-lg">
                Modifier
            </Link>
        </div>
    );
};

export default CourseUpdateButton;