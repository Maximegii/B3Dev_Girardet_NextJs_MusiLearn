'use client';

import { useActionState } from "react"
import { createUser, StateUser } from '@/app/lib/actions';


export default function Page() {
   
    
    const initialState: StateUser = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(createUser, initialState);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Créer un nouveau cours</h1>
            <form action={formAction} className="space-y-4">
                <input type="text" name="name" placeholder="Prénom" id="name" required className="w-full p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" id="email" required className="w-full p-2 border rounded" />
                <input type="password" name="password" placeholder="Mot de passe" id="password" required className="w-full p-2 border rounded" />
                <select name="role" id="role" required className="w-full p-2 border rounded">
                    <option key="default" value="">Rôle</option>
                    <option key="student" value="student">Etudiant</option>
                    <option key="teacher" value="teacher">Enseignant</option>
                    <option key="admin" value="admin">Admin</option>
                </select>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Créer</button>
            </form>
        </div>

    );
}
