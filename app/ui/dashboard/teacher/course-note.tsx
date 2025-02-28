'use client'

import { useActionState } from 'react';
import { addProgress} from '@/app/lib/actions';

export default function CourseNoteForm({ courseId, userId, initialEvaluation, initialComment }: { courseId: any, userId: string, initialEvaluation: string,initialComment: string }) {

    const addProgressWithIds = (state: { message: string }, formData: FormData) => {
        const evaluation = formData.get('evaluation') as string;
        const comment = formData.get('comment') as string;
        const date = new Date().toISOString();
        return addProgress(courseId, userId, evaluation, comment, date);
    };
    const [state, formAction] = useActionState(addProgressWithIds, { message: '' });

    return (
        <form action={formAction} className="space-y-4 mt-4">
            <div>
                <label htmlFor={`note-${courseId}`} className="block text-sm font-medium text-gray-700">
                    Note
                </label>
                <select
                    id={`evaluation-${courseId}`}
                    name="evaluation"
                    required
                    className="w-full p-2 border rounded"
                    defaultValue={initialEvaluation}
                >
                    <option value="">Sélectionnez une note</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div>
                <label htmlFor={`comment-${courseId}`} className="block text-sm font-medium text-gray-700">
                    Commentaire
                </label>
                <textarea
                    id={`comment-${courseId}`}
                    name="comment"
                    required
                    className="w-full p-2 border rounded"
                    defaultValue={initialComment}
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Enregistrer
            </button>
        </form>
    );
};