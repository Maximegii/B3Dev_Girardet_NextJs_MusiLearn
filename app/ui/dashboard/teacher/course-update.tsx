'use client';

import { Course} from '@/app/lib/definitions';
import { updateCourse, StateCourse } from '@/app/lib/actions';
import { useActionState } from 'react';
import { Row } from 'postgres';


export default function EditCourseForm({
  course,
  
}: {
  course: Course | Row[0];
  
}) {

    const initialStare: StateCourse = { message: null, errors: {} };
    const updateCourseWithId = updateCourse.bind(null, course[0]?.id);
    const [state, formAction] = useActionState(updateCourseWithId, initialStare);


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Mettre à jour le cours</h1>
            <form action={formAction} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Titre"
                    defaultValue={course[0]?.title}
                    required
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    defaultValue={course[0]?.description}   
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="instrument"
                    placeholder="Instrument"
                    defaultValue={course[0]?.instrument}        
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="teacherId"
                    placeholder="Prénom du professeur"
                    defaultValue={course[0]?.teacherId}                  
                    required
                    className="w-full p-2 border rounded"
                />
                <select
                    name="level"
                    defaultValue={course[0]?.level}                   
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="">Niveau</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                </select>
                <input
                    type="text"
                    name="schedule"
                    placeholder="Horaire (ex: lundi 18h)"
                    defaultValue={course[0]?.schedule}                   
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacité max"
                    defaultValue={course[0]?.capacity}
                    required
                    className="w-full p-2 border rounded"
                />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Mettre à jour
                </button>
            </form>
            
        </div>
            
  );
}