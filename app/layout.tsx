import '@/app/ui/global.css'
import Image from 'next/image'
import Link from 'next/link';
import { inter } from '@/app/ui/fonts'
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut, auth } from '@/auth';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLogged = !!session;
  const role = session?.user.role || null;
  const id = session?.user.id || null;

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-100`}>
        {/* Navigation */}
        <header className="bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md p-4">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard">
              <Image src="/logo.png" alt="Logo" width={80} height={80} className="cursor-pointer" />
            </Link>

            {/* Navigation Links */}
            <nav className="flex space-x-6">
              <NavLink href="/dashboard" label="Dashboard" />
              {role === 'student' && (
                <>
                  <NavLink href="/dashboard/cours" label="Cours" />
                  <NavLink href={`/dashboard/student/${id}`} label="Mon espace" />
                </>
              )}
              {(role === 'teacher' || role === 'admin') && (
                <>
                  <NavLink href="/dashboard/teacher" label="Gestion Cours" />
                  <NavLink href="/dashboard/teacher/eleve" label="Gestion Note" />
                </>
              )}
              {role === 'admin' && <NavLink href="/dashboard/admin" label="Admin" />}
            </nav>

            {/* Login / Logout */}
            <div>
              {!isLogged ? (
                <NavLink href="/login" label="Log in" />
              ) : (
                <form action={async () => { 'use server'; await signOut({ redirectTo: '/' }); }}>
                  <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200">
                    <PowerIcon className="w-5" />
                    <span>Sign Out</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </header>

        {/* Contenu de la page */}
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}

/**
 * Composant de lien réutilisable pour la navigation
 */
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-white font-medium hover:text-gray-200 transition duration-200">
      {label}
    </Link>
  );
}
