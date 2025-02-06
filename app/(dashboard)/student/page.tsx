"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (!session) {
    return (
      <div>
        <p>Vous devez être connecté pour voir cette page.</p>
        <button onClick={() => signIn()}>Se connecter</button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Bienvenue, {session.user.name}!</p>
      <p>Votre rôle : {session.user.role}</p>
      <button onClick={() => signOut()}>Se déconnecter</button>
      <pre className="bg-gray-200 p-4 rounded">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
