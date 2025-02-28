'use client'
import React from 'react';
import { deleteCourse } from '@/app/lib/actions';

interface CourseDelProps {
    courseId: string;
}

const CourseDel: React.FC<CourseDelProps> = ({ courseId }) => {
    const handleDelete = async () => {
        const confirmed = confirm("Êtes-vous sûr de vouloir supprimer ce cours ?");
        if (confirmed) {
            try {
                const response = await deleteCourse(courseId);
                if (response?.message) {
                    alert(response.message);
                    window.location.reload();
                } else {
                    alert("Cours supprimé avec succès !");
                    window.location.reload();
                }
            } catch (error) {
                console.error("Failed to delete course:", error);
                alert("Erreur lors de la suppression du cours.");
            }
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-3 text-sm font-medium hover:bg-red-600 rounded-lg shadow-lg"
        >
            Supprimer
        </button>
    );
};

export default CourseDel;