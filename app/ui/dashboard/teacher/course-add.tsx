import React from 'react';
import Link from 'next/link';

const CourseAddButton: React.FC = () => {
    return (
        <div className="mt-2">
            <Link href="/dashboard/cours/create"
                className="bg-blue-500 text-white p-3 text-sm font-medium hover:bg-blue-600 rounded-lg shadow-lg">
                    Ajouter un cours
                
            </Link>
        </div>
    );
};

export default CourseAddButton;