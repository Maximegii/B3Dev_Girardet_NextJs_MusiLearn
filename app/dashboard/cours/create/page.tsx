'use client';

import { useActionState } from "react"
import { createCourse, StateCourse } from '@/app/lib/actions';

export default function Page() {

    const initialState: StateCourse = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(createCourse, initialState);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Créer un nouveau cours</h1>
            <form action={formAction} className="space-y-4">
                <input type="text" name="title" placeholder="Titre" id="title" required className="w-full p-2 border rounded" />
                <textarea name="description" placeholder="Description" id="description" required className="w-full p-2 border rounded" />
                <input type="text" name="instrument" placeholder="Instrument" id="instrument" required className="w-full p-2 border rounded" />
                <input type="text" name="teacherId" placeholder="Prénom du professeur" id="teacherId" required className="w-full p-2 border rounded" />
                <select name="level" id="level" required className="w-full p-2 border rounded">
                    <option value="">Niveau</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                </select>
                <input type="text" name="schedule" placeholder="Horaire (ex: lundi 18h)" id="schedule" required className="w-full p-2 border rounded" />
                <input type="number" name="capacity" placeholder="Capacité max" id="capacity" required className="w-full p-2 border rounded" />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Créer</button>
            </form>
        </div>

    );
}
