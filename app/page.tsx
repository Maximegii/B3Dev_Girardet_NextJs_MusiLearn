import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full gap-10 p-6 md:p-12 rounded-2xl bg-white bg-opacity-75 shadow-xl backdrop-blur-lg">
        
        {/* Section Texte */}
        <div className="flex flex-col gap-6 text-center md:text-left md:w-2/5"> 
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            🎶 Bienvenue sur Musilearn ! 🎵
          </h1>
          <p className="text-lg text-gray-700">
            Connecte-toi pour découvrir des cours inspirants et améliorer tes talents musicaux.
          </p> 
          <Link
            href="/login"
            className="flex items-center justify-center md:justify-start gap-3 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700 shadow-md"
          >
            <span>Se connecter</span> 
            <ArrowRightIcon className="w-6" /> 
          </Link>
        </div>

       

      </div>
    </main>
  );
}
